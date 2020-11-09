const styles = ({ variables, mixins, breakpoints }) => ({
  '@global': {
    '.Table__cell, .Table__sort-heading': {
      fontSize: '1rem !important',
    },
  },
  card: {
    composes: 'paymentPlanCard',
  },
  titles: {
    display: 'none',
    borderBottom: '1px solid #f2f6fa',
    paddingBottom: '0.5rem',
    [breakpoints.md]: {
      display: 'flex',
    },
  },
  values: {
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.md]: {
      paddingTop: '1rem',
      flexDirection: 'row',
    },
  },
  title: {
    display: 'block',
    color: variables.colors.textAccent,
  },
  mobileTitle: {
    display: 'block',
    extend: 'title',
    [breakpoints.md]: {
      display: 'none',
    },
  },
  value: {
    display: 'block',
    fontWeight: 700,
    color: variables.colors.text,
  },
  box: {
    ...mixins.box(),
    display: 'flex',
    padding: '1rem',
    flexDirection: 'column',
  },
  cardName: {
    [breakpoints.md]: {
      flexBasis: '25%',
      alignItems: 'center',
      display: 'flex',
    },
  },
  cardNumber: {
    [breakpoints.md]: {
      flexBasis: '25%',
      alignItems: 'center',
      display: 'flex',
    },
  },
  changePayment: {
    composes: 'changePaymentButton',
    textAlign: 'right',
    flexBasis: '50%',
    paddingTop: '1rem',
    '& .Button': {
      width: '100%',
      [breakpoints.md]: {
        width: 'auto',
      },
    },
    [breakpoints.md]: {
      paddingTop: 0,
    },
  },
});

export default styles;
