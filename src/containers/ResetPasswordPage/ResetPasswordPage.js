import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { authOperations } from '../../store/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import styles from './ResetPasswordPage.styles';
import { uiOperations } from '../../store/ui';
import withStyles from 'react-jss';

const ResetPasswordPage = ({ authenticated, onSubmit, updateUI, classes }) => {
  const { BOOKINGS_URL } = constants;
  updateUI({
    displayHeader: false,
    displayFooter: false,
  });
  return authenticated ? (
    <Redirect to={BOOKINGS_URL} />
  ) : (
    <Fragment>
      <div className={classes.page}>
        <Grid>
          <Col lg={6}>
            <div className={classes.logo} />
          </Col>
        </Grid>
        <Grid>
          <Col lg={6}>
            <div className={classes.container}>
              <h1 className={classes.header}>Reset your password</h1>
              <p>
                If you’ve forgotten your password, enter your email below and
                we’ll send you a temporary password.
              </p>
              <ResetPasswordForm onSubmit={onSubmit} />
            </div>
          </Col>
        </Grid>
      </div>
      <div className={classes.bg}>
        <div className={classes.slice} />
      </div>
    </Fragment>
  );
};

ResetPasswordPage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  updateUI: PropTypes.func.isRequired,
};

ResetPasswordPage.defaultProps = {
  classes: {},
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = {
  onSubmit: authOperations.resetPassword,
  updateUI: uiOperations.updateUI,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ResetPasswordPage);
