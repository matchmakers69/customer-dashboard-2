import getBookingSaga from './getBooking';
import updateDeliverySaga from './updateDelivery';
import updateResaleSaga from './updateResale';

export const bookingSagas = [
  getBookingSaga,
  updateDeliverySaga,
  updateResaleSaga,
];
