import PaymentPlanPage from './PaymentPlanPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';
import state from './__fixtures__/state';

jest.mock('../../components/PieChart/PieChart.js', () => {
  const PieChart = () => <div />;
  return PieChart;
});

const setup = (storeOverride, propsOverride) => {
  const initialState = {
    ...state,
    ...storeOverride,
  };

  const props = {
    match: {
      params: {
        booking_reference: 'TF3180371',
      },
    },
    ...propsOverride,
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  const wrapper = mountWithConfig(
    <Provider store={store}>
      <PaymentPlanPage {...props} />
    </Provider>,
  );

  return {
    wrapper,
    paymentPlanDetails: wrapper.find('.paymentPlanDetails'),
    paymentHistory: wrapper.find('.paymentHistory'),
    paymentPlanSidebar: wrapper.find('PaymentPlanSidebar'),
  };
};

describe('PaymentPlanPage', () => {
  it('it should successfully render each part of the page', () => {
    const { paymentPlanDetails, paymentHistory, paymentPlanSidebar } = setup();
    expect(paymentPlanDetails.exists()).toBe(true);
    expect(paymentHistory.exists()).toBe(true);
    expect(paymentPlanSidebar.exists()).toBe(true);
  });

  it("it shouldn't render details of a payment plan that is not currently loaded", () => {
    const { paymentPlanDetails, paymentHistory, paymentPlanSidebar } = setup(
      {
        booking: {},
      },
      {
        match: {
          params: {
            booking_reference: 'NOTABOOKING',
          },
        },
      },
    );

    expect(paymentPlanDetails.exists()).toBe(false);
    expect(paymentHistory.exists()).toBe(false);
    expect(paymentPlanSidebar.exists()).toBe(true);
  });
});
