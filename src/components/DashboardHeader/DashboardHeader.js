import React, { Fragment, PureComponent } from 'react';

import { CSSTransition } from 'react-transition-group';
import { Icon } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import styles from './DashboardHeader.styles';
import withStyles from 'react-jss';

class DashboardHeader extends PureComponent {
  state = {
    menuToggled: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = event => {
    if (
      (!this.node.contains(event.target) ||
        event.target.classList.contains('DashboardHeaderOverlay')) &&
      this.state.menuToggled
    ) {
      this.setState({ menuToggled: false });
    }
  };

  toggleMenu = () => {
    this.setState(({ menuToggled }) => ({ menuToggled: !menuToggled }));
  };

  render() {
    const { classes, children, logo, onLogoClick } = this.props;
    const { menuToggled } = this.state;

    return (
      <div className={classes.dashboardHeader} ref={node => (this.node = node)}>
        <div className={classes.brand}>
          <button
            type="button"
            data-test="header-logo-link"
            title="Kaboodle"
            onClick={onLogoClick}>
            <img src={logo} alt="Kaboodle" />
          </button>
        </div>
        <div className={menuToggled ? classes.menuOpen : classes.menu}>
          <button
            type="button"
            className={classes.hamburger}
            onClick={() => this.toggleMenu()}>
            <Icon icon={menuToggled ? 'iconClose' : 'iconMenu'} />
          </button>

          {window.matchMedia('(max-width: 36rem)').matches ? (
            <CSSTransition
              in={menuToggled}
              timeout={200}
              classNames="DashboardHeader__links">
              <Fragment>
                <button
                  type="button"
                  className={classes.links}
                  onClick={() => menuToggled && this.toggleMenu()}>
                  {children}
                </button>
                {menuToggled && <div className={classes.overlay} />}
              </Fragment>
            </CSSTransition>
          ) : (
            <button
              type="button"
              className={classes.links}
              onClick={() => menuToggled && this.toggleMenu()}
              onKeyPress={() => this.toggleMenu()}>
              {children}
            </button>
          )}
        </div>
      </div>
    );
  }
}

DashboardHeader.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object,
  logo: PropTypes.string.isRequired,
  onLogoClick: PropTypes.func,
};

DashboardHeader.defaultProps = {
  classes: {},
  onLogoClick: noop,
};

export default withStyles(styles)(DashboardHeader);
