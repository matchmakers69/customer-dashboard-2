import { clientOperations, clientTypes } from '../../store/client';
import { createError, errorTypes } from '../../store/errors';

import { DAS_GET_GENDERS_FAILED } from '../../constants/errors';
import { getGenders } from '../../api/client';
import { performGetGenders } from './getGenders';
import { testSaga } from 'redux-saga-test-plan';

describe('getGenders', () => {
  const { getGendersSuccess, getGendersFailed } = clientOperations;
  const { GET_GENDERS_SUCCESS, GET_GENDERS_FAILED } = clientTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${GET_GENDERS_SUCCESS} when API returns genders.`, () => {
    const api = {
      getGenders: () => ({
        genders: ['Male', 'Female', 'Other', 'Prefer not to say', 'Non-Binary'],
      }),
    };

    testSaga(performGetGenders)
      .next()
      .call(getGenders)
      .next(api.getGenders())
      .put(
        getGendersSuccess([
          'Male',
          'Female',
          'Other',
          'Prefer not to say',
          'Non-Binary',
        ]),
      )
      .next()
      .isDone();
  });

  it(`Yields ${GET_GENDERS_FAILED} when API does not return genders.`, () => {
    const api = {
      getGenders: () => ({
        errors: [],
      }),
    };

    testSaga(performGetGenders)
      .next()
      .call(getGenders)
      .next(api.getGenders())
      .put(getGendersFailed())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performGetGenders)
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_GET_GENDERS_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
