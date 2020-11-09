import getBookingInsurance from './getBookingInsurance';

describe('getBookingInsurance', () => {
  it('should return booking insurance information', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'FDF3051925',
          insurance: [
            {
              policy_reference: 'Policy Ref',
              policy_type: 'Bronze',
              customer_reference: 'Customer Ref ',
              name: 'Bronze (18-35 yrs old) incl. Winter Sports Cover',
              purchased_date: {
                iso_value: '2019-02-22',
              },
              contact_details: 'Contct Details',
              age: 29,
              duration: {
                days: 90,
              },
              description: 'Bronze 18-35 Year Old',
              price: {
                value: 19.99,
                price: '£19.99',
              },
              id: 744,
            },
          ],
        },
      },
    };

    expect(getBookingInsurance(state, 'PW3076840')).toEqual([
      {
        policy_reference: 'Policy Ref',
        policy_type: 'Bronze',
        customer_reference: 'Customer Ref ',
        name: 'Bronze (18-35 yrs old) incl. Winter Sports Cover',
        purchased_date: {
          iso_value: '2019-02-22',
        },
        contact_details: 'Contct Details',
        age: 29,
        duration: {
          days: 90,
        },
        description: 'Bronze 18-35 Year Old',
        price: {
          value: 19.99,
          price: '£19.99',
        },
        id: 744,
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingInsurance(state, 'PW3076840')).toEqual([]);
  });
});
