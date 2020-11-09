import orderBy from 'lodash/orderBy';

export const getUpcomingBookings = ({ bookings }) =>
  bookings.loaded
    ? orderBy(bookings.items.upcoming, ['departure_date.iso_value'], ['asc'])
    : [];
export default getUpcomingBookings;
