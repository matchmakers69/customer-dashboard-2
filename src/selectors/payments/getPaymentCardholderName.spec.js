import getPaymentCardholderName from './getPaymentCardholderName';

describe('getPaymentCardholderName', () => {
  it('it should return the cardholder name from state', () => {
    const state = {
      payments: {
        cardholder_name: 'Test User',
      },
    };

    expect(getPaymentCardholderName(state)).toEqual('Test User');
  });
});
