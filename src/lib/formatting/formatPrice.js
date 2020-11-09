const formatPrice = (currencySymbol, value, currencyExponent) =>
  (value < 0 ? '-' : '') +
  currencySymbol +
  parseFloat(Math.abs(value)).toFixed(currencyExponent);

export default formatPrice;
