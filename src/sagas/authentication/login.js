import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authOperations, authTypes } from '../../store/auth';

import { DAS_LOGIN_FAILED } from '../../constants/errors';
import { attemptLogin } from '../../api/authentication';
import { createError } from '../../store/errors';

const { LOGIN } = authTypes;
const { loginFailed, loginSuccess } = authOperations;

export const performLogin = function* performLogin(action) {
  try {
    const { email, password } = action.payload;
    const { customer, errors } = yield call(attemptLogin, email, password);

    if (customer.authenticated) {
      // If reset is required, set value in auth store so we can redirect based on this bool's value.
      const resetRequired = errors
        ? errors.some(error => error.code === 15000060)
        : false;
      yield put(loginSuccess(resetRequired, email));
    } else {
      // Sets loading state to false.
      yield put(loginFailed());

      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    }
  } catch (error) {
    // Handle errors with the request itself.
    yield put(
      createError({
        code: DAS_LOGIN_FAILED,
      }),
    );
  }
};

export default takeLatest(LOGIN, performLogin);
