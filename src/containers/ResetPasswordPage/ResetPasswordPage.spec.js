import { Provider } from 'react-redux';
import React from 'react';
import ResetPasswordPage from './ResetPasswordPage';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ResetPasswordPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      auth: {
        authenticated: false,
      },
      ui: {
        displayHeader: false,
        displayFooter: false,
        displayHeaderLinks: false,
      },
    };
  });

  it('should redirect to bookings page if authenticated', () => {
    initialState = {
      auth: {
        authenticated: true,
      },
      ui: {
        displayHeader: false,
        displayFooter: false,
        displayHeaderLinks: false,
      },
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ResetPasswordPage />
      </Provider>,
    );

    const redirect = wrapper.find('Redirect');
    expect(redirect.prop('to')).toEqual(constants.BOOKINGS_URL);
  });
});
