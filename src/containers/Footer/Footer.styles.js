const styles = ({ variables, breakpoints }) => ({
  footer: {
    composes: 'Footer',
    backgroundColor: variables.colors.greyOne,
    padding: '1rem',
    [breakpoints.lg]: {
      padding: '2rem',
    },
    marginTop: '4rem',
    '& p': {
      fontSize: '0.8rem',
    },
  },
  grid: {
    flexDirection: 'column',
    [breakpoints.lg]: {
      flexDirection: 'row',
    },
  },
  link: {
    paddingRight: '0.5rem',
    '&:last-child': {
      paddingRight: 0,
    },
  },
  logo: {
    backgroundImage: 'url(../images/kaboodle-logo-footer.png)',
    backgroundSize: 'contain',
    display: 'flex',
    height: '4rem',
    backgroundPosition: 'center',
    [breakpoints.lg]: {
      backgroundPosition: 'left',
      height: '100%',
    },
  },
  terms: {
    textAlign: 'center',
    [breakpoints.lg]: {
      textAlign: 'right',
    },
  },
  termParagraph: {
    margin: 0,
  },
});

export default styles;
