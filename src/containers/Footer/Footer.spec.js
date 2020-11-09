import Footer, { mapStateToProps } from './Footer';

import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('Footer', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      ui: {
        displayFooter: true,
      },
    };
  });

  it('should render DashboardHeader when the prop displayHeader is true', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Footer />
      </Provider>,
    );
    expect(wrapper.find('.Footer').exists()).toBe(true);
  });

  it('should render nothing when the prop displayHeader is false', () => {
    initialState = {
      ui: {
        displayFooter: false,
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <Footer />
      </Provider>,
    );
    expect(wrapper.find('.Footer').exists()).toBe(false);
  });

  it('correctly MapsStateToProps', () => {
    const mockState = {
      ui: {
        displayFooter: true,
      },
    };

    expect(mapStateToProps(mockState)).toEqual({ displayFooter: true });
  });
});
