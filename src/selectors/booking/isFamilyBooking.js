import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const isFamilyBooking = createSelector(
  isBookingLoaded,
  getBooking,
  (loaded, booking) => (loaded ? booking.family_booking : false),
);

export default isFamilyBooking;
