import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerType = createSelector(
  getCustomer,
  customer => customer.type,
);

export default getCustomerType;
