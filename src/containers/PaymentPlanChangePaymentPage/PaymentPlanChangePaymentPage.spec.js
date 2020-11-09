import { goToRoute, withParams } from '../../lib/router';

import PaymentPlanChangePaymentPage from './PaymentPlanChangePaymentPage';
import { Provider } from 'react-redux';
import React from 'react';
import { bookingOperations } from '../../store/booking';
import { clientOperations } from '../../store/client';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import mockStripe from '../../testing/helpers/mockStripe';
import { mountWithConfig } from '../../testing/mountWithConfig';
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
      <PaymentPlanChangePaymentPage {...props} />
    </Provider>,
  );

  return {
    wrapper,
    pageTitle: wrapper.find('.pageTitle'),
    backButton: wrapper.find('BackButton Button'),
    contentHero: wrapper.find('ContentHero'),
    changeCardDetailsForm: wrapper.find('ChangeCardDetailsForm'),
  };
};

describe('PaymentPlanChangePaymentPage', () => {
  beforeEach(() => {
    mockStripe();
  });

  it('it should successfully render the page title', () => {
    const { pageTitle } = setup();
    expect(pageTitle.text()).toEqual('Change Payment Details');
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

  it('it should successfully render the correct form', () => {
    const { changeCardDetailsForm } = setup();
    expect(changeCardDetailsForm.exists()).toBe(true);
  });
});
