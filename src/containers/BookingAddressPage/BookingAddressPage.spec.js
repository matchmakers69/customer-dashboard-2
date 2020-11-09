import { goToRoute, withParams } from '../../lib/router';

import BookingAddressPage from './BookingAddressPage';
import { Provider } from 'react-redux';
import React from 'react';
import { bookingOperations } from '../../store/booking';
import configureStore from 'redux-mock-store';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';

const { getBooking } = bookingOperations;

describe('BookingAddressPage', () => {
  let store = {};
  let initialState = {};

  beforeEach(() => {
    store = configureStore();

    initialState = {
      booking: {
        PW3076840: {
          booking_printed: '0',
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          delivery: [
            {
              delivery_name: 'Super Fast Mail',
              description: '2 - 3 Days Expedited',
              delivery_price: {
                value: 2,
                price: '£2.00',
              },
              allocation_id: 473687,
              require_address: true,
              address_id: '536296',
              type_id: '1',
              type_name: 'Home',
              address_1: 'Kaboodle Solutions Ltd',
              address_2: '3 The Stables',
              address_3: 'East Didsbury',
              city: 'Manchester',
              county: 'Greater Manchester',
              postcode: 'M20 5PG',
              country_id: '1',
              country_name: 'Afghanistan',
              tracking_id: null,
            },
          ],
        },
      },
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
    };
  });

  it('should only load booking if not already loaded.', () => {
    initialState = {
      booking: {},
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingAddressPage
          match={{ params: { booking_reference: 'DIFFERENT_BOOKING' } }}
        />
      </Provider>,
    );
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(getBooking('DIFFERENT_BOOKING'));
  });

  it('should fire redirect action when return button is clicked', () => {
    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingAddressPage
          match={{ params: { booking_reference: 'PW567890' } }}
        />
      </Provider>,
    );

    wrapper.find('BackButton Button').simulate('click');
    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toContainEqual(
      goToRoute(
        withParams(constants.BOOKING_URL, { booking_reference: 'PW567890' }),
      ),
    );
  });

  it('should redirect if the booking is loaded but no delivery is attached to the booking', () => {
    initialState = {
      booking: {
        PW3076840: {
          booking_printed: '0',
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          delivery: [],
        },
      },
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingAddressPage
          match={{ params: { booking_reference: 'PW3076840' } }}
        />
      </Provider>,
    );

    const redirect = wrapper.find('Redirect');
    expect(redirect.prop('to')).toEqual(
      withParams(constants.BOOKING_URL, { booking_reference: 'PW3076840' }),
    );
  });

  it('should redirect if the booking is loaded but non-physical delivery is passed.', () => {
    initialState = {
      booking: {
        PW3076840: {
          booking_printed: '0',
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          delivery: [
            {
              delivery_name: 'eTick Delivery',
              description: 'Instant Delivery',
              delivery_price: {
                value: 2,
                price: '£2.00',
              },
              allocation_id: '',
              require_address: false,
              address_id: '536296',
              type_id: null,
              type_name: null,
              address_1: null,
              address_2: null,
              address_3: null,
              city: null,
              county: null,
              postcode: null,
              country_id: null,
              country_name: null,
              tracking_id: null,
            },
          ],
        },
      },
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingAddressPage
          match={{ params: { booking_reference: 'PW3076840' } }}
        />
      </Provider>,
    );
    const redirect = wrapper.find('Redirect');
    expect(redirect.prop('to')).toEqual(
      withParams(constants.BOOKING_URL, { booking_reference: 'PW3076840' }),
    );
  });

  it('should redirect if the booking is loaded but has already been printed.', () => {
    initialState = {
      booking: {
        PW3076840: {
          booking_printed: '1',
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          delivery: [
            {
              delivery_name: 'Super Fast Mail',
              description: '2 - 3 Days Expedited',
              delivery_price: {
                value: 2,
                price: '£2.00',
              },
              allocation_id: 473687,
              require_address: true,
              address_id: '536296',
              type_id: '1',
              type_name: 'Home',
              address_1: 'Kaboodle Solutions Ltd',
              address_2: '3 The Stables',
              address_3: 'East Didsbury',
              city: 'Manchester',
              county: 'Greater Manchester',
              postcode: 'M20 5PG',
              country_id: '1',
              country_name: 'Afghanistan',
              tracking_id: null,
            },
          ],
        },
      },
      client: {
        countries: [
          {
            id: 4,
            code: 'DZ',
            name: 'Algeria',
          },
        ],
      },
    };

    const mockStore = store(initialState);

    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <BookingAddressPage
          match={{ params: { booking_reference: 'PW3076840' } }}
        />
      </Provider>,
    );

    const redirect = wrapper.find('Redirect');
    expect(redirect.prop('to')).toEqual(
      withParams(constants.BOOKING_URL, { booking_reference: 'PW3076840' }),
    );
  });
});
