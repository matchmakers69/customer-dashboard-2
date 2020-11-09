import {
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_SUCCESS,
  GET_GENDERS_FAILED,
  GET_GENDERS_SUCCESS,
} from './types';
import {
  getCountriesFailed,
  getCountriesSuccess,
  getGendersFailed,
  getGendersSuccess,
} from './actions';

import reducer from './reducers';

describe('client', () => {
  it('Returns initial state when a matching actions is not passed through', () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      error: null,
      genders: [],
      countries: [],
    });
  });

  it(`Sets genders when ${GET_GENDERS_SUCCESS} is dispatched`, () => {
    const genders = { genders: ['Male', 'Female', 'Prefer not to say'] };

    expect(
      reducer({ error: null, genders: [] }, getGendersSuccess(genders)),
    ).toEqual({
      error: null,
      genders,
    });
  });

  it(`Sets error when ${GET_GENDERS_FAILED} is dispatched`, () => {
    const error = 'This is a fake error.';

    expect(reducer({ error: null }, getGendersFailed(error))).toEqual({
      error,
    });
  });

  it(`Sets countries when ${GET_COUNTRIES_SUCCESS} is dispatched`, () => {
    const countries = { countries: [{ id: 4, code: 'DZ', name: 'Algeria' }] };

    expect(
      reducer({ error: null, countries: [] }, getCountriesSuccess(countries)),
    ).toEqual({
      error: null,
      countries,
    });
  });

  it(`Sets error when ${GET_COUNTRIES_FAILED} is dispatched`, () => {
    const error = 'This is a fake error.';

    expect(reducer({ error: null }, getCountriesFailed(error))).toEqual({
      error,
    });
  });
});
