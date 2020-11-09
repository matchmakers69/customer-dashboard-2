const styles = variables => ({
  form: {
    composes: 'Form',
  },
  header: {
    composes: 'Form__header',
    ...variables.type.h1,
  },
  description: {
    composes: 'Form__description',
    ...variables.type.p,
  },
  row: {
    composes: 'Form__row',
    marginBottom: '0.5rem',
  },
  actions: {
    composes: 'Form__actions',
    marginTop: '1rem',
  },
});

export default styles;
