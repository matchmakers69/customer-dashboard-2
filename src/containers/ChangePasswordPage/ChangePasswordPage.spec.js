import ChangePasswordPage from './ChangePasswordPage';
import { Provider } from 'react-redux';
import React from 'react';
import { authOperations } from '../../store/auth';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';

const { CHANGE_PASSWORD_URL } = constants;

describe('ChangePasswordPage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should redirect to bookings page if reset is not required', () => {
    const initialState = {
      auth: {
        resetRequired: false,
      },
      router: {
        location: {
          pathname: CHANGE_PASSWORD_URL,
        },
      },
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ChangePasswordPage />
      </Provider>,
    );

    const redirect = wrapper.find('Redirect');
    expect(redirect.prop('to')).toEqual(constants.BOOKINGS_URL);
  });

  it('should logout if no email is made available on page load', () => {
    const initialState = {
      auth: {
        resetRequired: true,
        resetEmail: null,
      },
      router: {
        location: {
          pathname: CHANGE_PASSWORD_URL,
        },
      },
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ChangePasswordPage />
      </Provider>,
    );

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(authOperations.logout());
  });

  it('should not logout if email is passed', () => {
    const initialState = {
      auth: {
        resetRequired: true,
        resetEmail: 'test@kaboodle.co.uk',
      },
      router: {
        location: {
          pathname: CHANGE_PASSWORD_URL,
        },
      },
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ChangePasswordPage />
      </Provider>,
    );

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).not.toContainEqual(authOperations.logout());
  });
});
