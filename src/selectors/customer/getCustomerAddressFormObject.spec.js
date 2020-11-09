import getCustomerAddressFormObject from './getCustomerAddressFormObject';

describe('getCustomerAddressFormObject', () => {
  it('it should return the formatted customer address object', () => {
    const state = {
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
      customer: {
        loaded: true,
        address: {
          id: 491373,
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
          address_1: 'Kaboodle Solutions Ltd, 3 The Stables',
          address_2: 'Parrswood Entertainment Centre',
          address_3: '',
          city: 'Manchester',
          county: '',
          postcode: 'M20 5PG',
          country: {
            code: 'DZ',
            name: 'Algeria',
          },
        },
      },
    };

    expect(getCustomerAddressFormObject(state)).toEqual({
      id: 491373,
      address_1: 'Kaboodle Solutions Ltd, 3 The Stables',
      address_2: 'Parrswood Entertainment Centre',
      address_3: '',
      city: 'Manchester',
      county: '',
      postcode: 'M20 5PG',
      country: {
        value: 4,
        code: 'DZ',
        label: 'Algeria',
      },
    });
  });
});
