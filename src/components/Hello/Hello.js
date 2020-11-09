import PropTypes from 'prop-types';
import React from 'react';
import styles from './Hello.styles';
import withStyles from 'react-jss';

const Hello = ({ classes, greeting, name, suffix }) => {
  const hello = name ? `${greeting}, ${name}${suffix}` : `${greeting}${suffix}`;
  return <p className={classes.hello}>{hello}</p>;
};

Hello.propTypes = {
  classes: PropTypes.object,
  greeting: PropTypes.string,
  name: PropTypes.string,
  suffix: PropTypes.string,
};

Hello.defaultProps = {
  classes: {},
  greeting: 'Hi',
  name: '',
  suffix: '!',
};

export default withStyles(styles)(Hello);
