import ProfileDetailsPage from './ProfileDetailsPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { goToRoute } from '../../lib/router';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('ProfileDetailsPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      customer: {
        loaded: false,
      },
    };
  });

  it('should display the personal details and emergency contact details lists when it has a valid customer_details prop', () => {
    initialState = {
      customer: {
        loaded: true,
        id: 844509,
        email_verification_required: false,
        personal_details: {
          sex: '',
          gender: 'Male',
          date_of_birth: '',
          title: '',
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@gmail.com',
          phone: '',
          emergency_contact: {
            full_name: '',
            telephone: '',
          },
          club_membership_number: '',
        },
        passport: {
          expiry_date: '',
          full_name: '',
          first_name: '',
          middle_names: '',
          last_name: '',
          number: '',
          nationality: '',
          issue_country: {
            code: '',
            name: '',
          },
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileDetailsPage />
      </Provider>,
    );

    expect(wrapper.find('.ProfilePersonalDetails').exists()).toBe(true);
    expect(wrapper.find('.ProfileEmergencyContactDetails').exists()).toBe(true);
    expect(wrapper.find('.DetailsListField')).toHaveLength(7);
  });

  it('should fire redirect action when return button is clicked', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <ProfileDetailsPage />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(goToRoute(constants.PROFILE_URL));
  });
});
