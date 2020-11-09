import { all, call, put, takeLatest } from 'redux-saga/effects';

import { DAS_LOGOUT_FAILED } from '../../constants/errors';
import { LOGOUT } from '../../store/auth/types';
import { attemptLogout } from '../../api/authentication';
import { authOperations } from '../../store/auth';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { goToRoute } from '../../lib/router';
import { messageOperations } from '../../store/messages';

export const performLogout = function* performLogout({ payload }) {
  try {
    yield call(attemptLogout);

    const { sendMessage } = messageOperations;

    yield all([
      put(authOperations.logoutSuccess()),
      put(goToRoute(constants.LOGIN_URL)),
    ]);

    if (payload.message) {
      yield put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: payload.message,
        }),
      );
    }
  } catch (error) {
    // Handle errors with the request itself, produce default error.
    yield put(
      createError({
        code: DAS_LOGOUT_FAILED,
      }),
    );
  }
};

export default takeLatest(LOGOUT, performLogout);
