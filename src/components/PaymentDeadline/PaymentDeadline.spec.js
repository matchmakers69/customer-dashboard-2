import PaymentDeadline from './PaymentDeadline';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('PaymentDeadline', () => {
  const deadline = '2020-03-24T00:00:00.000Z';

  it('Renders deadline date when a valid date is passed in', () => {
    const wrapper = mountWithConfig(<PaymentDeadline deadline={deadline} />);
    expect(wrapper.find('p').text()).toEqual('24th March 2020');
  });

  it('Renders generic message when no date is passed in', () => {
    const wrapper = mountWithConfig(<PaymentDeadline />);
    expect(wrapper.find('p').text()).toEqual(
      'You have no outstanding payments.',
    );
  });
});
