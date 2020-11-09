import ProfileGenderForm from './ProfileGenderForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const genderOptions = [{ label: 'Male', value: 'Male' }];
const gender = { label: 'Male', value: 'Male' };

describe('ProfileGenderForm', () => {
  it('Does not show errors by default', () => {
    const wrapper = mountWithConfig(
      <ProfileGenderForm genderOptions={genderOptions} />,
    );
    expect(wrapper.exists('.Select__error')).toEqual(false);
  });

  it('Shows an error for invalid option', () => {
    const wrapper = mountWithConfig(
      <ProfileGenderForm genderOptions={genderOptions} />,
    );
    const component = wrapper.find('ProfileGenderForm');
    const genderInput = wrapper.find('.Select__wrapper input');

    component.setState({
      gender: { label: 'Male', value: 'Invalid Option' },
      genderDirty: true,
    });

    genderInput.simulate('change');

    expect(wrapper.find('.Select__error').length).toEqual(1);
  });

  it('Should set gender and genderFocused when select is focused', () => {
    const wrapper = mountWithConfig(
      <ProfileGenderForm gender={gender} genderOptions={genderOptions} />,
    );
    const component = wrapper.find('ProfileGenderForm');
    const genderInput = wrapper.find('.Select > .Select__wrapper');
    genderInput.prop('onFocus')(gender);

    expect(component.state()).toEqual({
      gender,
      genderFocused: true,
      genderDirty: false,
      updating: false,
    });
  });

  it('Should set gender and genderDirty when select is changed', () => {
    const wrapper = mountWithConfig(
      <ProfileGenderForm gender={gender} genderOptions={genderOptions} />,
    );
    const component = wrapper.find('ProfileGenderForm');
    const genderInput = wrapper.find('.Select > .Select__wrapper');

    genderInput.prop('onChange')(gender);

    expect(component.state()).toEqual({
      gender,
      genderDirty: true,
      genderFocused: false,
      updating: false,
    });
  });

  it('Should set genderFocused to FALSE when select is blurred', () => {
    const wrapper = mountWithConfig(
      <ProfileGenderForm gender={gender} genderOptions={genderOptions} />,
    );
    const component = wrapper.find('ProfileGenderForm');
    const genderInput = wrapper.find('.Select > .Select__wrapper');

    genderInput.prop('onBlur')();

    expect(component.state()).toEqual({
      gender: '',
      genderDirty: false,
      genderFocused: false,
      updating: false,
    });
  });

  it('Should fire onSubmit when form submitted with valid data', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <ProfileGenderForm genderOptions={genderOptions} onSubmit={testFn} />,
    );
    const component = wrapper.find('ProfileGenderForm');

    component.setState({
      gender,
      genderDirty: true,
    });

    component.simulate('submit', testEvent);

    expect(testFn).toBeCalled();
  });

  it('Should NOT fire onSubmit when form submitted with invalid data', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <ProfileGenderForm genderOptions={genderOptions} onSubmit={testFn} />,
    );
    const component = wrapper.find('ProfileGenderForm');

    component.setState({
      gender: { label: 'Male', value: 'Invalid Option' },
      genderDirty: true,
    });

    component.simulate('submit', testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });
});
