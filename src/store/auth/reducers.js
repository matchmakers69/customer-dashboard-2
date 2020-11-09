import {
  CHANGE_PASSWORD_SUCCESS,
  LOGIN,
  LOGIN_CHECK,
  LOGIN_FAILED,
  LOGIN_REVOKE,
  LOGIN_SUCCESS,
} from './types';

const initialState = {
  authenticated: false,
  loading: false,
  timestamp: null,
  apiCheck: false,
  resetRequired: false,
  resetEmail: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        resetRequired: action.resetRequired,
        resetEmail: action.email,
        timestamp: new Date(),
        apiCheck: true,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        apiCheck: true,
        loading: false,
        error: action.error,
      };
    case LOGIN_REVOKE:
      return {
        ...state,
        authenticated: false,
      };
    case LOGIN_CHECK:
      return {
        ...state,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        resetRequired: false,
        resetEmail: null,
      };
    default:
      return state;
  }
};

export default authReducer;
