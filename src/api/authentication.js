import { get, post } from 'axios';

import { acceptStatuses } from '../lib/axios';

export const attemptLogin = async (email, password) => {
  const { data } = await post('/api/customer/login', { email, password });
  return data;
};

export const checkLogin = async () => {
  const { data } = await get('/api/customer/check');
  return data;
};

export const attemptLogout = async () => {
  const { data } = await get('/api/customer/logout');
  return data;
};

export const changePassword = async payload => {
  const { data } = await post('/api/customer/password/change', payload, {
    validateStatus: acceptStatuses(200, 403),
  });
  return data;
};

export const resetPassword = async payload => {
  const { data } = await post('/api/customer/password/reset', payload, {
    validateStatus: acceptStatuses(200, 403),
  });
  return data;
};
