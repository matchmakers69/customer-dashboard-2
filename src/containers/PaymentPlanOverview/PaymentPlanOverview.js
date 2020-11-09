import {
  getBookingPaymentPlan,
  getBookingPayments,
  getBookingTotal,
} from '../../selectors/booking';

import OutstandingBalance from '../../components/OutstandingBalance';
import PaymentPlanKeyValues from '../../components/PaymentPlanKeyValues';
import PieChart from '../../components/PieChart';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './PaymentPlanOverview.styles';
import withStyles from 'react-jss';

const PaymentPlanOverview = ({
  classes,
  payments,
  paymentPlan,
  totalAmount,
}) => (
  <div className={classes.boxOverview}>
    <PieChart data={payments} remainingBalance={paymentPlan.amount} />
    <OutstandingBalance
      totalAmount={totalAmount.value}
      remainingBalance={paymentPlan.amount}
    />
    <PaymentPlanKeyValues paymentPlan={paymentPlan} />
  </div>
);

PaymentPlanOverview.propTypes = {
  classes: PropTypes.shape({
    boxOverview: PropTypes.string.isRequired,
  }).isRequired,
  paymentPlan: PropTypes.shape({
    remainingPayments: PropTypes.number.isRequired,
    nextPaymentDate: PropTypes.instanceOf(Date).isRequired,
    finalPaymentDate: PropTypes.instanceOf(Date).isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      paid: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      amount: PropTypes.string.isRequired,
    }),
  ).isRequired,
  totalAmount: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { bookingReference } = ownProps;
  return {
    payments: getBookingPayments(state, bookingReference),
    paymentPlan: getBookingPaymentPlan(state, bookingReference),
    totalAmount: getBookingTotal(state, bookingReference),
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(PaymentPlanOverview);
