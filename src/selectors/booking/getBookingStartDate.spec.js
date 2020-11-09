import getBookingStartDate from './getBookingStartDate';

describe('getBookingStartDate', () => {
  it('should return specified package start date', () => {
    const state = {
      booking: {
        currentBooking: 'PW3076840',
        PW3076840: {
          reference: 'PW3076840',
          departure_date: {
            iso_value: '2019-10-05 00:00:00',
          },
        },
      },
    };

    expect(getBookingStartDate(state, 'PW3076840')).toEqual(
      '2019-10-05 00:00:00',
    );
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingStartDate(state, 'BOOKINGREF')).toEqual(null);
  });
});
