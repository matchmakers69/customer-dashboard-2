import orderBy from 'lodash/orderBy';

const getLatestPrompt = state =>
  orderBy(
    state.messages.filter(
      message => message.displayType === 'prompt' && !message.actioned,
    ),
    ['id', 'desc'],
  )[0];

export default getLatestPrompt;
