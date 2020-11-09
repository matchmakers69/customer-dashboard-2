import constants from '../../constants';
import getCustomerDetailsArray from './getCustomerDetailsArray';

describe('getCustomerDetailsArray', () => {
  it('it should return formatted customer details', () => {
    const state = {
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

    expect(getCustomerDetailsArray(state)).toEqual({
      emergency_contact_details: [
        {
          link: constants.PROFILE_DETAILS_EMERGENCY_CONTACT_URL,
          title: 'Name',
          value: '',
        },
        { title: 'Telephone Number', value: '' },
      ],
      passport_details: [],
      personal_details: [
        { title: 'Name', value: 'John Doe' },
        { title: 'Email', value: 'johndoe@gmail.com' },
        {
          link: constants.PROFILE_DETAILS_TELEPHONE_URL,
          title: 'Telephone Number',
          value: '',
        },
        {
          link: constants.PROFILE_DETAILS_DOB_URL,
          title: 'Date of Birth',
          value: '',
        },
        {
          link: constants.PROFILE_DETAILS_PASSWORD_URL,
          title: 'Password',
          type: 'hidden',
          value: 'NotARealPassword',
        },
      ],
    });
  });

  it('it should return formatted date when DOB set in state', () => {
    const state = {
      customer: {
        loaded: true,
        id: 844509,
        email_verification_required: false,
        personal_details: {
          sex: '',
          gender: 'Male',
          date_of_birth: '1970-01-01',
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

    expect(getCustomerDetailsArray(state).personal_details).toEqual([
      { title: 'Name', value: 'John Doe' },
      { title: 'Email', value: 'johndoe@gmail.com' },
      {
        link: constants.PROFILE_DETAILS_TELEPHONE_URL,
        title: 'Telephone Number',
        value: '',
      },
      {
        link: constants.PROFILE_DETAILS_DOB_URL,
        title: 'Date of Birth',
        value: '1st January 1970',
      },
      {
        link: constants.PROFILE_DETAILS_PASSWORD_URL,
        title: 'Password',
        type: 'hidden',
        value: 'NotARealPassword',
      },
    ]);
  });
});
