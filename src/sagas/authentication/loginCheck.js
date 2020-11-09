import { authOperations, authTypes } from '../../store/auth';
import { call, put, takeLatest } from 'redux-saga/effects';

import { DAS_AUTHENTICATION_FAILED } from '../../constants/errors';
import { checkLogin } from '../../api/authentication';
import { createError } from '../../store/errors';

const { LOGIN_CHECK } = authTypes;
const { loginSuccess, loginFailed } = authOperations;

export const performLoginCheck = function* performLoginCheck() {
  try {
    const {
      customer: { authenticated, reset_required },
    } = yield call(checkLogin);

    if (authenticated) {
      yield put(loginSuccess(reset_required));
    } else {
      yield put(loginFailed());
    }
  } catch (error) {
    yield put(
      // Handle errors with the request itself.
      createError({
        code: DAS_AUTHENTICATION_FAILED,
      }),
    );
  }
};

export default takeLatest(LOGIN_CHECK, performLoginCheck);
