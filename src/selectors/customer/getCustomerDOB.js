import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerDOB = createSelector(
  getCustomer,
  customer => {
    const dateOfBirth = customer.personal_details.date_of_birth;
    return dateOfBirth ? new Date(dateOfBirth) : '';
  },
);

export default getCustomerDOB;
