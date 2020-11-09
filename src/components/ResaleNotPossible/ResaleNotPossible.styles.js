const styles = ({ variables }) => ({
  container: {
    composes: 'ResaleNotPossible',
  },
  title: {
    composes: 'ResaleNotPossible__title',
    ...variables.type.h1,
  },
  packageName: {
    composes: 'ResaleNotPossible__packageName',
    fontWeight: '700',
  },
  email: {
    composes: 'ResaleNotPossible__email',
    fontWeight: '700',
  },
});

export default styles;
