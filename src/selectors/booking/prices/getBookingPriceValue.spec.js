import getBookingPriceValue from './getBookingPriceValue';

describe('getBookingPriceValue', () => {
  it('should return booking price as a float', () => {
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

    expect(getBookingPriceValue(state, 'PW3076840')).toEqual(86.75);
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPriceValue(state, 'PW3076840')).toEqual(null);
  });
});
