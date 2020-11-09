import {
  GET_BOOKING,
  GET_BOOKING_SUCCESS,
  UPDATE_BOOKING_DELIVERY,
  UPDATE_BOOKING_RESALE,
  UPDATE_BOOKING_RESALE_FAILED,
  UPDATE_BOOKING_RESALE_SUCCESS,
} from './types';

export const getBooking = reference => ({
  type: GET_BOOKING,
  payload: {
    booking_ref: reference,
  },
});

export const getBookingSuccess = booking => ({
  type: GET_BOOKING_SUCCESS,
  payload: { booking },
});

export const updateBookingDelivery = (booking_ref, allocation_id, fields) => ({
  type: UPDATE_BOOKING_DELIVERY,
  payload: {
    booking_ref,
    allocation_id,
    fields,
  },
});

export const updateBookingResale = (booking_ref, tickets) => ({
  type: UPDATE_BOOKING_RESALE,
  payload: {
    booking_ref,
    tickets,
  },
});

export const updateBookingResaleSuccess = () => ({
  type: UPDATE_BOOKING_RESALE_SUCCESS,
});

export const updateBookingResaleFailed = () => ({
  type: UPDATE_BOOKING_RESALE_FAILED,
});
