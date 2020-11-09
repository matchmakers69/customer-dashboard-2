import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import getBookingTickets from '../getBookingTickets';
import isBookingLoaded from '../isBookingLoaded';
import sumBy from 'lodash/sumBy';

const createResaleValueCalculator = resaleStatus =>
  createSelector(
    isBookingLoaded,
    getBookingTickets,
    (loaded, tickets) => {
      if (!loaded) {
        return null;
      }

      const filteredTickets = filter(tickets, { resale: resaleStatus });
      return sumBy(filteredTickets, ticket => ticket.prices.price.value);
    },
  );

export default createResaleValueCalculator;
