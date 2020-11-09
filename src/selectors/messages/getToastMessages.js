const getToastMessages = state =>
  state.messages
    ? state.messages.filter(message => message.displayType === 'toast')
    : [];

export default getToastMessages;
