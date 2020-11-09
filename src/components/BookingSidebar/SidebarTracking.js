import { Button, Icon, Title } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import styles from './BookingSidebar.styles';
import withStyles from 'react-jss';

const trackingUrl = trackingId =>
  `https://www.royalmail.com/track-your-item#/tracking-results/${trackingId}`;

const SidebarTracking = ({ classes, trackingId }) => (
  <div className={classes.sidebarSection}>
    <Title>Track Delivery</Title>
    <a
      className="DownloadLink"
      href={trackingUrl(trackingId)}
      target="_blank"
      rel="noopener noreferrer">
      <Button>
        <Icon icon="iconDelivery" />
        {trackingId}
      </Button>
    </a>
  </div>
);

SidebarTracking.propTypes = {
  classes: PropTypes.object,
  trackingId: PropTypes.string.isRequired,
};

SidebarTracking.defaultProps = {
  classes: {},
};

export default withStyles(styles)(SidebarTracking);
