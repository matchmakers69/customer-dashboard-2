import LoginForm from './LoginForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('LoginForm', () => {
  it("Doesn't show errors by default", () => {
    const wrapper = mountWithConfig(<LoginForm />);
    expect(wrapper.exists('.InputField__error')).toEqual(false);
  });

  it('Shows an error for incorrect email addresses', () => {
    const wrapper = mountWithConfig(<LoginForm />);
    const emailInput = wrapper.find('input[name="email"]');

    emailInput.simulate('focus', { target: { name: 'email' } });
    emailInput.simulate('change', {
      target: { name: 'email', value: 'invalid@email' },
    });
    emailInput.simulate('blur', { target: { name: 'email' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Shows an error for incorrect password', () => {
    const wrapper = mountWithConfig(<LoginForm />);
    const passwordInput = wrapper.find('input[name="password"]');

    passwordInput.simulate('focus', { target: { name: 'password' } });
    passwordInput.simulate('change', {
      target: { name: 'password', value: '' },
    });
    passwordInput.simulate('blur', { target: { name: 'password' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Should fire onSubmit when form submitted with valid data', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<LoginForm onSubmit={testFn} />);

    wrapper.setState({
      email: 'test@kaboodle.co.uk',
      password: '234234',
      emailDirty: true,
      passwordDirty: true,
    });

    const loginForm = wrapper.find('LoginForm');
    loginForm.simulate('submit', testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid email', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<LoginForm onSubmit={testFn} />);
    const component = wrapper.find('LoginForm');
    component.setState({
      email: 'test@kab',
      password: 'amountWithConfig',
      emailDirty: true,
      passwordDirty: true,
    });

    const loginForm = wrapper.find('LoginForm');

    loginForm.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid password', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<LoginForm onSubmit={testFn} />);

    wrapper.find('LoginForm').setState({
      email: 'test@kaboodle.co.uk',
      password: '',
      emailDirty: true,
      passwordDirty: true,
    });

    const loginForm = wrapper.find('.LoginForm');
    loginForm.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });
});
