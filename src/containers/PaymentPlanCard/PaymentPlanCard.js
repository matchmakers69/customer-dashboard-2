import { goToRoute, withParams } from '../../lib/router';

import { Button } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { getBookingPaymentPlan } from '../../selectors/booking';
import styles from './PaymentPlanCard.styles';
import withStyles from 'react-jss';

const PaymentPlanCard = ({ classes, bookingReference, paymentPlan, goTo }) => {
  const { card } = paymentPlan;

  const handleButtonClick = () =>
    goTo(
      withParams(constants.BOOKING_PAYMENT_PLAN_CHANGE_PAYMENT_URL, {
        booking_reference: bookingReference,
      }),
    );

  return (
    <>
      <h2>Payment Card</h2>
      <div className={classes.box}>
        <div className={classes.titles}>
          <div className={classes.cardName}>
            <span className={classes.title}>Cardholder Name:</span>
          </div>
          <div className={classes.cardNumber}>
            <span className={classes.title}>Card Number:</span>
          </div>
        </div>
        <div className={classes.values}>
          <div className={classes.cardName}>
            <span className={classes.mobileTitle}>Cardholder Name:</span>
            <span data-test="cardholderName" className={classes.value}>
              {card.cardholderName}
            </span>
          </div>
          <div className={classes.cardNumber}>
            <span className={classes.mobileTitle}>Cardholder Name:</span>
            <span data-test="cardholderNumber" className={classes.value}>
              {card.cardNumber}
            </span>
          </div>
          <div className={classes.changePayment}>
            <Button variant="success" onClick={handleButtonClick}>
              Change Payment Card
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

PaymentPlanCard.propTypes = {
  bookingReference: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    box: PropTypes.string.isRequired,
    titles: PropTypes.string.isRequired,
    cardName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    values: PropTypes.string.isRequired,
    changePayment: PropTypes.string.isRequired,
    mobileTitle: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  goTo: PropTypes.func.isRequired,
  paymentPlan: PropTypes.shape({
    card: PropTypes.shape({
      cardholderName: PropTypes.string.isRequired,
      cardNumber: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { bookingReference } = ownProps;
  return {
    bookingReference,
    paymentPlan: getBookingPaymentPlan(state, bookingReference),
  };
};

const mapDispatchToProps = {
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PaymentPlanCard);
