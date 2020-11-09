import {
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_SUCCESS,
  GET_GENDERS_FAILED,
  GET_GENDERS_SUCCESS,
} from './types';

const initialState = {
  error: null,
  genders: [],
  countries: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENDERS_SUCCESS:
      return {
        ...state,
        error: null,
        genders: action.payload.genders,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        error: null,
        countries: action.payload.countries,
      };
    case GET_GENDERS_FAILED:
    case GET_COUNTRIES_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default clientReducer;
