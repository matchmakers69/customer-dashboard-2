const styles = ({ variables, breakpoints, mixins }) => ({
  container: {
    composes: 'BookingCard',
    extend: variables.baseMobile,
    ...mixins.box(),
    color: variables.colors.dark,
    padding: '2em',
    fontFamily: variables.fontFamily,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.desktop]: {
      extend: variables.baseDesktop,
      flexDirection: 'row',
    },
  },
  details: {
    composes: 'BookingCard__details',
    flexBasis: '70%',
    marginRight: '2em',
    marginBottom: '2em',
    [breakpoints.desktop]: {
      marginBottom: 0,
    },
  },
  actions: {
    composes: 'BookingCard__actions',
    flexBasis: '30%',
    '& .Button': {
      display: 'block',
      width: '100%',
      marginBottom: '0.5em',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  reference: {
    display: 'block',
    fontWeight: '700',
    color: '#b1c5d8',
    marginBottom: '0.5em',
  },
  eventName: {
    composes: 'BookingCard__name',
    ...variables.type.h3,
    display: 'block',
    color: variables.colors.primary,
    whiteSpace: 'pre-wrap',
  },
  eventDate: {
    composes: 'BookingCard__date',
    ...variables.type.p,
    display: 'block',
  },
  eventLocation: {
    composes: 'BookingCard__location',
    ...variables.type.p,
    display: 'block',
  },
  eventPrice: {
    composes: 'BookingCard__price',
    ...variables.type.h4,
    marginTop: '1.5em',
  },
});

export default styles;
