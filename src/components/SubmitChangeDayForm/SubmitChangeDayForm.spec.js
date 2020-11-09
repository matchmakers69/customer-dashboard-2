import React from 'react';
import SubmitChangeDayForm from './SubmitChangeDayForm';
import { mountWithConfig } from '../../testing/mountWithConfig';

describe('SubmitChangeDayForm', () => {
  const bookingReference = 'TF3180529';
  const sendMessage = jest.fn();
  it('Calls sendMessage dispatch when cancel button clicked', () => {
    const wrapper = mountWithConfig(
      <SubmitChangeDayForm
        bookingReference={bookingReference}
        sendMessage={sendMessage}
      />,
    );
    wrapper.find('Button#cancelButton').simulate('click');
    expect(sendMessage).toHaveBeenCalled();
  });
});
