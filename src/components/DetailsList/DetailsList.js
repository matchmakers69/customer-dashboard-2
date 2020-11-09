import PropTypes from 'prop-types';
import React from 'react';

const DetailsList = ({ children }) => (
  <div className="DetailsList">{children}</div>
);

DetailsList.propTypes = {
  children: PropTypes.any,
};

DetailsList.defaultProps = {
  children: null,
};

export default DetailsList;
