/* eslint-disable react/jsx-child-element-spacing */
import { Button, Message, withUI } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../lib/formatting';
import styles from './MakePaymentSettleUp.styles';
import withStyles from 'react-jss';

const MakePaymentSettleUp = ({
  classes,
  currencyExponent,
  currencySymbol,
  handleSettleUpClick,
  handleUndoClick,
  remainingBalance,
  useRemainingBalance,
}) => (
  <div className={classes.settleUpBox}>
    <h2>Want to settle up?</h2>
    {remainingBalance === 0 ? (
      <>
        <p>Your balance is already fully paid!</p>
      </>
    ) : (
      <>
        <p>
          Complete payment on your remaining balance of{' '}
          <strong>
            {formatPrice(currencySymbol, remainingBalance, currencyExponent)}
          </strong>
          {''}.
        </p>
        {useRemainingBalance ? (
          <Message type="success" icon="iconBookings">
            <Message.Content>
              Your remaining balance has been pre-filled on the payment form.
            </Message.Content>
            <Message.Actions>
              <Button onClick={handleUndoClick}>Undo</Button>
            </Message.Actions>
          </Message>
        ) : (
          <Button
            type="button"
            variant="success"
            disabled={useRemainingBalance}
            onClick={handleSettleUpClick}>
            Pay remaining balance
          </Button>
        )}
      </>
    )}
  </div>
);

MakePaymentSettleUp.propTypes = {
  classes: PropTypes.shape({
    settleUpBox: PropTypes.string,
  }),
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  handleSettleUpClick: PropTypes.func.isRequired,
  handleUndoClick: PropTypes.func.isRequired,
  remainingBalance: PropTypes.number.isRequired,
  useRemainingBalance: PropTypes.bool,
};

MakePaymentSettleUp.defaultProps = {
  classes: {},
  useRemainingBalance: false,
};

export default withUI(withStyles(styles)(MakePaymentSettleUp));
