import * as Yup from 'yup';

import { Button, Form } from '@kaboodle-solutions/design-system';

import AddressManagement from '../AddressManagement';
import InputField from '../InputField';
import PropTypes from 'prop-types';
import React from 'react';
import StripeCardForm from '../StripeCardForm';
import { compose } from 'redux';
import { injectStripe } from 'react-stripe-elements';
import styles from './ChangeCardDetailsForm.styles';
import { withFormik } from 'formik';
import withStyles from 'react-jss';

const ChangeCardDetailsForm = ({
  classes,
  errors,
  dirty,
  handleChange,
  handleBlur,
  handleSubmit,
  countries,
  isValid,
  values,
  setValues,
  updating,
  clientSecret,
  stripe,
  onRequest,
  bookingReference,
  cardholderName,
  last4,
  handleError,
  sendMessage,
}) => {
  const handleAddressChange = (field, value) => {
    setValues({
      ...values,
      cardholderAddress: {
        ...values.cardholderAddress,
        [field]: value,
      },
    });
  };

  if (clientSecret) {
    stripe.confirmCardSetup(clientSecret).then(data => {
      if (data.error) {
        handleError(data.error);
        sendMessage({
          type: 'danger',
          displayType: 'toast',
          message: data.error.message,
        });
      } else {
        onRequest({
          intent_id: data.setupIntent.id,
          card_number: last4,
          cardholder_name: cardholderName,
          bookingReference,
          clientSecret,
        });
      }
    });
  }

  const handleCardUpdate = complete => {
    setValues({ ...values, canComplete: complete });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.form}>
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
      </div>
      <div className={classes.actions}>
        <Button
          variant="success"
          type="submit"
          size="medium"
          disabled={!isValid || !dirty || updating}
          loading={updating}>
          Update Card Details
        </Button>
      </div>
    </Form>
  );
};

ChangeCardDetailsForm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  bookingReference: PropTypes.string,
  cardholderName: PropTypes.string,
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
  }).isRequired,
  clientSecret: PropTypes.string,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  dirty: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    cardholderName: PropTypes.string,
  }).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  last4: PropTypes.string,
  onRequest: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  stripe: PropTypes.object,
  updating: PropTypes.bool.isRequired,
  values: PropTypes.shape({
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
  }).isRequired,
};

ChangeCardDetailsForm.defaultProps = {
  bookingReference: null,
  cardholderName: null,
  clientSecret: null,
  countries: [],
  last4: null,
  stripe: {},
};

export default compose(
  injectStripe,
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
    }),
    validationSchema: () =>
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
              state: county,
              postal_code: postcode,
            },
            name: values.cardholderName,
          },
        })
        .then(({ paymentMethod }) =>
          props.onRequest({
            id: paymentMethod.id,
            card_number: paymentMethod.card.last4,
            cardholder_name: paymentMethod.billing_details.name,
            bookingReference: props.bookingReference,
          }),
        );
    },
    displayName: 'ChangeCardDetailsForm',
  }),

  withStyles(styles),
)(ChangeCardDetailsForm);
