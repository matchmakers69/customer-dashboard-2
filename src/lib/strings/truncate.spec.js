import truncate from './truncate';

describe('truncate', () => {
  const string =
    'Bacon ipsum dolor amet frankfurter beef tri-tip, turkey sausage buffalo salami. Short landjaeger strip steak';

  it('Truncates strings to a maximum length of 80 by default', () =>
    expect(truncate(string)).toEqual(
      'Bacon ipsum dolor amet frankfurter beef tri-tip, turkey sausage buffalo salami. ...',
    ));

  it('Truncates strings to specified length', () =>
    expect(truncate(string, 10)).toEqual('Bacon ipsu...'));

  it('Does not truncate when string length is inside maximum length', () =>
    expect(truncate('Bacon ipsum', 50)).toEqual('Bacon ipsum'));
});
