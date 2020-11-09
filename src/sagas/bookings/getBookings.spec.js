import { bookingsOperations, bookingsTypes } from '../../store/bookings';
import { createError, errorTypes } from '../../store/errors';

import { DAS_GET_BOOKINGS_FAILED } from '../../constants/errors';
import { getBookings } from '../../api/bookings';
import { performGetBookings } from './getBookings';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('getBookings', () => {
  const { getBookingsSuccess, getBookingsFailed } = bookingsOperations;
  const { GET_BOOKINGS_SUCCESS, GET_BOOKINGS_FAILED } = bookingsTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${GET_BOOKINGS_SUCCESS} when API returns bookings.`, () => {
    const api = {
      getBookings: () => ({
        upcoming: [
          {
            id: '3128653',
            reference: 'PW3128653',
            package_name: 'Zedd',
            booking_price: {
              value: 115,
              price: '£115.00',
            },

            booking_status: {
              code: '70',
              value: 'Complete',
            },
            payment_status: {
              code: '30',
              value: 'Fully Paid',
            },
          },
        ],
        past: [],
      }),
    };

    testSaga(performGetBookings)
      .next()
      .call(getBookings)
      .next(api.getBookings())
      .put(
        getBookingsSuccess({
          past: [],
          upcoming: [
            {
              id: '3128653',
              reference: 'PW3128653',
              package_name: 'Zedd',
              booking_price: {
                value: 115,
                price: '£115.00',
              },

              booking_status: {
                code: '70',
                value: 'Complete',
              },
              payment_status: {
                code: '30',
                value: 'Fully Paid',
              },
            },
          ],
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${GET_BOOKINGS_FAILED} when API does not return bookings.`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      getBookings: () => ({
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performGetBookings)
      .next()
      .call(getBookings)
      .next(api.getBookings())
      .put(getBookingsFailed())
      .next()
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

    testSaga(performGetBookings)
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_GET_BOOKINGS_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
