import { NOT_RESALABLE } from '../../../constants';
import { createSelector } from 'reselect';
import getBookingTickets from '../getBookingTickets';
import isBookingLoaded from '../isBookingLoaded';

const isResalable = createSelector(
  isBookingLoaded,
  getBookingTickets,
  (loaded, tickets) =>
    loaded ? tickets.some(({ resale }) => resale !== NOT_RESALABLE) : false,
);

export default isResalable;
