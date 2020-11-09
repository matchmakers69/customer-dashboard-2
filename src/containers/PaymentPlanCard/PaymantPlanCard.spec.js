import PaymentPlanCard from './PaymentPlanCard';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';
import state from './__fixtures__/state';

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
      <PaymentPlanCard {...props} />
    </Provider>,
  );

  return {
    wrapper,
    cardholderName: wrapper.find('[data-test="cardholderName"]'),
    cardNumber: wrapper.find('[data-test="cardholderNumber"]'),
    goToChangePaymentButton: wrapper.find('.changePaymentButton Button'),
  };
};

describe('PaymentPlanCard', () => {
  it('it should successfully render the name and number of the payment card', () => {
    const { cardholderName, cardNumber } = setup();

    expect(cardholderName.text()).toBe('Mick Hucknall');
    expect(cardNumber.text()).toBe('**** **** **** 6969');
  });

  it('fire a router action to navigate to the change payment page', () => {
    const { wrapper, goToChangePaymentButton } = setup();

    goToChangePaymentButton.simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([
      {
        payload: {
          args: ['/booking/TF3180371/payment-plan/change-payment'],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ]);
  });
});
