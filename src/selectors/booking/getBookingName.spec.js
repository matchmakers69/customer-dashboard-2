import getBookingName from './getBookingName';

describe('getBookingName', () => {
  it('should return specified booking name', () => {
    const state = {
      booking: {
        PW3076840: {
          reference: 'PW3076840',
          package: {
            name: 'This is the Booking Name',
          },
        },
      },
    };

    expect(getBookingName(state, 'PW3076840')).toEqual(
      'This is the Booking Name',
    );
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingName(state, 'BOOKINGREF')).toEqual(null);
  });
});
