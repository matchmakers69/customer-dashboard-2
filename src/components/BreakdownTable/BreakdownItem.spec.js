import BreakdownItem from './BreakdownItem';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('BreakdownItem', () => {
  it('should not render icon by default', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('Icon').exists()).toEqual(false);
  });

  it('should render the subItem CSS class when the subItem prop is passed', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        subItem
        type="extras"
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('.BreakdownItem--sub-item').exists()).toEqual(true);
  });
  it('should render the disabled CSS class when the disabled prop is passed', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        subItem
        disabled
        type="extras"
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('.BreakdownItem--disabled').exists()).toEqual(true);
  });

  it('should not display subtitle by default', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('.BreakdownItem__subtitle').exists()).toEqual(false);
  });

  it('should display a subtitle if one is passed through props', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        subtitle="Subtitle"
        type="extras"
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('.BreakdownItem__subtitle').text()).toEqual('Subtitle');
  });

  it('should render badges after the description when an array of badges is passed', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        badges={[{ text: 'Test', type: 'success' }]}
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('Badge').text()).toEqual('Test');
  });

  it('should NOT render badges when empty array of badges is passed', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        badges={[]}
        quantity={1}
        cost={22.99}
      />,
    );
    expect(wrapper.find('.BreakdownItem__badges').exists()).toEqual(false);
  });

  it('should render icon when showIcon is passed', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        quantity={1}
        cost={22.99}
        showIcon
      />,
    );
    expect(wrapper.find('Icon').exists()).toEqual(true);
  });

  it('should display price by default', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        quantity={1}
        cost={22.99}
        showIcon
      />,
    );
    expect(wrapper.find('.BreakdownItem__price').text()).toEqual('£22.99');
  });

  it('should display resold when item is marked as resold', () => {
    const wrapper = mountWithConfig(
      <BreakdownItem
        title="Extra Item"
        type="extras"
        quantity={1}
        cost={22.99}
        costText="Resold"
        showIcon
      />,
    );
    expect(wrapper.find('.BreakdownItem__price').text()).toEqual('Resold');
  });
});
