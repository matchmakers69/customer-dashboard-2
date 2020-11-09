import { createSelector } from 'reselect';
import getBooking from './getBooking';
import hasPaymentPlan from './hasPaymentPlan';

const getBookingPaymentPlan = createSelector(
  (state, bookingReference) => hasPaymentPlan(state, bookingReference),
  (state, bookingReference) => getBooking(state, bookingReference),
  (paymentPlan, booking) =>
    paymentPlan
      ? {
          id: booking.payment_plan.id,
          amount: parseFloat(booking.payment_plan.amount),
          remainingPayments: booking.payment_plan.number_of_payments,
          nextPaymentDate: new Date(booking.payment_plan.next_payment_date),
          finalPaymentDate: new Date(booking.payment_plan.final_payment_date),
          status: booking.payment_plan.status,
          projection: booking.payment_plan.projection.map(projection => ({
            date: new Date(projection.iso_value),
            amount: parseFloat(projection.amount),
          })),
          card: {
            cardholderName: booking.payment_plan.card.cardholder_name,
            cardNumber: `**** **** **** ${booking.payment_plan.card.last_four_digits}`,
          },
        }
      : false,
);

export default getBookingPaymentPlan;
