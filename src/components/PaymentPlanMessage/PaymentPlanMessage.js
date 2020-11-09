import { Button, Message, withUI } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import { formatPrice } from '../../lib/formatting';
import styles from './PaymentPlanMessage.styles';
import withStyles from 'react-jss';

const PaymentPlanMessage = ({
  paymentPlan,
  currencyExponent,
  currencySymbol,
  goToPaymentPlan,
  classes,
}) => {
  const nextPaymentAmount = formatPrice(
    currencySymbol,
    paymentPlan.projection[0].amount,
    currencyExponent,
  );

  const nextPaymentDate = format(paymentPlan.projection[0].date, 'DD/MM/YYYY');

  return (
    <Message className={classes.message} icon="iconBookings" variant="success">
      <Message.Content>
        You have a Payment Plan set up. Your next payment of{' '}
        <strong data-test="nextPaymentAmount">{nextPaymentAmount}</strong> will
        be taken on{' '}
        <strong data-test="nextPaymentDate">{nextPaymentDate}</strong>.
      </Message.Content>
      <Message.Actions>
        <Button
          testId="goToPaymentPlan"
          size="medium"
          variant="success"
          onClick={goToPaymentPlan}>
          Manage Payment Plan
        </Button>
      </Message.Actions>
    </Message>
  );
};

PaymentPlanMessage.propTypes = {
  classes: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  goToPaymentPlan: PropTypes.func.isRequired,
  paymentPlan: PropTypes.shape({
    projection: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.instanceOf(Date).isRequired,
        amount: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};

export default withUI(withStyles(styles)(PaymentPlanMessage));
