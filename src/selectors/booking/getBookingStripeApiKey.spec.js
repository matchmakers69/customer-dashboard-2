import getBookingStripeApiKey from './getBookingStripeApiKey';

describe('getBookingStripeApiKey', () => {
  it('should return the public api key attached to the booking', () => {
    const state = {
      booking: {
        PW3076840: {
          payment_info: {
            public_key: 'owe0VkXlysrF8kEWFogw',
          },
        },
      },
    };

    expect(getBookingStripeApiKey(state, 'PW3076840')).toEqual(
      'owe0VkXlysrF8kEWFogw',
    );
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingStripeApiKey(state, 'BOOKINGREF')).toEqual(null);
  });
});
