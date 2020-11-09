import { createSelector } from 'reselect';
import getCustomerGender from './getCustomerGender';

const getCustomerGenderFormObject = createSelector(
  getCustomerGender,
  gender =>
    gender && gender.length > 0 ? { label: gender, value: gender } : null,
);

export default getCustomerGenderFormObject;
