import { UPDATE_UI } from './types';

const initialState = {
  displayHeader: true,
  displayHeaderLinks: true,
  displayFooter: true,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UI:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
