import orderBy from 'lodash/orderBy';

export const getPastBookings = ({ bookings }) =>
  bookings.loaded
    ? orderBy(bookings.items.past, ['departure_date.iso_value'], ['desc'])
    : [];
export default getPastBookings;
