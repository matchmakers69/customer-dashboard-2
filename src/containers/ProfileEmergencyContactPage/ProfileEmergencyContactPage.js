import { Col, Grid } from '@kaboodle-solutions/design-system';
import {
  getCustomerEmergencyName,
  getCustomerEmergencyTelephone,
} from '../../selectors/customer';

import BackButton from '../../components/BackButton';
import ProfileEmergencyDetailsForm from '../../components/ProfileEmergencyDetailsForm';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { customerOperations } from '../../store/customer';
import { goToRoute } from '../../lib/router';
import styles from './ProfileEmergencyContactPage.styles';
import withStyles from 'react-jss';

const ProfileEmergencyContactPage = ({
  classes,
  fullName,
  telephone,
  updateCustomer,
  goTo,
}) => (
  <div className={classes.pageLayout}>
    <Grid>
      <Col xs={12} sm={6} lg={4}>
        <BackButton onClick={() => goTo(constants.PROFILE_DETAILS_URL)} />
        <ProfileEmergencyDetailsForm
          fullName={fullName}
          telephone={telephone}
          onSubmit={updateCustomer}
        />
      </Col>
    </Grid>
  </div>
);

ProfileEmergencyContactPage.propTypes = {
  classes: PropTypes.object.isRequired,
  fullName: PropTypes.string,
  goTo: PropTypes.func.isRequired,
  telephone: PropTypes.string,
  updateCustomer: PropTypes.func.isRequired,
};

ProfileEmergencyContactPage.defaultProps = {
  fullName: null,
  telephone: null,
};

const mapStateToProps = state => ({
  telephone: state.customer.loaded ? getCustomerEmergencyTelephone(state) : '',
  fullName: state.customer.loaded ? getCustomerEmergencyName(state) : '',
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
)(ProfileEmergencyContactPage);
