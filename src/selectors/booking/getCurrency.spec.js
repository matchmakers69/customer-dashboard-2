import getCurrency from './getCurrency';

describe('getCurrency', () => {
  it('should return booking currency', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          currency: {
            id: '98',
            iso_code: '98',
            exponent: '2',
            symbol: '£',
          },
        },
      },
    };

    expect(getCurrency(state, 'PW3076840')).toEqual({
      id: '98',
      iso_code: '98',
      exponent: '2',
      symbol: '£',
    });
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getCurrency(state, 'PW3076840')).toEqual(null);
  });
});
