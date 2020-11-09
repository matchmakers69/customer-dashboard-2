import getBookingDeliveryAddress from './getBookingDeliveryAddress';

describe('getBookingDeliveryAddress', () => {
  it('should return booking extras', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          delivery: [
            {
              delivery_name:
                'UK Delivery (dispatched approx. 4 weeks before Festival)',
              description: 'UK Delivery',
              delivery_price: { value: 6.95, price: '\u00a36.95' },
              allocation_id: 461643,
              require_address: true,
              address_id: '527921',
              type_id: '1',
              type_name: 'Home',
              address_1: '2 Test Avenue',
              address_2: null,
              address_3: null,
              city: 'Manchester',
              county: 'Greater Manchester',
              postcode: 'M40 3AA',
              country_id: '235',
              country_name: 'United Kingdom',
              tracking_id: null,
            },
          ],
        },
      },
    };

    expect(getBookingDeliveryAddress(state, 'PW3076840')).toEqual({
      address_1: '2 Test Avenue',
      address_2: null,
      address_3: null,
      city: 'Manchester',
      county: 'Greater Manchester',
      postcode: 'M40 3AA',
      country: {
        id: '235',
        name: 'United Kingdom',
      },
    });
  });

  it('should return empty array when eTicket delivery', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          delivery: [
            {
              delivery_name:
                'UK Delivery (dispatched approx. 4 weeks before Festival)',
              description: 'UK Delivery',
              delivery_price: { value: 6.95, price: '\u00a36.95' },
              require_address: false,
              address_1: null,
              address_2: null,
              address_3: null,
              city: null,
              postcode: null,
              country_id: null,
              country_name: null,
              tracking_id: null,
            },
          ],
        },
      },
    };

    expect(getBookingDeliveryAddress(state, 'PW3076840')).toEqual(null);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingDeliveryAddress(state)).toEqual(null);
  });
});
