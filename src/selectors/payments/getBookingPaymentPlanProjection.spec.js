import getBookingPaymentPlanProjection from './getBookingPaymentPlanProjection';

describe('getBookingPaymentPlanProjection', () => {
  it('should return booking pax when booking loaded', () => {
    const state = {
      payments: {
        loaded: true,
        projection: [
          {
            date: {
              iso_value: '2020-03-29 00:00:00',
              isotz_value: '2020-03-29T00:00:00+00:00',
            },
            price: {
              value: 2105,
              currency: {
                code: 'GBP',
                symbol: '£',
                exponent: 2,
              },
            },
          },
        ],
      },
    };
    expect(getBookingPaymentPlanProjection(state)).toEqual([
      {
        date: {
          iso_value: '2020-03-29 00:00:00',
          isotz_value: '2020-03-29T00:00:00+00:00',
        },
        price: {
          value: 2105,
          currency: {
            code: 'GBP',
            symbol: '£',
            exponent: 2,
          },
        },
      },
    ]);
  });
});
