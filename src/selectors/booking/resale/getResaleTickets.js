import { NOT_RESALABLE, RESALE_SOLD } from '../../../constants';
import { createSelector } from 'reselect';
import getBookingPax from '../getBookingPax';
import getBookingTickets from '../getBookingTickets';
import isBookingLoaded from '../isBookingLoaded';

const getResaleTickets = createSelector(
  isBookingLoaded,
  getBookingPax,
  getBookingTickets,
  (loaded, bookingPax, tickets) => {
    if (!loaded) {
      return [];
    }

    // Retrieve all tickets that can, or are being resold.
    const resaleTickets = tickets.filter(
      ({ resale }) => resale !== NOT_RESALABLE,
    );

    // If no tickets meet the resale criteria, return an empty array.
    if (resaleTickets.length === 0) {
      return [];
    }

    return resaleTickets
      .map(ticket => {
        // Find the pax that is attached to the ticket.
        const pax = bookingPax.find(({ id }) => id === ticket.pax_id);

        if (!pax) {
          return ticket;
        }

        // Trim so we can determine whether to display based on paxName being a falsy value.
        const paxName = `${pax.personal_details.first_name} ${pax.personal_details.last_name}`.trim();

        // Decorate tickets with pax name if the pax exists.
        return {
          ...ticket,
          pax: paxName,
        };
      })
      .sort((first, second) => {
        // If the first item is resold but the second is not, push the first after the second.
        if (first.resale === RESALE_SOLD && second.resale !== RESALE_SOLD) {
          return 1;
        }

        // If the second item is resold but the first is not, push the second after the first.
        if (second.resale === RESALE_SOLD && first.resale !== RESALE_SOLD) {
          return -1;
        }

        // Otherwise we don't care about their ordering.
        return 0;
      });
  },
);

export default getResaleTickets;
