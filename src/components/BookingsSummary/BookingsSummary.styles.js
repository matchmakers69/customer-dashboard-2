const styles = ({ variables, breakpoints }) => ({
  container: {
    paddingBottom: '2rem',
    flexDirection: 'column',
    [breakpoints.md]: {
      flexDirection: 'row',
    },
  },
  tabs: {
    marginBottom: '1rem',
    display: 'flex',
    '& .Button': {
      flexGrow: '1',
      flexBasis: '50%',
    },
  },
  calendar: {
    color: variables.colors.greyFour,
    width: '100%',
    fontWeight: '900',
    position: 'relative',
    marginBottom: '1rem',
    [breakpoints.md]: {
      border: `1px solid ${variables.colors.greyTwo}`,
      borderRadius: '2px',
      backgroundColor: variables.colors.trueWhite,
      textAlign: 'center',
    },
    '&:before': {
      content: '""',
      display: 'block',
      [breakpoints.md]: {
        paddingTop: '100%',
      },
    },
  },
  calendarInner: {
    [breakpoints.md]: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  bookingMonth: {
    textTransform: 'uppercase',
    paddingRight: '0.25rem',
    [breakpoints.md]: {
      display: 'block',
      paddingRight: '0rem',
    },
  },
});

export default styles;
