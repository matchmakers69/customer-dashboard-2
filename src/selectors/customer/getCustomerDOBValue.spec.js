import getCustomerDOBValue from './getCustomerDOBValue';

describe('getCustomerDOBValue', () => {
  it('it should return the dob value of the customer', () => {
    const state = {
      customer: {
        personal_details: {
          date_of_birth: '2019-05-12',
        },
      },
    };
    expect(getCustomerDOBValue(state)).toEqual('2019-05-12');
  });
});
