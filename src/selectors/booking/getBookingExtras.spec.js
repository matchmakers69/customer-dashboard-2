import getBookingExtras from './getBookingExtras';

describe('getBookingExtras', () => {
  it('should return booking extras', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,

        PW3076840: {
          reference: 'FDF3051925',
          extras: [
            {
              name: 'The Smirnoff Arctic Disco 2019',
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
              id: 2116,
              quantity: 2,
            },
          ],
        },
      },
    };

    expect(getBookingExtras(state, 'PW3076840')).toEqual([
      {
        name: 'The Smirnoff Arctic Disco 2019',
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
          value: 46,
          price: '£46.00',
        },
        id: 2116,
        quantity: 2,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingExtras(state, 'PW3076840')).toEqual([]);
  });
});
