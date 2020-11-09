import PropTypes from 'prop-types';
import React from 'react';
import styles from './DetailsListField.styles';
import withStyles from 'react-jss';

const DetailsListField = ({ title, value, type, children, classes }) => (
  <div className={classes.detailsListField}>
    <div className={classes.summary}>
      <div className={classes.title}>{title}</div>
      {type !== 'hidden' && <div className={classes.value}>{value}</div>}
    </div>
    <div className={classes.buttons}>{children}</div>
  </div>
);

DetailsListField.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

DetailsListField.defaultProps = {
  children: null,
  classes: {},
  title: '',
  type: undefined,
  value: '',
};

export default withStyles(styles)(DetailsListField);
