import {
  PAYMENT_PLAN_GET_PROJECTION,
  PAYMENT_PLAN_GET_PROJECTION_FAILED,
  PAYMENT_PLAN_GET_PROJECTION_SUCCESS,
  PAYMENT_PLAN_UPDATED,
  PAYMENT_PLAN_UPDATE_FAILED,
  PAYMENT_PLAN_UPDATE_REQUIRES_ACTION,
  PAYMENT_PLAN_UPDATING,
} from './types';
import {
  getPaymentPlanProjection,
  getPaymentPlanProjectionFailed,
  getPaymentPlanProjectionSuccess,
  updatePaymentPlanFailed,
  updatePaymentPlanRequiresAction,
  updatedPaymentPlan,
  updatingPaymentPlan,
} from './actions';

import reducer from './reducers';

describe('customer', () => {
  it("Returns initial state when a matching actions isn't passed through", () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      updating: false,
    });
  });

  it(`Sets updating state to FALSE when ${PAYMENT_PLAN_UPDATING} is dispatched`, () => {
    expect(reducer({ updating: false }, updatingPaymentPlan())).toEqual({
      updating: true,
    });
  });

  it(`Sets updating state to FALSE when ${PAYMENT_PLAN_UPDATED} is dispatched`, () => {
    expect(reducer({ updating: true }, updatedPaymentPlan())).toEqual({
      updating: false,
      paymentIntentClientSecret: null,
    });
  });

  it(`Sets updating state to FALSE when ${PAYMENT_PLAN_UPDATE_FAILED} is dispatched`, () => {
    expect(reducer({ updating: true }, updatePaymentPlanFailed())).toEqual({
      updating: false,
      paymentIntentClientSecret: null,
    });
  });

  it(`Sets updating state to FALSE when ${PAYMENT_PLAN_UPDATE_REQUIRES_ACTION} is dispatched`, () => {
    expect(
      reducer({ updating: true }, updatePaymentPlanRequiresAction()),
    ).toEqual({
      updating: true,
      paymentIntentClientSecret: undefined,
      card_number: undefined,
      cardholder_name: undefined,
    });
  });

  it(`Sets loaded state to FALSE when ${PAYMENT_PLAN_GET_PROJECTION} is dispatched`, () => {
    expect(reducer({ loaded: false }, getPaymentPlanProjection())).toEqual({
      loaded: false,
    });
  });

  it(`Sets loaded state to TRUE when ${PAYMENT_PLAN_GET_PROJECTION_SUCCESS} is dispatched`, () => {
    const projection = {
      projection: [
        {
          date: {
            iso_value: '2020-03-29 00:00:00',
            isotz_value: '2020-03-29T00:00:00+00:00',
          },
          price: {
            value: 2105,
            currency: {
              code: 'GBP',
              symbol: '£',
              exponent: 2,
            },
          },
        },
      ],
    };
    expect(
      reducer(
        { loaded: false },
        getPaymentPlanProjectionSuccess({ projection }),
      ),
    ).toEqual({
      loaded: true,
      projection,
    });
  });

  it(`Sets loaded state to TRUE when ${PAYMENT_PLAN_GET_PROJECTION_FAILED} is dispatched`, () => {
    const error = 'This is a fake error.';

    expect(
      reducer({ loaded: false }, getPaymentPlanProjectionFailed({ error })),
    ).toEqual({
      loaded: false,
      error,
    });
  });
});
