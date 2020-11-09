import getCustomerEmergencyTelephone from './getCustomerEmergencyTelephone';

describe('getCustomerEmergencyTelephone', () => {
  it('it should return the emergency contact number of the customer', () => {
    const state = {
      customer: {
        personal_details: {
          emergency_contact: {
            telephone: '37593403234',
          },
        },
      },
    };

    expect(getCustomerEmergencyTelephone(state)).toEqual('37593403234');
  });
});
