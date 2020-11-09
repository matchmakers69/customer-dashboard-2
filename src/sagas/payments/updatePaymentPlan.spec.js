import { createError, errorTypes } from '../../store/errors';
import { paymentOperations, paymentTypes } from '../../store/payments';

import { DAS_UPDATE_CUSTOMER_FAILED } from '../../constants/errors';
import constants from '../../constants';
import { messageOperations } from '../../store/messages';
import { performUpdatePaymentPlan } from './updatePaymentPlan';
import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { updatePaymentPlanDetails } from '../../api/payments';

describe('updatePaymentPlan', () => {
  const {
    updatedPaymentPlan,
    updatePaymentPlanFailed,
    updatePaymentPlanRequiresAction,
  } = paymentOperations;
  const {
    PAYMENT_PLAN_UPDATED,
    PAYMENT_PLAN_UPDATE_REQUIRES_ACTION,
  } = paymentTypes;
  const { ERROR_OCCURRED } = errorTypes;
  const { sendMessage } = messageOperations;

  it(`Yields ${PAYMENT_PLAN_UPDATED} when API returns customer`, () => {
    const api = {
      updatePaymentPlanDetails: () => ({
        success: true,
      }),
    };

    testSaga(performUpdatePaymentPlan, {
      payload: { cardholderName: 'Barry' },
    })
      .next()
      .call(updatePaymentPlanDetails, { cardholderName: 'Barry' })
      .next(api.updatePaymentPlanDetails())
      .put(updatedPaymentPlan())
      .next()
      .put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.UPDATE_PAYMENT_DETAILS,
        }),
      )
      .next()
      .isDone();
  });

  it(`Yields ${PAYMENT_PLAN_UPDATE_REQUIRES_ACTION} when API returns client_secret`, () => {
    const api = {
      updatePaymentPlanDetails: () => ({
        requires_action: true,
        payment_intent_client_secret: 'test_cs_1234',
      }),
    };

    testSaga(performUpdatePaymentPlan, {
      payload: {
        id: 'pm_test_1234',
        card_number: '3184',
        cardholder_name: 'Barry',
        bookingReference: 'TF3180529',
      },
    })
      .next()
      .call(updatePaymentPlanDetails, {
        id: 'pm_test_1234',
        card_number: '3184',
        cardholder_name: 'Barry',
        bookingReference: 'TF3180529',
      })
      .next(api.updatePaymentPlanDetails())
      .put(updatePaymentPlanRequiresAction('test_cs_1234', '3184', 'Barry'))
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when API returns errors`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    const api = {
      updatePaymentPlanDetails: () => ({
        success: false,
        errors: [
          {
            error_code: 1234567,
            error_message: 'This is an error.',
          },
        ],
      }),
    };

    testSaga(performUpdatePaymentPlan, {
      payload: { cardholderName: 'Barry' },
    })
      .next()
      .call(updatePaymentPlanDetails, { cardholderName: 'Barry' })
      .next(api.updatePaymentPlanDetails())
      .all([
        put(
          createError({
            error_code: 1234567,
            error_message: 'This is an error.',
          }),
        ),
      ])
      .next()
      .put(updatePaymentPlanFailed())
      .next()
      .isDone();
  });

  it(`Yields ${ERROR_OCCURRED} when error thrown`, () => {
    const mockDate = new Date();
    global.Date = jest.fn(() => mockDate);

    testSaga(performUpdatePaymentPlan, {
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
