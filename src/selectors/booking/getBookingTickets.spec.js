import getBookingTickets from './getBookingTickets';

describe('getBookingTickets', () => {
  it('should return booking tickets', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          tickets: [
            {
              name: 'Weekend Day - Tier 3',
              prices: {
                price: {
                  value: 77.5,
                  price: '£77.50',
                },
                booking_fee: {
                  value: 7.75,
                  price: '£7.75',
                },
                admin_fee: {
                  value: 0.0,
                  price: '£0.00',
                },
                delivery_charge: {
                  value: 0.0,
                  price: '£0.00',
                },
                total_ticket_price: {
                  value: 85.25,
                  price: '£85.25',
                },
              },
              purchased_date: {
                iso_value: '2019-02-27',
              },
              delivery_option: '',
              event_id: 1247,
              id: 3782,
            },
          ],
        },
      },
    };

    expect(getBookingTickets(state, 'PW3076840')).toEqual([
      {
        name: 'Weekend Day - Tier 3',
        prices: {
          price: {
            value: 77.5,
            price: '£77.50',
          },
          booking_fee: {
            value: 7.75,
            price: '£7.75',
          },
          admin_fee: {
            value: 0,
            price: '£0.00',
          },
          delivery_charge: {
            value: 0,
            price: '£0.00',
          },
          total_ticket_price: {
            value: 85.25,
            price: '£85.25',
          },
        },
        purchased_date: {
          iso_value: '2019-02-27',
        },
        delivery_option: '',
        event_id: 1247,
        id: 3782,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingTickets(state, 'PW3076840')).toEqual([]);
  });
});
