import getPaymentSuccess from './getPaymentSuccess';

describe('getPaymentSuccess', () => {
  it('it should return paymentSuccess from state', () => {
    const state = {
      payments: {
        paymentSuccess: true,
      },
    };

    expect(getPaymentSuccess(state)).toEqual(true);
  });
});
