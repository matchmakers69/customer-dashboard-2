const styles = ({ variables, mixins, breakpoints }) => ({
  resaleable: {
    ...mixins.init(),
    composes: 'ResaleItem',
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
  },
  resale: {
    extend: 'resaleable',
    composes: 'ResaleItem ResaleItem--resale',

    '& $icon': {
      backgroundColor: variables.colors.typeSuccess,
    },

    '& $status': {
      color: variables.colors.typeSuccess,
    },
  },
  resold: {
    extend: 'resaleable',
    composes: 'ResaleItem ResaleItem--resold',
    backgroundColor: variables.colors.greyOne,

    '& $icon': {
      backgroundColor: variables.colors.greyOne,
      color: variables.colors.greyOne,
    },

    '& $title': {
      color: variables.colors.greyOne,
    },

    '& $price': {
      '& .Price': {
        color: variables.colors.greyOne,
      },
    },

    '& $status': {
      color: variables.colors.greyOne,
    },
  },
  icon: {
    composes: 'ResaleItem__icon',
    width: '4rem',
    minHeight: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.colors.greyTwo,
    color: '#fff',
    flexShrink: '0',
    fontSize: '1.3rem',
    transition: '100ms linear background-color',
    [breakpoints.sm]: {
      width: '6rem',
      minHeight: '6rem',
    },
  },
  details: {
    composes: 'ResaleItem__details',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-between',
    padding: '0.6rem 0.8rem',
    flexDirection: 'column',

    [breakpoints.sm]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  editable: {
    '& $details': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  meta: {
    composes: 'ResaleItem__meta',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
  title: {
    composes: 'ResaleItem__title',
    color: variables.colors.text,
    fontWeight: '700',
    fontSize: '1rem',
    lineHeight: '1.15',
    marginBottom: '0.3rem',
  },
  identifier: {
    display: 'flex',
    alignItems: 'center',
    color: variables.colors.textAccent,
    fontWeight: '700',
    fontSize: '0.8rem',

    '& .Icon': {
      marginRight: '0.2rem',
    },
  },
  barcode: {
    extend: 'identifier',
    composes: 'ResaleItem__barcode',
    height: '25px',
  },
  customerName: {
    display: 'block',
  },
  customer: {
    extend: 'identifier',
    composes: 'ResaleItem__customer',
    height: '25px',

    '& .Icon': {
      marginTop: '-0.1rem',
    },
  },
  barcodeNumber: {
    display: 'block',
  },
  price: {
    composes: 'ResaleItem__price',
    marginTop: '0.5rem',

    '& .Price': {
      color: variables.colors.text,
      fontSize: '0.8rem',
    },
  },
  status: {
    composes: 'ResaleItem__status',
    fontStyle: 'italic',
    fontWeight: '700',
    flexBasis: '20%',
    color: variables.colors.typeWarning,

    [breakpoints.sm]: {
      textAlign: 'right',
    },
  },
  switch: {
    marginTop: '0.5rem',

    [breakpoints.sm]: {
      marginTop: '0',
    },
  },
});

export default styles;
