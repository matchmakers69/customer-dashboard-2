import { RESALABLE, RESALE_ENABLED, RESALE_SOLD } from '../../constants';

import BookingResaleModal from './BookingResaleModal';
import React from 'react';
import mockModalRoot from '../../testing/helpers/mockModalRoot';
import { mountWithConfig } from '../../testing/mountWithConfig';
import noop from 'lodash/noop';

describe('BookingResaleModal', () => {
  let wrapper = {};

  mockModalRoot();

  const tickets = [
    {
      id: 1,
      name: 'Resale Ticket Type Name',
    },
    {
      id: 2,
      name: 'Resalable Ticket Type Name',
    },
    {
      id: 3,
      name: 'Resold Ticket Type Name',
    },
    {
      id: 4,
      name: 'Resalable Ticket Type Name',
    },
  ];

  const modifications = [
    {
      id: 1,
      status: RESALE_ENABLED,
    },
    {
      id: 2,
      status: RESALABLE,
    },
    {
      id: 3,
      status: RESALE_SOLD,
    },
    {
      id: 4,
      status: RESALABLE,
    },
  ];

  afterEach(() => {
    wrapper.unmount();
  });

  it('Displays a list of resale tickets when modifications contain resale action', () => {
    wrapper = mountWithConfig(
      <BookingResaleModal
        tickets={tickets}
        modifications={modifications}
        onDismiss={noop}
        onSubmit={noop}
      />,
    );
    expect(wrapper.find('.BookingResaleModal__list--resale li').length).toEqual(
      1,
    );
  });

  it('Displays a list of resalable tickets when modifications contain resalable action', () => {
    wrapper = mountWithConfig(
      <BookingResaleModal
        tickets={tickets}
        modifications={modifications}
        onDismiss={noop}
        onSubmit={noop}
      />,
    );
    expect(
      wrapper.find('.BookingResaleModal__list--resalable li').length,
    ).toEqual(2);
  });
});
