import { advanceTo, clear } from 'jest-date-mock';
import { addMinutes } from 'date-fns';
import constants from '../../constants';
import validateAuthInStore from './validateAuthInStore';

describe('validateAuthInStore', () => {
  it(`should confirm the auth status when the timestamp is within the re-authentication time difference`, () => {
    const time = new Date();

    const state = {
      auth: {
        authenticated: true,
        loading: false,
        timestamp: time,
        apiCheck: true,
        error: null,
      },
    };

    expect(validateAuthInStore(state)).toEqual(true);
  });

  it(`should confirm the auth status needing to be rechecked when the timestamp is outside the re-authentication time difference`, () => {
    advanceTo(new Date());
    const time = addMinutes(
      new Date(),
      constants.MINUTES_UNTIL_REAUTHETICATION,
    );

    const state = {
      auth: {
        authenticated: true,
        loading: false,
        timestamp: time,
        apiCheck: true,
        error: null,
      },
    };

    expect(validateAuthInStore(state)).toEqual(false);
    // Reset the Date for subsequent tests.
    clear();
  });
});
