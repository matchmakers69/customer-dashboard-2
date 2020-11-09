/* eslint-disable max-lines, max-lines-per-function */
import * as Yup from 'yup';

import {
  Button,
  Form,
  Message,
  withUI,
} from '@kaboodle-solutions/design-system';
import React, { useEffect } from 'react';
import AddressManagement from '../AddressManagement';
import InputField from '../InputField';
import PropTypes from 'prop-types';
import StripeCardForm from '../StripeCardForm';
import { compose } from 'redux';
import { injectStripe } from 'react-stripe-elements';
import styles from './MakePaymentForm.styles';
import { withFormik } from 'formik';
import withStyles from 'react-jss';

const MakePaymentForm = ({
  bookingId,
  bookingPax,
  cardholderName,
  classes,
  clientSecret,
  countries,
  currencySymbol,
  dirty,
  errors,
  expiryDate,
  handleBlur,
  handleChange,
  handleError,
  handleSubmit,
  isValid,
  last4,
  onRequest,
  paymentSuccess,
  paymentUpdating,
  remainingBalance,
  sendMessage,
  setValues,
  stripe,
  values,
}) => {
  const handleAddressChange = (field, value) =>
    setValues({
      ...values,
      cardholderAddress: {
        ...values.cardholderAddress,
        [field]: value,
      },
    });

  const handleAmountBlur = () =>
    setValues({
      ...values,
      paymentAmount: Number(values.paymentAmount).toFixed(2),
    });

  const handleAmountChange = () =>
    setValues({
      ...values,
      paymentAmount: event.target.value,
    });

  const handleCardUpdate = complete =>
    setValues({ ...values, canComplete: complete });

  if (clientSecret) {
    stripe.handleCardAction(clientSecret).then(data => {
      if (data.error) {
        handleError(data.error);
        sendMessage({
          displayType: 'toast',
          message: data.error.message,
          type: 'danger',
        });
      } else {
        onRequest({
          bookingId,
          bookingPax: bookingPax[0].id,
          card_number: last4,
          cardholder_name: cardholderName,
          city: values.cardholderAddress.city,
          clientSecret,
          country: values.cardholderAddress.country.code,
          expiry_date: expiryDate,
          line1: values.cardholderAddress.address_1,
          line2: values.cardholderAddress.address_2,
          payment_amount: values.paymentAmount * 100,
          payment_intent: data.paymentIntent.id,
          payment_method: data.paymentIntent.payment_method,
          postal_code: values.cardholderAddress.postcode,
        });
      }
    });
  }

  useEffect(() => {
    // this will be called if the user interacts with MakePaymentSettleUp
    if (remainingBalance) {
      setValues({
        ...values,
        paymentAmount: remainingBalance.toFixed(2).toString(),
      });
    } else {
      setValues({ ...values, paymentAmount: '' });
    }
  }, [remainingBalance]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.form}>
        <h2 className={classes.formHeading}>Make a new payment</h2>
        <Form.Fieldset>
          <Form.Legend>Personal Details</Form.Legend>
          <InputField
            id="cardholderName"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Full Name"
            value={values.cardholderName}
            required
            errors={errors.cardholderName ? [errors.cardholderName] : []}
          />
        </Form.Fieldset>
        <StripeCardForm onUpdate={handleCardUpdate} />
        <AddressManagement
          address={values.cardholderAddress}
          countries={countries}
          onChange={handleAddressChange}
        />
        <Form.Fieldset>
          <Form.Legend>Payment Details</Form.Legend>
          <div className={classes.paymentAmountField}>
            <span className={classes.paymentPrefix}>{currencySymbol}</span>
            <InputField
              id="paymentAmount"
              type="number"
              onChange={handleAmountChange}
              onBlur={handleAmountBlur}
              label="Payment amount"
              value={values.paymentAmount}
              required
              errors={errors.paymentAmount ? [errors.paymentAmount] : []}
            />
          </div>
        </Form.Fieldset>
      </div>
      <div className={classes.actions}>
        {paymentSuccess ? (
          <Message type="success" icon="iconThumbsUp">
            <Message.Content>Your payment was successful!</Message.Content>
          </Message>
        ) : (
          <Button
            variant="success"
            type="submit"
            size="medium"
            disabled={!isValid || !dirty || paymentUpdating}
            loading={paymentUpdating}>
            Make Payment
          </Button>
        )}
      </div>
    </Form>
  );
};

MakePaymentForm.propTypes = {
  bookingId: PropTypes.string,
  bookingPax: PropTypes.array,
  cardholderName: PropTypes.string,
  classes: PropTypes.object.isRequired,
  clientSecret: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    canComplete: PropTypes.string,
    cardholderAddress: PropTypes.shape({
      address_1: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.shape({
        code: PropTypes.string,
        label: PropTypes.string,
      }),
      postcode: PropTypes.string,
    }),
    cardholderName: PropTypes.string,
    paymentAmount: PropTypes.string,
  }),
  expiryDate: PropTypes.object,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  last4: PropTypes.string,
  onRequest: PropTypes.func.isRequired,
  paymentSuccess: PropTypes.bool,
  paymentUpdating: PropTypes.bool,
  remainingBalance: PropTypes.number,
  sendMessage: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  stripe: PropTypes.object.isRequired,
  values: PropTypes.shape({
    canComplete: PropTypes.bool.isRequired,
    cardholderAddress: PropTypes.shape({
      address_1: PropTypes.string.isRequired,
      address_2: PropTypes.string,
      address_3: PropTypes.string,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      postcode: PropTypes.string.isRequired,
      country: PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
        label: PropTypes.string,
      }).isRequired,
    }).isRequired,
    cardholderName: PropTypes.string.isRequired,
    paymentAmount: PropTypes.string.isRequired,
  }).isRequired,
};

MakePaymentForm.defaultProps = {
  bookingId: null,
  bookingPax: [],
  cardholderName: null,
  clientSecret: null,
  errors: {},
  expiryDate: null,
  isValid: false,
  last4: null,
  paymentSuccess: false,
  paymentUpdating: false,
  remainingBalance: null,
};

export default compose(
  injectStripe,
  withUI,
  withFormik({
    mapPropsToValues: () => ({
      canComplete: false,
      cardholderName: '',
      cardholderAddress: {
        address_1: '',
        address_2: '',
        address_3: '',
        city: '',
        county: '',
        postcode: '',
        country: { label: '', value: -1, code: '' },
      },
      paymentAmount: '',
    }),
    validationSchema: props =>
      Yup.object().shape({
        canComplete: Yup.bool()
          .required()
          .oneOf([true]),
        cardholderName: Yup.string().required('Required'),
        cardholderAddress: Yup.object().shape({
          address_1: Yup.string().required(),
          city: Yup.string().required(),
          postcode: Yup.string().required(),
          country: Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.number().required(),
            code: Yup.string().required(),
          }),
        }),
        paymentAmount: Yup.number()
          .min(0, 'Amount must be more than zero.')
          .max(
            props.maxAmount,
            'Amount cannot be more than your outstanding balance.',
          )
          .positive('Cannot be a negative number.')
          .required(),
      }),
    handleSubmit: (values, { props }) => {
      if (props.paymentUpdating) {
        return;
      }

      const cardElement = props.elements.getElement('card');

      const {
        address_1,
        address_2,
        city,
        county,
        country,
        postcode,
      } = values.cardholderAddress;

      props.stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            address: {
              city,
              country: country.code,
              line1: address_1,
              line2: address_2,
              postal_code: postcode,
              state: county,
            },
            name: values.cardholderName,
          },
        })
        .then(({ paymentMethod }) =>
          props.onRequest({
            bookingId: props.bookingId,
            bookingPax: props.bookingPax[0].id,
            card_number: paymentMethod.card.last4,
            card_type: paymentMethod.type,
            cardholder_name: paymentMethod.billing_details.name,
            expiry_date: {
              exp_month: paymentMethod.card.exp_month,
              exp_year: paymentMethod.card.exp_year,
            },
            payment_amount: values.paymentAmount * 100,
            payment_method: paymentMethod.id,
            ...paymentMethod.billing_details.address,
          }),
        );
    },
    displayName: 'MakePaymentForm',
  }),
  withStyles(styles),
)(MakePaymentForm);
