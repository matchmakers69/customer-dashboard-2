import { ACTION_MESSAGE, SEND_MESSAGE } from './types';

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: {
    displayType: message.displayType,
    type: message.type,
    header: message.header,
    message: message.message,
    actions: message.actions,
    actioned: false,
    required: message.required || false,
  },
});

export const actionMessage = id => ({
  type: ACTION_MESSAGE,
  payload: {
    id,
  },
});
