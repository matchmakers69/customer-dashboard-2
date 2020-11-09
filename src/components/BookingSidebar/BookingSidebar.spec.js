import BookingSidebar from './BookingSidebar';
import React from 'react';
import SidebarAddress from './SidebarAddress';
import SidebarDownload from './SidebarDownload';
import SidebarPrice from './SidebarPrice';
import SidebarStatus from './SidebarStatus';
import { mountWithConfig } from '../../testing/mountWithConfig';
import noop from 'lodash.noop';

const mockAddress = {
  id: 491400,
  address_1: 'Kaboodle Solutions Ltd',
  address_2: '3 The Stables',
  address_3: 'East Didsbury',
  city: 'Manchester',
  county: 'Greater Manchester',
  postcode: 'M20 5PG',
  country: {
    id: '235',
    name: 'United Kingdom',
  },
};

const mockDownloads = [
  {
    description: 'eTicket',
    external: false,
    type: 'eticket',
    key: 'gre34tgfdgh54tyhjsdf243',
  },
  {
    description: 'Booking Confirmation',
    external: false,
    type: 'confirmation',
    key: 'gre34tgfdgh5ftyhjsdf243',
  },
];

const mockExternalDownloads = [
  {
    description: 'eTicket',
    external: true,
    type: 'eticket',
    url: 'literallyAnything',
  },
];

const downloadUrl = '/api/booking/download/gre34tgfdgh54tyhjsdf243';
const externalDownloadUrl = 'literallyAnything';

describe('BookingSidebar', () => {
  it('Should render an address when an address object is passed', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarAddress
          deliveryAddress={mockAddress}
          printed={false}
          goToBooking={noop}
        />
      </BookingSidebar>,
    );

    expect(wrapper.find('.SidebarSection')).toHaveLength(1);
    expect(wrapper.find('.Title').text()).toEqual('Delivery Address');
  });

  it('Should render an downloads when an downloads array is passed', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarDownload downloads={mockDownloads} />
      </BookingSidebar>,
    );

    expect(wrapper.find('.SidebarSection')).toHaveLength(1);
    expect(
      wrapper
        .find('.Button')
        .first()
        .text(),
    ).toEqual(`${mockDownloads[0].description}`);
    expect(
      wrapper
        .find('.DownloadLink')
        .first()
        .prop('href'),
    ).toEqual(downloadUrl);
  });

  it('Should render an external downloads when an downloads array with an external download is passed', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarDownload downloads={mockExternalDownloads} />
      </BookingSidebar>,
    );

    expect(wrapper.find('.SidebarSection')).toHaveLength(1);
    expect(wrapper.find('.Title').text()).toEqual('Downloads');
    expect(wrapper.find('.Button').text()).toEqual(
      `${mockExternalDownloads[0].description}`,
    );
    expect(wrapper.find('.DownloadLink').prop('href')).toEqual(
      externalDownloadUrl,
    );
  });

  it('Should render an etickets download more prominently', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarDownload downloads={mockDownloads} />
      </BookingSidebar>,
    );

    expect(wrapper.find('.SidebarSection')).toHaveLength(1);
    expect(wrapper.find('.Title').text()).toEqual('Downloads');
    expect(wrapper.find('.Button--success').text()).toEqual(
      mockDownloads[0].description,
    );
    expect(wrapper.find('.Button--default').text()).toEqual(
      mockDownloads[1].description,
    );
  });

  it('Should render an Price when an totalPrice and/or bookingFee is passed', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarPrice totalPrice={1} />
      </BookingSidebar>,
    );

    const prices = wrapper.find('.Price__value');
    const totalPrice = prices.get(0);

    expect(wrapper.find('.SidebarSection')).toHaveLength(1);
    expect(wrapper.find('.Title').text()).toEqual('Total');
    expect(totalPrice.props.children).toBe('£1.00');
  });

  it('Should not render the Booking Fee when no bookingFee prop is passed', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarPrice totalPrice={1} />
      </BookingSidebar>,
    );

    const prices = wrapper.find('.Price__value');
    const totalPrice = prices.get(0);

    expect(wrapper.find('.Title').text()).toEqual('Total');
    expect(totalPrice.props.children).toBe('£1.00');
  });

  it('Should render the correct payment status based on the code prop passed in', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarStatus code={30} />
      </BookingSidebar>,
    );
    expect(wrapper.find('.Status').text()).toEqual('Fully Paid');
  });

  it('Should accept a code prop of type string or number', () => {
    const wrapper = mountWithConfig(
      <BookingSidebar>
        <SidebarStatus code="10" />
      </BookingSidebar>,
    );
    expect(wrapper.find('.Status').text()).toEqual('Outstanding');
  });
});
