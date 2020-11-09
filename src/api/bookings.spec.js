import { acceptStatuses } from '../lib/axios';
import { get } from 'axios';
import { getBookings } from './bookings';

jest.mock('axios');
jest.mock('../lib/axios');

describe('getBookings', () => {
  it('should make a GET request to /api/bookings', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          upcoming: [
            {
              id: '3169937',
              reference: 'PW3169937',
              package_name: 'Clockwork Orange 2019',
            },
          ],
          past: [],
        },
      }),
    );

    await getBookings();

    expect(get).toHaveBeenCalledWith('/api/bookings', null, {
      validateStatus: acceptStatuses(200, 403),
    });
  });
});
