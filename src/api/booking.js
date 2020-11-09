import { delete as del, get, post, put } from 'axios';

export const getBooking = async booking_ref => {
  const { data } = await get(`/api/booking/${booking_ref}`);
  return data;
};

export const updateBookingDelivery = async (
  booking_ref,
  allocation_id,
  fields,
) => {
  const { data } = await put(
    `/api/booking/${booking_ref}/delivery/${allocation_id}`,
    fields,
  );
  return data;
};

export const addResale = async (booking_ref, items) => {
  const { data } = await post(`/api/booking/${booking_ref}/resale`, items);
  return data;
};

export const removeResale = async (booking_ref, allocation_id = null) => {
  let endpoint = `/api/booking/${booking_ref}/resale`;

  if (allocation_id) {
    endpoint += `/${allocation_id}`;
  }

  const { data } = await del(endpoint);
  return data;
};
