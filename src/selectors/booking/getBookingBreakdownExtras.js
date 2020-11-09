import { createSelector } from 'reselect';
import flatten from 'lodash/fp/flatten';
import flow from 'lodash/fp/flow';
import getBookingExtras from './getBookingExtras';
import groupBy from 'lodash/fp/groupBy';
import isBookingLoaded from './isBookingLoaded';
import map from 'lodash/fp/map';
import orderBy from 'lodash/fp/orderBy';

const getTitle = item =>
  item.name + (item.option.value ? ` - ${item.option.value}` : '');

const getBookingBreakdownExtras = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBookingExtras(state, bookingReference),
  (loaded, extras) => {
    if (!loaded || !extras.length) {
      return [];
    }

    return flow(
      groupBy('option.id'),
      map(groupItems => {
        if (groupItems.length > 1) {
          // Reduce array of items into one object with summed quantity and costs.
          return groupItems.reduce((acc, cur, idx) => ({
            title: getTitle(cur),
            quantity: idx + 1,
            cost: (acc.cost || acc.price.value) + cur.price.value,
          }));
        }
        // If there's only one item, don't reduce it, format it instead.
        const [item] = groupItems;

        return {
          title: getTitle(item),
          quantity: 1,
          cost: item.price.value,
        };
      }),
      flatten,
      orderBy(['title', 'cost'], ['asc', 'desc']),
    )(extras);
  },
);

export default getBookingBreakdownExtras;
