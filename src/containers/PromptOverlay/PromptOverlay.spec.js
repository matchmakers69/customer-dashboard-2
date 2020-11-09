import { messageOperations, messageTypes } from '../../store/messages';

import { Prompt } from '@kaboodle-solutions/design-system';
import PromptOverlay from './PromptOverlay';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mountWithConfig } from '../../testing/mountWithConfig';

const { ACTION_MESSAGE } = messageTypes;

describe('PromptOverlay', () => {
  let store = {};

  beforeEach(() => {
    store = configureStore();
  });

  it(`should not render prompt when no applicable message exists in the store`, () => {
    const initialState = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: true,
          actions: [{ text: 'Cancel' }],
          header: 'Signing Out',
          required: false,
        },
      ],
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <PromptOverlay />
      </Provider>,
    );

    expect(wrapper.find('Prompt').exists()).toEqual(false);
  });

  it(`should trigger ${ACTION_MESSAGE} when button with no onClick is clicked`, () => {
    const initialState = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: false,
          actions: [{ text: 'Cancel' }],
          header: 'Signing Out',
          required: false,
        },
      ],
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <PromptOverlay />
      </Provider>,
    );

    const actionButton = wrapper.find('.Button');
    actionButton.simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([messageOperations.actionMessage(1)]);
  });

  it(`should trigger ${ACTION_MESSAGE} and passed action when button with onClick is clicked`, () => {
    const initialState = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: false,
          actions: [{ text: 'Cancel', onClick: { type: 'AN_ACTION' } }],
          header: 'Signing Out',
          required: false,
        },
      ],
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <PromptOverlay />
      </Provider>,
    );

    const actionButton = wrapper.find('.Button');
    actionButton.simulate('click');

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([{ type: 'AN_ACTION' }, messageOperations.actionMessage(1)]);
  });

  it(`should fire ${ACTION_MESSAGE} when onClickOutside method is called and required is FALSE`, () => {
    const initialState = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: false,
          actions: [{ text: 'Cancel', onClick: { type: 'AN_ACTION' } }],
          header: 'Signing Out',
          required: false,
        },
      ],
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <PromptOverlay />
      </Provider>,
    );

    wrapper.find(Prompt).prop('onClickOutside')();

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([messageOperations.actionMessage(1)]);
  });

  it(`should NOT fire ${ACTION_MESSAGE} when onClickOutside method is called and required is TRUE`, () => {
    const initialState = {
      messages: [
        {
          displayType: 'prompt',
          type: undefined,
          message: 'Are you sure you want to sign out?',
          id: 1,
          actioned: false,
          actions: [{ text: 'Cancel', onClick: { type: 'AN_ACTION' } }],
          header: 'Signing Out',
          required: true,
        },
      ],
    };

    const mockStore = store(initialState);
    const wrapper = mountWithConfig(
      <Provider store={mockStore}>
        <PromptOverlay />
      </Provider>,
    );

    wrapper.find(Prompt).prop('onClickOutside')();

    expect(
      wrapper
        .find('Provider')
        .prop('store')
        .getActions(),
    ).toEqual([]);
  });
});
