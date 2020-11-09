import getClientCountriesFormArray from './getClientCountriesFormArray';

describe('getClientCountriesFormArray', () => {
  it('it should return the countries available, formatted for select component', () => {
    const state = {
      client: {
        countries: [
          {
            id: 1,
            code: 'AF',
            name: 'Afghanistan',
          },
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
          {
            id: 7,
            code: 'AO',
            name: 'Angola',
          },
        ],
      },
    };

    expect(getClientCountriesFormArray(state)).toEqual([
      { label: 'Afghanistan', code: 'AF', value: 1 },
      { label: 'Algeria', code: 'DZ', value: 4 },
      { label: 'Angola', code: 'AO', value: 7 },
    ]);
  });
});
