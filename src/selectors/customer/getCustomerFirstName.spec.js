import getCustomerFirstName from './getCustomerFirstName';

describe('getCustomerFirstName', () => {
  it(`it should return the first name of the customer`, () => {
    const state = {
      customer: {
        personal_details: {
          first_name: 'John',
        },
      },
    };

    expect(getCustomerFirstName(state)).toEqual('John');
  });
});
