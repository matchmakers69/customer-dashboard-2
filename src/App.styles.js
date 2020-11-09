import redactedWoff from './assets/fonts/redacted-regular.woff';

const styles = ({ variables, mixins, breakpoints }) => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(var(--vh, 1vh) * 100)',
  },
  wrap: {
    flex: '1 1 auto',
  },
  footerWrap: {
    flexShrink: 1,
  },
  '@global': {
    '@font-face': [
      {
        fontFamily: 'Redacted',
        src: `url(${redactedWoff}) format("woff")`,
      },
    ],
    html: {
      padding: 0,
      margin: 0,
    },
    body: {
      backgroundColor: variables.colors.light,
      color: variables.colors.dark,
      height: '100%',
      fontFamily: variables.fontFamily,
      ...mixins.init(),
    },
    'body.withPrompt': {
      overflow: 'hidden',
    },
    '.pageLayout': {
      padding: '0 1rem',
      [breakpoints.lg]: {
        padding: '0 2rem',
      },
    },
    '.ProfileBackButton': {
      marginTop: '2rem',
    },
    '#app': {
      height: '100%',
      overflowX: 'hidden',
    },
    h1: {
      ...variables.type.h1,
    },
    h2: {
      ...variables.type.h2,
    },
    h3: {
      ...variables.type.h3,
    },
    h4: {
      ...variables.type.h4,
    },
    p: {
      ...variables.type.p,
    },
    a: {
      color: variables.colors.dark,
    },
  },
});

export default styles;
