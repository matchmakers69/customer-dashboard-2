import isBookingPrinted from './isBookingPrinted';

describe('isBookingPrinted', () => {
  it('should return TRUE when booking has been printed.', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          booking_printed: '1',
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
        },
      },
    };

    expect(isBookingPrinted(state, 'PW3076840')).toEqual(true);
  });

  it('should return FALSE when booking has NOT been printed.', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          booking_printed: '0',
          reference: 'FD542534',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
        },
      },
    };

    expect(isBookingPrinted(state, 'PW3076840')).toEqual(false);
  });
});
