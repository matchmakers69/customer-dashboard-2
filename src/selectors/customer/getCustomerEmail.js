import { createSelector } from 'reselect';
import getCustomer from './getCustomer';
import isCustomerLoaded from './isCustomerLoaded';

const getCustomerEmail = createSelector(
  getCustomer,
  isCustomerLoaded,
  (customer, loaded) => (loaded ? customer.personal_details.email : null),
);

export default getCustomerEmail;
