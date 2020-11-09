import formatPrice from './formatPrice';

describe('formatPrice', () => {
  it('should format prices when a symbol, value and exponant is passed', () => {
    const exp = 2;
    const value = 19.99;
    const symbol = '£';

    const output = '£19.99';

    expect(formatPrice(symbol, value, exp)).toEqual(output);
  });

  it('should format negative values with negation before currency symbol.', () => {
    const exp = 2;
    const value = -19.99;
    const symbol = '£';

    const output = '-£19.99';

    expect(formatPrice(symbol, value, exp)).toEqual(output);
  });
});
