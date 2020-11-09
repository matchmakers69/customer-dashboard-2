import { RESALABLE, RESALE_ENABLED } from '../../constants';
import { addResale, removeResale } from '../../api/booking';
import { bookingOperations, bookingTypes } from '../../store/booking';
import { call, put } from 'redux-saga/effects';
import { createError, errorTypes } from '../../store/errors';

import { DAS_UPDATE_BOOKING_RESALE_FAILED } from '../../constants/errors';
import { performUpdateResale } from './updateResale';
import { testSaga } from 'redux-saga-test-plan';

const {
  updateBookingResaleSuccess,
  updateBookingResaleFailed,
  getBooking,
} = bookingOperations;
const { UPDATE_BOOKING_RESALE_SUCCESS, GET_BOOKING_SUCCESS } = bookingTypes;
const { ERROR_OCCURRED } = errorTypes;

describe('updateResale', () => {
  let payload = {};
  let api = {};

  beforeEach(() => {
    payload = {
      booking_ref: 'PW12345',
      tickets: [
        { id: '123456', status: RESALE_ENABLED },
        { id: '123452', status: RESALE_ENABLED },
        { id: '123458', status: RESALABLE },
      ],
    };

    api = {
      resaleSuccess: () => ({
        success: true,
      }),
      resaleError: () => ({
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };
  });

  it(`Yields ${UPDATE_BOOKING_RESALE_SUCCESS} when resale and resale removal API returns success`, () => {
    testSaga(performUpdateResale, { payload })
      .next()
      .all([
        call(addResale, payload.booking_ref, { tickets: ['123456', '123452'] }),
        call(removeResale, payload.booking_ref, '123458'),
      ])
      .next([api.resaleSuccess(), api.resaleSuccess()])
      .put(getBooking(payload.booking_ref))
      .next()
      .take(GET_BOOKING_SUCCESS)
      .next()
      .put(updateBookingResaleSuccess())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns an error`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performUpdateResale, { payload })
      .next()
      .all([
        call(addResale, payload.booking_ref, { tickets: ['123456', '123452'] }),
        call(removeResale, payload.booking_ref, '123458'),
      ])
      .next([api.resaleError(), api.resaleSuccess()])
      .put(updateBookingResaleFailed())
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

  it(`Yields ${ERROR_OCCURRED} when error is thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performUpdateResale, { payload })
      .next()
      .throw(new Error('An error occurred!'))
      .put(updateBookingResaleFailed())
      .next()
      .put(
        createError({
          code: DAS_UPDATE_BOOKING_RESALE_FAILED,
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields a single ${ERROR_OCCURRED} when multiple instances of the same error are returned`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performUpdateResale, { payload })
      .next()
      .all([
        call(addResale, payload.booking_ref, { tickets: ['123456', '123452'] }),
        call(removeResale, payload.booking_ref, '123458'),
      ])
      .next([api.resaleError(), api.resaleError(), api.resaleError()])
      .put(updateBookingResaleFailed())
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

  it(`Does NOT call POST resale endpoint when no tickets of status ${RESALE_ENABLED} are passed.`, () => {
    payload = {
      booking_ref: 'PW12345',
      tickets: [{ id: '123458', status: RESALABLE }],
    };

    testSaga(performUpdateResale, { payload })
      .next()
      .all([call(removeResale, payload.booking_ref, '123458')])
      .next([api.resaleSuccess()])
      .put(getBooking(payload.booking_ref))
      .next()
      .take(GET_BOOKING_SUCCESS)
      .next()
      .put(updateBookingResaleSuccess())
      .next()
      .isDone();
  });

  it(`Does NOT call DELETE resale endpoint when no tickets of status ${RESALABLE} are passed.`, () => {
    payload = {
      booking_ref: 'PW12345',
      tickets: [
        { id: '123456', status: RESALE_ENABLED },
        { id: '123452', status: RESALE_ENABLED },
      ],
    };

    testSaga(performUpdateResale, { payload })
      .next()
      .all([
        call(addResale, payload.booking_ref, { tickets: ['123456', '123452'] }),
      ])
      .next([api.resaleSuccess()])
      .put(getBooking(payload.booking_ref))
      .next()
      .take(GET_BOOKING_SUCCESS)
      .next()
      .put(updateBookingResaleSuccess())
      .next()
      .isDone();
  });
});
