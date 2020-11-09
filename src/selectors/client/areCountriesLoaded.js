import { createSelector } from 'reselect';
import getClient from './getClient';

const areCountriesLoaded = createSelector(
  state => getClient(state),
  client => client.countries.length !== 0,
);

export default areCountriesLoaded;
