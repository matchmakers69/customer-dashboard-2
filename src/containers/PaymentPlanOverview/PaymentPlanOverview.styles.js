const styles = ({ mixins, variables }) => ({
  boxOverview: {
    ...mixins.box(),
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    fontSize: '0.8rem',
  },
  chartContainer: {
    height: '15rem',
  },
  keyInformation: {
    display: 'flex',
    borderTop: `1px solid ${variables.colors.greyOne}`,
    paddingTop: '0.5rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyValue: {
    flexBasis: '33.333%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  keyValueTitle: {
    color: variables.colors.textAccent,
  },
  keyValueResult: {
    color: variables.colors.text,
    fontWeight: '700',
  },
});

export default styles;
