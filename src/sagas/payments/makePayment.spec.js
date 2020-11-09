import { createError, errorTypes } from '../../store/errors';
import { paymentOperations, paymentTypes } from '../../store/payments';

import { DAS_UPDATE_CUSTOMER_FAILED } from '../../constants/errors';
import constants from '../../constants';
import { createPayment } from '../../api/payments';
import { messageOperations } from '../../store/messages';
import { performMakePayment } from './makePayment';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

describe('updatePaymentPlan', () => {
  const {
    makePaymentSuccess,
    makePaymentFailed,
    makePaymentRequiresAction,
  } = paymentOperations;
  const { MAKE_PAYMENT_SUCCESS, MAKE_PAYMENT_REQUIRES_ACTION } = paymentTypes;
  const { ERROR_OCCURRED } = errorTypes;
  const { sendMessage } = messageOperations;

  const payload = {
    bookingId: '3389027',
    bookingPax: '5533021',
    card_number: '4242',
    card_type: 'card',
    cardholder_name: 'Test Testerton',
    expiry_date: { exp_month: 4, exp_year: 2024 },
    payment_amount: 1000,
    payment_method: 'pm_1GPv3OFmIEl4IrWCW0vFPOgy',
    city: 'Josianneview',
    country: 'US',
    line1: '1299 Norma Place',
    line2: '',
    postal_code: '48574',
    state: 'Texas',
  };

  it(`Yields ${MAKE_PAYMENT_SUCCESS} when API returns customer`, () => {
    const api = {
      createPayment: () => ({
        payment: {
          reference: 'CO-0003950340',
          paid: true,
          trace_number: null,
        },
      }),
    };

    testSaga(performMakePayment, {
      payload,
    })
      .next()
      .call(createPayment, { ...payload })
      .next(api.createPayment())
      .put(makePaymentSuccess())
      .next()
      .put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.SUCCESSFUL_PAYMENT,
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${MAKE_PAYMENT_REQUIRES_ACTION} when API returns client_secret`, () => {
    const api = {
      createPayment: () => ({
        payment: {
          reference: 'TF-0003950892',
          paid: false,
          trace_number: null,
          requires_action: true,
          payment_intent_client_secret: 'test_cs_1234',
        },
      }),
    };

    testSaga(performMakePayment, {
      payload,
    })
      .next()
      .call(createPayment, {
        ...payload,
      })
      .next(api.createPayment())
      .put(
        makePaymentRequiresAction(
          'test_cs_1234',
          payload.card_number,
          payload.cardholder_name,
          payload.expiry_date,
        ),
      )
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns errors`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      createPayment: () => ({
        payment: {
          reference: 'CO-0003950342',
          paid: false,
          trace_number: null,
        },
        errors: [
          {
            code: '16000190',
            message: 'Invalid request',
          },
        ],
      }),
    };

    testSaga(performMakePayment, {
      payload,
    })
      .next()
      .call(createPayment, { ...payload })
      .next(api.createPayment())
      .all([
        put(
          createError({
            code: '16000190',
            message: 'Invalid request',
          }),
        ),
      ])
      .next()
      .put(makePaymentFailed())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performMakePayment, {
      payload: { fields: {}, redirectPath: '/' },
    })
      .next()
      .throw(new Error('An error occurred!'))
      .put(
        createError({
          code: DAS_UPDATE_CUSTOMER_FAILED,
        }),
      )
      .next()
      .isDone();
  });
});
