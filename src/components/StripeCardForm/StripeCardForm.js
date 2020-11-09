import React, { useState } from 'react';
import { CardElement } from 'react-stripe-elements';
import { Form } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import styles from './StripeCardForm.styles';
import withStyles from 'react-jss';

const createOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#245367',
      fontFamily: 'Lato, sans-serif',
      '::placeholder': {
        color: '#578CA2',
      },
    },
    invalid: {
      color: '#c23d4b',
    },
  },
};

const StripeCardForm = ({ classes, onUpdate }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [complete, setComplete] = useState(false);

  const handleChange = event => {
    if (event.complete) {
      setComplete(!complete);
      setErrorMessage('');
      onUpdate(true);
    } else if (event.error) {
      setComplete(false);
      setErrorMessage(event.error.message);
      onUpdate(false);
    } else {
      setComplete(false);
      onUpdate(false);
    }
  };

  return (
    <Form.Fieldset>
      <Form.Legend>Card Details</Form.Legend>
      <CardElement
        className={classes.cardElement}
        id="stripeCardElement"
        onChange={handleChange}
        hidePostalCode
        {...createOptions}
      />
      {errorMessage && <span className={classes.error}>{errorMessage}</span>}
    </Form.Fieldset>
  );
};

StripeCardForm.propTypes = {
  classes: PropTypes.shape({
    cardElement: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default withStyles(styles)(StripeCardForm);
