import getBookingAccommodation from './getBookingAccommodation';

describe('getBookingAccommodation', () => {
  it('should return booking accommodation', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',

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
        },
      },
    };

    expect(getBookingAccommodation(state, 'PW3076840')).toEqual([
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
            value: 0,
            price: '£0.00',
          },
          supplement: {
            value: 868,
            price: '£868.00',
          },
          nights: [
            {
              price: '£0.00',
              value: 0,
              iso_date_value: '2019-04-08',
            },
            {
              price: '£0.00',
              value: 0,
              iso_date_value: '2019-04-09',
            },
            {
              price: '£0.00',
              value: 0,
              iso_date_value: '2019-04-10',
            },
            {
              price: '£0.00',
              value: 0,
              iso_date_value: '2019-04-11',
            },
            {
              price: '£0.00',
              value: 0,
              iso_date_value: '2019-04-12',
            },
            {
              price: '£0.00',
              value: 0,
              iso_date_value: '2019-04-13',
            },
          ],
        },
        id: 143,
        room_id: 1025,
        group_id: 1,
        occupancy: 2,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingAccommodation(state, 'PW3076840')).toEqual([]);
  });
});
