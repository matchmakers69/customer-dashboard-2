import getBookingPayments from './getBookingPayments';

describe('getBookingPayments', () => {
  it('should return specified package start date', () => {
    const state = {
      booking: {
        currentBooking: 'PW3076840',
        PW3076840: {
          payments: [
            {
              payment_date: {
                iso_value: '2019-11-09 20:59:28',
                isotz_value: '2019-11-09T20:59:28+00:00',
              },
              pax: { id: '5345028', value: 'Joe Bloggs' },
              type: 'Deposit',
              card: {
                type: 'Visa Debit',
                name: 'Joe Bloggs',
                four_digits: '1234',
              },
              amount: '48.00',
              status: {
                paid: true,
                confirmed: true,
                value: 'Stripe: Payment Successful',
              },
              id: '2493706',
              reference: 'TF-0003678008',
            },
            {
              payment_date: {
                iso_value: '2019-12-09 16:27:07',
                isotz_value: '2019-12-09T16:27:07+00:00',
              },
              pax: { id: '5345028', value: 'Alex Martin' },
              type: 'Booking',
              card: {
                type: 'Payment Plan',
                name: 'Joe Bloggs',
                four_digits: '1234',
              },
              amount: '30.00',
              status: {
                paid: true,
                confirmed: true,
                value: 'Stripe: Payment Successful',
              },
              id: '2549768',
              reference: 'TF-0003725917',
            },
            {
              payment_date: {
                iso_value: '2020-01-09 16:27:05',
                isotz_value: '2020-01-09T16:27:05+00:00',
              },
              pax: { id: '5345028', value: 'Alex Martin' },
              type: 'Booking',
              card: {
                type: 'Payment Plan',
                name: 'Joe Bloggs',
                four_digits: '1234',
              },
              amount: '30.00',
              status: {
                paid: true,
                confirmed: true,
                value: 'Stripe: Payment Successful',
              },
              id: '2589298',
              reference: 'TF-0003765911',
            },
          ],
        },
      },
    };

    expect(getBookingPayments(state, 'PW3076840')).toEqual([
      {
        amount: '48.00',
        date: new Date('2019-11-09 20:59:28'),
        paymentMethod: '1234',
        reference: 'TF-0003678008',
        status: 'Stripe: Payment Successful',
        type: 'Deposit',
        paid: true,
      },
      {
        amount: '30.00',
        date: new Date('2019-12-09 16:27:07'),
        paymentMethod: '1234',
        reference: 'TF-0003725917',
        status: 'Stripe: Payment Successful',
        type: 'Booking',
        paid: true,
      },
      {
        amount: '30.00',
        date: new Date('2020-01-09 16:27:05'),
        paymentMethod: '1234',
        reference: 'TF-0003765911',
        status: 'Stripe: Payment Successful',
        type: 'Booking',
        paid: true,
      },
    ]);
  });

  it('should return null when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPayments(state, 'BOOKINGREF')).toEqual([]);
  });
});
