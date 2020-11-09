import ChangeDayForm from './ChangeDayForm';
import React from 'react';
import mockStripe from '../../testing/helpers/mockStripe';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    onRequest: jest.fn(),
    updating: false,
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<ChangeDayForm {...props} />);
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
