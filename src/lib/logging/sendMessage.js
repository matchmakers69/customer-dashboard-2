import { captureMessage } from '@sentry/browser';

const sendMessage = message => captureMessage(message);

export default sendMessage;
