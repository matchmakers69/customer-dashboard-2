import ProfilePasswordPage from './ProfilePasswordPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { push } from 'connected-react-router';

const { PROFILE_DETAILS_URL } = constants;

describe('ProfilePasswordPage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should fire redirect action when return button is clicked', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          email: 'test@kaboodle.co.uk',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfilePasswordPage />
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
});
