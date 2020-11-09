import { get, put } from 'axios';
import { getBooking, updateBookingDelivery } from './booking';

jest.mock('axios');

describe('getBooking', () => {
  it('should make a GET request to /api/booking/PW123456', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          booking: {
            reference: 'PW3169937',
            id: '3169937',
          },
        },
      }),
    );

    await getBooking('PW123456', { tickets: [123456, 234567] });

    expect(get).toHaveBeenCalledWith('/api/booking/PW123456');
  });
});

describe('updateBookingDelivery', () => {
  it('should make a PUT request to /api/booking/PW123456/delivery/1234 with address details.', async () => {
    put.mockReturnValue(Promise.resolve({ data: { success: true } }));

    const fields = {
      address: {
        address_1: 'Address Line 1',
        address_2: 'Address Line 2',
        address_3: 'Address Line 3',
        city: 'City',
        postcode: 'Postcode',
        county: 'County',
        country_id: '123',
      },
    };

    await updateBookingDelivery('PW123456', '1234', fields);

    expect(put).toHaveBeenCalledWith(
      '/api/booking/PW123456/delivery/1234',
      fields,
    );
  });
});
