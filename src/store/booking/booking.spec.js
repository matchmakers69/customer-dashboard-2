import {
  GET_BOOKING_SUCCESS,
  UPDATE_BOOKING_DELIVERY,
  UPDATE_BOOKING_RESALE,
  UPDATE_BOOKING_RESALE_FAILED,
  UPDATE_BOOKING_RESALE_SUCCESS,
} from './types';
import {
  getBookingSuccess,
  updateBookingDelivery,
  updateBookingResale,
  updateBookingResaleFailed,
  updateBookingResaleSuccess,
} from './actions';

import reducer from './reducers';

describe('booking', () => {
  it('Returns initial state when a matching actions is not passed through', () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      updating: false,
    });
  });

  it(`Sets booking when ${GET_BOOKING_SUCCESS} is dispatched`, () => {
    const booking = {
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
    };
    expect(reducer({}, getBookingSuccess(booking))).toEqual({
      PW3052534: booking,
    });
  });

  it(`Sets updated to TRUE when ${UPDATE_BOOKING_RESALE} is dispatched`, () => {
    expect(reducer({}, updateBookingResale('PW3052534', []))).toEqual({
      updating: true,
    });
  });

  it(`Sets updated to FALSE when ${UPDATE_BOOKING_RESALE_SUCCESS} is dispatched`, () => {
    expect(reducer({}, updateBookingResaleSuccess())).toEqual({
      updating: false,
    });
  });

  it(`Sets updated to FALSE when ${UPDATE_BOOKING_RESALE_FAILED} is dispatched`, () => {
    expect(reducer({}, updateBookingResaleFailed())).toEqual({
      updating: false,
    });
  });

  it(`Produces action of type ${UPDATE_BOOKING_DELIVERY} when action creator is invoked`, () => {
    expect(
      updateBookingDelivery('PW3052534', '12345', {
        address: { address_1: 'Kaboodle Solutions Ltd' },
      }),
    ).toEqual({
      type: UPDATE_BOOKING_DELIVERY,
      payload: {
        booking_ref: 'PW3052534',
        allocation_id: '12345',
        fields: {
          address: {
            address_1: 'Kaboodle Solutions Ltd',
          },
        },
      },
    });
  });
});
