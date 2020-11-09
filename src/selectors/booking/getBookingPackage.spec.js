import getBookingPackage from './getBookingPackage';

describe('getBookingPackage', () => {
  it('should return booking package', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          agent: {
            id: 457878,
            value: 'John Smith',
          },
          departure_date: {
            iso_value: '2019-06-07',
          },
          return_date: {
            iso_value: '2019-06-08',
          },
          package: {
            name: 'Field Day 2019',
            meta_package_name: 'Field Day 2019',
            destination: 'Victoria Park',
            status: {
              code: '3',
              value: 'Online',
            },
            prices: {
              price: {
                value: 0,
                display_value: '£0.00',
              },
              booking_fee: {
                value: 0,
                display_value: '£0.00',
              },
              deposit: {
                value: '%',
                display_value: '£%',
              },
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
        },
      },
    };

    expect(getBookingPackage(state, 'PW3076840')).toEqual({
      endDate: '2019-06-08',
      startDate: '2019-06-07',
      title: 'Field Day 2019',
    });
  });

  it('should return empty object when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingPackage(state, 'PW3076840')).toEqual({});
  });
});
