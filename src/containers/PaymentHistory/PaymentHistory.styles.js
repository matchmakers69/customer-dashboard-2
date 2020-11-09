const styles = ({ mixins }) => ({
  '@global': {
    '.Table__cell, .Table__sort-heading': {
      fontSize: '1rem !important',
    },
  },
  history: {
    composes: 'paymentHistory',
  },
  boxTable: {
    ...mixins.box(),
  },
});

export default styles;
