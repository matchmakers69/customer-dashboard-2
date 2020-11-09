import { createSelector } from 'reselect';
import getBookingDeliveryAddress from './getBookingDeliveryAddress';

const getBookingDeliveryAddressFormObject = createSelector(
  (state, bookingReference) =>
    getBookingDeliveryAddress(state, bookingReference),
  address =>
    address && {
      ...address,
      country: {
        label: address.country.name,
        value: address.country.id,
      },
    },
);

export default getBookingDeliveryAddressFormObject;
