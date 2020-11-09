import multiply from './multiply';

describe('multiply', () => {
  it('should return an array of items with a length equal to the factor passed', () => {
    expect(multiply('Hello', 3)).toEqual(['Hello', 'Hello', 'Hello']);
  });
});
