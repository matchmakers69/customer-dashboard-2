import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerEmergencyName = createSelector(
  getCustomer,
  customer => customer.personal_details.emergency_contact.full_name,
);

export default getCustomerEmergencyName;
