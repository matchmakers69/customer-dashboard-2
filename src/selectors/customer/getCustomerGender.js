import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerGender = createSelector(
  getCustomer,
  customer => customer.personal_details.gender,
);

export default getCustomerGender;
