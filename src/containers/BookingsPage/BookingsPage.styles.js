const styles = ({ breakpoints }) => ({
  container: {
    composes: 'pageLayout',
  },
  grid: {
    flexDirection: 'column',
    [breakpoints.lg]: {
      flexDirection: 'row',
    },
  },
  tabs: {
    composes: 'BookingTabs',
    marginBottom: '2rem',
    display: 'flex',
    '& .Button': {
      flexGrow: '1',
      flexBasis: '50%',
    },
  },
});

export default styles;
