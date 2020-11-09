import getClientCountries from './getClientCountries';

describe('getClientCountries', () => {
  it('it should return the countries available to select', () => {
    const state = {
      client: {
        countries: ['Male', 'Female', 'Prefer not to say'],
      },
    };

    expect(getClientCountries(state)).toEqual([
      'Male',
      'Female',
      'Prefer not to say',
    ]);
  });
});
