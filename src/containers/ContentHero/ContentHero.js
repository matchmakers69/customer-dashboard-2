import { formatDate, formatDateRange } from '../../lib/dates';
import {
  getBookingEndDate,
  getBookingName,
  getBookingStartDate,
  isBookingLoaded,
} from '../../selectors/booking';

import PropTypes from 'prop-types';
import React from 'react';
import { WrapLoader } from '@kaboodle-solutions/design-system';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './ContentHero.styles';
import withStyles from 'react-jss';

const ContentHero = ({
  bookingName,
  classes,
  endDate,
  loaded,
  startDate,
  bookingReference,
}) => {
  const getDate = () => {
    if (startDate && endDate) {
      return formatDateRange(startDate, endDate);
    } else if (startDate) {
      return formatDate(startDate);
    }
    return null;
  };

  const contentHeroElement = title => (
    <div className={classes.contentHero}>
      <div className={classes.image} />
      <div className={classes.details}>
        <div className={classes.headings}>
          <span className={classes.title}>{title}</span>
          {bookingReference && (
            <span className={classes.subtitle}>{bookingReference}</span>
          )}
        </div>
        {getDate() && <span className={classes.date}>{getDate()}</span>}
      </div>
    </div>
  );

  const getContentHero = () =>
    loaded ? (
      contentHeroElement(bookingName)
    ) : (
      <WrapLoader>{contentHeroElement('Loading')}</WrapLoader>
    );

  return getContentHero();
};
ContentHero.defaultProps = {
  bookingReference: null,
  classes: {},
  endDate: null,
  location: null,
  startDate: null,
};

ContentHero.propTypes = {
  bookingName: PropTypes.string,
  bookingReference: PropTypes.string,
  classes: PropTypes.object,
  endDate: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { bookingReference } = ownProps;
  return {
    bookingReference,
    bookingName: getBookingName(state, bookingReference),
    startDate: getBookingStartDate(state, bookingReference),
    endDate: getBookingEndDate(state, bookingReference),
    loaded: isBookingLoaded(state, bookingReference),
  };
};

const mapDispatchToProps = {};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ContentHero);
