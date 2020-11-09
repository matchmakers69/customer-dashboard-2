import React from 'react';
import StripePaymentWrapper from './StripePaymentWrapper';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('StripePaymentWrapper', () => {
  beforeEach(() => {
    const stripeMockResult = {
      elements: jest.fn(),
      createToken: jest.fn(),
      createSource: jest.fn(),
      createPaymentMethod: jest.fn(),
      handleCardPayment: jest.fn(),
    };
    const stripeMockFn = jest.fn().mockReturnValue(stripeMockResult);
    window.Stripe = stripeMockFn;
  });

  it('Successfully renders children', () => {
    const wrapper = mountWithConfig(
      <StripePaymentWrapper apiKey="pk_test_12345">
        <>
          <h1>Test Form</h1>
          <form>
            <input />
          </form>
        </>
      </StripePaymentWrapper>,
    );
    expect(wrapper.find('h1').text()).toEqual('Test Form');
  });
});
