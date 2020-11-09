import constants, {
  NOT_RESALABLE,
  RESALABLE,
  RESALE_ENABLED,
} from '../../constants';
import { goToRoute, withParams } from '../../lib/router';

import BookingResalePage from './BookingResalePage';
import { Provider } from 'react-redux';
import React from 'react';
import { bookingOperations } from '../../store/booking';
import configureStore from 'redux-mock-store';
import mockModalRoot from '../../testing/helpers/mockModalRoot';
import { mountWithConfig } from '../../testing/mountWithConfig';

const { updateBookingResale } = bookingOperations;

describe('BookingResalePage', () => {
  let store = {};
  let wrapper = {};

  mockModalRoot();

  const initialState = {
    booking: {
      GP123456: {
        reference: 'GP123456',
        id: '123456',
        departure_date: {
          iso_value: '2019-06-08 00:00:00',
          isotz_value: '2019-06-08T00:00:00+01:00',
        },
        return_date: {
          iso_value: '2019-06-09 00:00:00',
          isotz_value: '2019-06-09T00:00:00+01:00',
        },
        tickets: [
          {
            name: 'General Admission',
            event_name: 'Guilty Pleasures 8th June 2019',
            prices: {
              price: {
                value: 10,
                price: '£10.00',
              },
            },
            id: '4002070',
            resale: RESALABLE,
          },
        ],
        package: {
          name: 'Guilty Pleasures 8th June 2019',
          id: '8972',
        },
        pax: [],
        resalable: true,
      },
    },
  };

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render WrapLoader whilst booking has NOT loaded', () => {
    const mockStore = store({
      booking: {},
    });

    wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingResalePage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('WrapLoader').exists()).toEqual(true);
  });

  it('should render BookingResaleForm when booking is loaded, is resalable and not updating', () => {
    const mockStore = store(initialState);

    wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingResalePage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('BookingResaleForm').exists()).toEqual(true);
  });

  it('should render ResaleNotPossible when booking is loaded, is NOT resalable and not updating', () => {
    const mockStore = store({
      booking: {
        currentBooking: 'GP123456',
        GP123456: {
          reference: 'GP123456',
          id: '123456',
          departure_date: {
            iso_value: '2019-06-08 00:00:00',
            isotz_value: '2019-06-08T00:00:00+01:00',
          },
          return_date: {
            iso_value: '2019-06-09 00:00:00',
            isotz_value: '2019-06-09T00:00:00+01:00',
          },
          tickets: [
            {
              name: 'General Admission',
              event_name: 'Guilty Pleasures 8th June 2019',
              prices: {
                price: {
                  value: 10,
                  price: '£10.00',
                },
              },
              id: '4002070',
              resale: NOT_RESALABLE,
            },
          ],
          package: {
            name: 'Guilty Pleasures 8th June 2019',
            id: '8972',
          },
          resalable: false,
        },
      },
    });

    wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingResalePage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    expect(wrapper.find('ResaleNotPossible').exists()).toEqual(true);
  });

  it('should trigger router action when back button is pressed', () => {
    const mockStore = store(initialState);

    wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingResalePage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([
      bookingOperations.getBooking('GP123456'),
      goToRoute(
        withParams(constants.BOOKING_URL, { booking_reference: 'GP123456' }),
      ),
    ]);
  });

  it('should fire action to update the booking when modifications are confirmed', () => {
    const mockStore = store(initialState);

    wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingResalePage
          match={{
            params: {
              booking_reference: 'GP123456',
            },
          }}
        />
      </Provider>,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Toggle an item's status.
    const resaleItem = wrapper.find('ResaleItem').at(0);
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: true } });

    // Open the confirmation modal
    wrapper
      .find('.BookingResaleForm__actions Button')
      .at(1)
      .simulate('click');

    // Confirm changes
    wrapper
      .find('.Prompt__actions Button')
      .at(1)
      .simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([
      bookingOperations.getBooking('GP123456'),
      updateBookingResale('GP123456', [
        { id: '4002070', status: RESALE_ENABLED },
      ]),
    ]);
  });
});
