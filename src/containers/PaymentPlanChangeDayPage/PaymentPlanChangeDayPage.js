import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { useEffect, useState } from 'react';
import {
  getBookingEndDate,
  getBookingName,
  getBookingPaymentPlan,
  getBookingStartDate,
  isBookingLoaded,
} from '../../selectors/booking';
import {
  getBookingPaymentPlanProjection,
  isPaymentUpdating,
} from '../../selectors/payments';
import { goToRoute, withParams } from '../../lib/router';

import BackButton from '../../components/BackButton';
import ChangeDayForm from '../../components/ChangeDayForm';
import ContentHero from '../ContentHero';
import PaymentPlanProjection from '../../components/PaymentPlanProjection';
import PropTypes from 'prop-types';
import SubmitChangeDayForm from '../../components/SubmitChangeDayForm';
import { bookingOperations } from '../../store/booking';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { messageOperations } from '../../store/messages';
import { paymentOperations } from '../../store/payments';
import styles from './PaymentPlanChangeDayPage.styles';
import withStyles from 'react-jss';

const PaymentPlanChangeDayPage = ({
  bookingReference,
  classes,
  getPaymentPlanProjection,
  goTo,
  loadBooking,
  match,
  paymentPlanUpdating,
  projection,
  sendMessage,
  updatePaymentPlan,
}) => {
  const [selectedDay, updateSelectedDay] = useState(null);

  useEffect(() => {
    loadBooking(match.params.booking_reference);
    getPaymentPlanProjection({
      bookingReference: match.params.booking_reference,
    });
  }, []);

  const onBackButtonClick = () =>
    goTo(
      withParams(constants.BOOKING_PAYMENT_PLAN_VIEW_URL, {
        booking_reference: bookingReference,
      }),
    );

  return (
    <div className="PaymentPlanChangePaymentPage">
      <ContentHero bookingReference={bookingReference} />
      <Grid className={classes.container}>
        <Col xs="12">
          <BackButton onClick={onBackButtonClick} />
          <h1 className={classes.pageTitle}>Change Payment Day</h1>
        </Col>
      </Grid>
      <Grid className={classes.container}>
        <Col lg="6">
          <div className={classes.box}>
            <ChangeDayForm
              onRequest={getPaymentPlanProjection}
              bookingReference={bookingReference}
              updateSelectedDay={updateSelectedDay}
            />
          </div>
        </Col>
        <Col lg="6">
          <PaymentPlanProjection
            projection={projection}
            selectedDay={selectedDay}
          />
        </Col>
      </Grid>
      <Grid className={classes.container}>
        <Col xs="12">
          <SubmitChangeDayForm
            bookingReference={bookingReference}
            onSave={updatePaymentPlan}
            selectedDay={selectedDay}
            onCancel={onBackButtonClick}
            updating={paymentPlanUpdating}
            sendMessage={sendMessage}
          />
        </Col>
      </Grid>
    </div>
  );
};

PaymentPlanChangeDayPage.propTypes = {
  bookingReference: PropTypes.string,
  classes: PropTypes.shape({
    box: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
  }).isRequired,
  getPaymentPlanProjection: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  loadBooking: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      booking_reference: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  paymentPlanUpdating: PropTypes.bool,
  projection: PropTypes.arrayOf(PropTypes.object),
  sendMessage: PropTypes.func.isRequired,
  updatePaymentPlan: PropTypes.func.isRequired,
};

PaymentPlanChangeDayPage.defaultProps = {
  bookingReference: null,
  paymentPlanUpdating: false,
  projection: [],
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
    projection: getBookingPaymentPlanProjection(state, bookingReference),
    paymentPlanUpdating: isPaymentUpdating(state),
  };
};

const mapDispatchToProps = {
  loadBooking: bookingOperations.getBooking,
  getPaymentPlanProjection: paymentOperations.getPaymentPlanProjection,
  goTo: goToRoute,
  sendMessage: messageOperations.sendMessage,
  updatePaymentPlan: paymentOperations.updatingPaymentPlan,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PaymentPlanChangeDayPage);
