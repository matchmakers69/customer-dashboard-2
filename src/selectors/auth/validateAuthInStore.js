import constants from '../../constants';
import { differenceInMinutes } from 'date-fns';

const validateAuthInStore = state => {
  const now = new Date();
  const { authenticated, timestamp } = state.auth;

  const isExpired =
    differenceInMinutes(timestamp, now) >=
    constants.MINUTES_UNTIL_REAUTHETICATION;

  return Boolean(authenticated && !isExpired);
};

export default validateAuthInStore;
