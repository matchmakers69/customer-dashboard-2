/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';

import DashboardHeader from '../../components/DashboardHeader';
import { Icon } from '@kaboodle-solutions/design-system';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authOperations } from '../../store/auth';
import { connect } from 'react-redux';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import logo from '../../assets/kaboodle-logo-white.svg';
import { messageOperations } from '../../store/messages';

const { logout } = authOperations;

const Header = ({ displayHeader, displayHeaderLinks, goTo, sendMessage }) => (
  <Fragment>
    {displayHeader && (
      <DashboardHeader
        logo={logo}
        onLogoClick={() => goTo(constants.BOOKINGS_URL)}>
        {displayHeaderLinks && (
          <Fragment>
            <Link to={constants.BOOKINGS_URL}>
              <Icon icon="iconBookings" />
              Bookings
            </Link>

            <Link to={constants.PROFILE_URL}>
              <Icon icon="iconProfile" />
              Profile
            </Link>
          </Fragment>
        )}

        <a
          role="button"
          className="signOutButton"
          onClick={() =>
            sendMessage({
              displayType: 'prompt',
              header: 'Sign Out',
              message: 'You are about to sign out. Do you want to continue?',
              actions: [
                {
                  type: 'success',
                  text: 'Sign Out',
                  onClick: logout(constants.LOGOUT_SUCCESS),
                },
                { text: 'Cancel' },
              ],
            })
          }>
          <Icon icon="iconLogout" />
          Sign Out
        </a>
      </DashboardHeader>
    )}
  </Fragment>
);

Header.propTypes = {
  displayHeader: PropTypes.bool,
  displayHeaderLinks: PropTypes.bool,
  goTo: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

Header.defaultProps = {
  displayHeader: true,
  displayHeaderLinks: true,
};

const mapStateToProps = state => ({
  displayHeader: state.ui.displayHeader,
  displayHeaderLinks: state.ui.displayHeaderLinks,
});

const mapDispatchToProps = {
  goTo: goToRoute,
  sendMessage: messageOperations.sendMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
