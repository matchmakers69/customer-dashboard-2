import DetailsListAddressField from './DetailsListAddressField';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const address = {
  // eslint-disable-next-line camelcase
  address_1: 'Kaboodle Solutions Ltd, 3 The Stables',
  // eslint-disable-next-line camelcase
  address_2: 'Parrswood Entertainment Centre',
  // eslint-disable-next-line camelcase
  address_3: '',
  city: 'Manchester',
  county: '',
  postcode: 'M20 5PG',
  country: {
    id: 235,
    code: 'GB',
    name: 'United Kingdom',
  },
};

export const tests = describe('DetailsListAddressField', () => {
  it('should not show value when type is hidden', () => {
    const wrapper = mountWithConfig(
      <DetailsListAddressField value={address} type="hidden" />,
    );
    expect(wrapper.exists('.DetailsListAddressField__value')).toEqual(false);
  });
});
