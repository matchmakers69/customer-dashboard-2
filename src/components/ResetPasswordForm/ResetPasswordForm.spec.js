import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ResetPasswordForm', () => {
  it("Doesn't show errors by default", () => {
    const wrapper = mountWithConfig(<ResetPasswordForm />);
    expect(wrapper.exists('.InputField__error')).toEqual(false);
  });

  it('Shows an error for incorrect email addresses', () => {
    const wrapper = mountWithConfig(<ResetPasswordForm />);
    const emailInput = wrapper.find('input[name="email"]');

    emailInput.simulate('focus', { target: { name: 'email' } });
    emailInput.simulate('change', {
      target: { name: 'email', value: 'invalid@email' },
    });
    emailInput.simulate('blur', { target: { name: 'email' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Should fire onSubmit when form submitted with valid data', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ResetPasswordForm onSubmit={testFn} />);

    wrapper.setState({
      email: 'test@kaboodle.co.uk',
      emailDirty: true,
    });

    const resetPasswordForm = wrapper.find('ResetPasswordForm');
    resetPasswordForm.simulate('submit', testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid email', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ResetPasswordForm onSubmit={testFn} />);
    const component = wrapper.find('ResetPasswordForm');
    component.setState({
      email: 'test@kab',
      emailDirty: true,
    });

    const resetPasswordForm = wrapper.find('ResetPasswordForm');

    resetPasswordForm.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });
});
