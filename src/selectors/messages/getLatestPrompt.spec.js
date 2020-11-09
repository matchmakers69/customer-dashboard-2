import getLatestPrompt from './getLatestPrompt';

describe('getLatestPrompt', () => {
  it('Should return most recent unactioned prompt message', () => {
    const state = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: true,
          actions: [{ type: 'success', text: 'Sign Out' }, { text: 'Cancel' }],
          header: 'Signing Out',
          required: true,
        },
        {
          displayType: 'toast',
          type: 'success',
          message: 'You have successfully updated your details.',
          id: 3,
          actioned: false,
          required: false,
        },
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Another prompt message.',
          id: 2,
          actioned: false,
          actions: [{ text: 'Okay' }],
          header: 'Prompt',
          required: true,
        },
      ],
    };

    expect(getLatestPrompt(state)).toEqual({
      displayType: 'prompt',
      type: undefined,
      message: 'Another prompt message.',
      id: 2,
      actioned: false,
      actions: [{ text: 'Okay' }],
      header: 'Prompt',
      required: true,
    });
  });

  it('Should return undefined when no unactioned, prompt message exists', () => {
    const state = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: true,
          actions: [{ type: 'success', text: 'Sign Out' }, { text: 'Cancel' }],
          header: 'Signing Out',
          required: true,
        },
        {
          displayType: 'toast',
          type: 'success',
          message: 'You have successfully updated your details.',
          id: 3,
          actioned: false,
          required: false,
        },
      ],
    };

    expect(getLatestPrompt(state)).toEqual(undefined);
  });
});
