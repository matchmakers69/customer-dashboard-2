const isBookingLoaded = (state, bookingReference) =>
  state.booking[bookingReference] !== undefined;

export default isBookingLoaded;
