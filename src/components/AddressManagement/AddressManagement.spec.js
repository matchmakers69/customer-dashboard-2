import AddressManagement from './AddressManagement';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mountWithConfig } from '../../testing/mountWithConfig';

const address = {
  // eslint-disable-next-line camelcase
  address_1: '',
  // eslint-disable-next-line camelcase
  address_2: '',
  // eslint-disable-next-line camelcase
  address_3: '',
  city: '',
  county: '',
  postcode: '',
  country: { code: '', label: '', value: -1 },
};

const countries = [{ label: 'Algeria', value: 4 }];

describe('AddressManagement', () => {
  it('should render input fields with the component button is clicked', () => {
    const handleChange = jest.fn();
    const wrapper = mountWithConfig(
      <AddressManagement
        address={address}
        countries={countries}
        onChange={handleChange}
      />,
    );

    wrapper.find('Button').simulate('click');
    expect(wrapper.find('InputField').length).toEqual(6);
  });

  it('should render the form submit button as disabled by default', () => {
    const handleChange = jest.fn();
    const wrapper = mountWithConfig(
      <AddressManagement
        address={address}
        countries={countries}
        onChange={handleChange}
      />,
    );

    wrapper.find('Button').simulate('click');

    act(() => {
      const address1Input = wrapper.find('input[name="address_1"]');
      address1Input.prop('onChange')({ target: { value: 'Flat 1' } });
    });

    const submitButton = wrapper.find('Button');
    expect(submitButton.prop('disabled')).toEqual(true);
  });

  it('should enable the form submit button to be clicked if required fields filled and return the field values via the onChange function', () => {
    const handleChange = jest.fn();
    const wrapper = mountWithConfig(
      <AddressManagement
        address={address}
        countries={countries}
        onChange={handleChange}
      />,
    );
    wrapper.find('Button').simulate('click');

    act(() => {
      const address1Input = wrapper.find('input[name="address_1"]');
      address1Input.prop('onChange')({ target: { value: 'Flat 1' } });

      const address2Input = wrapper.find('input[name="address_2"]');
      address2Input.prop('onChange')({
        target: { value: '10 Testfield Road' },
      });

      const address3Input = wrapper.find('input[name="address_3"]');
      address3Input.prop('onChange')({ target: { value: 'Testbury Mews' } });

      const cityInput = wrapper.find('input[name="city"]');
      cityInput.prop('onChange')({ target: { value: 'Testington' } });

      const countyInput = wrapper.find('input[name="county"]');
      countyInput.prop('onChange')({ target: { value: 'Testshire' } });

      const postcodeInput = wrapper.find('input[name="postcode"]');
      postcodeInput.prop('onChange')({ target: { value: 'M10 4BD' } });

      const countryInput = wrapper.find('.Select > .Select__wrapper');
      countryInput.prop('onChange')({ label: 'Algeria', value: 4 });
    });

    wrapper.update();

    expect(handleChange.mock.calls).toEqual([
      ['address_1', 'Flat 1'],
      ['address_2', '10 Testfield Road'],
      ['address_3', 'Testbury Mews'],
      ['city', 'Testington'],
      ['county', 'Testshire'],
      ['postcode', 'M10 4BD'],
      ['country', { label: 'Algeria', value: 4 }],
    ]);
  });
});
