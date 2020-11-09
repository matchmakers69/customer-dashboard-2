import BookingCardActions from './BookingCardActions';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    paymentType: 'payInFull',
    goTo: jest.fn(),
    bookingReference: 'LOL696969',
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<BookingCardActions {...props} />);

  return {
    wrapper,
    viewPaymentPlan: wrapper.find(
      '[data-test="bookingAction-viewPaymentPlan"]',
    ),
    viewMakePayment: wrapper.find(
      '[data-test="bookingAction-payOutstandingBalance"]',
    ),
    viewBookingSummary: wrapper.find(
      '[data-test="bookingAction-viewBookingSummary"]',
    ),
    props,
  };
};

describe('BookingCardActions', () => {
  it('should successfully render only active actions', () => {
    const { viewPaymentPlan, viewBookingSummary } = setup();
    expect(viewPaymentPlan.exists()).toBe(false);
    expect(viewBookingSummary.exists()).toBe(true);
  });
  it('should fire the appropriate action passed through props when clicked', () => {
    const { viewBookingSummary, props } = setup();
    viewBookingSummary.simulate('click');
    expect(props.goTo).toHaveBeenCalledWith('/booking/LOL696969');
  });
  it('should show the payment plan button when paymentType is paymentPlan', () => {
    const { viewPaymentPlan, props } = setup({ paymentType: 'paymentPlan' });
    viewPaymentPlan.simulate('click');
    expect(props.goTo).toHaveBeenCalledWith('/booking/LOL696969/payment-plan');
  });
  it('should not show the make payment button until the feature is complete', () => {
    const { viewMakePayment } = setup({ paymentType: 'deposit' });
    expect(viewMakePayment.exists()).toBe(false);
  });
});
