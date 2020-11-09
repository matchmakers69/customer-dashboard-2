import { RESALABLE, RESALE_ENABLED, RESALE_SOLD } from '../../../constants';

import getResaleValue from './getResaleValue';

describe('getResaleValue', () => {
  it('should return sum of ticket costs for tickets on resale', () => {
    const state = {
      booking: {
        error: null,
        PW3076840: {
          reference: 'PW3076840',
          tickets: [
            {
              id: 1,
              resale: RESALE_ENABLED,
              prices: {
                price: {
                  value: 25.0,
                },
              },
            },
            {
              id: 4,
              resale: RESALE_SOLD,
              prices: {
                price: {
                  value: 25.0,
                },
              },
            },
            {
              id: 5,
              resale: RESALABLE,
              prices: {
                price: {
                  value: 34.0,
                },
              },
            },
            {
              id: 2,
              resale: RESALE_ENABLED,
              prices: {
                price: {
                  value: 22.0,
                },
              },
            },
          ],
        },
      },
    };

    expect(getResaleValue(state, 'PW3076840')).toEqual(47);
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {},
    };

    expect(getResaleValue(state, 'PW3076840')).toEqual(null);
  });
});
