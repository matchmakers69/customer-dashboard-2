import getBookingPaymentDueDate from './getBookingPaymentDueDate';

describe('getBookingPaymentDueDate', () => {
  it('should return the public api key attached to the booking', () => {
    const state = {
      booking: {
        ALW3371861: {
          payment_due_date: {
            iso_value: '2020-03-31 23:59:59',
            isotz_value: '2020-03-31T23:59:59+01:00',
          },
        },
      },
    };

    expect(getBookingPaymentDueDate(state, 'ALW3371861')).toEqual({
      iso_value: '2020-03-31 23:59:59',
      isotz_value: '2020-03-31T23:59:59+01:00',
    });
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPaymentDueDate(state, 'BOOKINGREF')).toEqual({});
  });
});
