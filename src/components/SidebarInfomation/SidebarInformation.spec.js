import React from 'react';
import SidebarInformation from './SidebarInformation';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = () => {
  const props = {
    title: 'Hello Dolly',
  };

  const InnerChild = () => <div data-test="InnerChild" />;

  const wrapper = mountWithConfig(
    <SidebarInformation {...props}>
      <InnerChild />
    </SidebarInformation>,
  );

  return {
    wrapper,
    title: wrapper.find('Title'),
    InnerChild,
    props,
  };
};

describe('SidebarInformation', () => {
  it('should successfully render the title and any children', () => {
    const { wrapper, title, InnerChild } = setup();
    expect(title.text()).toBe('Hello Dolly');
    expect(wrapper.containsMatchingElement(<InnerChild />)).toEqual(true);
  });
});
