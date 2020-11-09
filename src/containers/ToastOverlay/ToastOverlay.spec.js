import { ToastOverlay, mapStateToProps } from './ToastOverlay';

import React from 'react';
import constants from '../../constants';
import { mountWithConfig } from '../../testing/mountWithConfig';

const generateNewMessages = amount => {
  const messages = [];
  for (let iterator = 0; iterator <= amount; iterator += 1) {
    messages.push({
      type: 'success',
      displayType: 'toast',
      message: 'Test Message',
      id: iterator,
    });
  }

  return messages;
};

describe('ToastOverlay', () => {
  jest.useFakeTimers();

  it('should assign a tick value to the message and place it within the queue when the component has a new message', () => {
    const messages = [
      {
        type: 'success',
        displayType: 'toast',
        message: 'Test Message',
        id: 0,
      },
    ];

    const wrapper = mountWithConfig(<ToastOverlay messages={messages} />);

    wrapper.setProps({
      messages: [
        {
          type: 'success',
          displayType: 'toast',
          message: 'New Message',
          id: 1,
        },
        ...messages,
      ],
    });

    expect(wrapper.find('ToastOverlay').state('lastMessage')).toEqual(1);
    expect(wrapper.find('ToastOverlay').state('messageQueue')).toEqual([
      {
        displayType: 'toast',
        id: 1,
        message: 'New Message',
        tick: 1,
        type: 'success',
      },
    ]);
  });

  it('should only display a maximum of 5 messages at any given time', () => {
    const messages = [];

    const wrapper = mountWithConfig(<ToastOverlay messages={messages} />);

    wrapper.setProps({
      messages: generateNewMessages(5),
    });

    jest.runOnlyPendingTimers();
    wrapper.update();
    expect(wrapper.find('Toast').length).toEqual(5);
    expect(wrapper.state('lastMessage')).toEqual(5);
  });

  it('should reset the last message counter if the message id no longer matches up', () => {
    const messages = [];

    const wrapper = mountWithConfig(<ToastOverlay messages={messages} />);

    wrapper.setProps({
      messages: generateNewMessages(2),
    });
    wrapper.update();
    wrapper.setProps({
      messages: [
        {
          type: 'success',
          displayType: 'toast',
          message: 'Test Message',
          id: 0,
        },
      ],
    });
    expect(wrapper.state('lastMessage')).toEqual(0);
  });

  it('remove the messages in the queue once they have been displayed for the required amount of ticks', () => {
    const tickDisplayTime =
      constants.MILLISECONDS_PER_TICK * constants.TOAST_VISIBILITY_IN_TICKS;

    const wrapper = mountWithConfig(<ToastOverlay messages={[]} />);
    wrapper.setProps({
      messages: [
        {
          type: 'success',
          displayType: 'toast',
          message: 'New Message',
          id: 0,
        },
      ],
    });
    wrapper.update();
    jest.advanceTimersByTime(tickDisplayTime);
    expect(wrapper.find('ToastOverlay').state('messageQueue')).toEqual([]);
  });

  it('it should clear the timeout when the component is unmounted', () => {
    const messages = [
      {
        type: 'success',
        displayType: 'toast',
        message: 'Test Message',
        id: 0,
      },
    ];

    const wrapper = mountWithConfig(<ToastOverlay messages={messages} />);

    wrapper.unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('correctly MapsStateToProps', () => {
    const mockState = {
      messages: [
        {
          type: 'success',
          displayType: 'toast',
          message: 'Test Message',
          id: 0,
        },
      ],
    };

    expect(mapStateToProps(mockState)).toEqual({
      messages: [
        {
          type: 'success',
          displayType: 'toast',
          message: 'Test Message',
          id: 0,
        },
      ],
    });
  });
});
