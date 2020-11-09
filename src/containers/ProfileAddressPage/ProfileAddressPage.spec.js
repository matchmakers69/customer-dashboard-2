import ProfileAddressPage from './ProfileAddressPage';
import { Provider } from 'react-redux';
import React from 'react';
import { clientOperations } from '../../store/client';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { push } from 'connected-react-router';

describe('ProfileAddressPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
      customer: {
        loaded: true,
        address: {
          id: 491373,
          default_address: true,
          type: 'Home',
          address_1: 'Kaboodle Solutions Ltd, 3 The Stables',
          address_2: 'Parrswood Entertainment Centre',
          address_3: '',
          city: 'Manchester',
          county: '',
          postcode: 'M20 5PG',
          country: {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        },
      },
    };
  });

  it('should render loader whilst customer is loading', () => {
    const mockStore = store({ ...initialState, customer: { loaded: false } });

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileAddressPage />
      </Provider>,
    );

    expect(wrapper.find('.WrapLoader').exists()).toEqual(true);
  });

  it('should fire redirect action when return button is clicked', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileAddressPage />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([
      clientOperations.getCountries(),
      push(constants.PROFILE_DETAILS_ADDRESSES_URL),
    ]);
  });
});
