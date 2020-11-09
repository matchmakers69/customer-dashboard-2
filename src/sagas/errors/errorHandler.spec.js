import errorMappings, {
  CUSTOMER_ACCOUNT_NOT_FOUND,
  DAS_CHANGE_PASSWORD_FAILED,
  LOGIN_TOKEN_NOT_SUPPLIED,
} from '../../constants/errors';
import { isSentryEnabled, sendMessage } from '../../lib/logging';

import { authOperations } from '../../store/auth';
import constants from '../../constants';
import { handleError } from './errorHandler';
import { messageOperations } from '../../store/messages';
import { push } from 'connected-react-router';
import { testSaga } from 'redux-saga-test-plan';

jest.mock('../../lib/logging');

describe('errorHandler', () => {
  beforeEach(() => {
    isSentryEnabled.mockImplementation(() => false);
  });

  it('should yield revoke and redirect actions for bad token API errors.', () => {
    const payload = {
      payload: {
        error: {
          code: LOGIN_TOKEN_NOT_SUPPLIED,
        },
      },
    };

    testSaga(handleError, payload)
      .next()
      .put(authOperations.revokeAuth())
      .next()
      .put(push(constants.LOGIN_URL))
      .next()
      .isDone();
  });

  it('should yield new error message', () => {
    const payload = {
      payload: {
        error: {
          code: CUSTOMER_ACCOUNT_NOT_FOUND,
        },
      },
    };

    testSaga(handleError, payload)
      .next()
      .put(
        messageOperations.sendMessage({
          type: 'danger',
          displayType: 'toast',
          // eslint-disable-next-line import/no-named-as-default-member
          message: errorMappings[CUSTOMER_ACCOUNT_NOT_FOUND].message,
        }),
      )
      .next()
      .isDone();
  });
  it('should send a message to Sentry if the error severity exceeds 3 (error & fatal only)', () => {
    isSentryEnabled.mockImplementation(() => true);
    const payload = {
      payload: {
        error: {
          code: DAS_CHANGE_PASSWORD_FAILED,
        },
      },
    };

    testSaga(handleError, payload)
      .next()
      .call(sendMessage, 'DAS_CHANGE_PASSWORD_FAILED')
      .next()
      .put(
        messageOperations.sendMessage({
          type: 'danger',
          displayType: 'toast',
          // eslint-disable-next-line import/no-named-as-default-member
          message: errorMappings[DAS_CHANGE_PASSWORD_FAILED].message,
        }),
      )
      .next()
      .isDone();
  });
});
