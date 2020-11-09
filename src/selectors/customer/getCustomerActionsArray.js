import constants from '../../constants';
import getCustomerDOBValue from './getCustomerDOBValue';
import getCustomerEmergencyName from './getCustomerEmergencyName';
import getCustomerEmergencyTelephone from './getCustomerEmergencyTelephone';
import getCustomerTelephone from './getCustomerTelephone';

const getValue = value => {
  if (typeof value === 'undefined') return false;
  const valueWithoutSpaces = value.replace(/\s/g, '');
  return !valueWithoutSpaces.length;
};

export default state => [
  {
    id: 'personal_details_password',
    title: 'Update your password',
    updatable: true,
    link: constants.PROFILE_DETAILS_PASSWORD_URL,
  },
  {
    id: 'personal_details_telephone',
    title: 'Add a telephone number',
    updatable: getValue(getCustomerTelephone(state)),
    link: constants.PROFILE_DETAILS_TELEPHONE_URL,
  },
  {
    id: 'personal_details_dob',
    title: 'Add your date of birth',
    updatable: getValue(getCustomerDOBValue(state)),
    link: constants.PROFILE_DETAILS_DOB_URL,
  },
  {
    id: 'emergency_contact_details',
    title: 'Add emergency contact details',
    updatable:
      getValue(getCustomerEmergencyName(state)) ||
      getValue(getCustomerEmergencyTelephone(state)),
    link: constants.PROFILE_DETAILS_EMERGENCY_CONTACT_URL,
  },
];
