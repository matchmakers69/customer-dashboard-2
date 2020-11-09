const getBooking = (state, bookingReference) =>
  state.booking[bookingReference] || {};

export default getBooking;
