const styles = ({ variables }) => ({
  outstandingBalance: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 0 0.5rem',
  },
  outstandingBalanceTitle: {
    color: variables.colors.textAccent,
  },
  outstandingBalanceResult: {
    color: variables.colors.text,
  },
  remainingBalance: {
    composes: 'remainingBalance',
  },
  totalAmount: {
    composes: 'totalAmount',
  },
});

export default styles;
