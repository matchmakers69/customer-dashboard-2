import { all, call, put, takeLatest } from 'redux-saga/effects';
import { bookingOperations, bookingTypes } from '../../store/booking';

import { DAS_GET_BOOKING_FAILED } from '../../constants/errors';
import { createError } from '../../store/errors';
import { getBooking } from '../../api/booking';

const { GET_BOOKING } = bookingTypes;

export const performGetBooking = function* performGetBooking({ payload }) {
  const { getBookingSuccess } = bookingOperations;

  try {
    const { booking, errors } = yield call(getBooking, payload.booking_ref);

    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    } else {
      yield put(getBookingSuccess(booking));
    }
  } catch (error) {
    yield put(
      createError({
        code: DAS_GET_BOOKING_FAILED,
      }),
    );
  }
};

export default takeLatest(GET_BOOKING, performGetBooking);
