import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const getBookingDeliveryAddress = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),
  (loaded, booking) => {
    if (loaded && booking.delivery[0] && booking.delivery[0].require_address) {
      const [
        {
          address_1,
          address_2,
          address_3,
          city,
          county,
          country_id,
          country_name,
          postcode,
        },
      ] = booking.delivery;

      return {
        address_1,
        address_2,
        address_3,
        city,
        county,
        country: { id: country_id, name: country_name },
        postcode,
      };
    }
    return null;
  },
);

export default getBookingDeliveryAddress;
