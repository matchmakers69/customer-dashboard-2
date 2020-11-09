export const PAYMENT_STATUS_OUTSTANDING = 10;
export const PAYMENT_STATUS_OVERDUE = 20;
export const PAYMENT_STATUS_FULLYPAID = 30;
export const PAYMENT_STATUS_AWAITING = 40;
export const PAYMENT_STATUS_OVERPAID = 50;

export const PAYMENT_STATUS_MESSAGES = {
  [PAYMENT_STATUS_OUTSTANDING]: 'Outstanding',
  [PAYMENT_STATUS_OVERDUE]: 'Overdue',
  [PAYMENT_STATUS_FULLYPAID]: 'Fully Paid',
  [PAYMENT_STATUS_AWAITING]: 'Awaiting',
  [PAYMENT_STATUS_OVERPAID]: 'Overpaid',
};

export const BOOKING_PAID_IN_FULL = 'payInFull';
export const BOOKING_DEPOSIT = 'deposit';
export const BOOKING_PAYMENT_PLAN = 'paymentPlan';
