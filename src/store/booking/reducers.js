import {
  GET_BOOKING,
  GET_BOOKING_SUCCESS,
  UPDATE_BOOKING_RESALE,
  UPDATE_BOOKING_RESALE_FAILED,
  UPDATE_BOOKING_RESALE_SUCCESS,
} from './types';

const initialState = {
  updating: false,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKING:
      return {
        ...state,
      };
    case GET_BOOKING_SUCCESS:
      return {
        ...state,
        [action.payload.booking.reference]: action.payload.booking,
      };
    case UPDATE_BOOKING_RESALE:
      return {
        ...state,
        updating: true,
      };
    case UPDATE_BOOKING_RESALE_SUCCESS:
    case UPDATE_BOOKING_RESALE_FAILED:
      return {
        ...state,
        updating: false,
      };
    default:
      return state;
  }
};

export default bookingReducer;
