import PropTypes from 'prop-types';
import React from 'react';

const BookingSidebar = ({ children }) => (
  <div className="BookingSidebar">{children}</div>
);
BookingSidebar.propTypes = {
  children: PropTypes.any,
};

BookingSidebar.defaultProps = {
  children: null,
};

export default BookingSidebar;
