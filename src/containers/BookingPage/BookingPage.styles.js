const styles = ({ breakpoints, mixins }) => ({
  container: {
    composes: 'pageLayout',
    marginTop: '2rem',
    flexDirection: 'column-reverse',
    [breakpoints.lg]: {
      flexDirection: 'row',
    },
  },
  details: {
    composes: 'BookingPage__details',
    ...mixins.box(),
  },
  contentHeader: {
    composes: 'BookingPage__header',
    marginBottom: '2rem',
  },
  sidebarSection: {
    marginBottom: '1rem',
  },
});

export default styles;
