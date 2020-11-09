const styles = ({ variables }) => ({
  chartContainer: {
    height: '15rem',
    position: 'relative',
  },
  piePrice: {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  piePriceAmount: {
    ...variables.type.h1,
    color: variables.colors.text,
    display: 'block',
  },
  piePriceRemaining: {
    color: variables.colors.textAccent,
    display: 'block',
  },
});

export default styles;
