import { all, call, put, takeLatest } from 'redux-saga/effects';
import { bookingsOperations, bookingsTypes } from '../../store/bookings';

import { DAS_GET_BOOKINGS_FAILED } from '../../constants/errors';
import { createError } from '../../store/errors';
import { getBookings } from '../../api/bookings';

const { GET_BOOKINGS } = bookingsTypes;

export const performGetBookings = function* performGetBookings() {
  const { getBookingsSuccess, getBookingsFailed } = bookingsOperations;

  try {
    const data = yield call(getBookings);
    const { past, upcoming, errors } = data;

    if (errors) {
      yield put(getBookingsFailed());
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    } else {
      const bookings = { past, upcoming };
      yield put(getBookingsSuccess(bookings));
    }
  } catch (error) {
    // Handle errors with the request itself
    yield put(
      createError({
        code: DAS_GET_BOOKINGS_FAILED,
      }),
    );
  }
};

export default takeLatest(GET_BOOKINGS, performGetBookings);
