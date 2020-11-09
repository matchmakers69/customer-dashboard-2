import isFamilyBooking from './isFamilyBooking';

describe('isFamilyBooking', () => {
  it('should return TRUE when booking is family booking.', () => {
    const state = {
      booking: {
        PW3076840: {
          family_booking: true,
          reference: 'PW3076840',
        },
      },
    };

    expect(isFamilyBooking(state, 'PW3076840')).toEqual(true);
  });

  it('should return FALSE when booking is NOT family booking.', () => {
    const state = {
      booking: {
        PW3076840: {
          family_booking: false,
          reference: 'PW3076840',
        },
      },
    };

    expect(isFamilyBooking(state, 'PW3076840')).toEqual(false);
  });

  it('should return FALSE when booking is not yet loaded', () => {
    const state = {
      booking: {},
    };

    expect(isFamilyBooking(state, 'PW3076840')).toEqual(false);
  });
});
