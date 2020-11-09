import { RESALE_ENABLED, RESALE_MESSAGES, RESALE_SOLD } from '../../constants';

import { createSelector } from 'reselect';
import flatten from 'lodash/fp/flatten';
import flow from 'lodash/fp/flow';
import { formatPrice } from '../../lib/formatting';
import getBookingTickets from './getBookingTickets';
import getCurrency from './getCurrency';
import groupBy from 'lodash/fp/groupBy';
import isBookingLoaded from './isBookingLoaded';
import map from 'lodash/fp/map';
import orderBy from 'lodash/fp/orderBy';

// We only want to override the cost with a message for sold items.
const getCostText = resaleStatus =>
  resaleStatus === RESALE_SOLD ? RESALE_MESSAGES[resaleStatus] : null;

const getResaleBadge = resaleStatus =>
  resaleStatus === RESALE_ENABLED
    ? [
        {
          text: RESALE_MESSAGES[resaleStatus],
          type: 'success',
        },
      ]
    : [];

const getFeeBreakdownText = (faceValue, bookingFees, currency) =>
  bookingFees > 0
    ? `${formatPrice(
        currency.symbol,
        faceValue,
        currency.exponent,
      )} + ${formatPrice(
        currency.symbol,
        bookingFees,
        currency.exponent,
      )} Booking Fee`
    : null;

const isDisabled = item => item.resale === RESALE_SOLD;

const getBookingBreakdownTickets = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBookingTickets(state, bookingReference),
  (state, bookingReference) => getCurrency(state, bookingReference),
  (loaded, tickets, currency) => {
    if (!loaded || !tickets.length) {
      return [];
    }
    return flow(
      groupBy(item => item.ticket_type_id + item.resale),
      map(groupItems => {
        if (groupItems.length > 1) {
          const faceValueTotal = groupItems.reduce(
            (acc, cur) => acc + cur.prices.price.value,
            0,
          );
          const bookingFeeTotal = groupItems.reduce(
            (acc, cur) => acc + cur.prices.booking_fee.value,
            0,
          );

          // Reduce array of items into one object with summed quantity and costs.
          return groupItems.reduce((acc, cur, idx) => {
            const subtitle =
              cur.resale === RESALE_SOLD
                ? null
                : getFeeBreakdownText(
                    faceValueTotal,
                    bookingFeeTotal,
                    currency,
                  );

            return {
              title: `${cur.event_name} - ${cur.name}`,
              subtitle,
              disabled: isDisabled(cur),
              quantity: idx + 1,
              badges: getResaleBadge(cur.resale),
              cost:
                (acc.cost || cur.prices.total_ticket_price.value) +
                cur.prices.total_ticket_price.value,
              costText: getCostText(acc.resale || cur.resale),
            };
          });
        }
        // If there's only one item, don't reduce it, format it instead.
        const [item] = groupItems;

        const faceValueTotal = item.prices.price.value;
        const bookingFeeTotal = item.prices.booking_fee.value;

        const subtitle =
          item.resale === RESALE_SOLD
            ? null
            : getFeeBreakdownText(faceValueTotal, bookingFeeTotal, currency);

        return {
          title: `${item.event_name} - ${item.name}`,
          subtitle,
          disabled: isDisabled(item),
          quantity: 1,
          badges: getResaleBadge(item.resale),
          cost: item.prices.total_ticket_price.value,
          costText: getCostText(item.resale),
        };
      }),
      flatten,
      orderBy(['title', 'cost'], ['asc', 'desc']),
    )(tickets);
  },
);

export default getBookingBreakdownTickets;
