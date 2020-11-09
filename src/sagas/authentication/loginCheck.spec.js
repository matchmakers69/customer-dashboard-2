import { authOperations, authTypes } from '../../store/auth';
import { createError, errorTypes } from '../../store/errors';

import { DAS_AUTHENTICATION_FAILED } from '../../constants/errors';
import { checkLogin } from '../../api/authentication';
import { performLoginCheck } from './loginCheck';
import { testSaga } from 'redux-saga-test-plan';

describe('loginCheck', () => {
  const { loginSuccess, loginFailed } = authOperations;
  const { LOGIN_SUCCESS, LOGIN_FAILED } = authTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${LOGIN_SUCCESS} when API returns successful authentication.`, () => {
    const api = {
      checkLogin: () => ({
        customer: {
          '@id': '123456',
          authenticated: true,
          reset_required: false,
          email: null,
        },
      }),
    };

    testSaga(performLoginCheck)
      .next()
      .call(checkLogin)
      .next(api.checkLogin())
      .put(loginSuccess(false))
      .next()
      .isDone();
  });

  it(`Yields ${LOGIN_FAILED} when API returns failed authentication.`, () => {
    const api = {
      checkLogin: () => ({
        customer: {
          authenticated: false,
        },
      }),
    };

    testSaga(performLoginCheck)
      .next()
      .call(checkLogin)
      .next(api.checkLogin())
      .put(loginFailed())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performLoginCheck)
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_AUTHENTICATION_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
