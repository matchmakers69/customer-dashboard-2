import changePasswordSaga from './changePassword';
import loginCheckSaga from './loginCheck';
import loginSaga from './login';
import logoutSaga from './logout';
import resetPasswordSaga from './resetPassword';

export const authenticationSagas = [
  loginSaga,
  loginCheckSaga,
  logoutSaga,
  changePasswordSaga,
  resetPasswordSaga,
];
