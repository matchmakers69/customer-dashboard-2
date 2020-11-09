import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../lib/formatting';
import styles from './OutstandingBalance.styles';
import withStyles from 'react-jss';
import { withUI } from '@kaboodle-solutions/design-system';

const OutstandingBalance = ({
  currencySymbol,
  currencyExponent,
  classes,
  totalAmount,
  remainingBalance,
}) => (
  <div className={classes.outstandingBalance}>
    <span className={classes.outstandingBalanceTitle}>Outstanding Balance</span>
    <span className={classes.outstandingBalanceResult}>
      <span className={classes.remainingBalance}>
        {formatPrice(currencySymbol, remainingBalance, currencyExponent)}
      </span>{' '}
      /{' '}
      <span className={classes.totalAmount}>
        {formatPrice(currencySymbol, totalAmount, currencyExponent)}
      </span>
    </span>
  </div>
);

OutstandingBalance.propTypes = {
  classes: PropTypes.shape({
    outstandingBalance: PropTypes.string.isRequired,
    outstandingBalanceTitle: PropTypes.string.isRequired,
    outstandingBalanceResult: PropTypes.string.isRequired,
    remainingBalance: PropTypes.string.isRequired,
    totalAmount: PropTypes.string.isRequired,
  }).isRequired,
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  remainingBalance: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default withUI(withStyles(styles)(OutstandingBalance));
