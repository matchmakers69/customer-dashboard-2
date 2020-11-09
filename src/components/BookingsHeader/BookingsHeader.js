import Hello from '../Hello';
import PropTypes from 'prop-types';
import React from 'react';

const BookingsHeader = ({ customerName }) => <Hello name={customerName} />;

BookingsHeader.propTypes = {
  customerName: PropTypes.string,
};

BookingsHeader.defaultProps = {
  customerName: null,
};

export default BookingsHeader;
