import ProfileDateOfBirthForm from './ProfileDateOfBirthForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const dateOfBirth = new Date(2019, 10, 17);

describe('ProfileDateOfBirthForm', () => {
  it('Does not show errors by default', () => {
    const wrapper = mountWithConfig(<ProfileDateOfBirthForm />);
    expect(wrapper.exists('.InputField__error')).toEqual(false);
  });

  it('Accepts dateOfBirth passed through props and assigns default values based on that date', () => {
    const wrapper = mountWithConfig(
      <ProfileDateOfBirthForm dateOfBirth={dateOfBirth} />,
    );
    expect(
      wrapper
        .find('InputField')
        .first()
        .prop('defaultValue'),
    ).toBe(17);
    expect(
      wrapper
        .find('InputField')
        .last()
        .prop('defaultValue'),
    ).toBe(2019);
  });

  it('Shows an error for a date in the future and does not call submit function', () => {
    const testFn = jest.fn();
    const wrapper = mountWithConfig(
      <ProfileDateOfBirthForm onSubmit={testFn} />,
    );
    const component = wrapper.find('ProfileDateOfBirthForm');

    component.find('input#day').simulate('change', { target: { value: '23' } });
    component
      .find('input#month')
      .simulate('change', { target: { value: '08' } });
    component
      .find('input#year')
      .simulate('change', { target: { value: '2091' } });

    const button = wrapper.find('Button');
    button.simulate('submit');

    expect(testFn).not.toHaveBeenCalled();
    expect(wrapper.find('.InputFieldGroup__error').text()).toEqual(
      'Date of birth must be in the past',
    );
  });

  it('Shows an error for an invalid day of a month', () => {
    const wrapper = mountWithConfig(<ProfileDateOfBirthForm />);
    const component = wrapper.find('ProfileDateOfBirthForm');
    component
      .find('#day')
      .last()
      .simulate('change', { target: { value: '31' } });
    component
      .find('#month')
      .last()
      .simulate('change', { target: { value: '02' } });
    component
      .find('#year')
      .last()
      .simulate('change', { target: { value: '2001' } });
    wrapper.update();
    expect(
      wrapper
        .find('.InputFieldGroup__error')
        .first()
        .text(),
    ).toEqual('Invalid day');
  });

  it('Shows an error for an invalid year', () => {
    const wrapper = mountWithConfig(<ProfileDateOfBirthForm />);
    const component = wrapper.find('ProfileDateOfBirthForm');
    component
      .find('#day')
      .last()
      .simulate('change', { target: { value: '23' } });
    component
      .find('#month')
      .last()
      .simulate('change', { target: { value: '08' } });
    component
      .find('#year')
      .last()
      .simulate('change', { target: { value: '189' } });
    wrapper.update();
    expect(wrapper.find('.InputFieldGroup__error').text()).toEqual(
      'Please enter a valid year',
    );
  });

  it('Shows no error for valid date', () => {
    const wrapper = mountWithConfig(<ProfileDateOfBirthForm />);
    const component = wrapper.find('ProfileDateOfBirthForm');
    component
      .find('#day')
      .last()
      .simulate('change', { target: { value: '23' } });
    component
      .find('#month')
      .last()
      .simulate('change', { target: { value: '08' } });
    component
      .find('#year')
      .last()
      .simulate('change', { target: { value: '1991' } });
    wrapper.update();
    expect(wrapper.find('.InputField__error').exists()).toEqual(false);
  });

  it('Does not submit empty date', () => {
    const testFn = jest.fn();
    const wrapper = mountWithConfig(
      <ProfileDateOfBirthForm onSubmit={testFn} />,
    );
    const button = wrapper.find('Button');
    button.simulate('submit');
    expect(testFn).not.toHaveBeenCalled();
  });

  it('Calls submit function when passed a valid date', () => {
    const wrapper = mountWithConfig(<ProfileDateOfBirthForm />);
    const component = wrapper.find('ProfileDateOfBirthForm');
    component
      .find('#day')
      .last()
      .simulate('change', { target: { value: '23' } });
    component
      .find('#month')
      .last()
      .simulate('change', { target: { value: '08' } });
    component
      .find('#year')
      .last()
      .simulate('change', { target: { value: '1991' } });
    const button = wrapper.find('Button');
    button.simulate('submit');
    expect(component.state('updating')).toEqual(true);
  });
});
