import { createSelector } from 'reselect';
import getClient from './getClient';

const getClientCountries = createSelector(
  state => getClient(state),
  client => client.countries,
);

export default getClientCountries;
