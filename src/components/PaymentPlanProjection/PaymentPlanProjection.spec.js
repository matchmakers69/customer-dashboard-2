import PaymentPlanProjection from './PaymentPlanProjection';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { projection } from './__fixtures__/projection';

describe('PaymentPlanProjection', () => {
  it('Renders correct path and name for header columns', () => {
    const wrapper = mountWithConfig(
      <PaymentPlanProjection projection={projection} />,
    );
    expect(
      wrapper
        .find('HeaderColumn')
        .first()
        .prop('path'),
    ).toEqual('date');
    expect(
      wrapper
        .find('HeaderColumn')
        .last()
        .prop('path'),
    ).toEqual('amount');
  });

  it('Renders correct amount remaining with currency based on projection array values', () => {
    const wrapper = mountWithConfig(
      <PaymentPlanProjection projection={projection} />,
    );
    expect(wrapper.find('#total').text()).toEqual(
      'Total payment remaining: £152.26',
    );
  });

  it('Defaults to loader when projection not loaded', () => {
    const wrapper = mountWithConfig(<PaymentPlanProjection />);
    expect(wrapper.find('Loader').exists()).toBe(true);
  });

  it('Renders message when projection is based on end of month dates and selectedDay exists', () => {
    const wrapper = mountWithConfig(
      <PaymentPlanProjection projection={projection} selectedDay={31} />,
    );
    wrapper.update();
    expect(wrapper.find('Message').exists()).toBe(true);
  });

  it('Displays new payment plan title when selectedDay is not null', () => {
    const wrapper = mountWithConfig(
      <PaymentPlanProjection projection={projection} selectedDay={22} />,
    );
    expect(wrapper.find('Title').text()).toBe('New payment plan');
  });
});
