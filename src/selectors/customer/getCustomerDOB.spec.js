import getCustomerDOB from './getCustomerDOB';

describe('getCustomerDOB', () => {
  it('it should return the date of birth of the customer', () => {
    const state = {
      customer: {
        personal_details: {
          date_of_birth: '1970-01-20',
        },
      },
    };

    expect(getCustomerDOB(state)).toMatchObject(new Date('1970-01-20'));
  });
});
