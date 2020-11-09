const styles = ({ mixins, variables }) => ({
  '@keyframes fadeOutIn': {
    '50%': { opacity: 0 },
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
  },
  boxProjection: {
    ...mixins.box(),
    marginBottom: '1rem',
    display: 'block',
    padding: '1em',
  },
  newProjection: {
    animation: 'fadeOutIn 1.2s ease-in-out',
  },
  total: {
    ...mixins.init(),
    color: variables.colors.primary,
    padding: '10px',
    fontWeight: 'bold',
  },
  message: {
    marginBottom: '1em',
    animation: 'fadeIn 1s ease-in',
  },
  messageContent: {
    fontSize: '0.9em',
  },
  '@global': {
    'table, .Table': {
      fontSize: '1rem !important',
      border: 'none !important',
    },
    tr: {
      fontWeight: 'normal !important',
    },
    '.Table__cell, .Table__sort-heading': {
      fontSize: '1rem !important',
    },
  },
});

export default styles;
