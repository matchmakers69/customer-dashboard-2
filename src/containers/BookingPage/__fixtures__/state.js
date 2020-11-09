/* eslint-disable max-lines */
export default {
  booking: {
    GP123456: {
      reference: 'GP123456',
      id: '123456',
      payment_plan: false,
      group_size: 1,
      booking_printed: '0',
      family_booking: true,
      created_date: {
        iso_value: '2019-06-02 13:24:35',
        isotz_value: '2019-06-02T13:24:35+01:00',
      },
      completed_date: {
        iso_value: '2019-06-02 13:26:15',
        isotz_value: '2019-06-02T13:26:15+01:00',
      },
      departure_date: {
        iso_value: '2019-06-08 00:00:00',
        isotz_value: '2019-06-08T00:00:00+01:00',
      },
      return_date: {
        iso_value: '2019-06-09 00:00:00',
        isotz_value: '2019-06-09T00:00:00+01:00',
      },
      payment_due_date: {
        iso_value: '2018-11-16 23:59:59',
        isotz_value: '2018-11-16T23:59:59+00:00',
      },
      status: {
        code: '70',
        value: 'Complete',
      },
      client: 'Guilty Pleasures',
      currency: {
        id: '98',
        iso_code: '98',
        exponent: '2',
        symbol: '£',
      },
      payment_status: {
        code: '30',
        value: 'Fully Paid',
      },
      downloads: [
        {
          description: 'Booking Confirmation',
          key:
            'ZGVmNTAyMDAzYTgzNzdmYTNkZmI1Mjk2ZTk2YmIxMTY3M2EyYzQ4OTRkNjkzOGU1ZGMyMjdhOGE5MmE2NmM2MzFmZjliMmRlZGFlNDE2MTQ2NGE4YmJiNjY3YTA1NmZkMmMwN2YxNGJkNDlhOTc2MTc0YjAxMzNhZTJjZTM0OTVmZjZmZTIwNzBkNmRjNDgzYjY3YTI5NzU5ODFiMDdlYzA2ZmVlNDk3M2JlM2I4OWMzMGVhY2JkY2RkY2E0NDgxYTk3ODIwNGY4ZGZlNzdhOGFlZjNjMjNkNjM5NmNlM2EwNTYzOWQ1NDhmMWRiNjBkNzA5OTA2MjgxNjY3ZDk0ZmRiM2Y4OGMwMTQyNDQ2NDdiNGM1OGIyYTllODBjY2Y1YTA2ZTM2MmRjNQ',
          external: false,
          type: 'confirmation',
        },
      ],
      extras: [],
      insurance: [],
      tickets: [
        {
          name: 'General Admission',
          event_name: 'Guilty Pleasures 8th June 2019',
          prices: {
            price: {
              value: 10,
              price: '£10.00',
            },
            booking_fee: {
              value: 1,
              price: '£1.00',
            },
            admin_fee: {
              value: 0,
              price: '£0.00',
            },
            delivery_charge: {
              value: 0,
              price: '£0.00',
            },
            total_ticket_price: {
              value: 11,
              price: '£11.00',
            },
          },
          purchased_date: {
            iso_value: '2019-06-02 14:12:01',
            isotz_value: '2019-06-02T14:12:01+01:00',
          },
          delivery_option: null,
          event_id: '1419',
          ticket_type_id: '4366',
          id: '4002070',
          pax_id: '5046950',
        },
      ],
      accommodation: [],
      transport: [],
      payments: [
        {
          payment_date: {
            iso_value: '2019-06-02 13:26:14',
            isotz_value: '2019-06-02T13:26:14+01:00',
          },
          pax: {
            id: '5046950',
            value: 'John Smith',
          },
          type: 'Booking',
          card: {
            type: 'Visa Debit',
            name: '',
            four_digits: '3101',
          },
          amount: '11.00',
          status: {
            paid: '1',
            confirmed: true,
            value: 'Stripe: Payment Successful',
          },
          id: '2111486',
          reference: 'GP-0003375958',
        },
      ],
      apportionments: [
        {
          apportionment_date: {
            iso_value: '2019-06-02 13:26:14',
            isotz_value: '2019-06-02T13:26:14+01:00',
          },
          parent_pax: {
            id: '5046950',
            name: 'John Smith',
          },
          net_amount: {
            value: 11,
            price: '£11.00',
          },
          pax_name: 'John Smith',
          id: '2111487',
          parent_id: '2111486',
          pax_id: '5046950',
          reference: 'GP-0003375958',
        },
      ],
      delivery: [
        {
          delivery_name: 'UK Delivery',
          description: 'Royal Mail UK Delivery',
          delivery_price: {
            value: 4.4,
            price: '£4.40',
          },
          allocation_id: 466398,
          require_address: true,
          address_id: null,
          type_id: null,
          type_name: null,
          address_1: '2 Test Avenue',
          address_2: null,
          address_3: null,
          city: 'Manchester',
          county: 'Greater Manchester',
          postcode: 'M1 5ND',
          country_id: null,
          country_name: null,
          tracking_id: 'RM123456',
        },
      ],
      package: {
        name: 'Guilty Pleasures 8th June 2019',
        meta_package_name: 'Guilty Pleasures 2019',
        destination: 'Electric Ballroom',
        status: {
          code: 3,
          value: 'Online',
        },
        price: {
          value: 0,
          price: '£0',
        },
        booking_fee: {
          value: 0,
          price: '£0',
        },
        deposit: {
          value: 0,
          price: '£0',
        },
        room_allocation: {
          group_leader: false,
          pax: false,
        },
        coach_allocation: {
          group_leader: false,
          pax: false,
        },
        id: '8972',
      },
      prices: {
        booking_price: {
          value: 11,
          price: '£11.00',
        },
        booking_fee: {
          value: 1,
          price: '£1.00',
        },
        tickets_booking_fee: {
          value: 1,
          price: '£1.00',
        },
        discounts: {
          value: 0,
          price: '£0.00',
        },
        referrals: {
          value: 0,
          price: '£0.00',
        },
        charges: {
          value: 0,
          price: '£0.00',
        },
        total_booking_price: {
          value: 11,
          price: '£11.00',
        },
        paid: {
          value: 11,
          price: '£11.00',
        },
        deposit: {
          value: 0,
          price: '£0.00',
        },
        package_price: {
          value: 0,
          price: '£0.00',
        },
        damage_deposit: {
          value: 0,
          price: '£0.00',
        },
        accommodation_price: {
          value: 0,
          price: '£0.00',
        },
        transport_price: {
          value: 0,
          price: '£0.00',
        },
        extras_price: {
          value: 0,
          price: '£0.00',
        },
        tickets_price: {
          value: 10,
          price: '£10.00',
        },
        insurance_price: {
          value: 0,
          price: '£0.00',
        },
        delivery_price: {
          value: 0,
          price: '£0.00',
        },
      },
      engines: [
        {
          id: 48,
          mandatory: false,
          booking_flow: false,
          sort_order: 3,
          value: 'Login',
        },
        {
          id: 4096,
          mandatory: true,
          booking_flow: true,
          sort_order: 6,
          value: 'Ticket',
        },
        {
          id: 20000,
          mandatory: true,
          booking_flow: true,
          sort_order: 7,
          value: 'Delivery',
        },
        {
          id: 64,
          mandatory: true,
          booking_flow: true,
          sort_order: 8,
          value: 'Payment',
        },
      ],
      pax: [
        {
          personal_details: {
            title: 'Mr',
            first_name: 'Josh',
            last_name: 'McEwen',
            email: 'josh.mcewen@kaboodle.co.uk',
            telephone_number: '07592532641',
            emergency_contact: {
              name: 'John Smith',
              telephone: '07592532641',
            },
            club_membership_number: null,
            sex: 'Female',
            gender: 'Prefer not to say',
            date_of_birth: '1998-04-19',
          },
          passport: {
            first_name: null,
            middle_names: null,
            last_name: null,
            number: '',
            issue_country: {
              id: '-1',
              value: null,
            },
            nationality: '',
            expiry_date: '0000-00-00',
          },
          prices: {
            package_price: {
              value: 0,
              price: '£0.00',
            },
            package_booking_fee: {
              value: 0,
              price: '£0.00',
            },
            extras_price: {
              value: 0,
              price: '£0.00',
            },
            tickets_price: {
              value: 10,
              price: '£10.00',
            },
            tickets_booking_fee: {
              value: 1,
              price: '£1.00',
            },
            tickets_admin_fee: {
              value: 0,
              price: '£0.00',
            },
            tickets_delivery_charge: {
              value: 0,
              price: '£0.00',
            },
            total_tickets_fee: {
              value: 1,
              price: '£1.00',
            },
            delivery_price: {
              value: 0,
              price: '£0.00',
            },
            discounts: {
              value: 0,
              price: '£0.00',
            },
            referrals: {
              value: 0,
              price: '£0.00',
            },
            charges: {
              value: 0,
              price: '£0.00',
            },
            booking_price: {
              value: 11,
              price: '£11.00',
            },
            total_booking_price: {
              value: 11,
              price: '£11.00',
            },
            paid: {
              value: 11,
              price: '£11.00',
            },
            outstanding_balance: {
              value: 0,
              price: '£0.00',
            },
            deposit: {
              value: 0,
              price: '£0.00',
            },
            deposit_outstanding: {
              value: 0,
              price: '£0.00',
            },
          },
          eticket_barcode: '2625509967936',
          id: '5046950',
          customer_id: '688301',
          lead_pax: true,
          cancelled: false,
        },
      ],
      resalable: true,
    },
  },
  bookings: {
    loaded: false,
    bookings: [],
  },
  customer: {
    loaded: true,
    personal_details: {
      first_name: 'Joe',
      last_name: 'Bloggs',
    },
  },
};
