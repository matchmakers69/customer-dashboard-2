import getCountriesSaga from './getCountries';
import getGendersSaga from './getGenders';

/**
 * Client sagas
 */
export const clientSagas = [getGendersSaga, getCountriesSaga];
