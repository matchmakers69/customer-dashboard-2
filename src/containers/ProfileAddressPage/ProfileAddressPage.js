import { Col, Grid, WrapLoader } from '@kaboodle-solutions/design-system';
import React, { useEffect } from 'react';
import {
  areCountriesLoaded,
  getClientCountriesFormArray,
} from '../../selectors/client';
import {
  getCustomerAddressFormObject,
  isCustomerLoaded,
} from '../../selectors/customer';

import BackButton from '../../components/BackButton';
import ProfileAddressForm from '../../components/ProfileAddressForm';
import PropTypes from 'prop-types';
import { clientOperations } from '../../store/client';
import { connect } from 'react-redux';
import constants from '../../constants';
import { customerOperations } from '../../store/customer';
import { goToRoute } from '../../lib/router';
import noop from 'lodash/noop';

const ProfileAddressPage = ({
  loading,
  getCountries,
  address,
  countries,
  updateCustomer,
  goTo,
}) => {
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="ProfileAddressPage pageLayout">
      <Grid>
        <Col xs={12} sm={12} lg={4}>
          <BackButton
            onClick={() => goTo(constants.PROFILE_DETAILS_ADDRESSES_URL)}
          />
          {loading ? (
            <WrapLoader message="Loading">
              <ProfileAddressForm
                address={address}
                countries={[]}
                onSubmit={noop}
              />
            </WrapLoader>
          ) : (
            <ProfileAddressForm
              address={address}
              countries={countries}
              onSubmit={updateCustomer}
            />
          )}
        </Col>
      </Grid>
    </div>
  );
};

ProfileAddressPage.propTypes = {
  address: PropTypes.shape({
    address_1: PropTypes.string.isRequired,
    address_2: PropTypes.string,
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      code: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
    }).isRequired,
  }).isRequired,
  countries: PropTypes.array.isRequired,
  getCountries: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  updateCustomer: PropTypes.func.isRequired,
};

ProfileAddressPage.defaultProps = {
  loading: true,
};

const mapStateToProps = state => ({
  countries: getClientCountriesFormArray(state),
  address: getCustomerAddressFormObject(state),
  loading: !isCustomerLoaded(state) || !areCountriesLoaded(state),
});

const mapDispatchToProps = {
  getCountries: clientOperations.getCountries,
  updateCustomer: customerOperations.updateCustomer,
  goTo: goToRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileAddressPage);
