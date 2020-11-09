const styles = ({ variables }) => ({
  actions: {
    marginTop: '1rem',
    textAlign: 'right',
  },
  select: {
    width: '100%',
    border: `1px solid ${variables.colors.greyOne}`,
    padding: '1.5em 0.5em 0.5em',
    display: 'block',
    borderRadius: '3px',
    appearance: 'none',
    background: '#fff',
    '& label': {
      color: variables.colors.textAccent,
    },
  },
  alignRight: {
    textAlign: 'right',
  },
});

export default styles;
