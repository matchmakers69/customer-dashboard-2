const styles = ({ variables }) => ({
  container: {
    padding: '0 2em',
    '& .content': {
      flexGrow: 0,
    },
  },
  header: {
    color: variables.colors.primary,
    margin: '1em 0',
  },
  link: {
    textDecoration: 'none',
  },
});

export default styles;
