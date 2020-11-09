import React from 'react';
import SidebarActions from './SidebarActions';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = propsOverride => {
  const props = {
    actions: [
      {
        active: true,
        label: 'Test',
        action: jest.fn(),
      },
      {
        active: false,
        label: 'Test 2',
        action: jest.fn(),
      },
    ],
    ...propsOverride,
  };

  const wrapper = mountWithConfig(<SidebarActions {...props} />);

  return {
    wrapper,
    activeAction: wrapper.find('[data-test="sidebarAction-test"]'),
    inactiveAction: wrapper.find('[data-test="sidebarAction-test2"]'),
    props,
  };
};

describe('SidebarActions', () => {
  it('should successfully render only active actions', () => {
    const { activeAction, inactiveAction } = setup();
    expect(activeAction.exists()).toBe(true);
    expect(activeAction.text()).toBe('Test');
    expect(inactiveAction.exists()).toBe(false);
  });

  it('should fire the appropriate action passed through props when clicked', () => {
    const { activeAction, props } = setup();

    activeAction.simulate('click');
    expect(props.actions[0].action).toHaveBeenCalled();
  });
});
