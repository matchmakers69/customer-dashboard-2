import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const getPackage = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),

  (loaded, booking) =>
    loaded
      ? {
          title: booking.package.name,
          startDate: booking.departure_date.iso_value,
          endDate: booking.return_date.iso_value,
        }
      : {},
);

export default getPackage;
