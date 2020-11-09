import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  LOGIN,
  LOGIN_CHECK,
  LOGIN_FAILED,
  LOGIN_REVOKE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  RESET_PASSWORD,
} from './types';

export const login = (email, password) => ({
  type: LOGIN,
  payload: { email, password },
});

export const loginSuccess = (resetRequired = false, email = null) => ({
  type: LOGIN_SUCCESS,
  resetRequired,
  email,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  error,
});

export const loginCheck = () => ({
  type: LOGIN_CHECK,
});

export const revokeAuth = () => ({
  type: LOGIN_REVOKE,
});

export const logout = message => ({
  type: LOGOUT,
  payload: { message },
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const changePassword = (fields, redirectPath) => ({
  type: CHANGE_PASSWORD,
  payload: { fields, redirectPath },
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const resetPassword = email => ({
  type: RESET_PASSWORD,
  payload: { email },
});
