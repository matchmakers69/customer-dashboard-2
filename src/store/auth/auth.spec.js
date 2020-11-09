import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  LOGIN,
  LOGIN_CHECK,
  LOGIN_FAILED,
  LOGIN_REVOKE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RESET_PASSWORD,
} from './types';
import {
  changePassword,
  changePasswordSuccess,
  login,
  loginCheck,
  loginFailed,
  loginSuccess,
  logoutSuccess,
  resetPassword,
  revokeAuth,
} from './actions';

import reducer from './reducers';

describe('auth', () => {
  it('Returns initial state when a matching actions is not passed through', () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      authenticated: false,
      loading: false,
      resetEmail: null,
      resetRequired: false,
      timestamp: null,
      error: null,
      apiCheck: false,
    });
  });

  it(`Sets authentication state to TRUE when ${LOGIN_SUCCESS} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: false, loading: false, timestamp: null, error: null },
        loginSuccess(),
      ),
    ).toMatchObject({
      authenticated: true,
      loading: false,
      error: null,
    });
  });

  it(`Sets loading state to TRUE when ${LOGIN} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: false, loading: false, timestamp: null, error: null },
        login({ email: 'test@kaboodle.co.uk', password: 'password123' }),
      ),
    ).toMatchObject({
      authenticated: false,
      loading: true,
      error: null,
    });
  });

  it(`Sets loading state to FALSE when ${LOGIN_SUCCESS} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: false, loading: true, timestamp: null, error: null },
        loginSuccess(),
      ),
    ).toMatchObject({
      loading: false,
    });
  });

  it(`Sets loading state to FALSE when ${LOGIN_FAILED} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: false, loading: true, timestamp: null, error: null },
        loginFailed(),
      ),
    ).toMatchObject({
      loading: false,
    });
  });

  it(`Sets timestamp when ${LOGIN_SUCCESS} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: false, loading: false, timestamp: null, error: null },
        loginSuccess(),
      ).timestamp,
    ).toBeInstanceOf(Date);
  });

  it(`Passes the state when ${LOGIN_CHECK} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: false, loading: false, timestamp: null, error: null },
        loginCheck(),
      ),
    ).toMatchObject({
      authenticated: false,
      loading: false,
      error: null,
    });
  });

  it(`Sets authenticated to FALSE when ${LOGIN_REVOKE} is dispatched`, () => {
    expect(
      reducer(
        { authenticated: true, loading: false, timestamp: null, error: null },
        revokeAuth(),
      ).authenticated,
    ).toEqual(false);
  });

  it(`Resets password reset state when ${CHANGE_PASSWORD_SUCCESS} is dispatched`, () => {
    expect(
      reducer(
        {
          authenticated: false,
          loading: true,
          resetRequired: true,
          resetEmail: 'test@kaboodle.co.uk',
          timestamp: null,
          error: null,
        },
        changePasswordSuccess(),
      ),
    ).toMatchObject({
      resetRequired: false,
      resetEmail: null,
    });
  });

  it(`Produce logout action when ${LOGOUT_SUCCESS} is invoked`, () => {
    expect(logoutSuccess()).toEqual({
      type: LOGOUT_SUCCESS,
    });
  });

  it(`Produce changePassword action when ${CHANGE_PASSWORD} is invoked`, () => {
    const fields = {
      email: 'test@kaboodle.co.uk',
      old_password: 'oldpassword',
      new_password: 'newpassword',
    };

    expect(changePassword(fields)).toEqual({
      type: CHANGE_PASSWORD,
      payload: { fields },
    });
  });

  it(`Produce resetPassword action when ${RESET_PASSWORD} is invoked`, () => {
    const email = 'test@kaboodle.co.uk';

    expect(resetPassword(email)).toEqual({
      type: RESET_PASSWORD,
      payload: { email },
    });
  });
});
