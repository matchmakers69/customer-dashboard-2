import { goToRoute, withParams } from '../../lib/router';

import MakePaymentPage from './MakePaymentPage';
import { Provider } from 'react-redux';
import React from 'react';
import { bookingOperations } from '../../store/booking';
import { clientOperations } from '../../store/client';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import mockStripe from '../../testing/helpers/mockStripe';
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
    deadline: '2020-03-31 23:59:59',
    totalAmount: 443,
    paidAmount: 200,
    apiKey: 'pk_test_12345',
    goTo: jest.fn(),
    sendMessage: jest.fn(),
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
      <MakePaymentPage {...props} />
    </Provider>,
  );

  return {
    wrapper,
    pageTitle: wrapper.find('.pageTitle'),
    backButton: wrapper.find('BackButton Button'),
    contentHero: wrapper.find('ContentHero'),
  };
};

describe('MakePaymentPage', () => {
  beforeEach(() => {
    mockStripe();
  });

  it('it should successfully render the page title', () => {
    const { pageTitle } = setup();
    expect(pageTitle.text()).toEqual('Your Outstanding Balance');
  });

  it('should fire redirect action when return button is clicked', () => {
    const { wrapper } = setup();

    wrapper.find('BackButton Button').simulate('click');

    expect(
      wrapper
        .find('Provider')
        .first()
        .prop('store')
        .getActions(),
    ).toEqual([
      bookingOperations.getBooking('TF3180371'),
      clientOperations.getCountries(),
      goToRoute(
        withParams(constants.BOOKING_URL, {
          booking_reference: 'TF3180371',
        }),
      ),
    ]);
  });

  it("shouldn't render the header details if the booking is not loaded", () => {
    const { contentHero } = setup(
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
    expect(contentHero.exists()).toBe(true);
    expect(contentHero.find('.ContentHero__title').text()).toEqual('Loading');
  });
});
