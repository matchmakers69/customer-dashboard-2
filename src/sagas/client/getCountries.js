import { all, call, put, takeLatest } from 'redux-saga/effects';
import { clientOperations, clientTypes } from '../../store/client';

import { DAS_GET_COUNTRIES_FAILED } from '../../constants/errors';
import { createError } from '../../store/errors';
import { getCountries } from '../../api/client';

const { GET_COUNTRIES } = clientTypes;

export const performGetCountries = function* performGetCountries() {
  try {
    const { getCountriesSuccess, getCountriesFailed } = clientOperations;
    const { countries, errors } = yield call(getCountries);

    if (countries) {
      yield put(getCountriesSuccess(countries));
    } else {
      yield put(getCountriesFailed());
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    }
  } catch (error) {
    // Handle errors with the request itself
    yield put(
      createError({
        code: DAS_GET_COUNTRIES_FAILED,
      }),
    );
  }
};

export default takeLatest([GET_COUNTRIES], performGetCountries);
