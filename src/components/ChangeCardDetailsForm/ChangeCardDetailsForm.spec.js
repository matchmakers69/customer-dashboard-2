import ChangeCardDetailsForm from './ChangeCardDetailsForm';
import React from 'react';
import StripePaymentWrapper from '../StripePaymentWrapper';
import mockStripe from '../../testing/helpers/mockStripe';
import { mountWithConfig } from '../../testing/mountWithConfig';
import noop from 'lodash.noop';

const setup = propsOverride => {
  const props = {
    handleError: jest.fn(),
    onRequest: jest.fn(),
    sendMessage: jest.fn(),
    updating: false,
    ...propsOverride,
  };

  const wrapper = mountWithConfig(
    <StripePaymentWrapper apiKey="pk_test_12345">
      <ChangeCardDetailsForm {...props} />
    </StripePaymentWrapper>,
  );
  const fillField = (field, name, value) => {
    field.simulate('change', {
      persist: noop,
      target: {
        name,
        value,
      },
    });
  };

  const clickSubmit = field => {
    field.simulate('click');
  };
  const form = wrapper.find('form');

  return {
    wrapper,
    fillField,
    clickSubmit,
    form,
    cardholderNameField: form.find('#cardholderName'),
    submitButton: form.find('Jss(Button)'),
    props,
  };
};

describe('ChangeCardDetailsForm', () => {
  beforeEach(() => {
    mockStripe();
  });

  it.only('should render the form', () => {
    const { form } = setup();
    expect(form.exists()).toBe(true);
  });

  it('should allow submission when the form is completed', async () => {
    const {
      wrapper,
      fillField,
      cardholderNameField,

      props,
    } = setup();

    fillField(
      cardholderNameField.find({ name: 'cardholderName' }),
      'cardholderName',
      'Bill',
    );

    await new Promise(resolve => {
      setTimeout(resolve);
    });
    wrapper.update();

    expect(props.onRequest.mock.calls[0]).toEqual('test');
  });
});
