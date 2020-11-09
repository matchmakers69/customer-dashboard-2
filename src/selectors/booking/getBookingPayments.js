import { createSelector } from 'reselect';
import getBooking from './getBooking';
import isBookingLoaded from './isBookingLoaded';

const getBookingPayment = createSelector(
  (state, bookingReference) => isBookingLoaded(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),
  (loaded, booking) =>
    loaded
      ? booking.payments.map(payment => ({
          paid: payment.status.paid,
          reference: payment.reference,
          type: payment.type,
          amount: payment.amount,
          date: new Date(payment.payment_date.iso_value),
          paymentMethod: payment.card.four_digits,
          status: payment.status.value,
        }))
      : [],
);

export default getBookingPayment;
