import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerLastName = createSelector(
  getCustomer,
  customer => customer.personal_details.last_name,
);

export default getCustomerLastName;
