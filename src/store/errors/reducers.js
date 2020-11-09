import { ERROR_OCCURRED } from './types';

const initialState = [];

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_OCCURRED:
      return [...state, { ...action.payload.error }];
    default:
      return state;
  }
};

export default errorsReducer;
