import { Address, Button, Title } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import styles from './BookingSidebar.styles';
import withStyles from 'react-jss';

const SidebarAddress = ({ classes, deliveryAddress, printed, goToBooking }) => (
  <div className={classes.sidebarAddress}>
    <Title>Delivery Address</Title>
    <Address address={deliveryAddress} />
    {printed ? (
      <div className={classes.deliveryMessage}>
        We’ve printed the items on your booking. You can no longer make changes
        to the delivery address.
      </div>
    ) : (
      <Button onClick={goToBooking}>Update Address</Button>
    )}
  </div>
);

SidebarAddress.defaultProps = {
  classes: {},
};

SidebarAddress.propTypes = {
  classes: PropTypes.object,
  deliveryAddress: PropTypes.shape({
    address_1: PropTypes.string.isRequired,
    address_2: PropTypes.string,
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  goToBooking: PropTypes.func.isRequired,
  printed: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SidebarAddress);
