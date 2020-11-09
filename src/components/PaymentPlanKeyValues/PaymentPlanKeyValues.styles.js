const styles = ({ variables }) => ({
  keyInformation: {
    display: 'flex',
    borderTop: `1px solid ${variables.colors.greyOne}`,
    paddingTop: '0.5rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyValue: {
    composes: 'keyValue',
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
