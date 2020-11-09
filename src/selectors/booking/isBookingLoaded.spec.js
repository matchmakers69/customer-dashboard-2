import isBookingLoaded from './isBookingLoaded';

describe('isBookingLoaded', () => {
  it('should return TRUE when current booking is loaded.', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
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

    expect(isBookingLoaded(state, 'PW3076840')).toEqual(true);
  });

  it('should return FALSE when current booking is undefined.', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
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

    expect(isBookingLoaded(state, 'DIFFERENT_BOOKING')).toEqual(false);
  });
});
