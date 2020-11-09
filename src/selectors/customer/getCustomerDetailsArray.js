import constants from '../../constants';
import format from 'date-fns/format';
import getCustomerDOB from './getCustomerDOB';
import getCustomerEmail from './getCustomerEmail';
import getCustomerEmergencyName from './getCustomerEmergencyName';
import getCustomerEmergencyTelephone from './getCustomerEmergencyTelephone';
import getCustomerFullName from './getCustomerFullName';
import getCustomerTelephone from './getCustomerTelephone';

const getValue = value => {
  const valueWithoutSpaces = value.replace(/\s/g, '');
  return valueWithoutSpaces.length ? value : '';
};

export default state => {
  const dateOfBirth = getCustomerDOB(state);
  const dateOfBirthFormat = 'Do MMMM YYYY';

  return {
    personal_details: [
      {
        title: 'Name',
        value: getValue(getCustomerFullName(state)),
      },
      {
        title: 'Email',
        value: getValue(getCustomerEmail(state)),
      },
      {
        title: 'Telephone Number',
        value: getValue(getCustomerTelephone(state)),
        link: constants.PROFILE_DETAILS_TELEPHONE_URL,
      },
      {
        title: 'Date of Birth',
        value: dateOfBirth
          ? format(dateOfBirth, dateOfBirthFormat)
          : getValue(dateOfBirth),
        link: constants.PROFILE_DETAILS_DOB_URL,
      },
      {
        title: 'Password',
        value: 'NotARealPassword',
        link: constants.PROFILE_DETAILS_PASSWORD_URL,
        type: 'hidden',
      },
    ],
    passport_details: [],
    emergency_contact_details: [
      {
        title: 'Name',
        value: getValue(getCustomerEmergencyName(state)),
        link: constants.PROFILE_DETAILS_EMERGENCY_CONTACT_URL,
      },
      {
        title: 'Telephone Number',
        value: getValue(getCustomerEmergencyTelephone(state)),
      },
    ],
  };
};
