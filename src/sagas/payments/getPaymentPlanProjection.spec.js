import { createError, errorTypes } from '../../store/errors';
import { paymentOperations, paymentTypes } from '../../store/payments';

import { DAS_GET_BOOKING_FAILED } from '../../constants/errors';
import { getPaymentPlanProjection } from '../../api/payments';
import { performGetPaymentPlanProjection } from './getPaymentPlanProjection';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('updatePaymentPlan', () => {
  const {
    getPaymentPlanProjectionFailed,
    getPaymentPlanProjectionSuccess,
  } = paymentOperations;
  const { PAYMENT_PLAN_GET_PROJECTION_SUCCESS } = paymentTypes;
  const { ERROR_OCCURRED } = errorTypes;

  it(`Yields ${PAYMENT_PLAN_GET_PROJECTION_SUCCESS} when API returns customer`, () => {
    const api = {
      getPaymentPlanProjection: () => ({
        projection: [
          {
            date: {
              iso_value: '2020-03-29 00:00:00',
              isotz_value: '2020-03-29T00:00:00+00:00',
            },
            price: {
              value: 2105,
              currency: {
                code: 'GBP',
                symbol: '£',
                exponent: 2,
              },
            },
          },
        ],
      }),
    };

    testSaga(performGetPaymentPlanProjection, {
      payload: { bookingReference: 'TF3180529', day: 25 },
    })
      .next()
      .call(getPaymentPlanProjection, {
        bookingReference: 'TF3180529',
        day: 25,
      })
      .next(api.getPaymentPlanProjection())
      .put(getPaymentPlanProjectionSuccess())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns errors`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      getPaymentPlanProjection: () => ({
        success: false,
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performGetPaymentPlanProjection, {
      payload: { bookingReference: 'TF3180529' },
    })
      .next()
      .call(getPaymentPlanProjection, {
        bookingReference: 'TF3180529',
      })
      .next(api.getPaymentPlanProjection())
      .all([
        put(
          createError({
            error_code: 1234567,
            error_message: 'This is an error.',
          }),
        ),
      ])
      .next()
      .put(getPaymentPlanProjectionFailed())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performGetPaymentPlanProjection, {
      payload: { bookingReference: 'TF3180529', day: 47 },
    })
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
