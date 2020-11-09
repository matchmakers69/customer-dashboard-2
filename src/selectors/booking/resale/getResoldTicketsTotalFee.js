import { RESALE_SOLD } from '../../../constants';
import { createSelector } from 'reselect';
import getBookingTickets from '../getBookingTickets';
import isBookingLoaded from '../isBookingLoaded';

const getResoldTicketsTotalFee = createSelector(
  isBookingLoaded,
  getBookingTickets,
  (loaded, tickets) =>
    loaded
      ? tickets
          .filter(({ resale }) => resale === RESALE_SOLD)
          .reduce((acc, cur) => acc + cur.prices.booking_fee.value, 0)
      : [],
);

export default getResoldTicketsTotalFee;
