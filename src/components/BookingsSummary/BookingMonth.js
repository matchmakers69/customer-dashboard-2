import React from 'react';
import { format } from 'date-fns';
import propTypes from 'prop-types';
import styles from './BookingsSummary.styles';
import withStyles from 'react-jss';

const BookingMonth = ({ date, classes }) => {
  const month = format(date, 'MMM');
  const year = format(date, 'YYYY');
  return (
    <div className={classes.calendar}>
      <div className={classes.calendarInner}>
        <div className={classes.bookingMonthYear} />
        <span className={classes.bookingMonth}>{month}</span>
        <span className={classes.bookingYear}>{year}</span>
      </div>
    </div>
  );
};

BookingMonth.propTypes = {
  classes: propTypes.shape({
    calendar: propTypes.string,
    calendarInner: propTypes.string,
    bookingMonthYear: propTypes.string,
    bookingMonth: propTypes.string,
    bookingYear: propTypes.string,
  }).isRequired,
  date: propTypes.string.isRequired,
};

export default withStyles(styles)(BookingMonth);
