import getBookingPaymentStatus from './getBookingPaymentStatus';

describe('getBookingPaymentStatus', () => {
  it('should return specified package start date', () => {
    const state = {
      booking: {
        CDM3332166: {
          payment_status: {
            code: '30',
            value: 'Fully Paid',
          },
        },
      },
    };

    expect(getBookingPaymentStatus(state, 'CDM3332166')).toEqual({
      code: '30',
      value: 'Fully Paid',
    });
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPaymentStatus(state, 'CDM3332166')).toEqual({});
  });
});
