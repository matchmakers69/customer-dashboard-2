import Modal from './Modal';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('Modal', () => {
  it('Renders portal at top level with children', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.append(modalRoot);

    const wrapper = mountWithConfig(<Modal>Hello!</Modal>);
    expect(wrapper.text()).toEqual('Hello!');
  });
});
