import getPaymentExpiryDate from './getPaymentExpiryDate';

describe('getPaymentExpiryDate', () => {
  it('it should return the card expiry_date from state', () => {
    const state = {
      payments: {
        expiry_date: { exp_month: 4, exp_year: 2024 },
      },
    };

    expect(getPaymentExpiryDate(state)).toEqual({
      exp_month: 4,
      exp_year: 2024,
    });
  });
});
