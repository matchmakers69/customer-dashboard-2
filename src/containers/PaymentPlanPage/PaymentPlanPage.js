import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { Fragment, useEffect } from 'react';
import {
  getBookingEndDate,
  getBookingName,
  getBookingPaymentPlan,
  getBookingPaymentStatus,
  getBookingStartDate,
  isBookingLoaded,
} from '../../selectors/booking';
import { goToRoute, withParams } from '../../lib/router';

import BackButton from '../../components/BackButton';
import ContentHero from '../ContentHero';
import PaymentHistory from '../PaymentHistory';
import PaymentPlanCard from '../PaymentPlanCard';
import PaymentPlanDetails from './PaymentPlanDetails';
import { PaymentPlanSidebar } from '../../components/PaymentPlanSidebar';
import PropTypes from 'prop-types';
import { bookingOperations } from '../../store/booking';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import styles from './PaymentPlanPage.styles';
import withStyles from 'react-jss';

const PaymentPlanPage = ({
  bookingReference,
  loaded,
  goTo,
  loadBooking,
  match,
  classes,
  paymentPlan,
  paymentStatus,
}) => {
  useEffect(() => {
    loadBooking(match.params.booking_reference);
  }, []);

  const onBackButtonClick = () =>
    goTo(
      withParams(constants.BOOKING_URL, {
        booking_reference: bookingReference,
      }),
    );

  return (
    <div className="PaymentPlanPage">
      <ContentHero bookingReference={bookingReference} />
      <Grid className={classes.container}>
        <Col lg="12">
          <BackButton onClick={onBackButtonClick} />
          <h1>Your Payment Plan</h1>
        </Col>
      </Grid>
      <Grid className={classes.container}>
        <Col sm="12" lg="9">
          {loaded && (
            <Fragment>
              <PaymentPlanDetails
                bookingReference={bookingReference}
                paymentPlan={paymentPlan}
                paymentStatus={paymentStatus}
              />
              <PaymentPlanCard bookingReference={bookingReference} />
              <PaymentHistory bookingReference={bookingReference} />
            </Fragment>
          )}
        </Col>
        <Col lg="3">
          <PaymentPlanSidebar goTo={goTo} bookingReference={bookingReference} />
        </Col>
      </Grid>
    </div>
  );
};

PaymentPlanPage.propTypes = {
  bookingReference: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  goTo: PropTypes.func.isRequired,
  loadBooking: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      booking_reference: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  paymentPlan: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([false])])
    .isRequired,
  paymentStatus: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  }),
};

PaymentPlanPage.defaultProps = {
  bookingReference: null,
  paymentStatus: {
    code: null,
    value: null,
  },
};

const mapStateToProps = (state, ownProps) => {
  const bookingReference = ownProps.match.params.booking_reference;
  return {
    bookingReference,
    name: getBookingName(state, bookingReference),
    startDate: getBookingStartDate(state, bookingReference),
    endDate: getBookingEndDate(state, bookingReference),
    loaded: isBookingLoaded(state, bookingReference),
    paymentPlan: getBookingPaymentPlan(state, bookingReference),
    paymentStatus: getBookingPaymentStatus(state, bookingReference),
  };
};

const mapDispatchToProps = {
  loadBooking: bookingOperations.getBooking,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PaymentPlanPage);
