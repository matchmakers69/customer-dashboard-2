const styles = ({ variables }) => ({
  '@global': {
    'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    'input[type=number]': {
      MozAppearance: 'textfield',
      display: 'inline-block',
    },
  },
  form: {
    padding: ' 0.01rem 1rem',
  },
  actions: {
    padding: '1rem',
    textAlign: 'right',
  },
  formHeading: {
    color: variables.colors.textAccent,
    fontSize: '1.3rem',
    margin: '0.5rem 0',
  },
  paymentAmountField: {
    display: 'flex',
  },
  paymentPrefix: {
    color: '#464a4c',
    padding: '1em',
    fontSize: '1rem',
    textAlign: 'center',
    fontWeight: 400,
    marginBottom: 0,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    display: 'flex',
    height: '50px',
  },
});

export default styles;
