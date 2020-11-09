import { ACTION_MESSAGE, SEND_MESSAGE } from './types';
import { actionMessage, sendMessage } from './actions';

import reducer from './reducers';

describe('client', () => {
  it('Returns initial state when a matching actions is not passed through', () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual([]);
  });

  it(`Adds a message to state when ${SEND_MESSAGE} is dispatched`, () => {
    const message = {
      displayType: 'prompt',
      header: 'Signing Out',
      message: 'Are you sure you want to sign out?',
      actions: [{ type: 'success', text: 'Sign Out' }, { text: 'Cancel' }],
      required: true,
    };

    expect(
      reducer(
        [
          {
            message: 'existing message',
            type: 'error',
            displayType: 'toast',
            id: 0,
            actioned: false,
            actions: undefined,
            header: undefined,
            required: false,
          },
        ],
        sendMessage(message),
      ),
    ).toEqual([
      {
        message: 'existing message',
        type: 'error',
        displayType: 'toast',
        id: 0,
        actioned: false,
        actions: undefined,
        header: undefined,
        required: false,
      },
      {
        displayType: 'prompt',
        type: undefined,
        message: 'Are you sure you want to sign out?',
        id: 1,
        actioned: false,
        actions: [{ type: 'success', text: 'Sign Out' }, { text: 'Cancel' }],
        header: 'Signing Out',
        required: true,
      },
    ]);
  });

  it(`Adds a message to state when ${ACTION_MESSAGE} is dispatched`, () => {
    expect(
      reducer(
        [
          {
            displayType: 'prompt',
            type: undefined,
            message: 'Are you sure you want to sign out?',
            id: 1,
            actioned: false,
            actions: [
              { type: 'success', text: 'Sign Out' },
              { text: 'Cancel' },
            ],
            header: 'Signing Out',
            required: true,
          },
        ],
        actionMessage(1),
      ),
    ).toEqual([
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
    ]);
  });

  it(`Returns current when ${ACTION_MESSAGE} is dispatched with a non-existent ID`, () => {
    expect(
      reducer(
        [
          {
            displayType: 'prompt',
            type: undefined,
            message: 'Are you sure you want to sign out?',
            id: 1,
            actioned: false,
            actions: [
              { type: 'success', text: 'Sign Out' },
              { text: 'Cancel' },
            ],
            header: 'Signing Out',
            required: true,
          },
        ],
        actionMessage(2),
      ),
    ).toEqual([
      {
        displayType: 'prompt',
        type: undefined,
        message: 'Are you sure you want to sign out?',
        id: 1,
        actioned: false,
        actions: [{ type: 'success', text: 'Sign Out' }, { text: 'Cancel' }],
        header: 'Signing Out',
        required: true,
      },
    ]);
  });
});
