import getUpcomingBookings from './getUpcomingBookings';

describe('getUpcomingBookings', () => {
  it('it should return bookings from state in chronological order', () => {
    const state = {
      bookings: {
        loaded: true,
        items: {
          upcoming: [
            {
              id: 123456,
              reference: 'PW123456',
              package_name: 'Printworks 2019 - Stephan Bodzin Curates',
              booked_date: {
                iso_value: '2019-03-18 23:44:19',
                isotz_value: '2019-03-18T23:44:19+00:00',
              },
              departure_date: {
                iso_value: '2019-04-19',
              },
              return_date: {
                iso_value: '2019-04-19',
              },
              payment_deadline_date: {
                iso_value: '2019-01-28',
              },
            },
            {
              id: 123456,
              reference: 'PW123456',
              package_name: 'Printworks 2019 - Stephan Bodzin Curates',
              booked_date: {
                iso_value: '2019-03-18 23:44:19',
                isotz_value: '2019-03-18T23:44:19+00:00',
              },
              departure_date: {
                iso_value: '2019-03-19',
              },
              return_date: {
                iso_value: '2019-03-19',
              },
              payment_deadline_date: {
                iso_value: '2019-01-28',
              },
            },
          ],
        },
      },
    };

    expect(getUpcomingBookings(state)).toEqual([
      {
        id: 123456,
        reference: 'PW123456',
        package_name: 'Printworks 2019 - Stephan Bodzin Curates',
        booked_date: {
          iso_value: '2019-03-18 23:44:19',
          isotz_value: '2019-03-18T23:44:19+00:00',
        },
        departure_date: {
          iso_value: '2019-03-19',
        },
        return_date: {
          iso_value: '2019-03-19',
        },
        payment_deadline_date: {
          iso_value: '2019-01-28',
        },
      },
      {
        id: 123456,
        reference: 'PW123456',
        package_name: 'Printworks 2019 - Stephan Bodzin Curates',
        booked_date: {
          iso_value: '2019-03-18 23:44:19',
          isotz_value: '2019-03-18T23:44:19+00:00',
        },
        departure_date: {
          iso_value: '2019-04-19',
        },
        return_date: {
          iso_value: '2019-04-19',
        },
        payment_deadline_date: {
          iso_value: '2019-01-28',
        },
      },
    ]);
  });
});
