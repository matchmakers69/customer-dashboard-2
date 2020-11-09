import { captureMessage } from '@sentry/browser';
import sendMessage from './sendMessage';

jest.mock('@sentry/browser');

describe('sendMessage', () => {
  it('Should fire captureMessage with the messaged passed through to it.', () => {
    const message = 'This is an message!';

    sendMessage(message);
    expect(captureMessage).toHaveBeenCalledWith(message);
  });
});
