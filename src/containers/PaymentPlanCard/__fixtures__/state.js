/* eslint-disable max-lines */
const state = {
  booking: {
    updating: false,
    TF3180371: {
      payment_plan: {
        id: 591089,
        amount: '98.20',
        surcharge: '0.00',
        total_surcharge_amount: '0.00',
        number_of_payments: 6,
        name: 'Monthly',
        next_payment_date: '2020-01-29',
        final_payment_date: '2020-06-29',
        final_payment_adjustment_required: true,
        card: {
          last_four_digits: '6969',
          cardholder_name: 'Mick Hucknall',
        },
        type: {
          type: 'M',
          description: 'monthly',
        },
        status: 'Active',
        projection: [
          {
            iso_value: '2020-01-29',
            amount: '16.36',
          },
          {
            iso_value: '2020-02-29',
            amount: '16.36',
          },
          {
            iso_value: '2020-03-29',
            amount: '16.36',
          },
          {
            iso_value: '2020-04-29',
            amount: '16.36',
          },
          {
            iso_value: '2020-05-29',
            amount: '16.36',
          },
          {
            iso_value: '2020-06-29',
            amount: '16.40',
          },
        ],
      },
    },
  },
};

export default state;
