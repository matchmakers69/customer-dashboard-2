import {
  NOT_RESALABLE,
  RESALABLE,
  RESALE_ENABLED,
  RESALE_MESSAGES,
  RESALE_SOLD,
} from '../../constants';

import getBookingBreakdownTickets from './getBookingBreakdownTickets';

describe('getBookingBreakdownTickets', () => {
  let state = {};
  beforeEach(() => {
    state = {
      booking: {
        PW3076840: {
          currency: {
            id: '98',
            iso_code: '98',
            exponent: '2',
            symbol: '£',
          },
          tickets: [
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 48,
                  price: '£48.00',
                },
                booking_fee: {
                  value: 2,
                  price: '£2.00',
                },
                total_ticket_price: {
                  value: 50.0,
                  price: '£50.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALABLE,
            },
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 98,
                  price: '£98.00',
                },
                booking_fee: {
                  value: 2,
                  price: '£2.00',
                },
                total_ticket_price: {
                  value: 50.0,
                  price: '£50.00',
                },
              },
              ticket_type_id: '3771',
              id: '3667518',
              resale: RESALABLE,
            },
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 98,
                  price: '£98.00',
                },
                booking_fee: {
                  value: 2,
                  price: '£2.00',
                },
                total_ticket_price: {
                  value: 100.0,
                  price: '£100.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALABLE,
            },
          ],
        },
      },
    };
  });
  it('should return formatted tickets for breakdown.', () => {
    expect(getBookingBreakdownTickets(state, 'PW3076840')).toEqual([
      {
        title: 'Saturday - Saturday Day',
        subtitle: '£244.00 + £6.00 Booking Fee',
        disabled: false,
        badges: [],
        quantity: 3,
        cost: 200,
        costText: null,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')).toEqual([]);
  });

  it('should return empty array when no items on booking', () => {
    state = {
      booking: {
        loaded: true,

        PW143245: {
          tickets: [],
        },
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')).toEqual([]);
  });

  it('should return correct booking fee subtext when booking fee is greater than 0', () => {
    state = {
      ...state,
      booking: {
        ...state.booking,
        PW3076840: {
          ...state.booking.PW3076840,
          tickets: [
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 48,
                  price: '£48.00',
                },
                booking_fee: {
                  value: 2,
                  price: '£2.00',
                },
                total_ticket_price: {
                  value: 50,
                  price: '£50.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALE_ENABLED,
            },
          ],
        },
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')[0].subtitle).toEqual(
      '£48.00 + £2.00 Booking Fee',
    );
  });

  it('should return correct booking fee subtext for grouped tickets with a total booking fee greater than 0', () => {
    state = {
      ...state,
      booking: {
        ...state.booking,
        PW3076840: {
          ...state.booking.PW3076840,
          tickets: [
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 48,
                  price: '£48.00',
                },
                booking_fee: {
                  value: 2,
                  price: '£2.00',
                },
                total_ticket_price: {
                  value: 50,
                  price: '£50.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALE_ENABLED,
            },
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 60,
                  price: '£60.00',
                },
                booking_fee: {
                  value: 4,
                  price: '£4.00',
                },
                total_ticket_price: {
                  value: 64,
                  price: '£64.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALE_ENABLED,
            },
          ],
        },
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')[0].subtitle).toEqual(
      '£108.00 + £6.00 Booking Fee',
    );
  });

  it('should not return booking fee subtext when there are no fees on a ticket', () => {
    state = {
      ...state,
      booking: {
        ...state.booking,
        PW3076840: {
          ...state.booking.PW3076840,
          tickets: [
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 48,
                  price: '£48.00',
                },
                booking_fee: {
                  value: 0,
                  price: '£0.00',
                },
                total_ticket_price: {
                  value: 48,
                  price: '£48.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALE_ENABLED,
            },
          ],
        },
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')[0].subtitle).toEqual(
      null,
    );
  });

  it('should not return booking fee subtext when an item has been resold', () => {
    state = {
      ...state,
      booking: {
        ...state.booking,
        PW3076840: {
          ...state.booking.PW3076840,
          tickets: [
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 48,
                  price: '£48.00',
                },
                booking_fee: {
                  value: 0,
                  price: '£0.00',
                },
                total_ticket_price: {
                  value: 48,
                  price: '£48.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALE_SOLD,
            },
          ],
        },
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')[0].subtitle).toEqual(
      null,
    );
  });

  it('should return badge for items that are on resale', () => {
    state = {
      ...state,
      booking: {
        ...state.booking,
        PW3076840: {
          ...state.booking.PW3076840,
          tickets: [
            {
              event_name: 'Saturday',
              name: 'Saturday Day',
              prices: {
                price: {
                  value: 48,
                  price: '£48.00',
                },
                booking_fee: {
                  value: 0,
                  price: '£0.00',
                },
                total_ticket_price: {
                  value: 48,
                  price: '£48.00',
                },
              },
              ticket_type_id: '3771',
              resale: RESALE_ENABLED,
            },
          ],
        },
      },
    };

    expect(getBookingBreakdownTickets(state, 'PW3076840')[0].badges).toEqual([
      {
        text: RESALE_MESSAGES[RESALE_ENABLED],
        type: 'success',
      },
    ]);
  });

  it.each([RESALE_SOLD, RESALABLE, NOT_RESALABLE])(
    'should NOT return badge for items that of status %s',
    resaleStatus => {
      state = {
        ...state,
        booking: {
          ...state.booking,
          PW3076840: {
            ...state.booking.PW3076840,
            tickets: [
              {
                event_name: 'Saturday',
                name: 'Saturday Day',
                prices: {
                  price: {
                    value: 48,
                    price: '£48.00',
                  },
                  booking_fee: {
                    value: 0,
                    price: '£0.00',
                  },
                  total_ticket_price: {
                    value: 48,
                    price: '£48.00',
                  },
                },
                ticket_type_id: '3771',
                resale: resaleStatus,
              },
            ],
          },
        },
      };

      expect(getBookingBreakdownTickets(state, 'PW3076840')[0].badges).toEqual(
        [],
      );
    },
  );
});
