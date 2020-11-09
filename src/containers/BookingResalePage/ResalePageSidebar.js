import React from 'react';
import { Title } from '@kaboodle-solutions/design-system';
import styles from './BookingResalePage.styles';
import withStyles from 'react-jss';

const ResalePageSidebar = classes => (
  <div className={classes.sidebar}>
    <Title>How Resale Works</Title>
    <p>
      <span className={classes.strong}>Can’t go?</span> You can resell your
      tickets officially through us and if resold then we’ll refund the ticket
      price shown.
    </p>
    <p>
      You’ll receive an email once we’ve processed the refund. The refund will
      be made to the original payment method and should be visible within{' '}
      <span className={classes.strong}>3-5 working days</span>.
    </p>
  </div>
);

export default withStyles(styles)(ResalePageSidebar);
