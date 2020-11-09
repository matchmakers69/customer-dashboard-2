const styles = ({ variables }) => ({
  paymentDeadlineBox: {
    paddingTop: '0.5rem',
    margin: '0 auto',
    borderTop: `1px solid ${variables.colors.greyOne}`,
    textAlign: 'center',
    width: '75%',
    '@global': {
      h2: {
        color: variables.colors.textAccent,
        lineHeight: '0.5rem',
      },
      p: {
        color: variables.colors.text,
        fontSize: '0.9rem',
        fontWeight: '700',
        margin: '0',
      },
    },
  },
});

export default styles;
