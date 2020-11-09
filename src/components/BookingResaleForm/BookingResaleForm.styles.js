const styles = ({ mixins, variables }) => ({
  container: {
    composes: 'BookingResaleForm',
  },
  selection: {
    ...variables.type.h1,
    composes: 'BookingResaleForm__selection',
    marginBottom: '2rem',
  },
  form: {
    composes: 'BookingResaleForm__form',
    ...mixins.box(),
  },
  footer: {
    composes: 'BookingResaleForm__footer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
  },
  summary: {
    composes: 'BookingResaleForm__summary',
    '& .Price': {
      alignItems: 'center',
      flexDirection: 'row',
    },

    '& .Price__label': {
      fontWeight: '700',
      marginRight: '0.3rem',
    },

    '& .Price__value': {
      fontWeight: '400',
    },

    '& .Price__label, .Price__value': {
      fontSize: '1.2rem',
      color: variables.colors.dark,
    },
  },
  resalePrice: {
    composes: 'BookingResaleForm__resale-price',
    '& .Price__label, .Price__value': {
      fontSize: '0.9rem',
      color: variables.colors.greyFive,
    },
  },
  actions: {
    composes: 'BookingResaleForm__actions',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'flex-end',

    '& .Button': {
      marginLeft: '0.5rem',
      '&:first-child': {
        marginLeft: '0',
      },
    },
  },
});

export default styles;
