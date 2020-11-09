import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { Fragment } from 'react';

import LoginForm from '../../components/LoginForm';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { authOperations } from '../../store/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import styles from './LoginPage.styles';
import { uiOperations } from '../../store/ui';
import withStyles from 'react-jss';

const LoginPage = ({ authenticated, loading, onSubmit, updateUI, classes }) => {
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
            <div className={classes.container}>
              <h1 className={classes.header}>Let&apos;s get you logged in</h1>
              <p>
                Logging in to your Kaboodle account lets you do everything from
                downloading your ticket to treating yourself to a VIP pass. Just
                use the credentials you created during the booking process.
              </p>
              <LoginForm onSubmit={onSubmit} loading={loading} />
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

LoginPage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  updateUI: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  classes: {},
  loading: true,
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = {
  onSubmit: authOperations.login,
  updateUI: uiOperations.updateUI,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(LoginPage);
