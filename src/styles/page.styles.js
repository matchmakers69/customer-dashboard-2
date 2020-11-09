const styles = breakpoints => ({
  pageLayout: {
    composes: 'PageLayout',
    padding: '0 1rem',
    [breakpoints.lg]: {
      padding: '0 2rem',
    },
  },
});

export default styles;
