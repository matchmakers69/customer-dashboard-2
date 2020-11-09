import OutstandingBalance from './OutstandingBalance';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    totalAmount: 99.99,
    remainingBalance: 49.9,
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<OutstandingBalance {...props} />);

  return {
    wrapper,
    remainingBalance: wrapper.find('.remainingBalance'),
    totalAmount: wrapper.find('.totalAmount'),
  };
};

describe('OutstandingBalance', () => {
  it('it should successfully render The remainingBalance and totalAmount with the correct exponent and symbol', () => {
    const { remainingBalance, totalAmount } = setup();

    expect(remainingBalance.text()).toEqual('£49.90');
    expect(totalAmount.text()).toEqual('£99.99');
  });
});
