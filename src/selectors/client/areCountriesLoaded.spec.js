import areCountriesLoaded from './areCountriesLoaded';

describe('areCountriesLoaded', () => {
  it('it should return TRUE when countries array is empty', () => {
    const state = {
      client: {
        countries: [],
      },
    };

    expect(areCountriesLoaded(state)).toEqual(false);
  });

  it('it should return FALSE when countries array is NOT empty', () => {
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
        ],
      },
    };

    expect(areCountriesLoaded(state)).toEqual(true);
  });
});
