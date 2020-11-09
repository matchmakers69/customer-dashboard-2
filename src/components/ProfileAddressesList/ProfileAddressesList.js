import { Button } from '@kaboodle-solutions/design-system';
import DetailsList from '../DetailsList';
import DetailsListAddressField from '../DetailsListAddressField';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants';

const ProfileAddressesList = ({ address, goTo }) => (
  <DetailsList>
    <DetailsListAddressField title="Address" value={address}>
      <Button onClick={() => goTo(constants.PROFILE_DETAILS_ADDRESS_URL)}>
        Update
      </Button>
    </DetailsListAddressField>
  </DetailsList>
);

ProfileAddressesList.propTypes = {
  address: PropTypes.shape({
    address_1: PropTypes.string.isRequired,
    address_2: PropTypes.string,
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  goTo: PropTypes.func.isRequired,
};

export default ProfileAddressesList;
