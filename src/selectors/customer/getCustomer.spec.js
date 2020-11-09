import getCustomer from './getCustomer';

describe('getCustomer', () => {
  it('it should return the customer object', () => {
    const state = {
      customer: {
        personal_details: {
          first_name: 'John',
          last_name: 'Doe',
        },
      },
    };

    expect(getCustomer(state)).toEqual(state.customer);
  });
});
