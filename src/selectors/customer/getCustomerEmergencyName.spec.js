import getCustomerEmergencyName from './getCustomerEmergencyName';

describe('getCustomerEmergencyName', () => {
  it('it should return the emergency contact name of the customer', () => {
    const state = {
      customer: {
        personal_details: {
          emergency_contact: {
            full_name: 'John Smith',
          },
        },
      },
    };

    expect(getCustomerEmergencyName(state)).toEqual('John Smith');
  });
});
