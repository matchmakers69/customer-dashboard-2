const styles = ({ variables }) => ({
  settleUpBox: {
    margin: '0 auto',
    textAlign: 'center',
    width: '100%',
    '@global': {
      h2: {
        color: variables.colors.textAccent,
      },
      p: {
        color: variables.colors.text,
        fontSize: '1.1em',
      },
      button: {
        marginBlockEnd: '1em',
        width: '100%',
        fontSize: '1.1em',
      },
    },
  },
});

export default styles;
