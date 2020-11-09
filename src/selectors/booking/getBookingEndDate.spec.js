import getBookingEndDate from './getBookingEndDate';

describe('getBookingEndDate', () => {
  it('should return specified package start date', () => {
    const state = {
      booking: {
        PW3076840: {
          reference: 'PW3076840',
          return_date: {
            iso_value: '2019-10-05 00:00:00',
          },
        },
      },
    };

    expect(getBookingEndDate(state, 'PW3076840')).toEqual(
      '2019-10-05 00:00:00',
    );
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingEndDate(state, 'BOOKINGREF')).toEqual(null);
  });
});
