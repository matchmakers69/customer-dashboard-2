const styles = ({ variables, mixins, breakpoints }) => ({
  '@global': {
    '.Table__cell, .Table__sort-heading': {
      fontSize: '1rem !important',
    },
  },
  container: {
    composes: 'pageLayout',
    flexDirection: 'column',
    [breakpoints.lg]: {
      flexDirection: 'row',
    },
  },
  header: {
    color: variables.colors.primary,
    margin: '1em 0',
  },
  details: {
    composes: 'paymentPlanDetails',
    flexDirection: 'column',
    [breakpoints.md]: {
      flexDirection: 'row',
    },
  },
  history: {
    composes: 'PaymentHistory',
  },
  sidebar: {
    composes: 'paymentPlanSidebar',
  },
  boxPieChart: {
    ...mixins.box(),
    height: '100%',
    display: 'flex',
    marginBottom: '1rem',
    [breakpoints.md]: {
      marginBottom: 0,
    },
  },
  boxNextPayment: {
    ...mixins.box(),
    marginBottom: '1rem',
    display: 'flex',
  },
  boxSettleUp: {
    ...mixins.box(),
    display: 'flex',
  },
  boxTable: {
    ...mixins.box(),
  },
});

export default styles;
