import { bookingOperations, bookingTypes } from '../../store/booking';
import { createError, errorTypes } from '../../store/errors';
import { goToRoute, withParams } from '../../lib/router';

import { DAS_UPDATE_BOOKING_DELIVERY_FAILED } from '../../constants/errors';
import constants from '../../constants';
import { messageOperations } from '../../store/messages';
import { performUpdateDelivery } from './updateDelivery';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { updateBookingDelivery } from '../../api/booking';

describe('UpdateDelivery', () => {
  const { getBooking } = bookingOperations;
  const { GET_BOOKING_SUCCESS, GET_BOOKING } = bookingTypes;
  const { ERROR_OCCURRED } = errorTypes;
  const { sendMessage } = messageOperations;

  const api = {
    updateDeliverySuccess: () => ({
      success: true,
    }),

    updateDeliveryFailed: () => ({
      errors: [
        {
          error_code: 1234567,
          error_message: 'This is an error.',
        },
      ],
    }),
  };

  const payload = {
    booking_ref: 'PW12345',
    allocation_id: '12345',
    fields: {
      address: {
        address_1: 'Address Line 1',
        address_2: 'Address Line 2',
        address_3: 'Address Line 3',
        city: 'City',
        postcode: 'Postcode',
        county: 'County',
        country_id: '123',
      },
    },
  };

  it(`Yields ${GET_BOOKING}, redirects and creates message when API returns success`, () => {
    testSaga(performUpdateDelivery, { payload })
      .next()
      .call(
        updateBookingDelivery,
        payload.booking_ref,
        payload.allocation_id,
        payload.fields,
      )
      .next(api.updateDeliverySuccess())
      .put(getBooking(payload.booking_ref))
      .next()
      .take(GET_BOOKING_SUCCESS)
      .next()
      .put(
        goToRoute(
          withParams(constants.BOOKING_URL, {
            booking_reference: payload.booking_ref,
          }),
        ),
      )
      .next()
      .put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.UPDATE_BOOKING_DELIVERY_SUCCESS,
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns errors`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performUpdateDelivery, { payload })
      .next()
      .call(
        updateBookingDelivery,
        payload.booking_ref,
        payload.allocation_id,
        payload.fields,
      )
      .next(api.updateDeliveryFailed())
      .all([
        put(
          createError({
            error_code: 1234567,
            error_message: 'This is an error.',
          }),
        ),
      ])
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performUpdateDelivery, { payload })
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_UPDATE_BOOKING_DELIVERY_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
