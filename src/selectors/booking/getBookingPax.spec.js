import getBookingPax from './getBookingPax';

describe('getBookingPax', () => {
  it('should return booking pax when booking loaded', () => {
    const state = {
      booking: {
        PW3076840: {
          pax: [{ name: 'John Smith' }],
        },
      },
    };

    expect(getBookingPax(state, 'PW3076840')).toEqual([{ name: 'John Smith' }]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {},
    };

    expect(getBookingPax(state, 'PW3076840')).toEqual([]);
  });
});
