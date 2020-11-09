import Hello from './Hello';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('Hello', () => {
  const name = 'tWKAWwajtS';
  const greeting = 'bbpOqHlScZ';
  const suffix = 'gbuyjWbgCJ';

  it('should render correctly with the only the name', () => {
    const component = mountWithConfig(<Hello name={name} />);
    expect(component.find('.Hello').text()).toBe('Hi, tWKAWwajtS!');
  });

  it('should render correctly with the a unique greeting and suffix', () => {
    const component = mountWithConfig(
      <Hello name={name} greeting={greeting} suffix={suffix} />,
    );
    expect(component.find('.Hello').text()).toBe(
      'bbpOqHlScZ, tWKAWwajtSgbuyjWbgCJ',
    );
  });

  it('should render without a name correctly', () => {
    const component = mountWithConfig(<Hello />);
    expect(component.find('.Hello').text()).toBe('Hi!');
  });
});
