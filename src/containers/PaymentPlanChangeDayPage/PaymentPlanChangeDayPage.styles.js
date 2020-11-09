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
  box: {
    ...mixins.box(),
  },
});

export default styles;
