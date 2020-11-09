import {
  Col,
  ContentHero,
  Grid,
  WrapLoader,
} from '@kaboodle-solutions/design-system';
import React, { Component, Fragment } from 'react';
import { dummyTicket, multiply } from '../../lib/dummy';
import {
  getBooking,
  getBookingPackage,
  getResaleTickets,
  getResaleValue,
  isBookingLoaded,
  isResalable,
} from '../../selectors/booking';
import { goToRoute, withParams } from '../../lib/router';

import BackButton from '../../components/BackButton';
import BookingResaleForm from '../../components/BookingResaleForm';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import ResaleNotPossible from '../../components/ResaleNotPossible';
import ResalePageSidebar from './ResalePageSidebar';
import { bookingOperations } from '../../store/booking';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import noop from 'lodash/noop';
import styles from './BookingResalePage.styles';
import withStyles from 'react-jss';

class BookingResalePage extends Component {
  static propTypes = {
    booking: PropTypes.object.isRequired,
    bookingPackage: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getBooking: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    match: PropTypes.object.isRequired,
    onResaleChange: PropTypes.func.isRequired,
    resalable: PropTypes.bool,
    resaleValue: PropTypes.number,
    tickets: PropTypes.array,
    updating: PropTypes.bool,
  };

  static defaultProps = {
    loaded: false,
    resalable: false,
    resaleValue: 0,
    tickets: multiply(dummyTicket, 3),
    updating: false,
  };

  constructor(props) {
    super(props);
    this.props.getBooking(this.props.match.params.booking_reference);
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const {
      classes,
      booking,
      tickets,
      bookingPackage,
      onResaleChange,
      resaleValue,
      resalable,
      goTo,
      loaded,
      updating,
    } = this.props;

    return (
      <div className={classes.page}>
        <Helmet
          title={
            loaded
              ? `${bookingPackage.title} Resale - ${constants.PAGE_TITLE_SUFFIX}`
              : constants.PAGE_TITLE_SUFFIX
          }
        />
        <div className={classes.contentHeader}>
          <ContentHero bookingReference={booking.reference} />
        </div>
        <Grid className={classes.grid}>
          <Col lg={12}>
            <BackButton
              onClick={() =>
                goTo(
                  withParams(constants.BOOKING_URL, {
                    booking_reference: booking.reference,
                  }),
                )
              }
            />
          </Col>
        </Grid>
        <Grid className={classes.grid}>
          <Col xs={12} sm={12} lg={9}>
            <div className={classes.resale}>
              {loaded && !updating ? (
                <Fragment>
                  {resalable ? (
                    <BookingResaleForm
                      tickets={tickets}
                      onChange={items =>
                        onResaleChange(booking.reference, items)
                      }
                      resaleValue={resaleValue}
                    />
                  ) : (
                    <ResaleNotPossible packageName={bookingPackage.title} />
                  )}
                </Fragment>
              ) : (
                <WrapLoader>
                  <BookingResaleForm tickets={tickets} onChange={noop} />
                </WrapLoader>
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} lg={3}>
            <ResalePageSidebar bookingPackage={bookingPackage} />
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const bookingReference = ownProps.match.params.booking_reference;
  return {
    booking: getBooking(state, bookingReference),
    tickets: getResaleTickets(state, bookingReference),
    bookingPackage: getBookingPackage(state, bookingReference),
    resaleValue: getResaleValue(state, bookingReference),
    resalable: isResalable(state, bookingReference),
    loaded: isBookingLoaded(state, bookingReference),
    updating: state.booking.updating,
  };
};

const mapDispatchToProps = {
  getBooking: bookingOperations.getBooking,
  onResaleChange: bookingOperations.updateBookingResale,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BookingResalePage);
