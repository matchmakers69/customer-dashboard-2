/* eslint-disable max-lines, max-lines-per-function */
import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { useEffect, useState } from 'react';
import {
  getBookingEndDate,
  getBookingId,
  getBookingName,
  getBookingPaidAmount,
  getBookingPax,
  getBookingPaymentDueDate,
  getBookingPayments,
  getBookingStartDate,
  getBookingStripeApiKey,
  getBookingTotal,
  isBookingLoaded,
} from '../../selectors/booking';
import {
  getPaymentCardholderName,
  getPaymentClientSecret,
  getPaymentExpiryDate,
  getPaymentLast4,
  getPaymentSuccess,
  isPaymentUpdating,
} from '../../selectors/payments';
import { goToRoute, withParams } from '../../lib/router';

import BackButton from '../../components/BackButton';
import ContentHero from '../ContentHero';
import MakePaymentForm from '../../components/MakePaymentForm';
import MakePaymentSettleUp from '../../components/MakePaymentSettleUp';
import OutstandingBalance from '../../components/OutstandingBalance';
import PaymentDeadline from '../../components/PaymentDeadline';
import PaymentHistory from '../PaymentHistory';
import PieChart from '../../components/PieChart';
import PropTypes from 'prop-types';
import StripePaymentWrapper from '../../components/StripePaymentWrapper';
import { bookingOperations } from '../../store/booking';
import { clientOperations } from '../../store/client';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { getClientCountriesFormArray } from '../../selectors/client';
import { messageOperations } from '../../store/messages';
import { paymentOperations } from '../../store/payments';
import styles from './MakePaymentPage.styles';
import withStyles from 'react-jss';

const MakePaymentPage = ({
  bookingReference,
  loaded,
  goTo,
  loadBooking,
  match,
  classes,
  payments,
  totalAmount,
  paidAmount,
  paymentDueDate,
  apiKey,
  countries,
  getCountries,
  makePayment,
  paymentUpdating,
  clientSecret,
  last4,
  cardholderName,
  sendMessage,
  makePaymentFailed,
  bookingId,
  bookingPax,
  expiryDate,
  paymentSuccess,
}) => {
  useEffect(() => {
    loadBooking(match.params.booking_reference);
    getCountries();
  }, []);

  const [useRemainingBalance, setUseRemainingBalance] = useState(false);

  const handleSettleUpClick = () => setUseRemainingBalance(true);

  const handleUndoClick = () => setUseRemainingBalance(false);

  const onBackButtonClick = () =>
    goTo(
      withParams(constants.BOOKING_URL, {
        booking_reference: bookingReference,
      }),
    );

  const remainingBalance =
    totalAmount && paidAmount ? totalAmount.value - paidAmount.value : null;

  return (
    <div className="MakePaymentPage">
      <ContentHero bookingReference={bookingReference} />
      <Grid className={classes.container}>
        <Col lg="6">
          <BackButton onClick={onBackButtonClick} />
          <h1 className={classes.pageTitle}>Your Outstanding Balance</h1>
        </Col>
      </Grid>
      <Grid className={classes.container}>
        <Col sm="12" lg="5">
          {loaded && (
            <>
              <div className={classes.boxOverview}>
                <PieChart data={payments} remainingBalance={remainingBalance} />
                <OutstandingBalance
                  totalAmount={totalAmount.value}
                  remainingBalance={remainingBalance}
                />
                <PaymentDeadline deadline={paymentDueDate.iso_value} />
              </div>
              <div className={classes.boxOverview}>
                <MakePaymentSettleUp
                  handleSettleUpClick={handleSettleUpClick}
                  handleUndoClick={handleUndoClick}
                  remainingBalance={remainingBalance}
                  useRemainingBalance={useRemainingBalance}
                />
              </div>
            </>
          )}
        </Col>
        <Col sm="12" lg="7">
          {loaded && (
            <div className={classes.boxOverview}>
              <StripePaymentWrapper apiKey={apiKey}>
                <MakePaymentForm
                  countries={countries}
                  onRequest={makePayment}
                  paymentUpdating={paymentUpdating}
                  maxAmount={remainingBalance}
                  bookingReference={bookingReference}
                  handleError={makePaymentFailed}
                  clientSecret={clientSecret}
                  last4={last4}
                  cardholderName={cardholderName}
                  sendMessage={sendMessage}
                  bookingId={bookingId}
                  bookingPax={bookingPax}
                  expiryDate={expiryDate}
                  paymentSuccess={paymentSuccess}
                  remainingBalance={
                    useRemainingBalance ? remainingBalance : null
                  }
                />
              </StripePaymentWrapper>
            </div>
          )}
        </Col>
      </Grid>
      <Grid className={classes.container}>
        <Col sm="12" lg="9">
          {loaded && (
            <PaymentHistory
              bookingReference={bookingReference}
              payments={payments}
            />
          )}
        </Col>
      </Grid>
    </div>
  );
};

MakePaymentPage.propTypes = {
  apiKey: PropTypes.string,
  bookingId: PropTypes.string,
  bookingPax: PropTypes.array.isRequired,
  bookingReference: PropTypes.string,
  cardholderName: PropTypes.string,
  classes: PropTypes.shape({
    boxOverview: PropTypes.string,
    container: PropTypes.string,
    pageTitle: PropTypes.string,
  }),
  clientSecret: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  expiryDate: PropTypes.object,
  getCountries: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  last4: PropTypes.string,
  loadBooking: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  makePayment: PropTypes.func.isRequired,
  makePaymentFailed: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      booking_reference: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  paidAmount: PropTypes.shape({
    value: PropTypes.number,
  }),
  paymentDueDate: PropTypes.shape({
    iso_value: PropTypes.string,
    isotz_value: PropTypes.string,
  }).isRequired,
  paymentSuccess: PropTypes.bool,
  paymentUpdating: PropTypes.bool.isRequired,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      paid: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      amount: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sendMessage: PropTypes.func.isRequired,
  totalAmount: PropTypes.shape({
    value: PropTypes.number,
  }),
};

MakePaymentPage.defaultProps = {
  apiKey: null,
  bookingId: null,
  bookingReference: null,
  cardholderName: null,
  classes: {},
  clientSecret: null,
  expiryDate: {},
  last4: null,
  paidAmount: {},
  paymentSuccess: false,
  totalAmount: {},
};

const mapStateToProps = (state, ownProps) => {
  const bookingReference = ownProps.match.params.booking_reference;
  return {
    bookingReference,
    apiKey: getBookingStripeApiKey(state, bookingReference),
    name: getBookingName(state, bookingReference),
    startDate: getBookingStartDate(state, bookingReference),
    endDate: getBookingEndDate(state, bookingReference),
    loaded: isBookingLoaded(state, bookingReference),
    paidAmount: getBookingPaidAmount(state, bookingReference),
    paymentDueDate: getBookingPaymentDueDate(state, bookingReference),
    payments: getBookingPayments(state, bookingReference),
    totalAmount: getBookingTotal(state, bookingReference),
    countries: getClientCountriesFormArray(state),
    paymentUpdating: isPaymentUpdating(state),
    clientSecret: getPaymentClientSecret(state),
    last4: getPaymentLast4(state),
    cardholderName: getPaymentCardholderName(state),
    bookingId: getBookingId(state, bookingReference),
    bookingPax: getBookingPax(state, bookingReference),
    expiryDate: getPaymentExpiryDate(state),
    paymentSuccess: getPaymentSuccess(state),
  };
};

const mapDispatchToProps = {
  loadBooking: bookingOperations.getBooking,
  goTo: goToRoute,
  getCountries: clientOperations.getCountries,
  makePayment: paymentOperations.makePaymentUpdating,
  makePaymentFailed: paymentOperations.makePaymentFailed,
  sendMessage: messageOperations.sendMessage,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MakePaymentPage);
