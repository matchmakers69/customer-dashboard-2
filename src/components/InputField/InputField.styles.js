import color from 'color';

const styles = ({ mixins, variables }) => ({
  inputField: {
    ...mixins.init(),
    composes: 'InputField',
    display: 'block',
    position: 'relative',
  },
  valid: {
    composes: 'InputField InputField--valid',
    '& $label': {
      color: variables.colors.typeSuccess,
    },
  },
  invalid: {
    composes: 'InputField InputField--invalid',
    '& $label': {
      color: variables.colors.typeDanger,
    },
    '& $input': {
      color: variables.colors.typeDanger,
      borderColor: variables.colors.typeDanger,
    },
  },
  disabled: {
    composes: 'InputField InputField--disabled',
    '& $label': {
      color: color(variables.colors.textAccent)
        .fade(0.3)
        .string(),
    },
    '& $input': {
      border: `1px solid ${variables.colors.greyTwo}`,
      backgroundColor: variables.colors.greyOne,
      cursor: 'not-allowed',
      color: color(variables.colors.textAccent)
        .fade(0.3)
        .string(),
    },
  },
  active: {
    composes: 'InputField InputField--active',
    '& $label': {
      fontSize: '0.8em',
      top: '0.5em',
    },
    '& $input': {
      borderColor: variables.colors.greyTwo,
    },
    '&$invalid': {
      '& $input': {
        borderColor: variables.colors.typeDanger,
      },
    },
    '&$valid': {
      '& $input': {
        borderColor: variables.colors.typeSuccess,
      },
    },
  },
  required: {
    composes: 'InputField__required',
    color: variables.colors.typeDanger,
  },
  label: {
    composes: 'InputField__label',
    display: 'block',
    color: variables.colors.textAccent,
    position: 'absolute',
    marginBottom: '0.5em',
    top: '1em',
    left: '0.5em',
    transition: 'all 0.1s ease-in-out',
  },
  input: {
    composes: 'InputField__input',
    appearance: 'none',
    border: `1px solid ${variables.colors.greyOne}`,
    borderRadius: '3px',
    padding: '1.5em 0.5em 0.5em',
    width: '100%',
    display: 'block',
    color: variables.colors.text,
    transition: 'border 0.2s ease-in-out',
    '&:hover, &:focus, &:active': {
      outline: 'none',
    },
  },
  error: {
    composes: 'InputField__error',
    display: 'block',
    fontSize: '0.8em',
    padding: '0.5em',
    color: variables.colors.typeDanger,
    marginTop: '0.25em',
  },
  grouped: {
    width: '100%',
    '& $input': {
      border: 'none',
      borderRight: `1px solid ${variables.colors.greyOne}`,
    },
    '&:last-child': {
      '& $input': {
        borderRight: 'none',
      },
    },
  },
  groupedWidth: data => ({
    flexBasis: `${Math.floor((data.groupedWidth / 6) * 100)}%`,
  }),
});

export default styles;
