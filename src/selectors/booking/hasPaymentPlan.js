import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const hasPaymentPlan = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),
  (loaded, booking) => {
    if (!loaded) {
      return false;
    }
    if (!booking.payment_plan || Array.isArray(booking.payment_plan)) {
      return false;
    }
    return true;
  },
);

export default hasPaymentPlan;
