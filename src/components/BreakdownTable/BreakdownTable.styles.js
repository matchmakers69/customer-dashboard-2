import color from 'color';

const styles = ({ mixins, variables, breakpoints }) => ({
  breakdownTable: {
    ...mixins.init(),
    composes: 'BreakdownTable',
    position: 'relative',
    padding: '1em 0.5em',
  },
  header: {
    composes: 'BreakdownTable__header',
    display: 'flex',
    alignItems: 'center',
    color: variables.colors.dark,
    justifyContent: 'space-between',
    padding: '1em 0.7em 1.7em',
    borderBottom: '2px solid #f1f6fa',
    [breakpoints.md]: {
      padding: '1em 1.5em 1.7em',
    },
  },
  heading: {
    composes: 'BreakdownTable__heading',
    flexGrow: '1',
    fontWeight: '700',
    color: variables.colors.dark,
    fontSize: '1em',
    padding: '0 0.3em 0 0.5em',
    [breakpoints.sm]: {
      fontSize: '1.3em',
    },
  },
  column: {
    composes: 'BreakdownTable__column',
    color: variables.colors.dark,
    textAlign: 'center',
    flexShrink: '0',
  },
  columnPrice: {
    extend: 'column',
    width: '4em',
    [breakpoints.sm]: {
      width: '5em',
    },
  },
  columnQuantity: {
    extend: 'column',
    width: '4em',
    marginRight: '0.3em',
    [breakpoints.sm]: {
      width: '4em',
    },
  },
  group: {
    composes: 'BreakdownTable__group',
    borderBottom: '2px solid #f1f6fa',
    padding: '1.2em 0',
    '&:last-child': {
      border: 'none',
    },
  },
  groupHeading: {
    composes: 'BreakdownTable__group-heading',
    color: color(variables.colors.primary)
      .fade(0.6)
      .string(),
    textTransform: 'uppercase',
    fontSize: '0.75em',
    margin: '0 0 0.3em 2.4em',
    fontWeight: '700',
    [breakpoints.sm]: {
      margin: '0 0 0.3em 2.9em',
      fontSize: '0.9em',
    },
    [breakpoints.md]: {
      margin: '0 0 0.3em 3.7em',
    },
  },
});

export default styles;
