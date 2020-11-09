import PropTypes from 'prop-types';

export const CurrencyType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  iso_code: PropTypes.string.isRequired,
  exponent: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
});
