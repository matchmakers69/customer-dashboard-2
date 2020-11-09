import DetailsListField from './DetailsListField';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('DetailsListField', () => {
  it('should not show value when type is hidden', () => {
    const wrapper = mountWithConfig(<DetailsListField type="hidden" />);
    expect(wrapper.exists('.DetailsListField__value')).toEqual(false);
  });
});
