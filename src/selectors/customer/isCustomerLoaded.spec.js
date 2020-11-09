import isCustomerLoaded from './isCustomerLoaded';

describe('isCustomerLoaded', () => {
  it('it should return whether the customer is loaded or not', () => {
    const state = {
      customer: {
        loaded: true,
      },
    };

    expect(isCustomerLoaded(state)).toEqual(true);
  });
});
