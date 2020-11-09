import { bookingOperations, bookingTypes } from '../../store/booking';
import { createError, errorTypes } from '../../store/errors';

import { DAS_GET_BOOKING_FAILED } from '../../constants/errors';
import { getBooking } from '../../api/booking';
import { performGetBooking } from './getBooking';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('getBooking', () => {
  const { getBookingSuccess } = bookingOperations;
  const { GET_BOOKING_SUCCESS } = bookingTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${GET_BOOKING_SUCCESS} when API returns booking.`, () => {
    const api = {
      getBooking: () => ({
        booking: {
          reference: 'PW3128653',
          id: '3128653',
          group_size: 4,
          booking_printed: '0',
          family_booking: true,
          created_date: {
            iso_value: '2019-06-04 20:27:26',
            isotz_value: '2019-06-04T20:27:26+01:00',
          },
          completed_date: {
            iso_value: '2019-06-04 20:34:06',
            isotz_value: '2019-06-04T20:34:06+01:00',
          },
          departure_date: {
            iso_value: '2019-11-07 00:00:00',
            isotz_value: '2019-11-07T00:00:00+00:00',
          },
        },
      }),
    };

    testSaga(performGetBooking, { payload: { booking_ref: 'PW3128653' } })
      .next()
      .call(getBooking, 'PW3128653')
      .next(api.getBooking())
      .put(
        getBookingSuccess({
          reference: 'PW3128653',
          id: '3128653',
          group_size: 4,
          booking_printed: '0',
          family_booking: true,
          created_date: {
            iso_value: '2019-06-04 20:27:26',
            isotz_value: '2019-06-04T20:27:26+01:00',
          },
          completed_date: {
            iso_value: '2019-06-04 20:34:06',
            isotz_value: '2019-06-04T20:34:06+01:00',
          },
          departure_date: {
            iso_value: '2019-11-07 00:00:00',
            isotz_value: '2019-11-07T00:00:00+00:00',
          },
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns errors.`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      getBooking: () => ({
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performGetBooking, { payload: { booking_ref: 'PW3128653' } })
      .next()
      .call(getBooking, 'PW3128653')
      .next(api.getBooking())
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

    testSaga(performGetBooking, { payload: { booking_ref: 'PW3128653' } })
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_GET_BOOKING_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
