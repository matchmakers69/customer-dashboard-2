import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { Fragment, PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Toast } from '@kaboodle-solutions/design-system';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { getToastMessages } from '../../selectors/messages';
import { messageOperations } from '../../store/messages';
import styles from './ToastOverlay.styles';
import withStyles from 'react-jss';

class ToastOverlay extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      overlay: PropTypes.string,
      toast: PropTypes.string,
    }),
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        displayType: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }),
    ),
  };

  static defaultProps = {
    classes: {},
    messages: [],
  };

  constructor() {
    super();
    this.state = {
      messageQueue: [],
      lastMessage: 0,
      tick: 0,
    };
  }

  componentDidMount() {
    this.interval = () => {
      this.tick();
      setTimeout(this.interval, constants.MILLISECONDS_PER_TICK);
    };
    this.interval();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.getNewMessages();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval());
  }

  getNewMessages = () => {
    const newMessages = this.props.messages
      .filter(message => message.id > this.state.lastMessage)
      .map(message => ({ tick: this.state.tick, ...message }));

    // If message counter runs incorrectly, reset to zero. Currently the case when state is cleared on logout.
    const lastMessage = newMessages[newMessages.length - 1]
      ? newMessages[newMessages.length - 1].id
      : 0;

    this.setState(prevState => ({
      messageQueue: [...prevState.messageQueue, ...newMessages],
      lastMessage,
    }));
  };

  tick() {
    this.pruneMessages();
    this.setState(prevState => ({
      tick: prevState.tick + 1,
    }));
  }

  pruneMessages = () => {
    this.setState(prevState => ({
      messageQueue: prevState.messageQueue.filter(
        message =>
          message.tick + constants.TOAST_VISIBILITY_IN_TICKS >= prevState.tick,
      ),
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <TransitionGroup className={classes.overlay}>
          {this.state.messageQueue.map(message => (
            <CSSTransition
              key={message.id}
              timeout={200}
              classNames={classes.toast}>
              <Toast type={message.type}>{message.message}</Toast>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  messages: getToastMessages(state),
});

const mapDispatchToProps = {
  sendMessage: messageOperations.sendMessage,
};

export { ToastOverlay, mapStateToProps };

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ToastOverlay);
