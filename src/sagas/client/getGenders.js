import { call, put, takeLatest } from 'redux-saga/effects';
import { clientOperations, clientTypes } from '../../store/client';

import { DAS_GET_GENDERS_FAILED } from '../../constants/errors';
import { createError } from '../../store/errors';
import { getGenders } from '../../api/client';

const { GET_GENDERS } = clientTypes;

export const performGetGenders = function* performGetGenders() {
  try {
    const { getGendersSuccess, getGendersFailed } = clientOperations;
    const { genders } = yield call(getGenders);

    if (genders) {
      yield put(getGendersSuccess(genders));
    } else {
      yield put(getGendersFailed());
    }
  } catch (error) {
    // Handle errors with the request itself
    yield put(
      createError({
        code: DAS_GET_GENDERS_FAILED,
      }),
    );
  }
};

export default takeLatest([GET_GENDERS], performGetGenders);
