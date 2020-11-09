import { all, call, put, takeLatest } from 'redux-saga/effects';

import { DAS_RESET_PASSWORD_FAILED } from '../../constants/errors';
import { authTypes } from '../../store/auth';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { goToRoute } from '../../lib/router';
import { messageOperations } from '../../store/messages';
import { resetPassword } from '../../api/authentication';

const { RESET_PASSWORD } = authTypes;

export const performChangePassword = function* performChangePassword({
  payload,
}) {
  const { sendMessage } = messageOperations;

  try {
    const data = yield call(resetPassword, payload);
    const { errors } = data;
    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    } else {
      yield all([
        put(goToRoute(constants.LOGIN_URL)),
        put(
          sendMessage({
            type: 'success',
            displayType: 'toast',
            message: constants.RESET_PASSWORD_SUCCESS,
          }),
        ),
      ]);
    }
  } catch (error) {
    // Handle errors with the request itself, produce default error.
    yield put(
      createError({
        code: DAS_RESET_PASSWORD_FAILED,
      }),
    );
  }
};

export default takeLatest(RESET_PASSWORD, performChangePassword);
