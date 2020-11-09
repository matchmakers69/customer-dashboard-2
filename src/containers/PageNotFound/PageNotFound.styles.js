const styles = ({ variables }) => ({
  container: {
    composes: 'pageLayout',
  },
  header: {
    color: variables.colors.primary,
    margin: '1em 0',
  },
});

export default styles;
