import PropTypes from 'prop-types';
import React from 'react';
import styles from './ResaleNotPossible.styles';
import withStyles from 'react-jss';

const ResaleNotPossible = ({ classes, packageName }) => (
  <div className={classes.container}>
    <h1 className={classes.title}>Resale is unavailable for your booking</h1>
    <p>
      We’re unable to offer resale for your{' '}
      <span className={classes.packageName}>{packageName}</span> booking at the
      moment. If you think this is in error, please contact us at{' '}
      <a className={classes.email} href="mailto:hello@kaboodle.co.uk">
        hello@kaboodle.co.uk
      </a>
    </p>
  </div>
);

ResaleNotPossible.propTypes = {
  classes: PropTypes.object.isRequired,
  packageName: PropTypes.string.isRequired,
};

export default withStyles(styles)(ResaleNotPossible);
