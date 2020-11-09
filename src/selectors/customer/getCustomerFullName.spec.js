import getCustomerFullName from './getCustomerFullName';

describe('getCustomerFullName', () => {
  it('it should return the full name of the customer when customer loaded', () => {
    const state = {
      customer: {
        loaded: true,
        personal_details: {
          first_name: 'John',
          last_name: 'Doe',
        },
      },
    };

    expect(getCustomerFullName(state)).toEqual('John Doe');
  });

  it('it should return empty string when customer not loaded', () => {
    const state = {
      customer: {
        loaded: false,
      },
    };

    expect(getCustomerFullName(state)).toEqual('');
  });
});
