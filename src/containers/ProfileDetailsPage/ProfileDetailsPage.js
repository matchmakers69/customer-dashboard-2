import { Col, Grid } from '@kaboodle-solutions/design-system';

import BackButton from '../../components/BackButton';
import ProfileDetailsList from '../../components/ProfileDetailsList';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import { getCustomerDetailsArray } from '../../selectors/customer';
import { goToRoute } from '../../lib/router';

const ProfileDetailsPage = ({ customerDetails, goTo }) => (
  <div className="ProfileDetailsPage pageLayout">
    <Grid>
      <Col xs={12} sm={12} lg={9}>
        <BackButton onClick={() => goTo(constants.PROFILE_URL)} />

        {customerDetails.personal_details && (
          <div className="ProfilePersonalDetails">
            <h1 className="PageHeader">Personal Details</h1>
            <ProfileDetailsList details={customerDetails.personal_details} />
          </div>
        )}

        {customerDetails.emergency_contact_details && (
          <div className="ProfileEmergencyContactDetails">
            <h1 className="PageHeader">Emergency Contact Details</h1>
            <ProfileDetailsList
              details={customerDetails.emergency_contact_details}
            />
          </div>
        )}
      </Col>
    </Grid>
  </div>
);

ProfileDetailsPage.propTypes = {
  customerDetails: PropTypes.shape({
    emergency_contact_details: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        type: PropTypes.string,
        link: PropTypes.string,
      }),
    ),
    passport_details: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        type: PropTypes.string,
        link: PropTypes.string,
      }),
    ),
    personal_details: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        type: PropTypes.string,
        link: PropTypes.string,
      }),
    ),
  }),
  goTo: PropTypes.func.isRequired,
};

ProfileDetailsPage.defaultProps = {
  customerDetails: {},
};

const mapStateToProps = state => ({
  customerDetails: state.customer.loaded ? getCustomerDetailsArray(state) : {},
});

const mapDispatchToProps = {
  goTo: goToRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailsPage);
