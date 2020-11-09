import getPaymentLast4 from './getPaymentLast4';

describe('getPaymentLast4', () => {
  it('it should return the card_number (last four digits) from state', () => {
    const state = {
      payments: {
        card_number: '4242',
      },
    };

    expect(getPaymentLast4(state)).toEqual('4242');
  });
});
