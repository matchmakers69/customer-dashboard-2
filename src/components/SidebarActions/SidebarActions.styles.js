const styles = ({ variables }) => ({
  sidebar: {},
  action: {
    marginBottom: '1rem',
    border: 'none',
    backgroundColor: 'transparent',
    color: variables.colors.text,
    display: 'block',
    padding: 0,
    cursor: 'pointer',
    '&:hover, &:focus': {
      textDecoration: 'underline',
      outline: 'none',
    },
  },
});

export default styles;
