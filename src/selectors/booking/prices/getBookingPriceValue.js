import { createSelector } from 'reselect';
import getBookingPrices from '../getBookingPrices';
import isBookingLoaded from '../isBookingLoaded';

const getBookingPrice = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBookingPrices(state, bookingReference),
  (loaded, prices) => (loaded ? prices.booking_price.value : null),
);

export default getBookingPrice;
