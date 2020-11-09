import React from 'react';
import StripeCardForm from './StripeCardForm';
import StripePaymentWrapper from '../StripePaymentWrapper';
import mockStripe from '../../testing/helpers/mockStripe';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('StripeCardForm', () => {
  beforeEach(() => {
    mockStripe();
  });

  it('Successfully renders', () => {
    const updateFn = jest.fn();
    const wrapper = mountWithConfig(
      <StripePaymentWrapper apiKey="pk_test_12345">
        <StripeCardForm onUpdate={updateFn} />
      </StripePaymentWrapper>,
    );
    expect(wrapper.find('CardElement').exists()).toBe(true);
  });
});
