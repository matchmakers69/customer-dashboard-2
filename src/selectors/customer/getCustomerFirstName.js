import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerFirstName = createSelector(
  getCustomer,
  customer => customer.personal_details.first_name,
);

export default getCustomerFirstName;
