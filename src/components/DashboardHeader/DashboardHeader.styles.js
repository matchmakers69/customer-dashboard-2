import HeaderAngle from '../../assets/header-angle.svg';
import color from 'color';
import mobileMenuBottom from '../../assets/mobile-menu-bottom.svg';

const styles = ({ variables, mixins, breakpoints }) => ({
  dashboardHeader: {
    ...mixins.init(),
    composes: 'DashboardHeader',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: variables.colors.secondary,
    width: '100%',
    color: '#fff',
    '& button': {
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      width: '100%',
    },
  },
  overlay: {
    composes: 'DashboardHeaderOverlay',
    backgroundColor: color(variables.colors.trueWhite)
      .fade(0.2)
      .string(),
    width: '100vw',
    height: 'calc(100vh - 4.6em)',
    position: 'absolute',
    left: '0',
    top: '4.6em',
    zIndex: '75',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    composes: 'DashboardHeader__brand',
    zIndex: '100',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1em',
    flexGrow: '1',
    justifyContent: 'center',
    [breakpoints.sm]: {
      justifyContent: 'flex-start',
    },
    '& img': {
      width: 'auto',
      height: '1.8em',
      [breakpoints.xs]: {
        marginRight: '-7.9em',
      },
    },
    '& button': {
      width: '100%',
      textAlign: 'left',
    },
    '& button:hover': {
      cursor: 'pointer',
    },
  },
  menu: {
    composes: 'DashboardHeader__menu',
    display: 'flex',
    padding: '1.5em 1.5em 1.5em 5em',
    backgroundColor: '#c74d38',
    backgroundImage: `url(${HeaderAngle})`,
    backgroundPosition: 'left -1px center',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    '& a': {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textDecoration: 'none',
      '&:hover': {
        color: color(variables.colors.secondary)
          .lighten(0.4)
          .string(),
        cursor: 'pointer',
      },
      '& .Icon': {
        fontSize: '0.8em',
        marginRight: '0.5em',
      },
      [breakpoints.sm]: {
        display: 'flex',
        marginRight: '2em',
        '&:last-child': {
          marginRight: '0',
        },
      },
    },
  },
  menuOpen: {
    composes: 'DashboardHeader__menu DashboardHeader__menu--open',
    extend: 'menu',
    [breakpoints.xs]: {
      '& .DashboardHeader__links a': {
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'flex-start',
        padding: '1em',
        color: variables.colors.dark,
        '&:hover': {
          backgroundColor: variables.colors.greyOne,
          color: variables.colors.dark,
        },
      },

      '& .DashboardHeader__links': {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontSize: '1.3em',
        paddingTop: '1em',
        color: '#fff',
        top: '3.6em',
        left: '0',
        zIndex: '100',
        '&:after': {
          content: '""',
          position: 'absolute',
          height: '4em',
          bottom: '-4em',
          width: '100%',
          backgroundImage: `url(${mobileMenuBottom})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top -2px center',
          backgroundSize: '100%',
        },
      },
    },
    '& .DashboardHeader__links-enter': {
      opacity: '0',
    },
    '& .DashboardHeader__links-enter-active': {
      opacity: '1',
      transition: 'opacity 200ms',
    },
  },
  hamburger: {
    composes: 'DashboardHeader__hamburger',
    display: 'inline-flex',
    padding: '0.3em',
    [breakpoints.sm]: {
      display: 'none',
    },
    '& .Icon': {
      width: '1em',
      height: '1em',
    },
  },
  links: {
    composes: 'DashboardHeader__links',
    alignItems: 'center',
    display: 'none',
    [breakpoints.sm]: {
      display: 'flex',
    },
  },
});

export default styles;
