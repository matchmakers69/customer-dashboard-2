import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authOperations, authTypes } from '../../store/auth';

import { DAS_CHANGE_PASSWORD_FAILED } from '../../constants/errors';
import { changePassword } from '../../api/authentication';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { goToRoute } from '../../lib/router';
import { messageOperations } from '../../store/messages';
import { uiOperations } from '../../store/ui';

const { CHANGE_PASSWORD } = authTypes;

export const performChangePassword = function* performChangePassword({
  payload,
}) {
  const { changePasswordSuccess, loginSuccess } = authOperations;
  const { updateUI } = uiOperations;
  const { sendMessage } = messageOperations;

  try {
    const { errors } = yield call(changePassword, payload.fields);
    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    } else {
      const redirectPath = payload.redirectPath || constants.BOOKINGS_URL;
      yield all([
        put(
          updateUI({
            displayHeaderLinks: true,
          }),
        ),
        put(loginSuccess()),
        put(changePasswordSuccess()),
        put(goToRoute(redirectPath)),
        put(
          sendMessage({
            type: 'success',
            displayType: 'toast',
            message: constants.CHANGE_PASSWORD_SUCCESS,
          }),
        ),
      ]);
    }
  } catch (error) {
    // Handle errors with the request itself, produce default error.
    yield put(
      createError({
        code: DAS_CHANGE_PASSWORD_FAILED,
      }),
    );
  }
};

export default takeLatest(CHANGE_PASSWORD, performChangePassword);
