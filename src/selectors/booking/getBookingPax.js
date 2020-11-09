import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const getPax = createSelector(
  isBookingLoaded,
  getBooking,
  (loaded, booking) => (loaded ? booking.pax : []),
);

export default getPax;
