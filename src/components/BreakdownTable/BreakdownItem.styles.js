import color from 'color';

const styles = ({ variables, breakpoints }) => ({
  breakdownItem: {
    composes: 'BreakdownItem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: variables.colors.dark,
    padding: '0.7em',
    [breakpoints.md]: {
      padding: '0.7em 1.5em',
    },
    '&:last-child': {
      paddingBottom: '0',
    },
  },
  icon: {
    composes: 'BreakdownItem__icon',
    width: '1em',
    flexShrink: '0',
    textAlign: 'center',
    color: variables.colors.primary,
    [breakpoints.sm]: {
      width: '1.4em',
    },
    '& .Icon': {
      width: '100%',
      height: '100%',
    },
  },
  subItem: {
    composes: 'BreakdownItem--sub-item',
    '& .BreakdownItem__icon': {
      '& .Icon': {
        color: color(variables.colors.primary)
          .fade(0.6)
          .string(),
        width: '65%',
        height: '65%',
        margin: '0 auto',
      },
    },
  },
  disabled: {
    composes: 'BreakdownItem--disabled',
    opacity: 0.4,
  },
  column: {
    composes: 'BreakdownItem__column',
    fontStyle: 'italic',
  },
  description: {
    composes: 'BreakdownItem__description',
    extend: 'column',
    flexGrow: '1',
    paddingLeft: '0.7em',
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.sm]: {
      paddingLeft: '0 1em',
    },
  },
  subtitle: {
    composes: 'BreakdownItem__subtitle',
    fontSize: '0.85rem',
    color: '#56787b',
  },
  badges: {
    composes: 'BreakdownItem__badges',
    marginTop: '0.4rem',

    '& .Badge': {
      marginLeft: '0.2em',
      fontSize: '0.75rem',
    },
  },
  quantity: {
    composes: 'BreakdownItem__quantity',
    extend: 'column',
    width: '4em',
    marginRight: '0.2em',
    textAlign: 'center',
    flexShrink: '0',
    [breakpoints.sm]: {
      width: '4em',
    },
  },
  columnQuantity: {
    extend: 'quantity',
    composes: 'Breakdown__column-quantity',
  },
  price: {
    composes: 'BreakdownItem__price',
    extend: 'column',
    width: '4em',
    textAlign: 'center',
    flexShrink: '0',
    [breakpoints.sm]: {
      width: '5em',
    },
  },
  columnPrice: {
    extend: 'price',
    composes: 'Breakdown__column-price',
  },
});

export default styles;
