import { GET_BOOKINGS_FAILED, GET_BOOKINGS_SUCCESS } from './types';
import { getBookingsFailed, getBookingsSuccess } from './actions';

import reducer from './reducers';

describe('bookings', () => {
  it('Returns initial state when a matching actions is not passed through', () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      loaded: false,
      items: [],
    });
  });

  it(`Sets loaded state to TRUE when ${GET_BOOKINGS_SUCCESS} is dispatched`, () => {
    expect(reducer({ loaded: false }, getBookingsSuccess())).toEqual({
      loaded: true,
    });
  });

  it(`Sets bookings when ${GET_BOOKINGS_SUCCESS} is dispatched`, () => {
    const bookings = [
      {
        id: 3052534,
        reference: 'PW3052534',
        package_name: 'Printworks 2019 - AVA London',
        booked_date: {
          iso_value: '2019-02-28 01:11:34',
          isotz_value: '2019-02-28T01:11:34+00:00',
        },
        departure_date: {
          iso_value: '2019-03-15',
        },
        return_date: {
          iso_value: '2019-03-16',
        },
        payment_deadline_date: {
          iso_value: '2018-11-28',
        },
        booking_price: 36.75,
      },
    ];

    expect(reducer({ items: [] }, getBookingsSuccess(bookings))).toEqual({
      loaded: true,
      items: bookings,
    });
  });

  it(`Sets loaded state to FALSE when ${GET_BOOKINGS_FAILED} is dispatched`, () => {
    expect(reducer({ loaded: true }, getBookingsFailed())).toEqual({
      loaded: false,
    });
  });
});
