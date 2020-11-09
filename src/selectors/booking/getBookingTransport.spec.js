import getBookingTransport from './getBookingTransport';

describe('getBookingTransport', () => {
  it('should return booking transport', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          transport: [
            {
              journey_leg: {
                id: 2,
                value: 'Outbound - Pick Up',
              },
              departure_location: {
                id: 703,
                airport_code: '',
                value: 'Gatwick Airport',
              },
              departure_date: {
                iso_value: '2019-04-08 08:35:00',
                isotz_value: '2019-04-08T08:35:00+01:00',
              },
              departure_location_notes: '',
              arrival_location: {
                id: 641,
                airport_code: '',
                value: 'Innsbruck Airport',
              },
              arrival_date: {
                iso_value: '2019-04-08 11:35:00',
                isotz_value: '2019-04-08T11:35:00+01:00',
              },
              arrival_location_notes: '',
              flight_number: 'BA2690',
              price: {
                value: 32.0,
                price: '£32.00',
              },
              route_id: 3790,
              stop_id: 51950,
            },
            {
              journey_leg: {
                id: 4,
                value: 'Return - Pick Up',
              },
              departure_location: {
                id: 538,
                airport_code: '',
                value: 'Munich Airport',
              },
              departure_date: {
                iso_value: '2019-04-14 21:55:00',
                isotz_value: '2019-04-14T21:55:00+01:00',
              },
              departure_location_notes: '',
              arrival_location: {
                id: 703,
                airport_code: '',
                value: 'Gatwick Airport',
              },
              arrival_date: {
                iso_value: '2019-04-14 22:55:00',
                isotz_value: '2019-04-14T22:55:00+01:00',
              },
              arrival_location_notes: '',
              flight_number: 'EZY8986',
              price: {
                value: 39.0,
                price: '£39.00',
              },
              route_id: 3790,
              stop_id: 48469,
            },
          ],
        },
      },
    };

    expect(getBookingTransport(state, 'PW3076840')).toEqual([
      {
        journey_leg: {
          id: 2,
          value: 'Outbound - Pick Up',
        },
        departure_location: {
          id: 703,
          airport_code: '',
          value: 'Gatwick Airport',
        },
        departure_date: {
          iso_value: '2019-04-08 08:35:00',
          isotz_value: '2019-04-08T08:35:00+01:00',
        },
        departure_location_notes: '',
        arrival_location: {
          id: 641,
          airport_code: '',
          value: 'Innsbruck Airport',
        },
        arrival_date: {
          iso_value: '2019-04-08 11:35:00',
          isotz_value: '2019-04-08T11:35:00+01:00',
        },
        arrival_location_notes: '',
        flight_number: 'BA2690',
        price: {
          value: 32,
          price: '£32.00',
        },
        route_id: 3790,
        stop_id: 51950,
      },
      {
        journey_leg: {
          id: 4,
          value: 'Return - Pick Up',
        },
        departure_location: {
          id: 538,
          airport_code: '',
          value: 'Munich Airport',
        },
        departure_date: {
          iso_value: '2019-04-14 21:55:00',
          isotz_value: '2019-04-14T21:55:00+01:00',
        },
        departure_location_notes: '',
        arrival_location: {
          id: 703,
          airport_code: '',
          value: 'Gatwick Airport',
        },
        arrival_date: {
          iso_value: '2019-04-14 22:55:00',
          isotz_value: '2019-04-14T22:55:00+01:00',
        },
        arrival_location_notes: '',
        flight_number: 'EZY8986',
        price: {
          value: 39,
          price: '£39.00',
        },
        route_id: 3790,
        stop_id: 48469,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingTransport(state, 'PW3076840')).toEqual([]);
  });
});
