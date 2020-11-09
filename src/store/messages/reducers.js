import { ACTION_MESSAGE, SEND_MESSAGE } from './types';

const initialState = [];

let messageId = 0;

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      messageId += 1;
      return [...state, { ...action.payload, id: messageId }];
    case ACTION_MESSAGE:
      return state.map(message =>
        message.id === action.payload.id
          ? { ...message, actioned: true }
          : message,
      );
    default:
      return state;
  }
};

export default messageReducer;
