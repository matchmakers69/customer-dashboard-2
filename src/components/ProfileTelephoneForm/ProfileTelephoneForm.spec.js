import ProfileTelephoneForm from './ProfileTelephoneForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ProfileTelephoneForm', () => {
  it("Doesn't show errors by default", () => {
    const wrapper = mountWithConfig(<ProfileTelephoneForm />);
    expect(wrapper.exists('.InputField__error')).toEqual(false);
  });

  it('Shows an error for incorrect telephone', () => {
    const wrapper = mountWithConfig(<ProfileTelephoneForm />);
    const telephoneInput = wrapper.find('input[name="telephone"]');

    telephoneInput.simulate('focus', { target: { name: 'telephone' } });
    telephoneInput.simulate('change', {
      target: { name: 'telephone', value: 'badn0' },
    });
    telephoneInput.simulate('blur', { target: { name: 'telephone' } });

    expect(wrapper.find('.InputField__error').length).toEqual(1);
  });

  it('Should fire onSubmit when form submitted with valid data', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ProfileTelephoneForm onSubmit={testFn} />);
    const component = wrapper.find('ProfileTelephoneForm');

    component.setState({
      telephone: '0534534563',
      telephoneDirty: true,
    });

    component.simulate('submit', testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should NOT fire onSubmit when form is submitted with invalid email', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(<ProfileTelephoneForm onSubmit={testFn} />);

    wrapper.setState({
      telephone: 'badn0',
      telephoneDirty: true,
    });

    const profileTelephoneForm = wrapper.find('ProfileTelephoneForm');
    profileTelephoneForm.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });
});
