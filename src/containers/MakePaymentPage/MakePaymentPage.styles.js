const styles = ({ breakpoints, mixins }) => ({
  container: {
    composes: 'pageLayout',
    flexDirection: 'column',
    [breakpoints.lg]: {
      flexDirection: 'row',
    },
  },
  pageTitle: {
    composes: 'pageTitle',
  },
  boxOverview: {
    ...mixins.box(),
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    fontSize: '0.8rem',
  },
});

export default styles;
