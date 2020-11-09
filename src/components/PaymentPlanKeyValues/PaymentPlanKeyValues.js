import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import styles from './PaymentPlanKeyValues.styles';
import withStyles from 'react-jss';

const PaymentPlanKeyValues = ({ paymentPlan, classes }) => {
  const getKeyValues = paymentPlanObj => [
    {
      key: 'Months Remaining',
      value: paymentPlanObj.remainingPayments,
    },
    {
      key: 'Next Payment',
      value: format(paymentPlanObj.nextPaymentDate, 'DD/MM/YYYY'),
    },
    {
      key: 'Final Payment',
      value: format(paymentPlanObj.finalPaymentDate, 'DD/MM/YYYY'),
    },
  ];

  return (
    <div className={classes.keyInformation}>
      {getKeyValues(paymentPlan).map(({ key, value }) => (
        <div key={key} className={classes.keyValue}>
          <span className={classes.keyValueTitle}>{key}</span>
          <span className={classes.keyValueResult}>{value}</span>
        </div>
      ))}
    </div>
  );
};

PaymentPlanKeyValues.propTypes = {
  classes: PropTypes.shape({
    keyInformation: PropTypes.string.isRequired,
    keyValue: PropTypes.string.isRequired,
    keyValueTitle: PropTypes.string.isRequired,
    keyValueResult: PropTypes.string.isRequired,
  }).isRequired,
  paymentPlan: PropTypes.shape({
    remainingPayments: PropTypes.number.isRequired,
    nextPaymentDate: PropTypes.instanceOf(Date).isRequired,
    finalPaymentDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default withStyles(styles)(PaymentPlanKeyValues);
