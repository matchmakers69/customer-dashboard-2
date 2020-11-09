import getCustomerActionsArray from './getCustomerActionsArray';

describe('getCustomerActionsArray', () => {
  let state = {};
  beforeEach(() => {
    state = {
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
  });

  it('it should return formatted customer actions', () => {
    expect(getCustomerActionsArray(state)).toEqual([
      {
        id: 'personal_details_password',
        link: '/profile/details/password',
        title: 'Update your password',
        updatable: true,
      },
      {
        id: 'personal_details_telephone',
        link: '/profile/details/telephone',
        title: 'Add a telephone number',
        updatable: true,
      },
      {
        id: 'personal_details_dob',
        link: '/profile/details/dateofbirth',
        title: 'Add your date of birth',
        updatable: true,
      },
      {
        id: 'emergency_contact_details',
        link: '/profile/details/emergency-contact',
        title: 'Add emergency contact details',
        updatable: true,
      },
    ]);
  });

  it('should not display emergency contact details if they are filled out', () => {
    state = {
      ...state,
      customer: {
        ...state.customer,
        personal_details: {
          ...state.customer.personal_details,
          emergency_contact: {
            full_name: 'John Doe',
            telephone: '03498893234',
          },
        },
      },
    };

    expect(getCustomerActionsArray(state)).toEqual([
      {
        id: 'personal_details_password',
        link: '/profile/details/password',
        title: 'Update your password',
        updatable: true,
      },
      {
        id: 'personal_details_telephone',
        link: '/profile/details/telephone',
        title: 'Add a telephone number',
        updatable: true,
      },
      {
        id: 'personal_details_dob',
        link: '/profile/details/dateofbirth',
        title: 'Add your date of birth',
        updatable: true,
      },
      {
        id: 'emergency_contact_details',
        link: '/profile/details/emergency-contact',
        title: 'Add emergency contact details',
        updatable: false,
      },
    ]);
  });

  it('should  display emergency contact details if a field is blank', () => {
    state = {
      ...state,
      customer: {
        ...state.customer,
        personal_details: {
          ...state.customer.personal_details,
          emergency_contact: {
            full_name: 'John Doe',
            telephone: '',
          },
        },
      },
    };

    expect(getCustomerActionsArray(state)).toEqual([
      {
        id: 'personal_details_password',
        link: '/profile/details/password',
        title: 'Update your password',
        updatable: true,
      },
      {
        id: 'personal_details_telephone',
        link: '/profile/details/telephone',
        title: 'Add a telephone number',
        updatable: true,
      },
      {
        id: 'personal_details_dob',
        link: '/profile/details/dateofbirth',
        title: 'Add your date of birth',
        updatable: true,
      },
      {
        id: 'emergency_contact_details',
        link: '/profile/details/emergency-contact',
        title: 'Add emergency contact details',
        updatable: true,
      },
    ]);
  });

  it('should not fall over if a field is missing', () => {
    state = {
      ...state,
      customer: {
        personal_details: {
          emergency_contact: {},
        },
      },
    };

    expect(getCustomerActionsArray(state)).toEqual([
      {
        id: 'personal_details_password',
        link: '/profile/details/password',
        title: 'Update your password',
        updatable: true,
      },
      {
        id: 'personal_details_telephone',
        link: '/profile/details/telephone',
        title: 'Add a telephone number',
        updatable: false,
      },
      {
        id: 'personal_details_dob',
        link: '/profile/details/dateofbirth',
        title: 'Add your date of birth',
        updatable: false,
      },
      {
        id: 'emergency_contact_details',
        link: '/profile/details/emergency-contact',
        title: 'Add emergency contact details',
        updatable: false,
      },
    ]);
  });
});
