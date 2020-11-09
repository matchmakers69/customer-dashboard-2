import ProfileAddressesPage from './ProfileAddressesPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { push } from 'connected-react-router';

const { PROFILE_URL } = constants;

describe('ProfileAddressesPage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should return the address object prop when customer is loaded', () => {
    const initialState = {
      client: {
        countries: [
          {
            id: -1,
            code: 'code',
            name: 'country',
          },
        ],
      },
      customer: {
        loaded: true,
        personal_details: {
          date_of_birth: '1970-01-01',
        },
        address: {
          address_1: 'address_1',
          address_2: 'address_2',
          address_3: 'address_3',
          city: 'city',
          county: 'county',
          postcode: 'postcode',
          country: {
            id: -1,
            code: 'code',
            name: 'country',
          },
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileAddressesPage />
      </Provider>,
    );

    expect(wrapper.find('ProfileAddressesPage').prop('address')).toMatchObject({
      address_1: 'address_1',
      address_2: 'address_2',
      address_3: 'address_3',
      city: 'city',
      county: 'county',
      postcode: 'postcode',
      country: {
        id: -1,
        code: 'code',
        name: 'country',
      },
    });
  });

  it('should fire redirect action when return button is clicked', () => {
    const initialState = {
      client: {
        countries: [
          {
            id: -1,
            code: 'code',
            name: 'country',
          },
        ],
      },
      customer: {
        loaded: true,
        personal_details: {
          date_of_birth: '1970-01-01',
        },
        address: {
          address_1: 'address_1',
          address_2: 'address_2',
          address_3: 'address_3',
          city: 'city',
          county: 'county',
          postcode: 'postcode',
          country: {
            id: -1,
            code: 'code',
            name: 'country',
          },
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileAddressesPage />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([push(PROFILE_URL)]);
  });
});
