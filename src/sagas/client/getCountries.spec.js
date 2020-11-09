import { clientOperations, clientTypes } from '../../store/client';
import { createError, errorTypes } from '../../store/errors';

import { DAS_GET_COUNTRIES_FAILED } from '../../constants/errors';
import { getCountries } from '../../api/client';
import { performGetCountries } from './getCountries';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('getCountries', () => {
  const { getCountriesSuccess, getCountriesFailed } = clientOperations;
  const { GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILED } = clientTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${GET_COUNTRIES_SUCCESS} when API returns countries.`, () => {
    const api = {
      getCountries: () => ({
        countries: [
          {
            id: 1,
            code: 'AF',
            name: 'Afghanistan',
          },
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      }),
    };

    testSaga(performGetCountries)
      .next()
      .call(getCountries)
      .next(api.getCountries())
      .put(
        getCountriesSuccess([
          {
            id: 1,
            code: 'AF',
            name: 'Afghanistan',
          },
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ]),
      )
      .next()
      .isDone();
  });

  it(`Yields ${GET_COUNTRIES_FAILED} when API does not return countries.`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      getCountries: () => ({
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performGetCountries)
      .next()
      .call(getCountries)
      .next(api.getCountries())
      .put(getCountriesFailed())
      .next()
      .all([
        put(
          createError({
            error_code: 1234567,
            error_message: 'This is an error.',
          }),
        ),
      ])
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performGetCountries)
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_GET_COUNTRIES_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
