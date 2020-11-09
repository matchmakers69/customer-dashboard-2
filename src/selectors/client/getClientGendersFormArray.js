import { createSelector } from 'reselect';
import getClientGenders from './getClientGenders';

const getClientGendersFormArray = createSelector(
  getClientGenders,
  genders => genders.map(gender => ({ label: gender, value: gender })),
);

export default getClientGendersFormArray;
