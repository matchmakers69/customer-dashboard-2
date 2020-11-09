import React, { Component } from 'react';
import { formatDate, formatDateRange } from '../../lib/dates';

import PropTypes from 'prop-types';
import styles from './BookingCard.styles';
import withStyles from 'react-jss';
import { withUI } from '@kaboodle-solutions/design-system';

class BookingCard extends Component {
  static propTypes = {
    children: PropTypes.any,
    classes: PropTypes.object,
    currencyExponent: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
      PropTypes.number,
    ]),
    location: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    reference: PropTypes.string.isRequired,
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    children: null,
    classes: {},
    endDate: null,
    location: null,
  };

  getDate = () => {
    if (this.props.endDate) {
      return formatDateRange(this.props.startDate, this.props.endDate);
    }
    return formatDate(this.props.startDate);
  };

  getPrice = () =>
    this.props.currencySymbol +
    parseFloat(this.props.price).toFixed(this.props.currencyExponent);

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.details}>
          <span className={classes.eventName}>{this.props.title}</span>
          <span className={classes.reference}>{this.props.reference}</span>
          <span className={classes.eventDate}>{this.getDate()}</span>
          <span className={classes.eventLocation}>{this.props.location}</span>
          <span className={classes.eventPrice}>{this.getPrice()}</span>
        </div>
        <div className={classes.actions}>{this.props.children}</div>
      </div>
    );
  }
}

export default withUI(withStyles(styles)(BookingCard));
