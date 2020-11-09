import {
  GET_COUNTRIES,
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_SUCCESS,
  GET_GENDERS,
  GET_GENDERS_FAILED,
  GET_GENDERS_SUCCESS,
} from './types';

export const getGenders = () => ({
  type: GET_GENDERS,
});

export const getGendersSuccess = genders => ({
  type: GET_GENDERS_SUCCESS,
  payload: { genders },
});

export const getGendersFailed = error => ({
  type: GET_GENDERS_FAILED,
  payload: { error },
});

export const getCountries = () => ({
  type: GET_COUNTRIES,
});

export const getCountriesSuccess = countries => ({
  type: GET_COUNTRIES_SUCCESS,
  payload: { countries },
});

export const getCountriesFailed = error => ({
  type: GET_COUNTRIES_FAILED,
  payload: { error },
});
