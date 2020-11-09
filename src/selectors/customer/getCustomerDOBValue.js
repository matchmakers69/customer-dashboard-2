import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerDOBValue = createSelector(
  getCustomer,
  customer => customer.personal_details.date_of_birth,
);

export default getCustomerDOBValue;
