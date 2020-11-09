import BookingPage from './BookingPage';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';
import reduxState from './__fixtures__/state';

describe('BookingPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();
    initialState = reduxState;
  });

  it("should render WrapLoader around ContentHero when booking isn't loaded", () => {
    initialState = {
      booking: {},
      customer: {
        loaded: true,
        personal_details: {
          first_name: 'Joe',
          last_name: 'Bloggs',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123556',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('.BookingPage__header .WrapLoader').exists()).toEqual(
      true,
    );
  });

  it("should render WrapLoader around BookingDetails when booking isn't loaded", () => {
    initialState = {
      booking: {},
      customer: {
        loaded: true,
        personal_details: {
          first_name: 'Joe',
          last_name: 'Bloggs',
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123556',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('.BookingPage__content .WrapLoader').exists()).toEqual(
      true,
    );
  });

  it("should render WrapLoader around BookingSidebar when booking isn't loaded", () => {
    initialState = {
      booking: {},
      customer: {
        loaded: true,
        personal_details: {
          first_name: 'Joe',
          last_name: 'Bloggs',
        },
      },
    };
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123556',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('.BookingPage__sidebar .WrapLoader').exists()).toEqual(
      true,
    );
  });

  it('should render tracking when delivery tracking ID is present.', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('SidebarTracking').exists()).toEqual(true);
  });

  it('should render address when address is present.', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('SidebarAddress').exists()).toEqual(true);
  });

  it('should render ticket resale when available on the booking', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('SidebarResale').exists()).toEqual(true);
  });
  it('should render the payment plan message when a payment plan is available', () => {
    initialState = {
      ...initialState,
      booking: {
        ...initialState.booking,
        GP123456: {
          ...initialState.booking.GP123456,
          payment_plan: {
            id: 591937,
            amount: '116.20',
            surcharge: '0.00',
            total_surcharge_amount: '3.00',
            number_of_payments: 2,
            name: 'Monthly',
            next_payment_date: '2019-12-30',
            final_payment_date: '2020-01-30',
            final_payment_adjustment_required: false,
            card: {
              last_four_digits: '',
              cardholder_name: 'Bazza',
            },
            type: {
              type: 'M',
              description: 'monthly',
            },
            status: 'Error',
            projection: [
              {
                iso_value: '2019-12-30',
                amount: '61.10',
              },
              {
                iso_value: '2020-01-30',
                amount: '58.10',
              },
            ],
          },
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('PaymentPlanMessage').exists()).toEqual(true);
  });

  it('should NOT render ticket resale when NOT available on the booking', () => {
    // Copy and extend the initial state.
    const mockStore = store({
      ...initialState,
      booking: {
        GP123456: {
          ...initialState.booking.GP123456,
          tickets: [],
        },
      },
    });

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingPage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('SidebarResale').exists()).toEqual(false);
  });
});
