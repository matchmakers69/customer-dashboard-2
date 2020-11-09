import { createSelector } from 'reselect';
import getCustomer from './getCustomer';

export default createSelector(
  state => getCustomer(state),
  customer => {
    if (customer.loaded) {
      const { first_name, last_name } = customer.personal_details;
      return `${first_name} ${last_name}`;
    }
    return '';
  },
);
