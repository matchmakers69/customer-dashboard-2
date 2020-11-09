import { createSelector } from 'reselect';
import getCustomerAddress from './getCustomerAddress';

const getCustomerAddressFormObject = createSelector(
  state => getCustomerAddress(state),
  address => ({
    ...address,
    country: {
      label: address.country.name,
      value: address.country.id,
      code: address.country.code,
    },
  }),
);

export default getCustomerAddressFormObject;
