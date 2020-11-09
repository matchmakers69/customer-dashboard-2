import NextPayment from './NextPayment';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('NextPayment', () => {
  const paymentPlan = {
    id: 591892,
    amount: 87,
    remainingPayments: 3,
    nextPaymentDate: '2021-03-30T00:00:00.000Z',
    projection: [
      { date: '2021-03-30T00:00:00.000Z', amount: 29 },
      { date: '2021-04-30T00:00:00.000Z', amount: 29 },
    ],
  };

  const paymentStatus = { code: '10', value: 'Outstanding' };

  it('Renders next payment details when a valid object is passed in', () => {
    const wrapper = mountWithConfig(
      <NextPayment paymentPlan={paymentPlan} paymentStatus={paymentStatus} />,
    );
    expect(wrapper.find('p').text()).toEqual(
      'Your next payment of £29.00 is due on the 30th March, 2021.',
    );
  });

  it('Renders without next payment date regardless of projection is the status is Fully Paid', () => {
    const wrapper = mountWithConfig(
      <NextPayment
        paymentPlan={paymentPlan}
        paymentStatus={{ code: '30', value: 'Fully Paid' }}
      />,
    );
    expect(wrapper.find('p').text()).toEqual(
      'You have no outstanding payment plan payments.',
    );
  });
});
