import { createSelector } from 'reselect';
import getClient from './getClient';

const getClientGenders = createSelector(
  getClient,
  client => client.genders,
);

export default getClientGenders;
