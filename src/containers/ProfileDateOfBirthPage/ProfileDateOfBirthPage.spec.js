import ProfileDateOfBirthPage from './ProfileDateOfBirthPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { push } from 'connected-react-router';

const { PROFILE_DETAILS_URL } = constants;

describe('ProfileDateOfBirthPage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should fire redirect action when return button is clicked', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          date_of_birth: '1970-01-01',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileDateOfBirthPage />
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

  it('should pass through date of birth when it exists in customer store', () => {
    const initialState = {
      customer: {
        loaded: true,
        personal_details: {
          date_of_birth: '1970-01-01',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileDateOfBirthPage />
      </Provider>,
    );

    expect(
      wrapper.find('ProfileDateOfBirthPage').prop('dateOfBirth'),
    ).toMatchObject(new Date('1970-01-01'));
  });

  it('should pass through null date of birth whilst customer has not been loaded', () => {
    const initialState = {
      customer: {
        loaded: false,
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileDateOfBirthPage />
      </Provider>,
    );

    expect(
      wrapper.find('ProfileDateOfBirthPage').prop('dateOfBirth'),
    ).toBeNull();
  });
});
