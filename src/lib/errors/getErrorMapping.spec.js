import errorMappings, {
  CUSTOMER_PASSWORD_INCORRECT,
} from '../../constants/errors';

import getErrorMapping from './getErrorMapping';

describe('getErrorMapping', () => {
  it('should return appropriate error if it exists in mappings', () => {
    expect(getErrorMapping(CUSTOMER_PASSWORD_INCORRECT)).toEqual(
      // eslint-disable-next-line import/no-named-as-default-member
      errorMappings[CUSTOMER_PASSWORD_INCORRECT],
    );
  });

  it('should return default error if error does NOT exist in mappings', () => {
    expect(getErrorMapping('UNKNOWN_ERROR_CODE')).toEqual({
      key: 'UNKNOWN_ERROR_CODE',
      message: "It looks like we're having a few problems with your request.",
      redirectPath: null,
      severity: 4,
    });
  });
});
