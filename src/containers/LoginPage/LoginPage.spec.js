import { MemoryRouter, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'react-jss';
import { baseTheme } from '@kaboodle-solutions/design-system';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mount } from 'enzyme';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('LoginPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      auth: {
        authenticated: false,
      },
    };
  });

  it('should redirect when user is authenticated', () => {
    initialState = {
      auth: {
        authenticated: true,
      },
    };
    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <LoginPage />
      </Provider>,
    );

    const redirect = wrapper.find('Redirect');
    expect(redirect.prop('to')).toEqual(constants.BOOKINGS_URL);
  });

  it('should not redirect when user is not authenticated', () => {
    const mockStore = store(initialState);

    const wrapper = mount(
      <ThemeProvider theme={baseTheme}>
        <MemoryRouter keyLength={0} initialEntries={['/login']}>
          <Route
            path="/login"
            render={() => (
              <Provider store={mockStore}>
                <LoginPage />
              </Provider>
            )}
          />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      constants.LOGIN_URL,
    );
  });
});
