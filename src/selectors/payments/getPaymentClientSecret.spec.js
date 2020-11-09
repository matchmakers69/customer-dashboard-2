import getPaymentClientSecret from './getPaymentClientSecret';

describe('getPaymentClientSecret', () => {
  it('it should return the client secret from the state', () => {
    const state = {
      payments: {
        paymentIntentClientSecret: 'test_client_secret_1234',
      },
    };

    expect(getPaymentClientSecret(state)).toEqual('test_client_secret_1234');
  });
});
