import getBookingId from './getBookingId';

describe('getBookingId', () => {
  it('should return the booking ID', () => {
    const state = {
      booking: {
        ALW3371861: {
          id: 'testId1234',
        },
      },
    };

    expect(getBookingId(state, 'ALW3371861')).toEqual('testId1234');
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingId(state, 'BOOKINGREF')).toEqual(null);
  });
});
