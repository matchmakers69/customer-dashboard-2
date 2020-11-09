import { Button, Title } from '@kaboodle-solutions/design-system';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './BookingSidebar.styles';
import withStyles from 'react-jss';

const SidebarResale = ({ classes, resaleLink }) => (
  <div className={classes.sidebarSection}>
    <Title>Ticket Resale</Title>
    <Link to={resaleLink}>
      <Button variant="success">Resell Tickets</Button>
    </Link>
  </div>
);

SidebarResale.propTypes = {
  classes: PropTypes.object.isRequired,
  resaleLink: PropTypes.string.isRequired,
};

export default withStyles(styles)(SidebarResale);
