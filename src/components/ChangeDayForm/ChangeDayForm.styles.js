const styles = () => ({
  form: {
    padding: ' 0.01rem 1rem',
    '& .Button': {
      width: '100%',
    },
  },
  suggestedDates: {
    display: 'flex',
    marginBottom: '1rem',
    '& .Button:first-child': {
      marginRight: '0.5rem',
    },
    '& .Button:last-child': {
      marginLeft: '0.5rem',
    },
  },
  actions: {
    padding: '1rem',
    backgroundColor: '#FBFBFB',
  },
  requiresSelect: {
    opacity: 0.5,
    transition: 'opacity 0.2s ease-in',
  },
  showSelect: {
    opacity: 1,
  },
});

export default styles;
