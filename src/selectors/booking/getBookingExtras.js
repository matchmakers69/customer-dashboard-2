import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const getExtras = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),
  (loaded, booking) => (loaded ? booking.extras : []),
);

export default getExtras;
