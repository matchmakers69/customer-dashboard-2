import ProfileEmergencyDetailsForm from './ProfileEmergencyDetailsForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ProfileEmergencyDetailsForm', () => {
  it('Does not show errors by default', () => {
    const wrapper = mountWithConfig(<ProfileEmergencyDetailsForm />);
    expect(wrapper.exists('.InputField__error')).toEqual(false);
  });

  it('Shows an error for incorrect telephone', () => {
    const wrapper = mountWithConfig(<ProfileEmergencyDetailsForm />);
    const telephoneInput = wrapper.find('input[name="telephone"]');

    telephoneInput.simulate('focus', { target: { name: 'telephone' } });
    telephoneInput.simulate('change', {
      target: { name: 'telephone', value: 'badn0' },
    });
    telephoneInput.simulate('blur', { target: { name: 'telephone' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });
  it('Shows an error for blank/invalid names', () => {
    const wrapper = mountWithConfig(<ProfileEmergencyDetailsForm />);
    const nameInput = wrapper.find('input[name="name"]');

    nameInput.simulate('focus', { target: { name: 'name' } });
    nameInput.simulate('change', {
      target: { name: 'name', value: '' },
    });
    nameInput.simulate('blur', { target: { name: 'name' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Should fire onSubmit when form submitted with valid telephone data is submitted', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <ProfileEmergencyDetailsForm onSubmit={testFn} />,
    );
    const component = wrapper.find('ProfileEmergencyDetailsForm');
    component.setState({
      telephone: '0534534563',
      telephoneDirty: true,
    });

    component.simulate('submit', testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should fire onSubmit when form submitted with valid name data is submitted', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <ProfileEmergencyDetailsForm onSubmit={testFn} />,
    );
    const component = wrapper.find('ProfileEmergencyDetailsForm');
    component.setState({
      fullName: 'John Doe',
      nameDirty: true,
    });

    component.simulate('submit', testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid email', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <ProfileEmergencyDetailsForm onSubmit={testFn} />,
    );

    wrapper.setState({
      telephone: 'badn0',
      telephoneDirty: true,
    });

    const profileEmergencyForm = wrapper.find('ProfileEmergencyDetailsForm');
    profileEmergencyForm.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });
  it('Should NOT fire onSubmit when form is submitted with invalid/empty name', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <ProfileEmergencyDetailsForm onSubmit={testFn} />,
    );

    wrapper.setState({
      fullName: '',
      nameDirty: true,
    });

    const profileEmergencyForm = wrapper.find('ProfileEmergencyDetailsForm');
    profileEmergencyForm.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });
});
