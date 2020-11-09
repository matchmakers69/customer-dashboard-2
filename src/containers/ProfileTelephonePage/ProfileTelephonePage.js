import { Col, Grid } from '@kaboodle-solutions/design-system';

import BackButton from '../../components/BackButton';
import ProfileTelephoneForm from '../../components/ProfileTelephoneForm';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { customerOperations } from '../../store/customer';
import getCustomerTelephone from '../../selectors/customer/getCustomerTelephone';
import { goToRoute } from '../../lib/router';
import styles from './ProfileTelephonePage.styles';
import withStyles from 'react-jss';

const ProfileTelephonePage = ({ classes, telephone, updateCustomer, goTo }) => (
  <div className={classes.pageLayout}>
    <Grid>
      <Col xs={12} sm={6} lg={4}>
        <BackButton onClick={() => goTo(constants.PROFILE_DETAILS_URL)} />
        <ProfileTelephoneForm telephone={telephone} onSubmit={updateCustomer} />
      </Col>
    </Grid>
  </div>
);

ProfileTelephonePage.propTypes = {
  classes: PropTypes.object.isRequired,
  goTo: PropTypes.func.isRequired,
  telephone: PropTypes.string,
  updateCustomer: PropTypes.func.isRequired,
};

ProfileTelephonePage.defaultProps = {
  telephone: null,
};

const mapStateToProps = state => ({
  telephone: state.customer.loaded ? getCustomerTelephone(state) : null,
});

const mapDispatchToProps = {
  updateCustomer: customerOperations.updateCustomer,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfileTelephonePage);
