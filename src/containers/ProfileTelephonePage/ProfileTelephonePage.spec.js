import ProfileTelephonePage from './ProfileTelephonePage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import { mountWithConfig } from '../../testing/mountWithConfig';

const { PROFILE_DETAILS_URL } = constants;

describe('ProfileTelephonePage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should fire redirect action when return button is clicked', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          phone: '06546534',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileTelephonePage />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([goToRoute(PROFILE_DETAILS_URL)]);
  });

  it('should pass through telephone number when it exists in customer store', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          phone: '06546534',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileTelephonePage />
      </Provider>,
    );

    expect(wrapper.find('ProfileTelephonePage').prop('telephone')).toEqual(
      '06546534',
    );
  });

  it("should pass through empty string whilst customer hasn't been loaded", () => {
    const initialState = {
      customer: {
        loaded: false,
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileTelephonePage />
      </Provider>,
    );

    expect(wrapper.find('ProfileTelephonePage').prop('telephone')).toBeNull();
  });
});
