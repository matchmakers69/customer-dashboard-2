import InputFieldGroup from './InputFieldGroup';
import React from 'react';
import Stub from '../../testing/helpers/stub';
import { mountWithConfig } from '../../testing/mountWithConfig';

const setup = (propsOverride, stubOverrides = []) => {
  const props = {
    ...propsOverride,
  };

  const stubs = [
    { id: '1', value: '' },
    { id: '2', value: '' },
    ...stubOverrides,
  ];

  const wrapper = mountWithConfig(
    <InputFieldGroup {...props}>
      {stubs.map(stub => (
        <Stub key={stub.id} {...stub} />
      ))}
    </InputFieldGroup>,
  );

  return {
    wrapper,
    inputWrapper: wrapper.find('.InputFieldGroup'),
    errors: wrapper.find('.InputFieldGroup__error'),
    innerComponents: wrapper.find('Stub'),
    props,
  };
};

describe('InputFieldGroup', () => {
  it('should not display an error until all fields have are active', () => {
    const props = { errors: ['1', '2'] };
    const { errors } = setup(props);
    expect(errors).toHaveLength(0);
  });
});
