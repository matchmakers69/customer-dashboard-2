import PaymentPlanOverview from './PaymentPlanOverview';
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
    bookingReference: 'TF3180371',
    ...propsOverride,
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  const wrapper = mountWithConfig(
    <Provider store={store}>
      <PaymentPlanOverview {...props} />
    </Provider>,
  );

  return {
    wrapper,
    PieChart: wrapper.find('PieChart'),
    outstandingBalance: wrapper.find('OutstandingBalance'),
    paymentPlanKeyValues: wrapper.find('PaymentPlanKeyValues'),
  };
};

describe('PaymentPlanOverview', () => {
  it('should successfully render the three overview components', () => {
    const { PieChart, outstandingBalance, paymentPlanKeyValues } = setup();

    expect(PieChart.exists()).toBe(true);
    expect(outstandingBalance.exists()).toBe(true);
    expect(paymentPlanKeyValues.exists()).toBe(true);
  });
});
