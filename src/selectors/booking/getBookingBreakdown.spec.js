import { RESALE_SOLD } from '../../constants';
import getBookingBreakdown from './getBookingBreakdown';

describe('getBookingBreakdown', () => {
  it('should return formatted booking breakdown', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          id: 3051925,
          group_size: 1,
          booking_printed: 0,
          family_booking: true,
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          departure_date: {
            iso_value: '2019-06-07',
          },
          return_date: {
            iso_value: '2019-06-08',
          },
          payment_due_date: {
            iso_value: '2019-03-31',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          client: 'Field Day',
          currency: {
            id: 98,
            iso_code: 'GBP',
            exponent: 2,
            symbol: '£',
          },
          payment_status: {
            code: 30,
            value: 'Fully Paid',
          },

          downloads: [
            {
              description: 'eTicket',
              external: false,
              type: 'ticket',
              key: 'gre34tgfdgh54tyhjsdf243',
            },
          ],
          extras: [
            {
              name: 'The Smirnoff Arctic Disco 2020',
              option: {
                id: 8904,
                value:
                  'Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',
              },
              group: {
                id: 2453,
                value: 'Arctic Disco',
              },
              description:
                'The Smirnoff Arctic Disco 2019 - Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',

              price: {
                value: 46.0,

                price: '£46.00',
              },
              id: 2117,
              quantity: 1,
            },
          ],
          insurance: [
            {
              policy_reference: 'Policy Ref',
              policy_type: 'Bronze',
              customer_reference: 'Customer Ref ',
              name: 'Bronze (18-35 yrs old) incl. Winter Sports Cover',
              purchased_date: {
                iso_value: '2019-02-22',
              },
              contact_details: 'Contct Details',
              age: 29,
              duration: {
                days: 90,
              },
              description: 'Description goes here',
              price: {
                value: 19.99,

                price: '£19.99',
              },
              id: 744,
            },
          ],
          tickets: [
            {
              name: 'Weekend Day - Tier 3',
              event_name: 'Field Day',
              prices: {
                price: {
                  value: 77.5,

                  price: '£77.50',
                },
                booking_fee: {
                  value: 7.75,

                  price: '£7.75',
                },
                admin_fee: {
                  value: 0.0,

                  price: '£0.00',
                },
                delivery_charge: {
                  value: 0.0,

                  price: '£0.00',
                },
                total_ticket_price: {
                  value: 85.25,

                  price: '£85.25',
                },
              },
              purchased_date: {
                iso_value: '2019-02-27',
              },
              delivery_option: '',
              event_id: 1247,
              id: 3782,
            },
          ],
          accommodation: [
            {
              start_date: {
                iso_value: '2019-04-08',
              },
              end_date: {
                iso_value: '2019-04-13',
              },
              checkout_date: {
                iso_value: '2019-04-14',
              },
              name: 'Hotel Strass and Sporthotel - Mayrhofen Central ',
              visa_letter_alias: '',
              address: 'Hauptstrasse 470, 470, Austria',
              room_name: 'Austrian Twin/Double - 6 nights Monday Arrival',
              room_type: 'Austrian Twin/Double',
              resort: 'Mayrhofen Central',
              prices: {
                allocations: {
                  value: 0.0,

                  price: '£0.00',
                },
                supplement: {
                  value: 868.0,

                  price: '£868.00',
                },
                nights: [
                  {
                    value: 0.0,
                    iso_date_value: '2019-04-08',
                    price: '£0.00',
                  },
                  {
                    value: 0.0,
                    iso_date_value: '2019-04-09',
                    price: '£0.00',
                  },
                  {
                    value: 0.0,
                    iso_date_value: '2019-04-10',
                    price: '£0.00',
                  },
                  {
                    value: 0.0,
                    iso_date_value: '2019-04-11',
                    price: '£0.00',
                  },
                  {
                    value: 0.0,
                    iso_date_value: '2019-04-12',
                    price: '£0.00',
                  },
                  {
                    value: 0.0,
                    iso_date_value: '2019-04-13',
                    price: '£0.00',
                  },
                ],
              },
              id: 143,
              room_id: 1025,
              group_id: 1,
              occupancy: 2,
            },
          ],
          transport: [
            {
              journey_leg: {
                id: 2,
                value: 'Outbound - Pick Up',
              },
              departure_location: {
                id: 703,
                airport_code: '',
                value: 'Gatwick Airport',
              },
              departure_date: {
                iso_value: '2019-04-08 08:35:00',
                isotz_value: '2019-04-08T08:35:00+01:00',
              },
              departure_location_notes: '',
              arrival_location: {
                id: 641,
                airport_code: '',
                value: 'Innsbruck Airport',
              },
              arrival_date: {
                iso_value: '2019-04-08 11:35:00',
                isotz_value: '2019-04-08T11:35:00+01:00',
              },
              arrival_location_notes: '',
              flight_number: 'BA2690',
              price: {
                value: 32.0,

                price: '£32.00',
              },
              route_id: 3790,
              stop_id: 51950,
            },
            {
              journey_leg: {
                id: 4,
                value: 'Return - Pick Up',
              },
              departure_location: {
                id: 538,
                airport_code: '',
                value: 'Munich Airport',
              },
              departure_date: {
                iso_value: '2019-04-14 21:55:00',
                isotz_value: '2019-04-14T21:55:00+01:00',
              },
              departure_location_notes: '',
              arrival_location: {
                id: 703,
                airport_code: '',
                value: 'Gatwick Airport',
              },
              arrival_date: {
                iso_value: '2019-04-14 22:55:00',
                isotz_value: '2019-04-14T22:55:00+01:00',
              },
              arrival_location_notes: '',
              flight_number: 'EZY8986',
              price: {
                value: 39.0,

                price: '£39.00',
              },
              route_id: 3790,
              stop_id: 48469,
            },
          ],
          payments: [
            {
              payment_date: {
                iso_value: '2019-02-27 01:32:46',
                isotz_value: '2019-02-27T01:32:46+00:00',
              },
              pax: {
                id: 4914367,
                value: 'John Smith',
              },
              type: 'Booking',
              card: {
                type: 'Visa Debit',
                name: 'MR J Smith',
                four_digits: '1234',
              },
              amount: {
                value: 86.75,

                price: '£86.75',
              },
              status: {
                paid: true,
                confirmed: true,
                value: 'Stripe: Payment Successful',
              },
              id: 1890239,
              reference: 'FDF-0003193161',
            },
          ],
          apportionments: [
            {
              apportionment_date: {
                iso_value: '2019-02-27 01:32:46',
                isotz_value: '2019-02-27T01:32:46+00:00',
              },
              parent_pax: {
                id: 4914367,
                name: 'John Smith',
              },
              net_amount: {
                value: 86.75,

                price: '£86.75',
              },
              pax_name: 'John Smith',
              id: 1890240,
              parent_id: 1890239,
              pax_id: 4914367,
              reference: 'FDF-0003193161',
            },
          ],
          package: {
            name: 'Field Day 2019',
            meta_package_name: 'Field Day 2019',
            destination: 'Victoria Park',
            status: {
              code: 3,
              value: 'Online',
            },
            price: {
              value: 0.0,

              price: '£0.00',
            },
            booking_fee: {
              value: 0.0,

              price: '£0.00',
            },
            deposit: {
              value: null,

              price: '£%',
            },
            room_allocation: {
              pax: false,
              group_leader: false,
            },
            coach_allocation: {
              pax: false,
              group_leader: false,
            },
            id: 8691,
          },
          prices: {
            booking_price: {
              value: 86.75,

              price: '£86.75',
            },
            booking_fee: {
              value: 7.75,

              price: '£7.75',
            },
            tickets_booking_fee: {
              value: 7.75,

              price: '£7.75',
            },
            discounts: {
              value: 0.0,

              price: '£0.00',
            },
            referrals: {
              value: 0.0,

              price: '£0.00',
            },
            charges: {
              value: 0.0,

              price: '£0.00',
            },
            total_booking_price: {
              value: 0.0,

              price: '£0.00',
            },
            paid: {
              value: 86.75,

              price: '£86.75',
            },
            deposit: {
              value: 9.25,

              price: '£9.25',
            },
            package_price: {
              value: 0.0,

              price: '£0.00',
            },
            damage_deposit: {
              value: 0.0,

              price: '£0.00',
            },
            accommodation_price: {
              value: 0.0,

              price: '£0.00',
            },
            transport_price: {
              value: 0.0,

              price: '£0.00',
            },
            extras_price: {
              value: 0.0,

              price: '£0.00',
            },
            tickets_price: {
              value: 77.5,

              price: '£77.50',
            },
            insurance_price: {
              value: 0.0,

              price: '£0.00',
            },
            delivery_price: {
              value: 1.5,

              price: '£1.50',
            },
          },
          engines: [
            {
              id: 4096,
              mandatory: true,
              booking_flow: true,
              sort_order: 0,
              value: 'Ticket',
            },
            {
              id: 4,
              mandatory: false,
              booking_flow: true,
              sort_order: 3,
              value: 'Extras',
            },
            {
              id: 20000,
              mandatory: true,
              booking_flow: true,
              sort_order: 6,
              value: 'Delivery',
            },
            {
              id: 64,
              mandatory: true,
              booking_flow: true,
              sort_order: 7,
              value: 'Payment',
            },
          ],

          delivery: [
            {
              delivery_name:
                'UK Delivery (dispatched approx. 4 weeks before Festival)',
              description: 'UK Delivery',
              delivery_price: { value: 6.95, price: '\u00a36.95' },
              allocation_id: 461643,
              require_address: true,
              address_id: '527921',
              type_id: '1',
              type_name: 'Home',
              address_1: '2 Test Avenue',
              address_2: null,
              address_3: null,
              city: 'Manchester',
              postcode: 'M40 3AA',
              country_id: '235',
              country_name: 'United Kingdom',
              tracking_id: null,
            },
          ],

          pax: [
            {
              personal_details: {
                title: '',
                first_name: 'John',
                last_name: 'Smith',
                email: 'test@kaboodle.co.uk',
                telephone_number: '075043953244',
                emergency_contact: {
                  name: '',
                  telephone: '',
                },
                club_membership_number: '',
                sex: '',
                gender: '',
                date_of_birth: '',
              },
              passport: {
                first_name: '',
                middle_names: '',
                last_name: '',
                number: '',
                issue_country: {
                  id: '',
                  value: '',
                },
                nationality: '',
                expiry_date: '',
              },
              prices: {
                package_price: {
                  value: 0.0,

                  price: '£0.00',
                },
                package_booking_fee: {
                  value: 0.0,

                  price: '£0.00',
                },
                extras_price: {
                  value: 0.0,

                  price: '£0.00',
                },
                tickets_price: {
                  value: 77.5,

                  price: '£77.50',
                },
                tickets_booking_fee: {
                  value: 7.75,

                  price: '£7.75',
                },
                tickets_admin_fee: {
                  value: 0.0,

                  price: '£0.00',
                },
                tickets_delivery_charge: {
                  value: 0.0,

                  price: '£0.00',
                },
                total_tickets_fee: {
                  value: 7.75,

                  price: '£7.75',
                },
                delivery_price: {
                  value: 0.0,

                  price: '£1.50',
                },
                discounts: {
                  value: 0.0,

                  price: '£0.00',
                },
                referrals: {
                  value: 0.0,

                  price: '£0.00',
                },
                charges: {
                  value: 0.0,

                  price: '£0.00',
                },
                booking_price: {
                  value: 86.75,

                  price: '£86.75',
                },
                total_booking_price: {
                  value: 0.0,

                  price: '£0.00',
                },
                paid: {
                  value: 86.75,

                  price: '£86.75',
                },
                outstanding_balance: {
                  value: 0.0,

                  price: '£0.00',
                },
                deposit: {
                  value: 9.25,

                  price: '£9.25',
                },
                deposit_outstanding: {
                  value: 0.0,

                  price: '£0.00',
                },
              },
              eticket_barcode: 5848895491011,
              id: 4914367,
              customer_id: 1138855,
              lead_pax: true,
              cancelled: false,
            },
          ],
          payment_plans_list: '',
        },
      },
    };

    expect(getBookingBreakdown(state, 'PW3076840')).toEqual([
      {
        title: 'Accommodation',
        type: 'accommodation',
        line_items: [
          {
            title: 'Hotel Strass and Sporthotel - Mayrhofen Central ',
            subtitle: 'Austrian Twin/Double - 6 nights Monday Arrival',
            quantity: 1,
            cost: 868,
          },
        ],
      },
      {
        title: 'Tickets',
        type: 'tickets',
        line_items: [
          {
            title: 'Field Day - Weekend Day - Tier 3',
            subtitle: '£77.50 + £7.75 Booking Fee',
            badges: [],
            quantity: 1,
            cost: 85.25,
            costText: null,
            disabled: false,
          },
        ],
      },
      {
        title: 'Transport',
        type: 'transport',
        line_items: [
          {
            title: 'Gatwick Airport → Innsbruck Airport',
            subtitle: '8th April 2019 - 08:35',
            quantity: 1,
            cost: 32,
          },
          {
            title: 'Munich Airport → Gatwick Airport',
            subtitle: '14th April 2019 - 21:55',
            quantity: 1,
            cost: 39,
          },
        ],
      },
      {
        title: 'Extras',
        type: 'extras',
        line_items: [
          {
            title:
              'The Smirnoff Arctic Disco 2020 - Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',
            quantity: 1,
            cost: 46,
          },
        ],
      },
      {
        title: 'Insurance',
        type: 'insurance',
        line_items: [
          {
            title: 'Bronze (18-35 yrs old) incl. Winter Sports Cover',
            quantity: 1,
            cost: 19.99,
          },
        ],
      },
      {
        title: 'Delivery',
        type: 'delivery',
        line_items: [
          {
            title: 'UK Delivery (dispatched approx. 4 weeks before Festival)',
            quantity: 1,
            cost: 6.95,
          },
        ],
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingBreakdown(state, 'PW3076840')).toEqual([]);
  });

  it('should return resale fees when booking has resold tickets with a booking fee greater than 0', () => {
    const state = {
      booking: {
        loaded: false,

        PW143245: {
          accommodation: [],
          tickets: [
            {
              name: 'Weekend Day - Tier 3',
              event_name: 'Field Day',
              resale: RESALE_SOLD,
              prices: {
                price: {
                  value: 2,
                },
                total_ticket_price: {
                  value: 4,
                },
                booking_fee: {
                  value: 2,
                },
              },
            },
            {
              name: 'Weekend Day - Tier 3',
              event_name: 'Field Day',
              resale: RESALE_SOLD,
              prices: {
                price: {
                  value: 2,
                },
                total_ticket_price: {
                  value: 4,
                },
                booking_fee: {
                  value: 2,
                },
              },
            },
          ],
          extras: [],
          transport: [],
          insurance: [],
          delivery: [],
          prices: {
            discounts: {
              value: 0,
            },
          },
        },
      },
    };

    expect(getBookingBreakdown(state, 'PW143245')).toEqual([
      {
        title: 'Tickets',
        type: 'tickets',
        line_items: [
          {
            title: 'Field Day - Weekend Day - Tier 3',
            subtitle: null,
            badges: [],
            quantity: 2,
            cost: 8,
            costText: 'Resold',
            disabled: true,
          },
        ],
      },
      {
        title: 'Fees',
        line_items: [
          {
            title: 'Resale Fees',
            cost: 4,
          },
        ],
      },
    ]);
  });

  it('should NOT return resale fees when booking has resold tickets with a no booking fees', () => {
    const state = {
      booking: {
        loaded: false,

        PW143245: {
          accommodation: [],
          tickets: [
            {
              name: 'Weekend Day - Tier 3',
              event_name: 'Field Day',
              resale: RESALE_SOLD,
              prices: {
                price: {
                  value: 2,
                },
                total_ticket_price: {
                  value: 2,
                },
                booking_fee: {
                  value: 0,
                },
              },
            },
            {
              name: 'Weekend Day - Tier 3',
              event_name: 'Field Day',
              resale: RESALE_SOLD,
              prices: {
                price: {
                  value: 2,
                },
                total_ticket_price: {
                  value: 2,
                },
                booking_fee: {
                  value: 0,
                },
              },
            },
          ],
          extras: [],
          transport: [],
          insurance: [],
          delivery: [],
          prices: {
            discounts: {
              value: 0,
            },
          },
        },
      },
    };

    expect(getBookingBreakdown(state, 'PW143245')).toEqual([
      {
        title: 'Tickets',
        type: 'tickets',
        line_items: [
          {
            title: 'Field Day - Weekend Day - Tier 3',
            subtitle: null,
            badges: [],
            quantity: 2,
            cost: 4,
            costText: 'Resold',
            disabled: true,
          },
        ],
      },
    ]);
  });

  it('should return empty array when no items on booking', () => {
    const state = {
      booking: {
        loaded: true,

        PW143245: {
          accommodation: [],
          tickets: [],
          extras: [],
          transport: [],
          insurance: [],
          delivery: [],
          prices: {
            discounts: {
              value: 0,
            },
          },
        },
      },
    };

    expect(getBookingBreakdown(state, 'PW3076840')).toEqual([]);
  });

  it('should return discounts when discount is greater than 0', () => {
    const state = {
      booking: {
        loaded: true,

        PW143245: {
          accommodation: [],
          tickets: [],
          extras: [],
          transport: [],
          insurance: [],
          delivery: [],
          prices: {
            discounts: {
              value: 20,
            },
          },
        },
      },
    };

    expect(getBookingBreakdown(state, 'PW143245')).toEqual([
      {
        title: 'Discounts',
        line_items: [
          {
            title: 'Discount',
            cost: -20,
          },
        ],
      },
    ]);
  });

  it('should NOT return discounts when no discounts on booking', () => {
    const state = {
      booking: {
        loaded: true,

        PW143245: {
          accommodation: [],
          tickets: [],
          extras: [],
          transport: [],
          insurance: [],
          delivery: [],
          prices: {
            discounts: {
              value: 0,
            },
          },
        },
      },
    };

    expect(getBookingBreakdown(state, 'PW143245')).toEqual([]);
  });
});
