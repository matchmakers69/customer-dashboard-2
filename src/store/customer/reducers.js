import { GET_CUSTOMER_FAILED, GET_CUSTOMER_SUCCESS } from './types';

const initialState = {
  loaded: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loaded: true,
        ...action.payload.customer,
      };
    case GET_CUSTOMER_FAILED:
      return {
        ...state,
        loaded: false,
      };
    default:
      return state;
  }
};

export default customerReducer;
