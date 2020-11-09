import { Col, Grid } from '@kaboodle-solutions/design-system';

import BackButton from '../../components/BackButton';
import ProfileAddressesList from '../../components/ProfileAddressesList';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import getCustomerAddress from '../../selectors/customer/getCustomerAddress';
import { goToRoute } from '../../lib/router';

const ProfileAddressesPage = ({ address, goTo }) => (
  <div className="ProfileAddressesPage pageLayout">
    <Grid>
      <Col xs={12} sm={12} lg={9}>
        <BackButton onClick={() => goTo(constants.PROFILE_URL)} />

        {address && (
          <div className="ProfileAddresses">
            <h2 className="PageHeader">Address Book</h2>
            <ProfileAddressesList address={address} goTo={goTo} />
          </div>
        )}
      </Col>
    </Grid>
  </div>
);

ProfileAddressesPage.propTypes = {
  address: PropTypes.shape({
    address_1: PropTypes.string.isRequired,
    address_2: PropTypes.string,
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  goTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  address: getCustomerAddress(state),
});

const mapDispatchToProps = {
  goTo: goToRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileAddressesPage);
