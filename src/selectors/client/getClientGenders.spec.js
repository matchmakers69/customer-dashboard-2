import getClientGenders from './getClientGenders';

describe('getClientGenders', () => {
  it(`it should return the genders available for the client`, () => {
    const state = {
      client: {
        genders: ['Male', 'Female', 'Prefer not to say'],
      },
    };

    expect(getClientGenders(state)).toEqual([
      'Male',
      'Female',
      'Prefer not to say',
    ]);
  });
});
