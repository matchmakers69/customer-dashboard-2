const styles = ({ mixins, variables }) => ({
  detailsListField: {
    ...mixins.init(),
    composes: 'DetailsListField',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${variables.colors.greyTwo}`,
    padding: '1em 0',
    color: variables.colors.dark,
  },
  title: {
    composes: 'DetailsListField__title',
    fontWeight: '700',
  },
  summary: {
    ...variables.type.p,
    composes: 'DetailsListField__summary',
    width: '100%',
  },
  buttons: {
    composes: 'DetailsListField__buttons',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
});

export default styles;
