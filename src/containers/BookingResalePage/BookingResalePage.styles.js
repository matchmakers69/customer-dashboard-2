import pageStyles from '../../styles/page.styles';

const styles = ({ breakpoints, mixins }) => ({
  page: {
    composes: 'BookingResalePage',
    ...mixins.init(),

    '& .BackButton': {
      marginTop: '0',
      marginBottom: '1.5rem',
    },
  },
  contentHeader: {
    composes: 'BookingResalePage__header',
    marginBottom: '2rem',
  },
  grid: {
    ...pageStyles(breakpoints).pageLayout,
    composes: 'BookingResalePage__grid',
    marginTop: '2rem',
    flexDirection: 'column',
    [breakpoints.lg]: {
      flexDirection: 'row',
    },
  },
  resale: {
    composes: 'BookingResalePage__resale',
  },
  sidebar: {
    composes: 'BookingResalePage__sidebar',
    marginTop: '2rem',
    [breakpoints.sm]: {
      marginTop: '0',
    },
  },
  strong: {
    fontWeight: '700',
  },
});

export default styles;
