import { get, put } from 'axios';
import { getCustomer, updateCustomer } from './customer';

import { acceptStatuses } from '../lib/axios';

jest.mock('axios');
jest.mock('../lib/axios');

describe('getCustomer', () => {
  it('should make a GET request to /api/customer', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          customer: {
            id: 688301,
            email_verification_required: false,
            personal_details: {},
          },
        },
      }),
    );

    await getCustomer();

    expect(get).toHaveBeenCalledWith('/api/customer', null, {
      validateStatus: acceptStatuses(200, 403),
    });
  });
});

describe('updateCustomer', () => {
  it('should make a PUT request to /api/customer/update', async () => {
    put.mockReturnValue(
      Promise.resolve({
        data: {
          success: true,
        },
      }),
    );

    const payload = {
      personal_details: {
        telephone: '0124235346',
      },
    };

    await updateCustomer(payload);

    expect(put).toHaveBeenCalledWith('/api/customer/update', payload, {
      validateStatus: acceptStatuses(200, 403),
    });
  });
});
