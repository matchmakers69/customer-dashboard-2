import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { bookingOperations, bookingTypes } from '../../store/booking';
import { goToRoute, withParams } from '../../lib/router';

import { DAS_UPDATE_BOOKING_DELIVERY_FAILED } from '../../constants/errors';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { messageOperations } from '../../store/messages';
import { updateBookingDelivery } from '../../api/booking';

const { UPDATE_BOOKING_DELIVERY, GET_BOOKING_SUCCESS } = bookingTypes;

export const performUpdateDelivery = function* performUpdateDelivery({
  payload,
}) {
  const { sendMessage } = messageOperations;
  const { getBooking } = bookingOperations;
  try {
    const data = yield call(
      updateBookingDelivery,
      payload.booking_ref,
      payload.allocation_id,
      payload.fields,
    );
    const { errors } = data;
    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
    } else {
      yield put(getBooking(payload.booking_ref));
      yield take(GET_BOOKING_SUCCESS);
      yield put(
        goToRoute(
          withParams(constants.BOOKING_URL, {
            booking_reference: payload.booking_ref,
          }),
        ),
      );
      yield put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.UPDATE_BOOKING_DELIVERY_SUCCESS,
        }),
      );
    }
  } catch (error) {
    // Handle errors with the request itself, produce default error.
    yield put(
      createError({
        code: DAS_UPDATE_BOOKING_DELIVERY_FAILED,
      }),
    );
  }
};

export default takeLatest(UPDATE_BOOKING_DELIVERY, performUpdateDelivery);
