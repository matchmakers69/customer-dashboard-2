import { RESALABLE, RESALE_ENABLED } from '../../constants';
import { addResale, removeResale } from '../../api/booking';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { bookingOperations, bookingTypes } from '../../store/booking';

import { DAS_UPDATE_BOOKING_RESALE_FAILED } from '../../constants/errors';
import { createError } from '../../store/errors';

const { UPDATE_BOOKING_RESALE, GET_BOOKING_SUCCESS } = bookingTypes;

export const performUpdateResale = function* performUpdateResale({ payload }) {
  const {
    getBooking,
    updateBookingResaleSuccess,
    updateBookingResaleFailed,
  } = bookingOperations;
  const { booking_ref, tickets } = payload;

  try {
    // Group tickets by status, returning only their IDs.
    const ticketsResale = tickets
      .filter(ticket => ticket.status === RESALE_ENABLED)
      .map(ticket => ticket.id);
    const ticketsResalable = tickets
      .filter(ticket => ticket.status === RESALABLE)
      .map(ticket => ticket.id);

    let requests = [];

    // If there are items for resale, make the request to update them.
    if (ticketsResale.length > 0) {
      requests = [call(addResale, booking_ref, { tickets: ticketsResale })];
    }

    // If there are items to remove from resale, make the request to remove them.
    if (ticketsResalable.length > 0) {
      requests = [
        ...requests,
        ...ticketsResalable.map(id => call(removeResale, booking_ref, id)),
      ];
    }

    // Make the requests.
    const responses = yield all(requests);

    const responseErrors = responses
      // Flatten the errors into a single array.
      .flatMap(response => response.errors || [])
      // Only use the first occurrence of each error code.
      .filter(
        (error, index, errors) =>
          errors.findIndex(
            otherError => otherError.error_code === error.error_code,
          ) === index,
      );

    if (responseErrors.length > 0) {
      yield put(updateBookingResaleFailed());

      // Handle web service errors.
      yield all(responseErrors.map(error => put(createError(error))));
    } else {
      // Retrieve the booking, and trigger an interface update.
      yield put(getBooking(payload.booking_ref));
      yield take(GET_BOOKING_SUCCESS);
      yield put(updateBookingResaleSuccess());
    }
  } catch (error) {
    yield put(updateBookingResaleFailed());
    yield put(
      createError({
        code: DAS_UPDATE_BOOKING_RESALE_FAILED,
      }),
    );
  }
};

export default takeLatest(UPDATE_BOOKING_RESALE, performUpdateResale);
