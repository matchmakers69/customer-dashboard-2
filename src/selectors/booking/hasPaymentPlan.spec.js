import hasPaymentPlan from './hasPaymentPlan';

describe('hasPaymentPlan', () => {
  it('should return true if a payment plan exists', () => {
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
              last_four_digits: '',
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

    expect(hasPaymentPlan(state, 'LV3239990')).toEqual(true);
  });

  it('should return false if a payment plan does not exist', () => {
    const state = {
      booking: {
        updating: false,
        LV3239990: {
          payment_plan: false,
        },
      },
    };

    expect(hasPaymentPlan(state, 'LV3239990')).toEqual(false);
  });

  // Test for known issue
  it('should return false if a payment plan is incorrectly cast as an array', () => {
    const state = {
      booking: {
        updating: false,
        LV3239990: {
          payment_plan: [],
        },
      },
    };

    expect(hasPaymentPlan(state, 'LV3239990')).toEqual(false);
  });

  it('should return false when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(hasPaymentPlan(state, 'LV3239990')).toEqual(false);
  });
});
