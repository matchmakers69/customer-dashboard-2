const styles = ({ breakpoints }) => ({
  container: {
    composes: 'BookingAddressPage',
    padding: '0 1rem',
  },
  paddedColumn: {
    display: 'none',
    [breakpoints.md]: {
      display: 'inline-flex',
    },
  },
});

export default styles;
