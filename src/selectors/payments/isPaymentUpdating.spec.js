import isPaymentUpdating from './isPaymentUpdating';

describe('isPaymentUpdating', () => {
  it('it should return the update status of the state', () => {
    const state = {
      payments: {
        updating: true,
      },
    };

    expect(isPaymentUpdating(state)).toEqual(true);
  });
});
