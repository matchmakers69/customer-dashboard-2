import { createSelector } from 'reselect';
import getBookingPrices from '../getBookingPrices';
import isBookingLoaded from '../isBookingLoaded';

const getBookingFeeValue = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBookingPrices(state, bookingReference),
  (loaded, prices) => (loaded ? prices.booking_fee.value : null),
);

export default getBookingFeeValue;
