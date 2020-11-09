import getBookingPaidAmount from './getBookingPaidAmount';

describe('getBookingPaidAmount', () => {
  it('should return the public api key attached to the booking', () => {
    const state = {
      booking: {
        ALW3371861: {
          prices: {
            paid: {
              value: 243,
              price: '£243.00',
            },
          },
        },
      },
    };

    expect(getBookingPaidAmount(state, 'ALW3371861')).toEqual({
      price: '£243.00',
      value: 243,
    });
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPaidAmount(state, 'BOOKINGREF')).toEqual({});
  });
});
