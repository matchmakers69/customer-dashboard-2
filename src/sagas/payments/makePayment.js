import { all, call, put, takeLatest } from 'redux-saga/effects';
import { paymentOperations, paymentTypes } from '../../store/payments';

import { DAS_UPDATE_CUSTOMER_FAILED } from '../../constants/errors';
import constants from '../../constants';
import { createError } from '../../store/errors';
import { createPayment } from '../../api/payments';
import { messageOperations } from '../../store/messages';

const { MAKE_PAYMENT_UPDATING } = paymentTypes;

export const performMakePayment = function* performMakePayment({ payload }) {
  const {
    makePaymentSuccess,
    makePaymentFailed,
    makePaymentRequiresAction,
  } = paymentOperations;
  const { sendMessage } = messageOperations;
  try {
    const data = yield call(createPayment, payload);
    const { errors } = data;
    const { requires_action, payment_intent_client_secret } = data.payment;
    const { card_number, cardholder_name, expiry_date } = payload;
    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
      yield put(makePaymentFailed());
    } else if (requires_action) {
      yield put(
        makePaymentRequiresAction(
          payment_intent_client_secret,
          card_number,
          cardholder_name,
          expiry_date,
        ),
      );
    } else {
      yield put(makePaymentSuccess());
      yield put(
        sendMessage({
          type: 'success',
          displayType: 'toast',
          message: constants.SUCCESSFUL_PAYMENT,
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

export default takeLatest(MAKE_PAYMENT_UPDATING, performMakePayment);
