import { Col, Grid } from '@kaboodle-solutions/design-system';
import { getCustomerEmail, isCustomerLoaded } from '../../selectors/customer';

import BackButton from '../../components/BackButton';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import PropTypes from 'prop-types';
import React from 'react';
import { authOperations } from '../../store/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import styles from './ProfilePasswordPage.styles';
import withStyles from 'react-jss';

const ProfilePasswordPage = ({
  classes,
  email,
  customerLoaded,
  changePassword,
  goTo,
}) => (
  <div className={classes.pageLayout}>
    <Grid>
      <Col xs={12} sm={6} lg={4}>
        <BackButton onClick={() => goTo(constants.PROFILE_DETAILS_URL)} />
        {customerLoaded ? (
          <ChangePasswordForm
            email={email}
            onSubmit={changePassword}
            redirectPath={constants.PROFILE_DETAILS_URL}
          />
        ) : (
          'Loading'
        )}
      </Col>
      <Col />
    </Grid>
  </div>
);

ProfilePasswordPage.propTypes = {
  changePassword: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  customerLoaded: PropTypes.bool.isRequired,
  email: PropTypes.string,
  goTo: PropTypes.func.isRequired,
};

ProfilePasswordPage.defaultProps = {
  email: null,
};

const mapStateToProps = state => ({
  email: getCustomerEmail(state),
  customerLoaded: isCustomerLoaded(state),
});

const mapDispatchToProps = {
  changePassword: params =>
    authOperations.changePassword(params, constants.PROFILE_DETAILS_URL),
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfilePasswordPage);
