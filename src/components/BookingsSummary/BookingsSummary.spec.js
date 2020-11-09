import BookingsSummary from './BookingsSummary';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';
import noop from 'lodash/noop';

const bookings = [
  {
    id: '3052534',
    reference: 'PW3052534',
    package_name: 'Printworks 2019 - AVA London',
    booked_date: {
      iso_value: '2019-02-28 01:11:34',
      isotz_value: '2019-02-28T01:11:34+00:00',
    },
    departure_date: {
      iso_value: '2019-03-15',
      isotz_value: '2019-03-15T00:00:00+00:00',
    },
    return_date: {
      iso_value: '2019-03-16',
      isotz_value: '2019-03-16T00:00:00+00:00',
    },
    booking_price: {
      value: 36.75,
      price: '£36.75',
    },
    currency: {
      id: '98',
      iso_code: 'GBP',
      exponent: '2',
      symbol: '£',
    },
    payment_deadline_date: {
      iso_value: '2018-11-28',
      isotz_value: '2018-11-28T00:00:00+00:00',
    },
    booking_status: {
      code: '70',
      value: 'Complete',
    },
    payment_status: {
      code: '30',
      value: 'Fully Paid',
    },
    payment_type: 'deposit',
    room_allocation_enabled: false,
    coach_allocation_enabled: false,
  },
];

describe('BookingsSummary', () => {
  it('Renders correctly when loading attribute is TRUE', () => {
    const wrapper = mountWithConfig(
      <BookingsSummary bookings={[]} goTo={noop} loading />,
    );

    // Find placeholder Booking Card.
    expect(wrapper.find('.BookingCard').length).toEqual(1);
  });

  it('Renders bookings correctly after loaded', () => {
    const wrapper = mountWithConfig(
      <BookingsSummary bookings={bookings} loading={false} goTo={noop} />,
    );

    expect(wrapper.find('.BookingCard').length).toEqual(1);
  });
});
