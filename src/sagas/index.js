import { all } from 'redux-saga/effects';
import { authenticationSagas } from './authentication';
import { bookingSagas } from './booking';
import { bookingsSagas } from './bookings';
import { clientSagas } from './client';
import { customerSagas } from './customer';
import { errorSagas } from './errors';
import { paymentSagas } from './payments';
/**
 * Return all sagas to be used as middleware
 */
export default function* sagas() {
  yield all([
    ...authenticationSagas,
    ...bookingsSagas,
    ...bookingSagas,
    ...customerSagas,
    ...clientSagas,
    ...errorSagas,
    ...paymentSagas,
  ]);
}
