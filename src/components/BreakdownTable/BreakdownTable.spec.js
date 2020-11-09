import BreakdownTable from './BreakdownTable';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const bookingItems = [
  {
    title: 'Accommodation',
    type: 'accommodation',
    // eslint-disable-next-line camelcase
    line_items: [
      {
        title: 'Room Name',
        quantity: 5,
        cost: 99.99,
        // eslint-disable-next-line camelcase
        line_items: [
          {
            title: 'Room Extra Name',
            type: 'accommodation-extras',
            quantity: 5,
            cost: 99.99,
          },
        ],
      },
    ],
  },
];

export const tests = describe('BreakdownTable', () => {
  it('should render correct number of items', () => {
    const wrapper = mountWithConfig(
      <BreakdownTable bookingItems={bookingItems} />,
    );
    expect(wrapper.find('BreakdownItem').length).toEqual(2);
  });
});
