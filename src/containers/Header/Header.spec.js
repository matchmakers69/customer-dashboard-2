import { authOperations, authTypes } from '../../store/auth';

import Header from './Header';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import { messageOperations } from '../../store/messages';
import { mountWithConfig } from '../../testing/mountWithConfig';

const { LOGOUT } = authTypes;

describe('Header', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();
    initialState = {
      ui: {
        displayHeader: true,
        displayFooter: true,
        displayHeaderLinks: true,
      },
    };

    // Mock matchMedia property of window.
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true })),
      writable: true,
    });
  });

  it('should redirect to bookings page on logo click', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );

    const headerLogo = wrapper.find('[data-test="header-logo-link"]');
    headerLogo.simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(goToRoute(constants.BOOKINGS_URL));
  });

  it(`should fire ${LOGOUT} when sign out button is clicked.`, () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );

    const signOutButton = wrapper.find('.signOutButton');
    signOutButton.simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(
      messageOperations.sendMessage({
        displayType: 'prompt',
        header: 'Sign Out',
        message: 'You are about to sign out. Do you want to continue?',
        actions: [
          {
            type: 'success',
            text: 'Sign Out',
            onClick: authOperations.logout(constants.LOGOUT_SUCCESS),
          },
          { text: 'Cancel' },
        ],
      }),
    );
  });

  it('should render DashboardHeader when the prop displayHeader is true', () => {
    initialState = {
      ui: {
        displayHeader: true,
        displayHeaderLinks: true,
      },
    };
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );
    expect(wrapper.find('.DashboardHeader').exists()).toBe(true);
  });

  it('should render nothing when the prop displayHeader is false', () => {
    initialState = {
      ui: {
        displayHeader: false,
        displayHeaderLinks: true,
      },
    };
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );

    expect(wrapper.find('.DashboardHeader').exists()).toBe(false);
  });

  it('should only render sign out link when displayHeaderLinks is FALSE', () => {
    initialState = {
      ui: {
        displayHeader: true,
        displayHeaderLinks: false,
      },
    };
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );

    expect(wrapper.find('Link').exists()).toBe(false);
  });
});
