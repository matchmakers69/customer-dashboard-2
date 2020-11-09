import { all, call, put, takeLatest } from 'redux-saga/effects';
import { paymentOperations, paymentTypes } from '../../store/payments';

import { DAS_GET_BOOKING_FAILED } from '../../constants/errors';
import { createError } from '../../store/errors';
import { getPaymentPlanProjection } from '../../api/payments';

const { PAYMENT_PLAN_GET_PROJECTION } = paymentTypes;

export const performGetPaymentPlanProjection = function* performGetPaymentPlanProjection({
  payload,
}) {
  const {
    getPaymentPlanProjectionFailed,
    getPaymentPlanProjectionSuccess,
  } = paymentOperations;

  try {
    const { data, errors } = yield call(getPaymentPlanProjection, payload);

    if (errors) {
      // Handle web service errors.
      yield all(errors.map(error => put(createError(error))));
      yield put(getPaymentPlanProjectionFailed());
    } else {
      yield put(getPaymentPlanProjectionSuccess(data));
    }
  } catch (error) {
    yield put(
      createError({
        code: DAS_GET_BOOKING_FAILED,
      }),
    );
  }
};

export default takeLatest(
  PAYMENT_PLAN_GET_PROJECTION,
  performGetPaymentPlanProjection,
);
