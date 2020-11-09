import React, { PureComponent } from 'react';

import { Prompt } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLatestPrompt } from '../../selectors/messages';
import { messageOperations } from '../../store/messages';
import noop from 'lodash/noop';

const { actionMessage } = messageOperations;

class PromptOverlay extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    prompt: PropTypes.object,
  };

  static defaultProps = {
    prompt: null,
  };

  // Wraps actions in dispatch so they can be triggered on click. All Buttons 'action' the message.
  getWrappedActions = actions =>
    actions.map(action => ({
      ...action,
      onClick: action.onClick
        ? () => {
            this.props.dispatch(action.onClick);
            this.props.dispatch(actionMessage(this.props.prompt.id));
          }
        : () => this.props.dispatch(actionMessage(this.props.prompt.id)),
    }));

  render() {
    const { prompt, dispatch } = this.props;
    // Disable body overflow when prompt is visible.
    document.body.classList.toggle('withPrompt', prompt);

    return prompt ? (
      <Prompt
        header={prompt.header}
        actions={this.getWrappedActions(prompt.actions)}
        onClickOutside={
          prompt.required ? noop : () => dispatch(actionMessage(prompt.id))
        }>
        {prompt.message}
      </Prompt>
    ) : null;
  }
}

const mapStateToProps = state => ({
  prompt: getLatestPrompt(state),
});

export default connect(
  mapStateToProps,
  null,
)(PromptOverlay);
