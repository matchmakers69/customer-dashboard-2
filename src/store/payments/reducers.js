import {
  MAKE_PAYMENT_FAILED,
  MAKE_PAYMENT_REQUIRES_ACTION,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_UPDATING,
  PAYMENT_PLAN_GET_PROJECTION,
  PAYMENT_PLAN_GET_PROJECTION_FAILED,
  PAYMENT_PLAN_GET_PROJECTION_SUCCESS,
  PAYMENT_PLAN_UPDATED,
  PAYMENT_PLAN_UPDATE_FAILED,
  PAYMENT_PLAN_UPDATE_REQUIRES_ACTION,
  PAYMENT_PLAN_UPDATING,
} from './types';

const initialState = {
  updating: false,
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_PLAN_UPDATING:
      return {
        ...state,
        updating: true,
      };
    case PAYMENT_PLAN_UPDATED:
      return {
        ...state,
        updating: false,
        paymentIntentClientSecret: null,
      };
    case PAYMENT_PLAN_UPDATE_FAILED:
      return {
        ...state,
        updating: false,
        paymentIntentClientSecret: null,
      };
    case PAYMENT_PLAN_UPDATE_REQUIRES_ACTION:
      return {
        ...state,
        updating: true,
        paymentIntentClientSecret: action.payload.paymentIntentClientSecret,
        card_number: action.payload.card_number,
        cardholder_name: action.payload.cardholder_name,
      };
    case PAYMENT_PLAN_GET_PROJECTION:
      return {
        ...state,
        loaded: false,
      };
    case PAYMENT_PLAN_GET_PROJECTION_SUCCESS:
      return {
        ...state,
        loaded: true,
        projection: action.payload.projection,
      };
    case PAYMENT_PLAN_GET_PROJECTION_FAILED:
      return {
        ...state,
        loaded: false,
        error: action.payload.error,
      };
    case MAKE_PAYMENT_UPDATING:
      return {
        ...state,
        updating: true,
      };
    case MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        updating: false,
        paymentSuccess: true,
        paymentIntentClientSecret: null,
        card_number: null,
        cardholder_name: null,
        expiry_date: null,
      };
    case MAKE_PAYMENT_FAILED:
      return {
        ...state,
        updating: false,
        paymentIntentClientSecret: null,
        card_number: null,
        cardholder_name: null,
        expiry_date: null,
      };
    case MAKE_PAYMENT_REQUIRES_ACTION:
      return {
        ...state,
        updating: true,
        paymentIntentClientSecret: action.payload.paymentIntentClientSecret,
        card_number: action.payload.card_number,
        cardholder_name: action.payload.cardholder_name,
        expiry_date: action.payload.expiry_date,
      };
    default:
      return state;
  }
};

export default paymentsReducer;
