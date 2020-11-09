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
  changePaymentDetailsBox: {
    ...mixins.box(),
  },
});

export default styles;
