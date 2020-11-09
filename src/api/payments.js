import { get, post, put } from 'axios';

export const updatePaymentPlanDetails = async payload => {
  const { data } = await put(
    `/api/booking/${payload.bookingReference}/paymentplan`,
    payload,
  );
  return data;
};

export const getPaymentPlanProjection = async payload => {
  const data = await get(
    `/api/booking/${payload.bookingReference}/paymentplan/projection`,
    {
      params: { day: payload.day },
    },
  );
  return data;
};

export const createPayment = async payload => {
  const { data } = await post('/api/payment/', payload);
  return data;
};
