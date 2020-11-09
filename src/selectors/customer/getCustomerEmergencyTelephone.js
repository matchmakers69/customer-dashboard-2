import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

const getCustomerEmergencyTelephone = createSelector(
  getCustomer,
  customer => customer.personal_details.emergency_contact.telephone,
);

export default getCustomerEmergencyTelephone;
