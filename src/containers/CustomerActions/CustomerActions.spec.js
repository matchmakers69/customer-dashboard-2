import CustomerActions from './CustomerActions';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('CustomerActions', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      customer: {
        loaded: true,
        personal_details: {
          first_name: 'Joe',
          last_name: 'Bloggs',
          date_of_birth: '',
          emergency_contact: {
            full_name: '',
            telephone: '',
          },
        },
      },
    };
  });

  it('it should goto the expected page when an link is clicked', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <CustomerActions />
      </Provider>,
    );

    const passwordButton = wrapper.find('.personal_details_password');
    passwordButton.simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(goToRoute(constants.PROFILE_DETAILS_PASSWORD_URL));
  });
});
