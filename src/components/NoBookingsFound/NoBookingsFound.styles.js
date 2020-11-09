const styles = ({ variables }) => ({
  container: {
    maxWidth: '40em',
  },
  header: {
    color: variables.colors.primary,
  },
  link: {
    color: variables.colors.dark,
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
