import ChangePasswordForm from './ChangePasswordForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ChangePasswordForm', () => {
  it("Doesn't show errors by default", () => {
    const wrapper = mountWithConfig(<ChangePasswordForm />);
    expect(wrapper.exists('.InputField__error')).toEqual(false);
  });

  it('Shows an error for invalid current password', () => {
    const wrapper = mountWithConfig(<ChangePasswordForm />);
    const currentPasswordInput = wrapper.find('input[name="current_password"]');

    currentPasswordInput.simulate('focus', {
      target: { name: 'current_password' },
    });
    currentPasswordInput.simulate('change', {
      target: { name: 'current_password', value: '' },
    });
    currentPasswordInput.simulate('blur', {
      target: { name: 'current_password' },
    });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Shows an error for invalid new password', () => {
    const wrapper = mountWithConfig(<ChangePasswordForm />);
    const newPasswordInput = wrapper.find('input[name="new_password"]');

    newPasswordInput.simulate('focus', { target: { name: 'new_password' } });
    newPasswordInput.simulate('change', {
      target: { name: 'new_password', value: 'shortpw' },
    });
    newPasswordInput.simulate('blur', { target: { name: 'new_password' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Shows an error for invalid password confirmation', () => {
    const wrapper = mountWithConfig(<ChangePasswordForm />);
    const component = wrapper.find('ChangePasswordForm');

    component.setState({
      newPassword: 'validpassword',
      newPasswordDirty: true,
    });

    const passwordConfirmationInput = wrapper.find(
      'input[name="confirm_password"]',
    );

    passwordConfirmationInput.simulate('focus', {
      target: { name: 'confirm_password' },
    });
    passwordConfirmationInput.simulate('change', {
      target: { name: 'confirm_password', value: 'invalidconfirmation' },
    });
    passwordConfirmationInput.simulate('blur', {
      target: { name: 'confirm_password' },
    });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Should fire onSubmit when form submitted with valid data', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ChangePasswordForm onSubmit={testFn} />);
    const component = wrapper.find('ChangePasswordForm');

    component.setState({
      oldPassword: 'currentpassword',
      newPassword: 'validpassword',
      passwordConfirmation: 'validpassword',
      oldPasswordDirty: true,
      newPasswordDirty: true,
      passwordConfirmationDirty: true,
    });

    component.simulate('submit', testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid current password', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ChangePasswordForm onSubmit={testFn} />);
    const component = wrapper.find('ChangePasswordForm');

    component.setState({
      oldPassword: '',
      newPassword: 'shortpw',
      passwordConfirmation: 'shortpw',
      oldPasswordDirty: true,
      newPasswordDirty: true,
      passwordConfirmationDirty: true,
    });

    component.simulate('submit', testEvent);
    expect(testFn).not.toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid new password', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ChangePasswordForm onSubmit={testFn} />);
    const component = wrapper.find('ChangePasswordForm');

    component.setState({
      oldPassword: 'currentpassword',
      newPassword: 'shortpw',
      passwordConfirmation: 'shortpw',
      oldPasswordDirty: true,
      newPasswordDirty: true,
      passwordConfirmationDirty: true,
    });

    component.simulate('submit', testEvent);
    expect(testFn).not.toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid password combination', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ChangePasswordForm onSubmit={testFn} />);
    const component = wrapper.find('ChangePasswordForm');

    component.setState({
      oldPassword: 'currentpassword',
      newPassword: 'validpassword',
      passwordConfirmation: 'validpassword2',
      oldPasswordDirty: true,
      newPasswordDirty: true,
      passwordConfirmationDirty: true,
    });

    component.simulate('submit', testEvent);
    expect(testFn).not.toHaveBeenCalled();
  });
});
