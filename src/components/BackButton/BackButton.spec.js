import BackButton from './BackButton';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('BackButton', () => {
  it('Successfully calls onClick function', () => {
    const mockFn = jest.fn();
    const wrapper = mountWithConfig(<BackButton onClick={mockFn} />);
    wrapper.find('button').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
