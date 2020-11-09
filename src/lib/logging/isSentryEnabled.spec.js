import isSentryEnabled from './isSentryEnabled';

const env = { ...process.env };

describe('isSentryEnabled', () => {
  afterEach(() => {
    process.env = env;
  });

  it.each([
    [true, 'production', true],
    [false, 'production', false],
    [false, 'development', false],
    [true, 'development', false],
  ])(
    'When ENABLE_SENTRY is %s and in %s environment, return %s.',
    (enableSentry, nodeEnv, expected) => {
      process.env.ENABLE_SENTRY = enableSentry;
      process.env.NODE_ENV = nodeEnv;

      expect(isSentryEnabled()).toEqual(expected);
    },
  );
});
