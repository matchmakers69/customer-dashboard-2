import getCustomerLastName from './getCustomerLastName';

describe('getCustomerLastName', () => {
  it(`it should return the last name of the customer`, () => {
    const state = {
      customer: {
        personal_details: {
          last_name: 'Doe',
        },
      },
    };

    expect(getCustomerLastName(state)).toEqual('Doe');
  });
});
