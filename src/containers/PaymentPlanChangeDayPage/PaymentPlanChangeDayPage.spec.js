import { goToRoute, withParams } from '../../lib/router';

import PaymentPlanChangeDayPage from './PaymentPlanChangeDayPage';
import { Provider } from 'react-redux';
import React from 'react';
import { bookingOperations } from '../../store/booking';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import mockStripe from '../../testing/helpers/mockStripe';
import { mountWithConfig } from '../../testing/mountWithConfig';
import { paymentOperations } from '../../store/payments';
import state from './__fixtures__/state';

const setup = (storeOverride, propsOverride) => {
  const initialState = {
    ...state,
    ...storeOverride,
    countries: [],
  };

  const props = {
    loadBooking: null,
    getCountries: null,
    apiKey: 'pk_test_12345',
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
      <PaymentPlanChangeDayPage {...props} />
    </Provider>,
  );

  return {
    wrapper,
    pageTitle: wrapper.find('.pageTitle'),
    backButton: wrapper.find('BackButton Button'),
    contentHero: wrapper.find('ContentHero'),
  };
};

describe('PaymentPlanChangeDayPage', () => {
  beforeEach(() => {
    mockStripe();
  });

  it.only('it should successfully render the page title', () => {
    const { pageTitle } = setup();
    expect(pageTitle.text()).toEqual('Change Payment Day');
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
      paymentOperations.getPaymentPlanProjection({
        bookingReference: 'TF3180371',
      }),
      goToRoute(
        withParams(constants.BOOKING_PAYMENT_PLAN_VIEW_URL, {
          booking_reference: 'TF3180371',
        }),
      ),
    ]);
  });

  it("it shouldn't render the header details if the booking is not loaded", () => {
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
