import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const isCustomerLoaded = createSelector(
  getCustomer,
  customer => customer.loaded,
);

export default isCustomerLoaded;
