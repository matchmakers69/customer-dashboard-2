import getBookingBreakdownExtras from './getBookingBreakdownExtras';

describe('getBookingBreakdownExtras', () => {
  it('should return formatted extras for breakdown.', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          id: 3051925,
          group_size: 1,
          booking_printed: 0,
          family_booking: true,
          extras: [
            {
              name: 'The Smirnoff Arctic Disco 2020',
              option: {
                id: 8905,
                value: 'Smirnoff  Arctic Disco - Friday 12th April',
              },
              group: {
                id: 2454,
                value: 'Arctic Disco',
              },
              description:
                'The Smirnoff Arctic Disco 2019 - Smirnoff  Arctic Disco - Friday 12th April',

              price: {
                value: 50.0,

                price: '£50.00',
              },
              id: 2118,
              quantity: 1,
            },
            {
              name: 'The Smirnoff Arctic Disco 2020',
              option: {
                id: 8904,
                value:
                  'Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',
              },
              group: {
                id: 2453,
                value: 'Arctic Disco',
              },
              description:
                'The Smirnoff Arctic Disco 2019 - Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',

              price: {
                value: 46.0,

                price: '£46.00',
              },
              id: 2117,
              quantity: 1,
            },
            {
              name: 'The Smirnoff Arctic Disco 2020',
              option: {
                id: 8904,
                value:
                  'Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',
              },
              group: {
                id: 2453,
                value: 'Arctic Disco',
              },
              description:
                'The Smirnoff Arctic Disco 2019 - Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',

              price: {
                value: 46.0,

                price: '£46.00',
              },
              id: 2117,
              quantity: 1,
            },
          ],
        },
      },
    };

    expect(getBookingBreakdownExtras(state, 'PW3076840')).toEqual([
      {
        title:
          'The Smirnoff Arctic Disco 2020 - Smirnoff  Arctic Disco - Friday 12th April',
        quantity: 1,
        cost: 50,
      },
      {
        title:
          'The Smirnoff Arctic Disco 2020 - Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',
        quantity: 2,
        cost: 92,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingBreakdownExtras(state, 'PW3076840')).toEqual([]);
  });

  it('should return empty array when no items on booking', () => {
    const state = {
      booking: {
        loaded: true,

        PW143245: {
          extras: [],
        },
      },
    };

    expect(getBookingBreakdownExtras(state)).toEqual([]);
  });
});
