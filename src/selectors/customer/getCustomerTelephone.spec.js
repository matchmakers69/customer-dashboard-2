import getCustomerTelephone from './getCustomerTelephone';

describe('getCustomerTelephone', () => {
  it('it should return the customer telephone number', () => {
    const state = {
      customer: {
        personal_details: {
          phone: '0653564645662',
        },
      },
    };

    expect(getCustomerTelephone(state)).toEqual('0653564645662');
  });
});
