import formStyles from '../../styles/form.styles';

const styles = ({ variables }) => ({
  ...formStyles(variables),

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
  inputFieldDay: {
    flexBasis: '4em',
    marginRight: '1em',
  },
  inputFieldMonth: {
    extend: 'inputFieldDay',
  },
  inputFieldYear: {
    extend: 'inputFieldDay',
    flexBasis: '7em',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;
