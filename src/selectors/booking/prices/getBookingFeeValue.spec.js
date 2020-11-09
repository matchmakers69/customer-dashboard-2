import getBookingFeeValue from './getBookingFeeValue';

describe('getBookingFeeValue', () => {
  it('should return booking fee as a float', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'PW3076840',
          prices: {
            booking_price: {
              value: 86.75,
              display_value: '£86.75',
            },
            booking_fee: {
              value: 7.75,
              display_value: '£7.75',
            },
          },
        },
      },
    };

    expect(getBookingFeeValue(state, 'PW3076840')).toEqual(7.75);
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingFeeValue(state, 'PW3076840')).toEqual(null);
  });
});
