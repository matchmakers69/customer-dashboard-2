import { Table, withUI } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { getBookingPayments } from '../../selectors/booking';
import styles from './PaymentHistory.styles';
import withStyles from 'react-jss';

const getColumns = currencySymbol => [
  {
    name: 'Date',
    path: 'date',
    render: date => format(date, 'DD/MM/YYYY'),
  },
  {
    name: 'Amount',
    path: 'amount',
    render: amount => currencySymbol + amount,
  },
  {
    name: 'Payment Method',
    path: 'paymentMethod',
    render: paymentMethod => `**** **** **** ${paymentMethod}`,
  },
  {
    name: 'Status',
    path: 'status',
  },
];

const PaymentHistory = ({ classes, payments, currencySymbol }) => {
  const rows = payments.reverse();
  const columns = getColumns(currencySymbol);
  return (
    <div className={classes.history}>
      <h2>Payment History</h2>
      <div className={classes.boxTable}>
        <Table columns={columns} rows={rows} />
      </div>
    </div>
  );
};

PaymentHistory.propTypes = {
  classes: PropTypes.shape({
    history: PropTypes.string.isRequired,
    boxTable: PropTypes.string.isRequired,
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      paymentMethod: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ),
};

PaymentHistory.defaultProps = {
  payments: [],
};

const mapStateToProps = (state, ownProps) => {
  const { bookingReference } = ownProps;
  return {
    payments: getBookingPayments(state, bookingReference),
  };
};

const mapDispatchToProps = {};

export default compose(
  withUI,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PaymentHistory);
