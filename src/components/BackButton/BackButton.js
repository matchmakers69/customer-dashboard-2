import { Button } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import styles from './BackButton.styles';
import withStyles from 'react-jss';

const BackButton = ({ onClick, classes }) => (
  <div className={classes.backButton}>
    <Button onClick={onClick}>&larr; Back</Button>
  </div>
);

BackButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  onClick: noop,
};

export default withStyles(styles)(BackButton);
