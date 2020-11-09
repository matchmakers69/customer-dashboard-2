import React from 'react';
import SettleUp from './SettleUp';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('SettleUp', () => {
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

  it('should render the settle up text if outstanding balance on payment plan', () => {
    const wrapper = mountWithConfig(
      <SettleUp paymentPlan={paymentPlan} paymentStatus={paymentStatus} />,
    );
    expect(wrapper.find('p').text()).toEqual(
      'Complete your payment plan early by paying the remaining £87.00.',
    );
  });
  it('should render the fully paid text if payment plan balance fully paid', () => {
    const wrapper = mountWithConfig(
      <SettleUp
        paymentPlan={paymentPlan}
        paymentStatus={{ code: '30', value: 'Fully Paid' }}
      />,
    );
    expect(wrapper.find('p').text()).toEqual(
      'Your payment plan has been fully paid.',
    );
  });
});
