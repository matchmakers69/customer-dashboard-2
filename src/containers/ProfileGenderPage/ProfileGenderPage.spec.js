import ProfileGenderPage from './ProfileGenderPage';
import { Provider } from 'react-redux';
import React from 'react';
import { clientOperations } from '../../store/client';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { push } from 'connected-react-router';

const { PROFILE_DETAILS_URL } = constants;

describe('ProfileGenderPage', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it('should fire redirect action when return button is clicked', () => {
    const initialState = {
      client: {
        genders: ['Male', 'Female', 'Other'],
      },
      customer: {
        loaded: true,
        personal_details: {
          gender: 'Male',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileGenderPage />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([clientOperations.getGenders(), push(PROFILE_DETAILS_URL)]);
  });

  it('should pass through gender when it exists in customer store', () => {
    const initialState = {
      client: {
        genders: ['Male', 'Female', 'Other'],
      },
      customer: {
        loaded: true,
        personal_details: {
          gender: 'Male',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileGenderPage />
      </Provider>,
    );

    expect(wrapper.find('ProfileGenderPage').prop('gender')).toEqual({
      label: 'Male',
      value: 'Male',
    });
  });

  it("should pass through null gender whilst customer hasn't been loaded", () => {
    const initialState = {
      client: {
        genders: ['Male', 'Female', 'Other'],
      },
      customer: {
        loaded: false,
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileGenderPage />
      </Provider>,
    );

    expect(wrapper.find('ProfileGenderPage').prop('gender')).toBeNull();
  });
});
