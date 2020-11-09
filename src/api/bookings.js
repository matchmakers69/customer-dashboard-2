import { acceptStatuses } from '../lib/axios';
import { get } from 'axios';

export const getBookings = async () => {
  const { data } = await get('/api/bookings', null, {
    validateStatus: acceptStatuses(200, 403),
  });

  return data;
};
