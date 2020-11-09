import PaymentHistory from './PaymentHistory';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = (storeOverride, propsOverride) => {
  const initialState = {
    booking: {
      currentBooking: 'GP123456',
      GP123456: {
        payments: [
          {
            payment_date: {
              iso_value: '2019-11-09 20:59:28',
              isotz_value: '2019-11-09T20:59:28+00:00',
            },
            pax: { id: '5345028', value: 'Joe Bloggs' },
            type: 'Deposit',
            card: {
              type: 'Visa Debit',
              name: 'Joe Bloggs',
              four_digits: '1234',
            },
            amount: '48.00',
            status: {
              paid: '1',
              confirmed: true,
              value: 'Stripe: Payment Successful',
            },
            id: '2493706',
            reference: 'TF-0003678008',
          },
          {
            payment_date: {
              iso_value: '2019-12-09 16:27:07',
              isotz_value: '2019-12-09T16:27:07+00:00',
            },
            pax: { id: '5345028', value: 'Alex Martin' },
            type: 'Booking',
            card: {
              type: 'Payment Plan',
              name: 'Joe Bloggs',
              four_digits: '1234',
            },
            amount: '30.00',
            status: {
              paid: '1',
              confirmed: true,
              value: 'Stripe: Payment Successful',
            },
            id: '2549768',
            reference: 'TF-0003725917',
          },
          {
            payment_date: {
              iso_value: '2020-01-09 16:27:05',
              isotz_value: '2020-01-09T16:27:05+00:00',
            },
            pax: { id: '5345028', value: 'Alex Martin' },
            type: 'Booking',
            card: {
              type: 'Payment Plan',
              name: 'Joe Bloggs',
              four_digits: '1234',
            },
            amount: '30.00',
            status: {
              paid: '1',
              confirmed: true,
              value: 'Stripe: Payment Successful',
            },
            id: '2589298',
            reference: 'TF-0003765911',
          },
        ],
      },
    },
    ...storeOverride,
  };

  const props = {
    bookingReference: 'GP123456',
    ...propsOverride,
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  const wrapper = mountWithConfig(
    <Provider store={store}>
      <PaymentHistory {...props} />
    </Provider>,
  );

  return {
    wrapper,
    table: wrapper.find('Table'),
    dates: wrapper.find('[data-column-name="Date"]'),
    references: wrapper.find('[data-column-name="Reference"]'),
    types: wrapper.find('[data-column-name="Type"]'),
    amounts: wrapper.find('[data-column-name="Amount"]'),
    paymentMethod: wrapper.find('[data-column-name="Payment Method"]'),
    statuses: wrapper.find('[data-column-name="Status"]'),
  };
};

describe('PaymentHistory', () => {
  it('it should successfully render the table', () => {
    const { table } = setup();
    expect(table.exists()).toBe(true);
  });

  it('formats the dates in a DD/MM/YYYY format', () => {
    const { dates } = setup();
    const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    dates.forEach(date => {
      expect(dateRegex.test(date.text())).toBe(true);
    });
  });

  it('should order the items in reverse date order', () => {
    const { dates } = setup();

    const correctOrder = ['09/01/2020', '09/12/2019', '09/11/2019'];

    dates.forEach((date, iterator) => {
      expect(date.text()).toEqual(correctOrder[iterator]);
    });
  });
});
