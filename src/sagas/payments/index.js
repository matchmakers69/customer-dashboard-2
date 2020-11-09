import getPaymentPlanProjection from './getPaymentPlanProjection';
import makePayment from './makePayment';
import updatePaymentPlan from './updatePaymentPlan';

export const paymentSagas = [
  updatePaymentPlan,
  getPaymentPlanProjection,
  makePayment,
];
