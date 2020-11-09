import getBookingPrices from './getBookingPrices';

describe('getBookingPrices', () => {
  it('should return booking prices', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          agent: {
            id: 457878,
            value: 'John Smith',
          },
          prices: {
            booking_price: {
              value: 86.75,
              display_value: '£86.75',
            },
            booking_fee: {
              value: 7.75,
              display_value: '£7.75',
            },
            tickets_booking_fee: {
              value: 7.75,
              display_value: '£7.75',
            },
            discounts: {
              value: 0,
              display_value: '£0.00',
            },
            referrals: {
              value: 0,
              display_value: '£0.00',
            },
            charges: {
              value: 0,
              display_value: '£0.00',
            },
            total_booking_price: {
              value: 99,
              display_value: '£99.00',
            },
            paid: {
              value: 86.75,
              display_value: '£86.75',
            },
            deposit: {
              value: 9.25,
              display_value: '£9.25',
            },
            package_price: {
              value: 0,
              display_value: '£0.00',
            },
            damage_deposit: {
              value: 0,
              display_value: '£0.00',
            },
            accommodation_price: {
              value: 0,
              display_value: '£0.00',
            },
            transport_price: {
              value: 0,
              display_value: '£0.00',
            },
            extras_price: {
              value: 0,
              display_value: '£0.00',
            },
            tickets_price: {
              value: 77.5,
              display_value: '£77.50',
            },
            insurance_price: {
              value: 0,
              display_value: '£0.00',
            },
            delivery_price: {
              value: 1.5,
              display_value: '£1.50',
            },
          },
        },
      },
    };

    expect(getBookingPrices(state, 'PW3076840')).toEqual({
      booking_price: {
        value: 86.75,
        display_value: '£86.75',
      },
      booking_fee: {
        value: 7.75,
        display_value: '£7.75',
      },
      tickets_booking_fee: {
        value: 7.75,
        display_value: '£7.75',
      },
      discounts: {
        value: 0,
        display_value: '£0.00',
      },
      referrals: {
        value: 0,
        display_value: '£0.00',
      },
      charges: {
        value: 0,
        display_value: '£0.00',
      },
      total_booking_price: {
        value: 99,
        display_value: '£99.00',
      },
      paid: {
        value: 86.75,
        display_value: '£86.75',
      },
      deposit: {
        value: 9.25,
        display_value: '£9.25',
      },
      package_price: {
        value: 0,
        display_value: '£0.00',
      },
      damage_deposit: {
        value: 0,
        display_value: '£0.00',
      },
      accommodation_price: {
        value: 0,
        display_value: '£0.00',
      },
      transport_price: {
        value: 0,
        display_value: '£0.00',
      },
      extras_price: {
        value: 0,
        display_value: '£0.00',
      },
      tickets_price: {
        value: 77.5,
        display_value: '£77.50',
      },
      insurance_price: {
        value: 0,
        display_value: '£0.00',
      },
      delivery_price: {
        value: 1.5,
        display_value: '£1.50',
      },
    });
  });

  it('should return empty object when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPrices(state, 'PW3076840')).toEqual({});
  });
});
