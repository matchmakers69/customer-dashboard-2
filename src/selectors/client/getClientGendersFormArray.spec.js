import getClientGendersFormArray from './getClientGendersFormArray';

describe('getClientGendersFormArray', () => {
  it(`it should return the genders available for the client formatted for select component`, () => {
    const state = {
      client: {
        genders: ['Male', 'Female', 'Prefer not to say'],
      },
    };

    expect(getClientGendersFormArray(state)).toEqual([
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Prefer not to say', value: 'Prefer not to say' },
    ]);
  });
});
