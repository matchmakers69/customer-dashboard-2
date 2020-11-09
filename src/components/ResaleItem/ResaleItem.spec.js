import { RESALABLE, RESALE_ENABLED, RESALE_SOLD } from '../../constants';

import React from 'react';
import ResaleItem from './ResaleItem';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('ResaleItem', () => {
  it.each([RESALABLE, RESALE_ENABLED])(
    `should render Switch when editable and in status %s`,
    status => {
      const wrapper = mountWithConfig(
        <ResaleItem
          title="Saturday Ticket"
          price={123.45}
          type="tickets"
          status={status}
          editable
        />,
      );
      expect(wrapper.find('Switch').exists()).toEqual(true);
    },
  );

  it('should NOT render Switch when editable and in resold status', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
        editable
      />,
    );
    expect(wrapper.find('Switch').exists()).toEqual(false);
  });

  it.each([RESALABLE, RESALE_ENABLED])(
    `should render status when NOT editable and in status %s`,
    status => {
      const wrapper = mountWithConfig(
        <ResaleItem
          title="Saturday Ticket"
          price={123.45}
          type="tickets"
          status={status}
        />,
      );
      expect(wrapper.find('.ResaleItem__status').exists()).toEqual(true);
    },
  );

  it('should render status when NOT editable and in resold status', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
      />,
    );
    expect(wrapper.find('.ResaleItem__status').exists()).toEqual(true);
  });

  it('should display barcode when exists on resale item', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        barcode="325346356342"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
      />,
    );
    expect(wrapper.find('.ResaleItem__barcode').text()).toEqual('325346356342');
  });

  it('should NOT display barcode when no barcode on resale item', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
      />,
    );
    expect(wrapper.find('.ResaleItem__barcode').exists()).toEqual(false);
  });

  it('should display customer when exists on resale item', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        customer="John Smith"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
      />,
    );
    expect(wrapper.find('.ResaleItem__customer').text()).toEqual('John Smith');
  });

  it('should NOT display customer when no customer name on resale item', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
      />,
    );
    expect(wrapper.find('.ResaleItem__customer').exists()).toEqual(false);
  });

  it.each([RESALE_ENABLED, RESALABLE])(
    'should display price when item has resale status %s',
    resaleStatus => {
      const wrapper = mountWithConfig(
        <ResaleItem
          title="Saturday Ticket"
          price={123.45}
          type="tickets"
          status={resaleStatus}
        />,
      );
      expect(wrapper.find('.ResaleItem__price').text()).toEqual('£123.45');
    },
  );

  it('should NOT display price when item has been resold', () => {
    const wrapper = mountWithConfig(
      <ResaleItem
        title="Saturday Ticket"
        price={123.45}
        type="tickets"
        status={RESALE_SOLD}
      />,
    );
    expect(wrapper.find('.ResaleItem__price').exists()).toEqual(false);
  });
});
