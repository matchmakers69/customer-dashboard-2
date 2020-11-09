import PropTypes from 'prop-types';
import React from 'react';
import styles from './NoBookingsFound.styles';
import withStyles from 'react-jss';

const typeTitles = {
  upcomingBookings: 'It seems you have no upcoming bookings!',
  pastBookings: 'It seems you have no previous bookings!',
};

const NoBookingsFound = ({ classes, type }) => {
  const title = typeTitles[type];

  return (
    <div className={classes.container}>
      {title && <h3 className={classes.header}>{title}</h3>}
      <p>
        <a
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.kaboodle.co.uk/">
          Visit our site to find out more about upcoming events.
        </a>
      </p>
    </div>
  );
};

NoBookingsFound.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(Object.keys(typeTitles)),
};

NoBookingsFound.defaultProps = {
  type: '',
};

export default withStyles(styles)(NoBookingsFound);
