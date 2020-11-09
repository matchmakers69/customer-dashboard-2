import getCustomerGender from './getCustomerGender';

describe('getCustomerGender', () => {
  it('it should return the gender of the customer', () => {
    const state = {
      customer: {
        personal_details: {
          gender: 'Male',
        },
      },
    };

    expect(getCustomerGender(state)).toEqual('Male');
  });
});
