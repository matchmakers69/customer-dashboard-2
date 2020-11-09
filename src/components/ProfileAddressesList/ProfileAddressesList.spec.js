import ProfileAddressesList from './ProfileAddressesList';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ProfileAddressesList', () => {
  it('Fires a function when the update button is clicked ', () => {
    const testFn = jest.fn();
    const address = {
      address_1: '',
      address_2: '',
      address_3: '',
      city: '',
      county: '',
      postcode: '',
      country: {
        id: -1,
        code: '',
        name: '',
      },
    };

    const wrapper = mountWithConfig(
      <ProfileAddressesList address={address} goTo={testFn} />,
    );

    const BackButton = wrapper.find('.Button');
    BackButton.simulate('click');
    expect(testFn).toHaveBeenCalled();
  });
});
