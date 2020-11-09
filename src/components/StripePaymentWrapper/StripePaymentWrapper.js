import { Elements, StripeProvider } from 'react-stripe-elements';
import PropTypes from 'prop-types';

import React from 'react';

const StripePaymentWrapper = ({ apiKey, children }) => (
  <StripeProvider apiKey={apiKey}>
    <Elements>{children}</Elements>
  </StripeProvider>
);

StripePaymentWrapper.propTypes = {
  apiKey: PropTypes.string.isRequired,
  children: PropTypes.any,
};

StripePaymentWrapper.defaultProps = {
  children: null,
};

export default StripePaymentWrapper;
