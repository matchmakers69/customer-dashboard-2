import { Col, Grid } from '@kaboodle-solutions/design-system';

import ChangePasswordForm from '../../components/ChangePasswordForm';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { authOperations } from '../../store/auth';
import { connect } from 'react-redux';
import constants from '../../constants';
import { getCurrentPath } from '../../selectors/router';
import { getResetEmail } from '../../selectors/auth';
import { uiOperations } from '../../store/ui';

const { CHANGE_PASSWORD_URL, BOOKINGS_URL } = constants;

const ChangePasswordPage = ({
  changePassword,
  updateUI,
  resetRequired,
  email,
  currentPath,
  logout,
}) => {
  updateUI({
    displayHeaderLinks: !resetRequired,
  });

  // If on reset page and reset isn't required, return to bookings.
  if (currentPath === CHANGE_PASSWORD_URL && !resetRequired) {
    return <Redirect to={BOOKINGS_URL} />;
  }

  // If on reset page and reset email not provided, return to login.
  if (currentPath === CHANGE_PASSWORD_URL && email === null) {
    logout();
  }

  return (
    <div className="ProfileUpdatePage pageLayout">
      <Grid>
        <Col xs={12} sm={9} lg={4}>
          <ChangePasswordForm email={email} onSubmit={changePassword} />
        </Col>
        <Col />
      </Grid>
    </div>
  );
};

ChangePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  email: PropTypes.string,
  logout: PropTypes.func.isRequired,
  resetRequired: PropTypes.bool.isRequired,
  updateUI: PropTypes.func.isRequired,
};

ChangePasswordPage.defaultProps = {
  email: null,
};

const mapStateToProps = state => ({
  resetRequired: state.auth.resetRequired,
  email: getResetEmail(state),
  currentPath: getCurrentPath(state),
});

const mapDispatchToProps = {
  changePassword: params =>
    authOperations.changePassword(params, constants.BOOKINGS_URL),
  updateUI: uiOperations.updateUI,
  logout: authOperations.logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordPage);
