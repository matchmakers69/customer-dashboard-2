import MakePaymentForm from './MakePaymentForm';
import React from 'react';
import StripePaymentWrapper from '../StripePaymentWrapper';
import mockStripe from '../../testing/helpers/mockStripe';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    countries: [
      {
        id: 1,
        code: 'AF',
        name: 'Afghanistan',
      },
    ],
    handleError: jest.fn(),
    onRequest: jest.fn(),
    sendMessage: jest.fn(),
    ...propsOverride,
  };

  const wrapper = mountWithConfig(
    <StripePaymentWrapper apiKey="pk_test_12345">
      <MakePaymentForm {...props} />
    </StripePaymentWrapper>,
  );
  const form = wrapper.find('form');

  return {
    wrapper,
    form,
    props,
  };
};

describe('ChangeCardDetailsForm', () => {
  beforeEach(() => {
    mockStripe();
  });

  it('should render the form', () => {
    const { form } = setup();
    expect(form.exists()).toBe(true);
  });

  // Full Test Coverage to be provided when we upgrade to React 16.9+
});
