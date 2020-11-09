import PaymentPlanMessage from './PaymentPlanMessage';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    goToPaymentPlan: jest.fn(),
    paymentPlan: {
      projection: [
        { date: new Date('2020-01-29T00:00:00.000Z'), amount: 16.36 },
        { date: new Date('2020-02-29T00:00:00.000Z'), amount: 16.37 },
        { date: new Date('2020-03-29T00:00:00.000Z'), amount: 16.38 },
        { date: new Date('2020-04-29T00:00:00.000Z'), amount: 16.39 },
        { date: new Date('2020-05-29T00:00:00.000Z'), amount: 16.4 },
        { date: new Date('2020-06-29T00:00:00.000Z'), amount: 16.41 },
      ],
    },
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<PaymentPlanMessage {...props} />);

  return {
    wrapper,
    props,
    nextPaymentAmount: wrapper.find('[data-test="nextPaymentAmount"]'),
    nextPaymentDate: wrapper.find('[data-test="nextPaymentDate"]'),
    goToPaymentPlan: wrapper.find('.PaymentPlanMessage Button'),
  };
};

describe('PaymentPlanMessage', () => {
  it('should successfully render next payment amount', () => {
    const { nextPaymentAmount } = setup();
    expect(nextPaymentAmount.text()).toEqual('£16.36');
  });
  it('should successfully render next payment date', () => {
    const { nextPaymentDate } = setup();
    expect(nextPaymentDate.text()).toEqual('29/01/2020');
  });
  it('triggers the passed through function when clicking the message action', () => {
    const { props, goToPaymentPlan } = setup();

    goToPaymentPlan.simulate('click');

    expect(props.goToPaymentPlan).toHaveBeenCalled();
  });
});
