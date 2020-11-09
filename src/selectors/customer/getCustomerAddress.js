import { createSelector } from 'reselect';
import { getClientCountries } from '../client';
import getCustomer from './getCustomer';

const getCustomerAddress = createSelector(
  state => getClientCountries(state),
  state => getCustomer(state),
  (countries, customer) => {
    if (!customer.loaded) {
      return {
        id: '',
        address_1: '',
        address_2: '',
        address_3: '',
        city: '',
        postcode: '',
        county: '',
        country: {
          id: -1,
          name: '',
          code: '',
        },
      };
    }

    const {
      id,
      address_1,
      address_2,
      address_3,
      city,
      postcode,
      county,
    } = customer.address;

    const countryByCode =
      countries.find(
        country => country.code === customer.address.country.code,
      ) || customer.address.country;

    return {
      id,
      address_1,
      address_2,
      address_3,
      city,
      postcode,
      county,
      country: countryByCode,
    };
  },
);

export default getCustomerAddress;
