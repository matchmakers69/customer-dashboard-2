import PaymentPlanKeyValues from './PaymentPlanKeyValues';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    paymentPlan: {
      id: 590980,
      amount: 98.2,
      remainingPayments: 6,
      nextPaymentDate: new Date('2020-01-29T00:00:00.000Z'),
      finalPaymentDate: new Date('2020-06-29T00:00:00.000Z'),
      status: 'Active',
      projection: [
        { date: '2020-01-29T00:00:00.000Z', amount: 16.36 },
        { date: '2020-02-29T00:00:00.000Z', amount: 16.36 },
        { date: '2020-03-29T00:00:00.000Z', amount: 16.36 },
        { date: '2020-04-29T00:00:00.000Z', amount: 16.36 },
        { date: '2020-05-29T00:00:00.000Z', amount: 16.36 },
        { date: '2020-06-29T00:00:00.000Z', amount: 16.4 },
      ],
    },
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<PaymentPlanKeyValues {...props} />);

  return {
    wrapper,
    keyValues: wrapper.find('.keyValue'),
  };
};

describe('PaymentPlanKeyValues', () => {
  it('should successfully render the pie-chart', () => {
    const { keyValues } = setup();
    expect(keyValues.exists()).toBe(true);
  });
});
