const styles = () => ({
  overlay: {
    composes: 'ToastOverlay',
    position: 'fixed',
    zIndex: '100',
    bottom: '2rem',
    width: '100%',
    padding: '0 2rem',
    '& .Toast-enter-active': {
      transform: 'translateY(0)',
      opacity: '1',
    },
    '& .Toast-enter-done': {
      transform: 'translateY(0)',
      opacity: '1',
    },
  },
  toast: {
    composes: 'Toast',
    opacity: '0',
    transition: 'all 0.2s ease-in-out',
    transform: 'translateY(0.5rem)',
    marginTop: '0.5rem',
  },
});

export default styles;
