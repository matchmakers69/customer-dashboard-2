import MakePaymentSettleUp from './MakePaymentSettleUp';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('MakePaymentSettleUp', () => {
  const props = {
    handleSettleUpClick: jest.fn(),
    handleUndoClick: jest.fn(),
  };
  it('should inform user of fully paid balance if remainingBalance is 0', () => {
    const wrapper = mountWithConfig(
      <MakePaymentSettleUp remainingBalance={0} {...props} />,
    );
    expect(wrapper.find('p').text()).toEqual(
      'Your balance is already fully paid!',
    );
  });

  it('should show Message when useRemainingBalance prop is true', () => {
    const wrapper = mountWithConfig(
      <MakePaymentSettleUp
        remainingBalance={100}
        useRemainingBalance
        {...props}
      />,
    );
    expect(wrapper.find('Message').exists()).toEqual(true);
  });

  it('should show Button when useRemainingBalance prop is false', () => {
    const wrapper = mountWithConfig(
      <MakePaymentSettleUp
        remainingBalance={100}
        useRemainingBalance={false}
        {...props}
      />,
    );
    expect(wrapper.find('Button').text()).toEqual('Pay remaining balance');
  });
});
