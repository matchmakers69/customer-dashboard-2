import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { useEffect } from 'react';
import {
  getBookingEndDate,
  getBookingName,
  getBookingStartDate,
  getBookingStripeApiKey,
  isBookingLoaded,
} from '../../selectors/booking';
import {
  getPaymentCardholderName,
  getPaymentClientSecret,
  getPaymentLast4,
  isPaymentUpdating,
} from '../../selectors/payments';
import { goToRoute, withParams } from '../../lib/router';

import BackButton from '../../components/BackButton';
import ChangeCardDetailsForm from '../../components/ChangeCardDetailsForm';
import ContentHero from '../ContentHero';
import PropTypes from 'prop-types';
import StripePaymentWrapper from '../../components/StripePaymentWrapper';
import { bookingOperations } from '../../store/booking';
import { clientOperations } from '../../store/client';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { getClientCountriesFormArray } from '../../selectors/client';
import { getCustomerAddress } from '../../selectors/customer';
import { messageOperations } from '../../store/messages';
import { paymentOperations } from '../../store/payments';
import styles from './PaymentPlanChangePaymentPage.styles';
import withStyles from 'react-jss';

const PaymentPlanChangePaymentPage = ({
  bookingReference,
  loaded,
  goTo,
  loadBooking,
  match,
  classes,
  getCountries,
  countries,
  paymentUpdating,
  updatePaymentPlan,
  updatePaymentPlanFailed,
  apiKey,
  clientSecret,
  last4,
  cardholderName,
  sendMessage,
}) => {
  useEffect(() => {
    loadBooking(match.params.booking_reference);
    getCountries();
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
        <Col lg="6">
          <BackButton onClick={onBackButtonClick} />
          <h1 className={classes.pageTitle}>Change Payment Details</h1>
          <div className={classes.changePaymentDetailsBox}>
            {loaded && (
              <StripePaymentWrapper apiKey={apiKey}>
                <ChangeCardDetailsForm
                  bookingReference={bookingReference}
                  handleError={updatePaymentPlanFailed}
                  onRequest={updatePaymentPlan}
                  updating={paymentUpdating}
                  countries={countries}
                  clientSecret={clientSecret}
                  last4={last4}
                  cardholderName={cardholderName}
                  sendMessage={sendMessage}
                />
              </StripePaymentWrapper>
            )}
          </div>
        </Col>
      </Grid>
    </div>
  );
};

PaymentPlanChangePaymentPage.propTypes = {
  address: PropTypes.shape({
    // eslint-disable-next-line camelcase
    address_1: PropTypes.string.isRequired,
    // eslint-disable-next-line camelcase
    address_2: PropTypes.string,
    // eslint-disable-next-line camelcase
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  apiKey: PropTypes.string,
  bookingReference: PropTypes.string,
  cardholderName: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
    changePaymentDetailsBox: PropTypes.string.isRequired,
  }).isRequired,
  clientSecret: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCountries: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  last4: PropTypes.string,
  loadBooking: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      booking_reference: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  paymentUpdating: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updatePaymentPlan: PropTypes.func.isRequired,
  updatePaymentPlanFailed: PropTypes.func.isRequired,
};

PaymentPlanChangePaymentPage.defaultProps = {
  // Stripe key is hardcoded for testing purposes only!
  // This would usually be required prop
  apiKey: null,
  bookingReference: null,
  cardholderName: null,
  clientSecret: null,
  last4: null,
};

const mapStateToProps = (state, ownProps) => {
  const bookingReference = ownProps.match.params.booking_reference;
  return {
    bookingReference,
    apiKey: getBookingStripeApiKey(state, bookingReference),
    paymentUpdating: isPaymentUpdating(state),
    name: getBookingName(state, bookingReference),
    startDate: getBookingStartDate(state, bookingReference),
    endDate: getBookingEndDate(state, bookingReference),
    loaded: isBookingLoaded(state, bookingReference),
    address: getCustomerAddress(state),
    countries: getClientCountriesFormArray(state),
    clientSecret: getPaymentClientSecret(state),
    last4: getPaymentLast4(state),
    cardholderName: getPaymentCardholderName(state),
  };
};

const mapDispatchToProps = {
  getCountries: clientOperations.getCountries,
  loadBooking: bookingOperations.getBooking,
  sendMessage: messageOperations.sendMessage,
  updatePaymentPlan: paymentOperations.updatingPaymentPlan,
  updatePaymentPlanFailed: paymentOperations.updatePaymentPlanFailed,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PaymentPlanChangePaymentPage);
