export default () =>
  Boolean(process.env.ENABLE_SENTRY && process.env.NODE_ENV === 'production');
