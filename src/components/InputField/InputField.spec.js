import InputField from './InputField';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    id: '123124',
    type: 'text',
    label: 'Test',
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<InputField {...props} />);

  return {
    wrapper,
    inputWrapper: wrapper.find('.InputField'),
    input: wrapper.find('.InputField__input'),
    errors: wrapper.find('.InputField__error'),
    requiredAsterisk: wrapper.find('.InputField__required'),
    props,
  };
};

describe('InputField', () => {
  it('should display the an error for each error passed through props', () => {
    const props = { value: 'Hello World' };
    const { input } = setup(props);
    expect(input.prop('value')).toEqual('Hello World');
  });

  it('should display the an error for each error passed through props', () => {
    const props = { value: 'Hello World', errors: ['1', '2'] };
    const { errors } = setup(props);
    expect(errors).toHaveLength(props.errors.length);
  });

  it('should not display errors if the field is empty', () => {
    const props = { errors: ['1', '2'] };
    const { errors } = setup(props);
    expect(errors).toHaveLength(0);
  });

  it('should be in a valid state when the prop "valid" is true and no errors are present', () => {
    const { inputWrapper } = setup({
      value: 'Hello World',
      valid: true,
    });
    expect(inputWrapper.hasClass('InputField--valid')).toBe(true);
  });

  it('should display an asterisk when the required prop is passed', () => {
    const { requiredAsterisk } = setup({ required: true });
    expect(requiredAsterisk).toHaveLength(1);
  });

  it('should fire the function passed through the onChange prop when changing the value of the input field', () => {
    const changeFn = jest.fn();
    const { input } = setup({ onChange: changeFn });

    input.simulate('change', { target: { value: 'c-c-c-hanges!' } });
    expect(changeFn.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'change',
        target: expect.objectContaining({
          value: 'c-c-c-hanges!',
        }),
      }),
    );
  });

  it('should fire the function passed through the onBlur prop when moving away from the input field', () => {
    const blurFn = jest.fn();
    const { input } = setup({ onBlur: blurFn });

    input.simulate('blur', { target: { value: 'goodbye' } });
    expect(blurFn.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'blur',
        target: {
          value: 'goodbye',
        },
      }),
    );
  });

  it('should fire the function passed through the onFocus prop when moving on to the input field', () => {
    const focusFn = jest.fn();
    const { input } = setup({ onFocus: focusFn });

    input.simulate('focus', { target: { value: 'hello' } });
    expect(focusFn.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'focus',
        target: {
          value: 'hello',
        },
      }),
    );
  });
});
