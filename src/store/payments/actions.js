import {
  MAKE_PAYMENT_FAILED,
  MAKE_PAYMENT_REQUIRES_ACTION,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_UPDATING,
  PAYMENT_PLAN_GET_PROJECTION,
  PAYMENT_PLAN_GET_PROJECTION_FAILED,
  PAYMENT_PLAN_GET_PROJECTION_SUCCESS,
  PAYMENT_PLAN_UPDATED,
  PAYMENT_PLAN_UPDATE_FAILED,
  PAYMENT_PLAN_UPDATE_REQUIRES_ACTION,
  PAYMENT_PLAN_UPDATING,
} from './types';

export const updatingPaymentPlan = payload => ({
  type: PAYMENT_PLAN_UPDATING,
  payload,
});

export const updatedPaymentPlan = response => ({
  type: PAYMENT_PLAN_UPDATED,
  payload: { response },
});

export const updatePaymentPlanFailed = error => ({
  type: PAYMENT_PLAN_UPDATE_FAILED,
  payload: { error },
});

export const updatePaymentPlanRequiresAction = (
  paymentIntentClientSecret,
  card_number,
  cardholder_name,
) => ({
  type: PAYMENT_PLAN_UPDATE_REQUIRES_ACTION,
  payload: { paymentIntentClientSecret, card_number, cardholder_name },
});

export const getPaymentPlanProjection = payload => ({
  type: PAYMENT_PLAN_GET_PROJECTION,
  payload,
});

export const getPaymentPlanProjectionSuccess = projection => ({
  type: PAYMENT_PLAN_GET_PROJECTION_SUCCESS,
  payload: projection,
});

export const getPaymentPlanProjectionFailed = error => ({
  type: PAYMENT_PLAN_GET_PROJECTION_FAILED,
  payload: error,
});

export const makePaymentUpdating = payload => ({
  type: MAKE_PAYMENT_UPDATING,
  payload,
});

export const makePaymentSuccess = response => ({
  type: MAKE_PAYMENT_SUCCESS,
  payload: { response },
});

export const makePaymentFailed = error => ({
  type: MAKE_PAYMENT_FAILED,
  payload: { error },
});

export const makePaymentRequiresAction = (
  paymentIntentClientSecret,
  card_number,
  cardholder_name,
  expiry_date,
) => ({
  type: MAKE_PAYMENT_REQUIRES_ACTION,
  payload: {
    paymentIntentClientSecret,
    card_number,
    cardholder_name,
    expiry_date,
  },
});
