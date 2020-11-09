import { createSelector } from 'reselect';
import getClientCountries from './getClientCountries';

const getClientCountriesFormArray = createSelector(
  state => getClientCountries(state),
  countries =>
    countries.map(country => ({
      label: country.name,
      value: country.id,
      code: country.code,
    })),
);

export default getClientCountriesFormArray;
