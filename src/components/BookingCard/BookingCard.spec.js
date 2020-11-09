import BookingCard from './BookingCard';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('BookingCard', () => {
  const title = 'Printworks 2018 - The Hydra (Todd Terje)';
  const reference = 'PW123456';
  const startDate = new Date('1979-01-01T01:00:00');
  const endDate = new Date('1979-01-01T02:00:00');
  const location = 'The Printworks, London';
  const price = 79.99;

  it('should display a correctly formatted date with just a start date', () => {
    const component = mountWithConfig(
      <BookingCard
        title={title}
        reference={reference}
        startDate={startDate}
        location={location}
        price={price}
      />,
    );
    expect(component.find('.BookingCard__date').text()).toBe(
      'Monday 1st January 1979',
    );
  });

  it('should display a correctly formatted date with a start and end date', () => {
    const component = mountWithConfig(
      <BookingCard
        title={title}
        reference={reference}
        startDate={startDate}
        endDate={endDate}
        location={location}
        price={price}
      />,
    );
    expect(component.find('.BookingCard__date').text()).toBe(
      'Monday 1st January 1979',
    );
  });
});
