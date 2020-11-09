const styles = ({ mixins, variables }) => ({
  inputFieldGroup: {
    ...mixins.init(),
    composes: 'InputFieldGroup',
  },
  inputFieldGroupContainer: {
    display: 'flex',
    position: 'relative',
    border: `1px solid ${variables.colors.greyOne}`,
    borderRadius: '3px',
    transition: 'border 0.2s ease-in-out',
    '&:hover, &:active': {
      borderColor: variables.colors.greyTwo,
    },
  },
  error: {
    composes: 'InputFieldGroup__error',
    display: 'block',
    fontSize: '0.8em',
    padding: '0.5em',
    color: variables.colors.typeDanger,
    marginTop: '0.25em',
  },
  active: {
    '& $inputFieldGroupContainer': {
      borderColor: variables.colors.greyTwo,
    },
  },
  invalid: {
    '& $inputFieldGroupContainer': {
      borderColor: variables.colors.typeDanger,
    },
    '& label': {
      color: variables.colors.typeDanger,
    },
    '& input': {
      color: variables.colors.typeDanger,
    },
  },
});

export default styles;
