import getBookingPaymentPlan from './getBookingPaymentPlan';

describe('getBookingPaymentPlan', () => {
  it('should return specified package payment plan', () => {
    const state = {
      booking: {
        updating: false,
        LV3239990: {
          payment_plan: {
            id: 591937,
            amount: '116.20',
            surcharge: '0.00',
            total_surcharge_amount: '3.00',
            number_of_payments: 2,
            name: 'Monthly',
            next_payment_date: '2019-12-30',
            final_payment_date: '2020-01-30',
            final_payment_adjustment_required: false,
            card: {
              last_four_digits: '6969',
              cardholder_name: 'Bazza',
            },
            type: {
              type: 'M',
              description: 'monthly',
            },
            status: 'Error',
            projection: [
              {
                iso_value: '2019-12-30',
                amount: '61.10',
              },
              {
                iso_value: '2020-01-30',
                amount: '58.10',
              },
            ],
          },
        },
      },
    };

    expect(getBookingPaymentPlan(state, 'LV3239990')).toEqual({
      id: 591937,
      amount: 116.2,
      remainingPayments: 2,
      nextPaymentDate: new Date('2019-12-30T00:00:00.000Z'),
      finalPaymentDate: new Date('2020-01-30T00:00:00.000Z'),
      status: 'Error',
      card: {
        cardholderName: 'Bazza',
        cardNumber: '**** **** **** 6969',
      },
      projection: [
        {
          date: new Date('2019-12-30T00:00:00.000Z'),
          amount: 61.1,
        },
        {
          date: new Date('2020-01-30T00:00:00.000Z'),
          amount: 58.1,
        },
      ],
    });
  });

  it('should return empty object when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPaymentPlan(state, 'LV3239990')).toEqual(false);
  });
});
