import getCustomerType from './getCustomerType';

describe('getCustomerType', () => {
  it('it should return the customer type', () => {
    const state = {
      customer: {
        type: {
          id: 10,
          value: 'Passenger',
        },
      },
    };

    expect(getCustomerType(state)).toEqual(state.customer.type);
  });
});
