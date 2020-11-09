import { get, put } from 'axios';

import { acceptStatuses } from '../lib/axios';

export const getCustomer = async () => {
  const { data } = await get('/api/customer', null, {
    validateStatus: acceptStatuses(200, 403),
  });
  return data;
};

export const updateCustomer = async payload => {
  const { data } = await put('/api/customer/update', payload, {
    validateStatus: acceptStatuses(200, 403),
  });
  return data;
};
