import { Price, Title } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import styles from './BookingSidebar.styles';
import withStyles from 'react-jss';

const SidebarPrice = ({ classes, totalPrice }) => {
  if (totalPrice === 0) return null;

  return (
    <div className={classes.sidebarSection}>
      <Title>Total</Title>
      <Price value={totalPrice} />
    </div>
  );
};

SidebarPrice.propTypes = {
  classes: PropTypes.object,
  totalPrice: PropTypes.number,
};

SidebarPrice.defaultProps = {
  classes: {},
  totalPrice: 0,
};

export default withStyles(styles)(SidebarPrice);
