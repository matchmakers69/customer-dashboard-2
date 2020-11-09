import getCustomerAddress from './getCustomerAddress';

describe('getCustomerAddress', () => {
  it('should return the customer address object when customer loaded', () => {
    const state = {
      client: {
        countries: [
          {
            id: 1,
            code: 'CO',
            name: 'country',
          },
        ],
      },
      customer: {
        loaded: true,
        address: {
          id: 1,
          default_address: true,
          type: 'Home',
          address_1: 'address_1',
          address_2: 'address_2',
          address_3: 'address_3',
          city: 'city',
          county: 'county',
          postcode: 'postcode',
          country: {
            code: 'CO',
            name: 'country',
          },
        },
      },
    };

    expect(getCustomerAddress(state)).toEqual({
      id: 1,
      address_1: 'address_1',
      address_2: 'address_2',
      address_3: 'address_3',
      city: 'city',
      county: 'county',
      postcode: 'postcode',
      country: {
        id: 1,
        code: 'CO',
        name: 'country',
      },
    });
  });

  it('should not return a country ID when country does not exist in available options.', () => {
    const state = {
      client: {
        countries: [
          {
            id: 1,
            code: 'NON EXISTENT',
            name: 'country',
          },
        ],
      },
      customer: {
        loaded: true,
        address: {
          id: 1,
          default_address: true,
          type: 'Home',
          valid_from_date: {
            iso_value: '',
            isotz_value: '',
          },
          valid_to_date: {
            iso_value: '',
            isotz_value: '',
          },
          address_1: 'address_1',
          address_2: 'address_2',
          address_3: 'address_3',
          city: 'city',
          county: 'county',
          postcode: 'postcode',
          country: {
            code: 'CO',
            name: 'country',
          },
        },
      },
    };

    expect(getCustomerAddress(state)).toEqual({
      id: 1,
      address_1: 'address_1',
      address_2: 'address_2',
      address_3: 'address_3',
      city: 'city',
      county: 'county',
      postcode: 'postcode',
      country: {
        code: 'CO',
        name: 'country',
      },
    });
  });

  it('it should return the default address object whilst customer not loaded', () => {
    const state = {
      client: {
        countries: [],
      },
      customer: {
        loaded: false,
      },
    };

    expect(getCustomerAddress(state)).toEqual({
      id: '',
      address_1: '',
      address_2: '',
      address_3: '',
      city: '',
      postcode: '',
      county: '',
      country: {
        id: -1,
        name: '',
        code: '',
      },
    });
  });
});
