import getCustomerGenderFormObject from './getCustomerGenderFormObject';

describe('getCustomerGenderFormObject', () => {
  it('it should return the gender of the customer formatted for select component', () => {
    const state = {
      customer: {
        personal_details: {
          gender: 'Male',
        },
      },
    };

    expect(getCustomerGenderFormObject(state)).toEqual({
      label: 'Male',
      value: 'Male',
    });
  });

  it('it should return null when no gender exists in the store.', () => {
    const state = {
      customer: {
        personal_details: {
          first_name: 'John',
        },
      },
    };

    expect(getCustomerGenderFormObject(state)).toBeNull();
  });
});
