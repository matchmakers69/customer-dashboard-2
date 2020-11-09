import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const getBookingTicketDownloads = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),

  (loaded, booking) => (loaded ? booking.downloads : []),
);

export default getBookingTicketDownloads;
