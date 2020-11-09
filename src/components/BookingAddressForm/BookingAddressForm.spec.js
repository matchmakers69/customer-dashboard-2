import BookingAddressForm from './BookingAddressForm';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';
import noop from 'lodash/noop';

describe('BookingAddressForm', () => {
  let address = {};
  const countries = [];

  beforeEach(() => {
    address = {
      id: 491400,
      address_1: 'Kaboodle Solutions Ltd',
      address_2: '3 The Stables',
      address_3: 'East Didsbury',
      city: 'Manchester',
      county: 'Greater Manchester',
      postcode: 'M20 5PG',
      country: {
        value: '235',
        code: 'GB',
        label: 'United Kingdom',
      },
    };
  });

  it('Renders with required props', () => {
    const wrapper = mountWithConfig(
      <BookingAddressForm
        address={address}
        bookingReference="PW123456"
        allocationId={1}
        countries={countries}
        onSubmit={noop}
      />,
    );
    expect(wrapper.find(BookingAddressForm).exists()).toBe(true);
  });

  it('Should fire onSubmit when form submitted with required fields', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    const wrapper = mountWithConfig(
      <BookingAddressForm
        address={address}
        bookingReference="PW123456"
        allocationId={1}
        countries={countries}
        onSubmit={testFn}
      />,
    );

    // Simulate change of address line 1 so at least one input is dirty.
    const address1Input = wrapper.find('input[name="address_1"]');
    address1Input.prop('onChange')({
      target: { name: 'address1', value: 'Apartment 59' },
    });

    const addressForm = wrapper.find('form[data-test="booking-address-form"]');
    addressForm.prop('onSubmit')(testEvent);

    expect(testFn).toHaveBeenCalled();
  });

  it('Should not fire onSubmit when form submitted without all required fields', () => {
    const testFn = jest.fn();
    const testEvent = { preventDefault: jest.fn() };

    // City is required, set empty string.
    address.city = '';

    const wrapper = mountWithConfig(
      <BookingAddressForm
        address={address}
        bookingReference="PW123456"
        allocationId={1}
        countries={countries}
        onSubmit={testFn}
      />,
    );

    // Simulate change of address line 1 so at least one input is dirty.
    const address1Input = wrapper.find('input[name="address_1"]');
    address1Input.prop('onChange')({
      target: { name: 'address_1', value: 'Apartment 59' },
    });

    const addressForm = wrapper.find('form[data-test="booking-address-form"]');
    addressForm.prop('onSubmit')(testEvent);

    expect(testFn).not.toHaveBeenCalled();
  });

  it('Should update the state to match input values for all fields', () => {
    const wrapper = mountWithConfig(
      <BookingAddressForm
        address={address}
        bookingReference="PW123456"
        allocationId={1}
        countries={countries}
        onSubmit={noop}
      />,
    );

    const address1Input = wrapper.find('input[name="address_1"]');
    address1Input.prop('onChange')({ target: { value: 'Flat 1' } });

    const address2Input = wrapper.find('input[name="address_2"]');
    address2Input.prop('onChange')({ target: { value: '10 Testfield Road' } });

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

    expect(wrapper.state()).not.toEqual({
      address_1: 'Flat 1',
      address_2: '10 Testfield Road',
      address_3: 'Tesbury Mews',
      city: 'Testington',
      county: 'Testshire',
      postcode: 'M10 4BD',
      country: { label: 'Algeria', code: 'DZ', value: 4 },
    });
  });
});
