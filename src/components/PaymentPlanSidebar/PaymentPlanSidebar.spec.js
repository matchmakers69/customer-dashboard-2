import PaymentPlanSidebar from './PaymentPlanSidebar';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = () => {
  const props = {
    bookingReference: 'LOL696969',
    goTo: jest.fn(),
  };

  const wrapper = mountWithConfig(<PaymentPlanSidebar {...props} />);

  return {
    wrapper,
    sidebarActions: wrapper.find('SidebarActions'),
    sidebarInformation: wrapper.find('SidebarInformation'),
    props,
  };
};

describe('PaymentPlanSidebar', () => {
  it('should successfully render both the actions and the information components', () => {
    const { sidebarActions, sidebarInformation } = setup();
    expect(sidebarInformation.exists()).toEqual(true);
    expect(sidebarActions.exists()).toEqual(true);
  });
});
