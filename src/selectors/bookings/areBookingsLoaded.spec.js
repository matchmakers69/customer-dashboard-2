import areBookingsLoaded from './areBookingsLoaded';

describe('areBookingsLoaded', () => {
  it('should return TRUE when bookings are loaded', () => {
    const state = {
      bookings: {
        loaded: true,
      },
    };

    expect(areBookingsLoaded(state)).toEqual(true);
  });

  it('should return FALSE when bookings are NOT loaded', () => {
    const state = {
      bookings: {
        loaded: false,
      },
    };

    expect(areBookingsLoaded(state)).toEqual(false);
  });
});
