const styles = ({ variables }) => ({
  nextPaymentBox: {
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
    },
  },
});

export default styles;
