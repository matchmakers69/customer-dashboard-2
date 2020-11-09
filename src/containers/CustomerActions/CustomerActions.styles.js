const styles = ({ variables }) => ({
  link: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    marginBottom: '1rem',
    display: 'block',
    color: variables.colors.greyFour,
    cursor: 'pointer',
    '&:hover': {
      color: variables.colors.primary,
    },
  },
});

export default styles;
