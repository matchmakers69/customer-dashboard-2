import { GET_BOOKINGS_FAILED, GET_BOOKINGS_SUCCESS } from './types';

const initialState = {
  loaded: false,
  items: [],
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        loaded: true,
        items: action.payload.bookings,
      };
    case GET_BOOKINGS_FAILED:
      return {
        ...state,
        loaded: false,
      };
    default:
      return state;
  }
};

export default bookingsReducer;
