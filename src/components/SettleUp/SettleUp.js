import { Button, withUI } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../lib/formatting';
import styles from './SettleUp.styles';
import withStyles from 'react-jss';

const SettleUp = ({
  classes,
  currencyExponent,
  currencySymbol,
  paymentPlan,
  paymentStatus,
}) => (
  <div className={classes.settleUpBox}>
    <h2>Settle Up?</h2>
    {paymentStatus.value === 'Fully Paid' ? (
      <>
        <p>Your payment plan has been fully paid.</p>
      </>
    ) : (
      <>
        <p>
          Complete your payment plan early by paying the remaining{' '}
          <strong>
            {formatPrice(currencySymbol, paymentPlan.amount, currencyExponent)}
          </strong>
          {''}.
        </p>
        <Button type="button" variant="success" disabled>
          Coming Soon
        </Button>
      </>
    )}
  </div>
);

SettleUp.propTypes = {
  classes: PropTypes.shape({
    settleUpBox: PropTypes.string,
  }),
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  paymentPlan: PropTypes.object.isRequired,
  paymentStatus: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

SettleUp.defaultProps = {
  classes: {},
};

export default withUI(withStyles(styles)(SettleUp));
