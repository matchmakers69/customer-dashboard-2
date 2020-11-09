const styles = ({ variables }) => ({
  form: {
    marginBottom: '1em',
    composes: 'LoginForm',
  },
  row: {
    marginBottom: '0.5em',
  },
  actions: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  link: {
    textDecoration: 'none',
    color: variables.colors.greyFour,
    fontStyle: 'italic',
    '&:hover, &:active &:focus': {
      color: variables.colors.dark,
    },
  },
  '@global': {
    html: {
      height: '100%',
      padding: 0,
      margin: 0,
    },
    body: {
      backgroundColor: variables.colors.light,
      color: variables.colors.dark,
      height: '100%',
    },
    h1: {
      ...variables.type.h1,
    },
  },
});

export default styles;
