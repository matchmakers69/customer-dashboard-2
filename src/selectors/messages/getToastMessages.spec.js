import getToastMessages from './getToastMessages';

describe('getToastMessages', () => {
  it('it should return the messages with the display type of toast', () => {
    const state = {
      messages: [
        {
          displayType: 'toast',
          type: 'success',
          message: 'Message One',
        },
        {
          displayType: 'not_toast',
          type: 'error',
          message: 'Message Two',
        },
      ],
    };

    expect(getToastMessages(state)).toEqual([
      {
        displayType: 'toast',
        type: 'success',
        message: 'Message One',
      },
    ]);
  });

  it('it should return an empty array if no messages exist', () => {
    const state = {};
    expect(getToastMessages(state)).toEqual([]);
  });
});
