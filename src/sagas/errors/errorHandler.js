import { call, put, takeLatest } from 'redux-saga/effects';
import { isSentryEnabled, sendMessage } from '../../lib/logging';

import { ERROR_OCCURRED } from '../../store/errors/types';
import { authOperations } from '../../store/auth';
import constants from '../../constants';
import { getErrorMapping } from '../../lib/errors';
import { messageOperations } from '../../store/messages';
import { push } from 'connected-react-router';

export const handleError = function* handleError({ payload }) {
  const { code: errorCode } = payload.error;
  const { errorLogLevels } = constants;

  // Retrieve error mapping. If non existent, default error returned.
  const { redirectPath, revokeAuth, key, severity, message } = getErrorMapping(
    errorCode,
  );

  // Is this an invalid/expired token? We should set authenticated to false if so.
  if (revokeAuth) {
    yield put(authOperations.revokeAuth());
  }

  if (redirectPath) {
    yield put(push(redirectPath));
  }

  if (severity >= errorLogLevels.error && isSentryEnabled()) {
    yield call(sendMessage, key);
  }

  if (message) {
    yield put(
      messageOperations.sendMessage({
        type: 'danger',
        displayType: 'toast',
        message,
      }),
    );
  }
};

export default takeLatest(ERROR_OCCURRED, handleError);
