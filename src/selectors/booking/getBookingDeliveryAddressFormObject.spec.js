import getBookingDeliveryAddressFormObject from './getBookingDeliveryAddressFormObject';

describe('getBookingDeliveryAddressFormObject', () => {
  it('it should return the formatted booking address object', () => {
    const state = {
      booking: {
        PW3076840: {
          booking_printed: '1',
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          delivery: [
            {
              delivery_name: 'Super Fast Mail',
              description: '2 - 3 Days Expedited',
              delivery_price: {
                value: 2,
                price: '£2.00',
              },
              allocation_id: 473687,
              require_address: true,
              address_id: '536296',
              type_id: '1',
              type_name: 'Home',
              address_1: 'Kaboodle Solutions Ltd, 3 The Stables',
              address_2: 'Parrswood Entertainment Centre',
              address_3: 'East Didsbury',
              city: 'Manchester',
              county: 'Greater Manchester',
              postcode: 'M20 5PG',
              country_id: '235',
              country_name: 'United Kingdom',
              tracking_id: null,
            },
          ],
        },
      },
    };

    expect(getBookingDeliveryAddressFormObject(state, 'PW3076840')).toEqual({
      address_1: 'Kaboodle Solutions Ltd, 3 The Stables',
      address_2: 'Parrswood Entertainment Centre',
      address_3: 'East Didsbury',
      city: 'Manchester',
      county: 'Greater Manchester',
      postcode: 'M20 5PG',
      country: {
        value: '235',
        label: 'United Kingdom',
      },
    });
  });
});
