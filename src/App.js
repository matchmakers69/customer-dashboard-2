import React, { useEffect } from 'react';

import Footer from './containers/Footer';
import Header from './containers/Header';
import PromptOverlay from './containers/PromptOverlay';
import PropTypes from 'prop-types';
import Routes from './Routes';
import ToastOverlay from './containers/ToastOverlay';
import { setBrowserHeightUnit } from './lib/browser';
import styles from './App.styles';
import withStyles from 'react-jss';

const App = ({ classes }) => {
  useEffect(() => {
    setBrowserHeightUnit();
    window.addEventListener('resize', setBrowserHeightUnit);
    return function cleanup() {
      window.removeEventListener('resize', setBrowserHeightUnit);
    };
  });

  return (
    <div className={classes.app}>
      <div className={classes.wrap}>
        <Header />
        <Routes />
        <ToastOverlay />
        <PromptOverlay />
      </div>
      <div className={classes.footerWrap}>
        <Footer />
      </div>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object,
};

App.defaultProps = {
  classes: {},
};

export default withStyles(styles)(App);
