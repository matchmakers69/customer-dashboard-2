import ProfileEmergencyContactPage from './ProfileEmergencyContactPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { push } from 'connected-react-router';

const { PROFILE_DETAILS_URL } = constants;

describe('ProfileEmergencyContactPage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should fire redirect action when return button is clicked', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          emergency_contact: {
            full_name: '',
            telephone: '681864215',
          },
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileEmergencyContactPage />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([push(PROFILE_DETAILS_URL)]);
  });

  it('should pass through telephone number when it exists in customer store', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          emergency_contact: {
            full_name: '',
            telephone: '681864215',
          },
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileEmergencyContactPage />
      </Provider>,
    );

    expect(
      wrapper.find('ProfileEmergencyContactPage').prop('telephone'),
    ).toEqual('681864215');
  });

  it('should pass through empty string whilst customer has not been loaded', () => {
    const initialState = {
      customer: {
        loaded: false,
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileEmergencyContactPage />
      </Provider>,
    );

    expect(
      wrapper.find('ProfileEmergencyContactPage').prop('telephone'),
    ).toEqual('');
  });
});
