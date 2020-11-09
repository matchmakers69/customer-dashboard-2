import BookingsPage from './BookingsPage';
import { Provider } from 'react-redux';
import React from 'react';
import { bookingsOperations } from '../../store/bookings';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';

const loadedState = {
  customer: {
    loaded: true,
    personal_details: {
      first_name: 'Joe',
      last_name: 'Bloggs',
      emergency_contact: {
        full_name: '',
        telephone: '',
      },
    },
  },
  bookings: {
    loaded: true,
    items: {
      upcoming: [
        {
          id: '3126868',
          reference: 'FDF3126868',
          package_name: 'Field Day 2019',
          destination: null,
          booked_date: {
            iso_value: '2019-06-04 01:51:50',
            isotz_value: '2019-06-04T01:51:50+01:00',
          },
          departure_date: {
            iso_value: '2019-06-07 00:00:00',
            isotz_value: '2019-06-07T00:00:00+01:00',
          },
          return_date: {
            iso_value: '2019-06-08 00:00:00',
            isotz_value: '2019-06-08T00:00:00+01:00',
          },
          payment_deadline_date: {
            iso_value: '2019-03-31 23:59:59',
            isotz_value: '2019-03-31T23:59:59+01:00',
          },
          booking_price: {
            value: 97.65,
            price: '£97.65',
          },
          currency: {
            id: '98',
            iso_code: 'GBP',
            exponent: '2',
            symbol: '£',
          },
          booking_status: {
            code: '70',
            value: 'Complete',
          },
          payment_status: {
            code: '30',
            value: 'Fully Paid',
          },
          room_allocation_enabled: false,
          coach_allocation_enabled: false,
        },
      ],
      past: [
        {
          id: '3093947',
          reference: 'PW3093947',
          package_name: 'Stephan Bodzin Curates',
          destination: 'No Transport',
          booked_date: {
            iso_value: '2019-04-19 15:41:28',
            isotz_value: '2019-04-19T15:41:28+01:00',
          },
          departure_date: {
            iso_value: '2019-04-19 00:00:00',
            isotz_value: '2019-04-19T00:00:00+01:00',
          },
          return_date: {
            iso_value: '2019-04-19 00:00:00',
            isotz_value: '2019-04-19T00:00:00+01:00',
          },
          payment_deadline_date: {
            iso_value: '2019-01-28 23:59:59',
            isotz_value: '2019-01-28T23:59:59+00:00',
          },
          booking_price: {
            value: 42.25,
            price: '£42.25',
          },
          currency: {
            id: '98',
            iso_code: 'GBP',
            exponent: '2',
            symbol: '£',
          },
          booking_status: {
            code: '70',
            value: 'Complete',
          },
          payment_status: {
            code: '30',
            value: 'Fully Paid',
          },
          room_allocation_enabled: false,
          coach_allocation_enabled: false,
        },
      ],
    },
  },
};

describe('BookingsPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      bookings: {
        loaded: false,
        bookings: {
          upcoming: [],
          past: [],
        },
      },

      customer: {
        loaded: true,
        personal_details: {
          first_name: 'Joe',
          last_name: 'Bloggs',
          emergency_contact: {
            full_name: '',
            telephone: '',
          },
        },
      },
    };
  });

  it('should render WrapLoader when loading is TRUE', () => {
    initialState = {
      customer: {
        loaded: false,
      },
      bookings: {
        loaded: false,
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    expect(wrapper.find('.WrapLoader').exists()).toEqual(true);
  });

  it('should trigger load bookings on initialisation', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([bookingsOperations.getBookings()]);
  });

  it('should pass through goTo as a function', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    wrapper.find('BookingsPage').prop('goTo');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([
      {
        type: 'dashboard/bookings/GET_BOOKINGS',
      },
    ]);
  });

  it('should update the state when switching between the tabs', () => {
    const mockStore = store(loadedState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );
    const bookingsPage = wrapper.find('BookingsPage');
    const button = wrapper.find('.BookingTabs .Button--default');

    button.simulate('click');
    expect(bookingsPage.state('activeList')).toEqual('pastBookings');
  });

  it('should not update the state when clicking the current tab', () => {
    const mockStore = store(loadedState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    const bookingsPage = wrapper.find('BookingsPage');
    const button = wrapper.find('.BookingTabs .Button--primary');

    button.simulate('click');
    expect(bookingsPage.state('activeList')).toEqual('upcomingBookings');
  });

  it('should render the BookingSummary when bookings exist', () => {
    const mockStore = store(loadedState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    const bookingsSummary = wrapper.find('BookingsSummary');
    expect(bookingsSummary.exists()).toBe(true);
  });

  it('should not render the BookingSummary when bookings exist', () => {
    initialState = {
      ...initialState,
      bookings: {
        loaded: true,
        items: {
          upcoming: [],
          past: [],
        },
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    const NoBookingsFound = wrapper.find('NoBookingsFound');
    expect(NoBookingsFound.exists()).toBe(true);
  });

  it('should not set state when clicking', () => {
    const mockStore = store(loadedState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingsPage />
      </Provider>,
    );

    const bookingsSummary = wrapper.find('BookingsSummary');
    expect(bookingsSummary.exists()).toBe(true);
  });
});
