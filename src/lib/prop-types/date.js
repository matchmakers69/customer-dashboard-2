import PropTypes from 'prop-types';

export const DateType = PropTypes.shape({
  iso_value: PropTypes.string.isRequired,
  isotz_value: PropTypes.string,
});
