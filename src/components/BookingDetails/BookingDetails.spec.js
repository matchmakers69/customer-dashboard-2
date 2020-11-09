import BookingDetails from './BookingDetails';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const breakdown = [
  {
    title: 'Accommodation',
    type: 'accommodation',
    line_items: [
      {
        title: 'Hotel Strass and Sporthotel - Mayrhofen Central ',
        subtitle: 'Austrian Twin/Double - 6 nights Monday Arrival',
        quantity: 1,
        cost: 868,
      },
    ],
  },
  {
    title: 'Tickets',
    type: 'tickets',
    line_items: [{ title: 'Weekend Day - Tier 3', quantity: 1, cost: 85.25 }],
  },
  {
    title: 'Transport',
    type: 'transport',
    line_items: [
      {
        title: 'Gatwick Airport → Innsbruck Airport',
        subtitle: '8th April 2019 - 08:35',
        quantity: 1,
        cost: 32,
      },
      {
        title: 'Munich Airport → Gatwick Airport',
        subtitle: '14th April 2019 - 21:55',
        quantity: 1,
        cost: 39,
      },
    ],
  },
  {
    title: 'Extras',
    type: 'extras',
    line_items: [
      {
        title: 'The Smirnoff Arctic Disco 2020',
        subtitle:
          'Smirnoff  Arctic Disco - Thursday 11th April - MARIBOU STATE, JAMES ZABIELA',
        quantity: 2,
        cost: 46,
      },
    ],
  },
  {
    title: 'Insurance',
    type: 'insurance',
    line_items: [
      {
        title: 'Bronze (18-35 yrs old) incl. Winter Sports Cover',
        quantity: 1,
        cost: 19.99,
      },
    ],
  },
];

describe('BookingDetails', () => {
  it('Renders with required props', () => {
    const wrapper = mountWithConfig(<BookingDetails breakdown={breakdown} />);
    expect(wrapper.find(BookingDetails).exists()).toBe(true);
  });
});

// breakdown: PropTypes.array,
// totalPrice: PropTypes.number,
