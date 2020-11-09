const styles = ({ variables }) => ({
  list: {
    color: variables.colors.primary,
    listStyle: 'none',

    '& li:before': {
      content: '"•"',
      fontSize: '1.4rem',
      display: 'inline-block',
      marginLeft: '-1.3rem',
      width: '1.3rem',
    },
  },
  proceedNotice: {
    composes: 'BookingResaleModal__proceed-notice',
    fontWeight: '700',
  },
  resaleList: {
    extend: 'list',
    composes: 'BookingResaleModal__list BookingResaleModal__list--resale',

    '& li:before': {
      color: variables.colors.typeSuccess,
    },
  },
  resalableList: {
    extend: 'list',
    composes: 'BookingResaleModal__list BookingResaleModal__list--resalable',

    '& li:before': {
      color: variables.colors.greyFour,
    },
  },
});

export default styles;
