/* eslint-disable max-lines */
const state = {
  booking: {
    updating: false,
    TF3180371: {
      reference: 'TF3180371',
      payments: [
        {
          payment_date: {
            iso_value: '2019-07-29 19:27:24',
            isotz_value: '2019-07-29T19:27:24+01:00',
          },
          pax: {
            id: '5145338',
            value: 'John Doe',
          },
          type: 'Deposit',
          card: {
            type: 'Visa Debit',
            name: 'John Doe',
            four_digits: '4242',
          },
          amount: '36.00',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2242659',
          reference: 'TF-0003511090',
        },
        {
          payment_date: {
            iso_value: '2019-08-29 17:31:01',
            isotz_value: '2019-08-29T17:31:01+01:00',
          },
          pax: {
            id: '5145338',
            value: 'John Doe',
          },
          type: 'Booking',
          card: {
            type: 'Payment Plan',
            name: 'John Doe',
            four_digits: '4242',
          },
          amount: '16.36',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2397174',
          reference: 'TF-0003602323',
        },
        {
          payment_date: {
            iso_value: '2019-09-29 17:32:27',
            isotz_value: '2019-09-29T17:32:27+01:00',
          },
          pax: {
            id: '5145338',
            value: 'John Doe',
          },
          type: 'Booking',
          card: {
            type: 'Payment Plan',
            name: 'John Doe',
            four_digits: '4242',
          },
          amount: '16.36',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2430059',
          reference: 'TF-0003628025',
        },
        {
          payment_date: {
            iso_value: '2019-10-29 16:32:34',
            isotz_value: '2019-10-29T16:32:34+00:00',
          },
          pax: {
            id: '5145338',
            value: 'John Doe',
          },
          type: 'Booking',
          card: {
            type: 'Payment Plan',
            name: 'John Doe',
            four_digits: '4242',
          },
          amount: '16.36',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2473063',
          reference: 'TF-0003658824',
        },
        {
          payment_date: {
            iso_value: '2019-11-29 16:32:00',
            isotz_value: '2019-11-29T16:32:00+00:00',
          },
          pax: {
            id: '5145338',
            value: 'John Doe',
          },
          type: 'Booking',
          card: {
            type: 'Payment Plan',
            name: 'John Doe',
            four_digits: '4242',
          },
          amount: '16.36',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2518053',
          reference: 'TF-0003700860',
        },
        {
          payment_date: {
            iso_value: '2019-12-29 16:31:44',
            isotz_value: '2019-12-29T16:31:44+00:00',
          },
          pax: {
            id: '5145338',
            value: 'John Doe',
          },
          type: 'Booking',
          card: {
            type: 'Payment Plan',
            name: 'John Doe',
            four_digits: '4242',
          },
          amount: '16.36',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2571533',
          reference: 'TF-0003746323',
        },
      ],
      apportionments: [
        {
          apportionment_date: {
            iso_value: '2019-07-29 19:27:24',
            isotz_value: '2019-07-29T19:27:24+01:00',
          },
          parent_pax: {
            id: '5145338',
            name: 'John Doe',
          },
          net_amount: {
            value: 36,
            price: '£36.00',
          },
          pax_name: 'John Doe',
          id: '2242660',
          parent_id: '2242659',
          pax_id: '5145338',
          reference: 'TF-0003511090',
        },
        {
          apportionment_date: {
            iso_value: '2019-08-29 17:31:01',
            isotz_value: '2019-08-29T17:31:01+01:00',
          },
          parent_pax: {
            id: '5145338',
            name: 'John Doe',
          },
          net_amount: {
            value: 16.36,
            price: '£16.36',
          },
          pax_name: 'John Doe',
          id: '2397175',
          parent_id: '2397174',
          pax_id: '5145338',
          reference: 'TF-0003602323',
        },
        {
          apportionment_date: {
            iso_value: '2019-09-29 17:32:27',
            isotz_value: '2019-09-29T17:32:27+01:00',
          },
          parent_pax: {
            id: '5145338',
            name: 'John Doe',
          },
          net_amount: {
            value: 16.36,
            price: '£16.36',
          },
          pax_name: 'John Doe',
          id: '2430060',
          parent_id: '2430059',
          pax_id: '5145338',
          reference: 'TF-0003628025',
        },
        {
          apportionment_date: {
            iso_value: '2019-10-29 16:32:34',
            isotz_value: '2019-10-29T16:32:34+00:00',
          },
          parent_pax: {
            id: '5145338',
            name: 'John Doe',
          },
          net_amount: {
            value: 16.36,
            price: '£16.36',
          },
          pax_name: 'John Doe',
          id: '2473064',
          parent_id: '2473063',
          pax_id: '5145338',
          reference: 'TF-0003658824',
        },
        {
          apportionment_date: {
            iso_value: '2019-11-29 16:32:00',
            isotz_value: '2019-11-29T16:32:00+00:00',
          },
          parent_pax: {
            id: '5145338',
            name: 'John Doe',
          },
          net_amount: {
            value: 16.36,
            price: '£16.36',
          },
          pax_name: 'John Doe',
          id: '2518054',
          parent_id: '2518053',
          pax_id: '5145338',
          reference: 'TF-0003700860',
        },
        {
          apportionment_date: {
            iso_value: '2019-12-29 16:31:44',
            isotz_value: '2019-12-29T16:31:44+00:00',
          },
          parent_pax: {
            id: '5145338',
            name: 'John Doe',
          },
          net_amount: {
            value: 16.36,
            price: '£16.36',
          },
          pax_name: 'John Doe',
          id: '2571534',
          parent_id: '2571533',
          pax_id: '5145338',
          reference: 'TF-0003746323',
        },
      ],

      prices: {
        total_booking_price: {
          value: 216,
          price: '£216.00',
        },
      },
      package: {
        name: 'Truck Festival Payment Plan - 2020',
      },
      departure_date: {
        iso_value: '2020-07-30 00:00:00',
        isotz_value: '2020-07-30T00:00:00+01:00',
      },
      return_date: {
        iso_value: '2020-08-02 00:00:00',
        isotz_value: '2020-08-02T00:00:00+01:00',
      },
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
          last_four_digits: '4242',
          cardholder_name: 'John Doe',
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
  customer: {
    loaded: true,
    id: 930890,
    email_verification_required: false,
    personal_details: {
      sex: 'M',
      gender: 'Male',
      date_of_birth: '1993-11-14',
      title: '',
      first_name: 'Test',
      last_name: "O'User",
      email: 'test@kaboodle.co.uk',
      phone: '07841 820 961',
      emergency_contact: {
        full_name: '',
        telephone: '',
      },
      club_membership_number: '',
    },
    type: {
      id: 10,
      value: 'Passenger',
    },
    client_group: {
      id: 26,
      value: 'Kaboodle',
    },
    passport: {
      expiry_date: '2021-04-16',
      full_name: '',
      first_name: '',
      middle_names: '',
      last_name: 'Tester',
      number: '',
      nationality: '',
      issue_country: {
        code: 'GB',
        name: 'United Kingdom',
      },
    },
    address: {
      id: 763889,
      default_address: true,
      type: 'Home',
      valid_from_date: {
        iso_value: '',
        isotz_value: '',
      },
      valid_to_date: {
        iso_value: '',
        isotz_value: '',
      },
      address_1: '3 The Stables, Wilmslow Road',
      address_2: 'Wilmslow Road',
      address_3: '',
      city: 'Manchester',
      county: '',
      postcode: 'M205PG',
      country: {
        code: 'GB',
        name: 'United Kingdom',
      },
    },
    organisation: {
      id: -1,
      value: 'None',
    },
    ssrs: [],
  },
  client: {
    error: null,
    genders: [],
    countries: [
      {
        id: 1,
        code: 'AF',
        name: 'Afghanistan',
      },
      {
        id: 2,
        code: 'AX',
        name: 'Åland Islands',
      },
      {
        id: 3,
        code: 'AL',
        name: 'Albania',
      },
      {
        id: 4,
        code: 'DZ',
        name: 'Algeria',
      },
      {
        id: 5,
        code: 'AS',
        name: 'American Samoa',
      },
      {
        id: 6,
        code: 'AD',
        name: 'Andorra',
      },
    ],
  },
  payments: {
    updating: false,
  },
};

export default state;
