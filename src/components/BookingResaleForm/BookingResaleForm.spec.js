import { RESALABLE, RESALE_ENABLED, RESALE_SOLD } from '../../constants';

import BookingResaleForm from './BookingResaleForm';
import React from 'react';
import mockModalRoot from '../../testing/helpers/mockModalRoot';
import { mountWithConfig } from '../../testing/mountWithConfig';
import noop from 'lodash/noop';

describe('BookingResaleForm', () => {
  let tickets = [];

  mockModalRoot();

  beforeEach(() => {
    tickets = [
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277621',
        resale: RESALABLE,
      },
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277626',
        resale: RESALABLE,
      },
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277623',
        resale: RESALE_ENABLED,
      },
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277622',
        resale: RESALE_SOLD,
      },
    ];
  });

  it(`should render resale price when one or more tickets is in status ${RESALABLE} and reimbursement > 0`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} resaleValue={26} />,
    );

    expect(wrapper.find('.BookingResaleForm__resale-price').exists()).toEqual(
      true,
    );
  });

  it(`should render 'Save Changes' and 'Cancel' button when editable`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Make interface editable by clicking 'Edit Resale' button.
    wrapper.find('.BookingResaleForm__actions Button').simulate('click');

    expect(wrapper.find('.BookingResaleForm__actions Button').length).toEqual(
      2,
    );
  });

  it(`should render 'Edit Resale' button when not editable`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    expect(wrapper.find('.BookingResaleForm__actions Button').text()).toEqual(
      'Edit Resale',
    );
  });

  it(`should toggle editable state to TRUE when 'Edit Resale' button is clicked`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    const resaleForm = wrapper.find('BookingResaleForm');

    expect(resaleForm.state('editable')).toEqual(true);
  });

  it(`should display modal when 'Save Changes' action is fired`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Make interface editable by clicking 'Edit Resale' button.
    wrapper.find('.BookingResaleForm__actions Button').simulate('click');

    // Toggle the first ticket so we can trigger the 'Save Changes' button.
    const resaleItem = wrapper.find('ResaleItem').at(0);
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: true } });

    // Click 'Save Changes' opening the confirmation modal.
    wrapper
      .find('.BookingResaleForm__actions Button')
      .at(1)
      .simulate('click');

    expect(wrapper.find('BookingResaleModal').exists()).toEqual(true);
  });

  it(`should dismiss modal when 'Cancel' action is fired`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Make interface editable by clicking 'Edit Resale' button.
    wrapper.find('.BookingResaleForm__actions Button').simulate('click');

    // Toggle the first ticket so we can trigger the 'Save Changes' button.
    const resaleItem = wrapper.find('ResaleItem').at(0);
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: true } });

    // Click 'Save Changes' opening the confirmation modal.
    wrapper
      .find('.BookingResaleForm__actions Button')
      .at(1)
      .simulate('click');

    // Click 'Cancel' button on confirmation modal.
    wrapper
      .find('.Prompt__actions Button')
      .at(0)
      .simulate('click');

    expect(wrapper.find('BookingResaleModal').exists()).toEqual(false);
  });

  it('should create a modification entry when ticket toggled', () => {
    tickets = [
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277621',
        resale: RESALABLE,
      },
    ];

    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Toggle the ticket status
    wrapper
      .find('ResaleItem Switch input')
      .simulate('change', { target: { checked: true } });

    const resaleForm = wrapper.find('BookingResaleForm');
    expect(resaleForm.state('modifications')[0]).toEqual({
      id: '4277621',
      status: RESALE_ENABLED,
    });
  });

  it('should NOT create a modification entry when ticket toggled to original state', () => {
    tickets = [
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277621',
        resale: RESALABLE,
      },
    ];

    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Toggle the ticket status twice, reverting to original state.
    const resaleItem = wrapper.find('ResaleItem');
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: true } });
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: false } });

    const resaleForm = wrapper.find('BookingResaleForm');
    expect(resaleForm.state('modifications').length).toEqual(0);
  });

  it(`should clear modifications and revert editable state on 'Cancel' click.`, () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Simulate click on the 'Cancel' button
    wrapper
      .find('.BookingResaleForm__actions Button')
      .at(0)
      .simulate('click');

    const resaleForm = wrapper.find('BookingResaleForm');
    expect(resaleForm.state()).toMatchObject({
      modifications: [],
      editable: false,
    });
  });

  it('should return appropriate selection message when multiple resale tickets', () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Toggle the status of the first two items.
    const resaleItems = wrapper.find('ResaleItem').map(item => item);
    resaleItems[0]
      .find('Switch input')
      .simulate('change', { target: { checked: true } });
    resaleItems[1]
      .find('Switch input')
      .simulate('change', { target: { checked: true } });

    expect(wrapper.find('.BookingResaleForm__selection').text()).toEqual(
      `You've selected 3 tickets for resale.`,
    );
  });

  it('should return appropriate selection message when single resale ticket', () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    expect(wrapper.find('.BookingResaleForm__selection').text()).toEqual(
      `You've selected 1 ticket for resale.`,
    );
  });

  it('should return appropriate selection message when no tickets for resale', () => {
    tickets = [
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277623',
        resale: RESALABLE,
      },
    ];

    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    expect(wrapper.find('.BookingResaleForm__selection').text()).toEqual(
      `You haven't selected any tickets for resale.`,
    );
  });

  it('should return appropriate listed message when multiple resale tickets', () => {
    tickets = [
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277623',
        resale: RESALE_ENABLED,
      },
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277624',
        resale: RESALE_ENABLED,
      },
    ];

    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    expect(wrapper.find('.BookingResaleForm__selection').text()).toEqual(
      `You've listed 2 tickets for resale.`,
    );
  });

  it('should return appropriate listed message when single resale ticket', () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    expect(wrapper.find('.BookingResaleForm__selection').text()).toEqual(
      `You've listed 1 ticket for resale.`,
    );
  });

  it('should return appropriate listed message when no tickets for resale', () => {
    tickets = [
      {
        name: 'General Admission - Standing',
        event_name: 'Zedd: Orbit Tour',
        prices: {
          price: {
            value: 26,
            price: '\u00a326.00',
          },
        },
        ticket_type_id: '4779',
        id: '4277623',
        resale: RESALE_SOLD,
      },
    ];

    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    expect(wrapper.find('.BookingResaleForm__selection').text()).toEqual(
      `You haven't listed any tickets for resale.`,
    );
  });

  it('should fire onChange action when onSubmit is invoked', () => {
    const testFn = jest.fn();

    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={testFn} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Toggle an item's status.
    const resaleItem = wrapper.find('ResaleItem').at(0);
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: true } });

    // Open the confirmation modal
    wrapper
      .find('.BookingResaleForm__actions Button')
      .at(1)
      .simulate('click');

    // Confirm changes
    wrapper
      .find('.Prompt__actions Button')
      .at(1)
      .simulate('click');

    expect(testFn).toHaveBeenCalledWith([
      { id: '4277621', status: RESALE_ENABLED },
    ]);
  });

  it('should clear editable state and modifications when onSubmit is invoked', () => {
    const wrapper = mountWithConfig(
      <BookingResaleForm tickets={tickets} onChange={noop} />,
    );

    // Enable editable interface
    const editResaleButton = wrapper.find('.BookingResaleForm__actions Button');
    editResaleButton.simulate('click');

    // Toggle an item's status.
    const resaleItem = wrapper.find('ResaleItem').at(0);
    resaleItem
      .find('Switch input')
      .simulate('change', { target: { checked: true } });

    // Open the confirmation modal
    wrapper
      .find('.BookingResaleForm__actions Button')
      .at(1)
      .simulate('click');

    // Confirm changes
    wrapper
      .find('.Prompt__actions Button')
      .at(1)
      .simulate('click');

    const resaleForm = wrapper.find('BookingResaleForm');
    expect(resaleForm.state()).toMatchObject({
      editable: false,
      modifications: [],
    });
  });
});
