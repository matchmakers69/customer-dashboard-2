const styles = ({ variables, mixins, breakpoints }) => ({
  container: {
    marginTop: '2rem',
  },
  summaryContainer: {
    ...mixins.box(),
  },
  sidebarSection: {
    composes: 'SidebarSection',
    marginBottom: '1rem',

    '& .Title': {
      maxWidth: '100%',
      [breakpoints.lg]: {
        maxWidth: '20em',
      },
    },

    '& .DownloadLink': {
      display: 'block',
      marginBottom: '0.5rem',

      '&:last-child': {
        marginBottom: '0',
      },
    },

    '& .Button': {
      width: '100%',
    },
  },
  sidebarAddress: {
    extend: 'sidebarSection',

    '& .Button': {
      marginTop: '1rem',
    },
  },
  deliveryMessage: {
    fontSize: '0.8rem',
    color: variables.colors.greyFour,
    marginTop: '0.8rem',
  },
  status: {
    composes: 'Status',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  success: {
    color: variables.colors.typeSuccess,
  },
  warning: {
    color: variables.colors.typeWarning,
  },
  danger: {
    color: variables.colors.typeDanger,
  },
});

export default styles;
