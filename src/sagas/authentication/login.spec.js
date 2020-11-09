import { authOperations, authTypes } from '../../store/auth';
import { createError, errorTypes } from '../../store/errors';

import { DAS_LOGIN_FAILED } from '../../constants/errors';
import { attemptLogin } from '../../api/authentication';
import { performLogin } from './login';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('login', () => {
  const { loginSuccess, loginFailed } = authOperations;
  const { LOGIN_SUCCESS, LOGIN_FAILED } = authTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${LOGIN_SUCCESS} when API returns successful authentication.`, () => {
    const api = {
      login: () => ({
        customer: {
          '@id': '123456',
          authenticated: true,
        },
      }),
    };

    const action = {
      payload: { email: 'test@kaboodle.co.uk', password: 'test123' },
    };

    testSaga(performLogin, action)
      .next()
      .call(attemptLogin, 'test@kaboodle.co.uk', 'test123')
      .next(api.login())
      .put(loginSuccess(false, 'test@kaboodle.co.uk'))
      .next()
      .isDone();
  });

  it(`Sets resetPassword TRUE when password reset returned by WS`, () => {
    const api = {
      login: () => ({
        customer: {
          '@id': '123456',
          authenticated: true,
        },
        errors: [{ code: 15000060, message: 'Password reset required' }],
      }),
    };

    const action = {
      payload: { email: 'test@kaboodle.co.uk', password: 'test123' },
    };

    testSaga(performLogin, action)
      .next()
      .call(attemptLogin, 'test@kaboodle.co.uk', 'test123')
      .next(api.login())
      .put(loginSuccess(true, 'test@kaboodle.co.uk'))
      .next()
      .isDone();
  });

  it(`Yields ${LOGIN_FAILED} when API returns failed authentication.`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      login: () => ({
        customer: {
          authenticated: false,
        },
        errors: [{ code: 15000050, message: 'Password incorrect' }],
      }),
    };

    const action = {
      payload: { email: 'test@kaboodle.co.uk', password: 'test123' },
    };

    testSaga(performLogin, action)
      .next()
      .call(attemptLogin, 'test@kaboodle.co.uk', 'test123')
      .next(api.login())
      .put(loginFailed())
      .next()
      .all([
        put(createError({ code: 15000050, message: 'Password incorrect' })),
      ])
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const action = {
      payload: { email: 'test@kaboodle.co.uk', password: 'test123' },
    };

    testSaga(performLogin, action)
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_LOGIN_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
