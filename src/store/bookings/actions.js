import {
  GET_BOOKINGS,
  GET_BOOKINGS_FAILED,
  GET_BOOKINGS_SUCCESS,
} from './types';

export const getBookings = () => ({
  type: GET_BOOKINGS,
});

export const getBookingsSuccess = bookings => ({
  type: GET_BOOKINGS_SUCCESS,
  payload: { bookings },
});

export const getBookingsFailed = () => ({
  type: GET_BOOKINGS_FAILED,
});
