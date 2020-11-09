import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import { formatPrice } from '../../lib/formatting';
import styles from './NextPayment.styles';
import withStyles from 'react-jss';
import { withUI } from '@kaboodle-solutions/design-system';

const NextPayment = ({
  classes,
  currencyExponent,
  currencySymbol,
  paymentPlan,
  paymentStatus,
}) => {
  const nextPaymentAmount = paymentPlan.projection
    ? paymentPlan.projection[0].amount
    : null;
  const nextPaymentDate = paymentPlan.projection
    ? paymentPlan.projection[0].date
    : null;

  return (
    <div className={classes.nextPaymentBox}>
      {!nextPaymentDate || paymentStatus.value === 'Fully Paid' ? (
        <>
          <h2>You&apos;re all set!</h2>
          <p>You have no outstanding payment plan payments.</p>
        </>
      ) : (
        <>
          <h2>Next Payment</h2>
          <p>
            Your next payment of{' '}
            <strong>
              {formatPrice(currencySymbol, nextPaymentAmount, currencyExponent)}
            </strong>{' '}
            is due on the{' '}
            <strong>{format(nextPaymentDate, 'Do MMMM, YYYY')}</strong>.
          </p>
        </>
      )}
    </div>
  );
};

NextPayment.propTypes = {
  classes: PropTypes.shape({
    nextPaymentBox: PropTypes.string,
  }),
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  paymentPlan: PropTypes.object.isRequired,
  paymentStatus: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

NextPayment.defaultProps = {
  classes: {},
};

export default withUI(withStyles(styles)(NextPayment));
