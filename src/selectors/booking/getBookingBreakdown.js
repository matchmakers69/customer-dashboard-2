/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { createSelector } from 'reselect';
import format from 'date-fns/format';
import getBookingAccommodation from './getBookingAccommodation';
import getBookingBreakdownExtras from './getBookingBreakdownExtras';
import getBookingBreakdownTickets from './getBookingBreakdownTickets';
import getBookingDelivery from './getBookingDelivery';
import getBookingInsurance from './getBookingInsurance';
import getBookingPrices from './getBookingPrices';
import getBookingTransport from './getBookingTransport';
import getResoldTicketsTotalFee from './resale/getResoldTicketsTotalFee';
import isBookingLoaded from './isBookingLoaded';

const getBookingBreakdown = createSelector(
  isBookingLoaded,
  getBookingAccommodation,
  getBookingTransport,
  getBookingBreakdownExtras,
  getBookingBreakdownTickets,
  getBookingInsurance,
  getBookingDelivery,
  getResoldTicketsTotalFee,
  getBookingPrices,
  (
    loaded,
    accommodation,
    transport,
    extras,
    tickets,
    insurance,
    delivery,
    resoldTicketFee,
    bookingPrices,
  ) => {
    if (!loaded) {
      return [];
    }

    const breakdown = [];

    // Produce Accommodation Breakdown
    if (accommodation.length) {
      const line_items = accommodation.map(({ name, room_name, prices }) => {
        const cost = prices.allocations.value + prices.supplement.value;

        return {
          title: name,
          subtitle: room_name,
          quantity: 1,
          cost,
        };
      });

      breakdown.push({
        title: 'Accommodation',
        type: 'accommodation',
        line_items,
      });
    }

    // Produce Tickets Breakdown
    if (tickets.length) {
      breakdown.push({
        title: 'Tickets',
        type: 'tickets',
        line_items: tickets,
      });
    }

    // Produce Transport Breakdown
    if (transport.length) {
      const line_items = transport.map(
        ({ departure_location, departure_date, arrival_location, price }) => ({
          title: `${departure_location.value} → ${arrival_location.value}`,
          subtitle: format(departure_date.iso_value, 'Do MMMM YYYY - HH:mm'),
          quantity: 1,
          cost: price.value,
        }),
      );

      breakdown.push({
        title: 'Transport',
        type: 'transport',
        line_items,
      });
    }

    // Produce Extras Breakdown
    if (extras.length) {
      breakdown.push({
        title: 'Extras',
        type: 'extras',
        line_items: extras,
      });
    }

    // Produce Insurance Breakdown
    if (insurance.length) {
      const line_items = insurance.map(({ name, price }) => ({
        title: name,
        quantity: 1,
        cost: price.value,
      }));

      breakdown.push({
        title: 'Insurance',
        type: 'insurance',
        line_items,
      });
    }

    // Produce Delivery Breakdown
    if (delivery.length) {
      const line_items = delivery.map(({ delivery_name, delivery_price }) => ({
        title: delivery_name,
        quantity: 1,
        cost: delivery_price.value,
      }));

      breakdown.push({
        title: 'Delivery',
        type: 'delivery',
        line_items,
      });
    }

    // Display discounts, if we have any.
    if (bookingPrices.discounts.value > 0) {
      breakdown.push({
        title: 'Discounts',
        line_items: [
          {
            title: 'Discount',
            cost: bookingPrices.discounts.value * -1,
          },
        ],
      });
    }

    // Display resale fees if tickets with a booking fee have been resold.
    if (resoldTicketFee > 0) {
      breakdown.push({
        title: 'Fees',
        line_items: [
          {
            title: 'Resale Fees',
            cost: resoldTicketFee,
          },
        ],
      });
    }

    return breakdown;
  },
);

export default getBookingBreakdown;
