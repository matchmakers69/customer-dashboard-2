import { get } from 'axios';

export const getGenders = async () => {
  const { data } = await get('/api/client/genders');
  return data;
};

export const getCountries = async () => {
  const { data } = await get('/api/client/countries');
  return data;
};
