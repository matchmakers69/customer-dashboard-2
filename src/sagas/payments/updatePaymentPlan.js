import { all, call, put, takeLatest } from 'redux-saga/effects';
import { paymentOperations, paymentTypes } from '../../store/payments';

import { DAS_UPDATE_CUSTOMER_FAILED } from '../../constants/errors';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { messageOperations } from '../../store/messages';
import { updatePaymentPlanDetails } from '../../api/payments';

const { PAYMENT_PLAN_UPDATING } = paymentTypes;

export const performUpdatePaymentPlan = function* performUpdatePaymentPlan({
  payload,
}) {
  // eslint-disable-next-line no-alert
  const {
    updatedPaymentPlan,
    updatePaymentPlanFailed,
    updatePaymentPlanRequiresAction,
  } = paymentOperations;
  const { sendMessage } = messageOperations;
  try {
    const data = yield call(updatePaymentPlanDetails, payload);
    const { errors, requires_action, payment_intent_client_secret } = data;
    const { card_number, cardholder_name } = payload;
    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
      yield put(updatePaymentPlanFailed());
    } else if (requires_action) {
      yield put(
        updatePaymentPlanRequiresAction(
          payment_intent_client_secret,
          card_number,
          cardholder_name,
        ),
      );
    } else {
      yield put(updatedPaymentPlan());
      yield put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.UPDATE_PAYMENT_DETAILS,
        }),
      );
    }
  } catch (error) {
    yield put(
      createError({
        code: DAS_UPDATE_CUSTOMER_FAILED,
      }),
    );
  }
};

export default takeLatest(PAYMENT_PLAN_UPDATING, performUpdatePaymentPlan);
