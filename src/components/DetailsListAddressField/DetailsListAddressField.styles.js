const styles = ({ mixins, variables }) => ({
  detailsListAddressField: {
    ...mixins.init(),
    composes: 'DetailsListAddressField',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${variables.colors.greyTwo}`,
    padding: '1em 0',
    color: variables.colors.dark,
  },
  title: {
    composes: 'DetailsListAddressField__title',
    fontWeight: '700',
  },
  summary: {
    ...variables.type.p,
    composes: 'DetailsListAddressField__summary',
    width: '100%',
  },
  buttons: {
    composes: 'DetailsListAddressField__buttons',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
});

export default styles;
