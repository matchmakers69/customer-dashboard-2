import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const isBookingPrinted = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),
  (loaded, booking) => (loaded ? booking.booking_printed === '1' : false),
);

export default isBookingPrinted;
