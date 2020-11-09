import getCustomerEmail from './getCustomerEmail';

describe('getCustomerEmail', () => {
  it('it should return the email of the customer', () => {
    const state = {
      customer: {
        loaded: true,
        personal_details: {
          email: 'test@kaboodle.co.uk',
        },
      },
    };

    expect(getCustomerEmail(state)).toEqual('test@kaboodle.co.uk');
  });
});
