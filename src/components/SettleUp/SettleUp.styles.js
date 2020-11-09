const styles = ({ variables }) => ({
  settleUpBox: {
    margin: '0 auto',
    textAlign: 'center',
    width: '75%',
    '@global': {
      h2: {
        color: variables.colors.textAccent,
      },
      p: {
        color: variables.colors.text,
      },
      button: {
        marginBlockEnd: '1em',
        width: '100%',
      },
    },
  },
});

export default styles;
