import PropTypes from 'prop-types';
import React from 'react';
import { SidebarActions } from '../SidebarActions';
import { SidebarInformation } from '../SidebarInfomation';
import constants from '../../constants';
import { withParams } from '../../lib/router';

const PaymentPlanSidebar = ({ goTo, bookingReference }) => {
  const actions = [
    {
      active: true,
      action: () =>
        goTo(
          withParams(constants.BOOKING_PAYMENT_PLAN_CHANGE_PAYMENT_URL, {
            booking_reference: bookingReference,
          }),
        ),
      label: 'Change Payment Card',
    },
    {
      active: true,
      action: () =>
        goTo(
          withParams(constants.BOOKING_PAYMENT_PLAN_CHANGE_DAY_URL, {
            booking_reference: bookingReference,
          }),
        ),
      label: 'Change Payment Day',
    },
  ];
  return (
    <>
      <SidebarActions actions={actions} />
      <SidebarInformation title="How Payment Plans Work">
        <p>
          Our payment plan is the easy way to spread the cost of your booking.
          You can pay this in monthly instalments.
        </p>
        <p>
          A plan has been set up on your booking. You can see your remaining
          balance and how much you have paid.
        </p>
      </SidebarInformation>
    </>
  );
};

PaymentPlanSidebar.propTypes = {
  bookingReference: PropTypes.string.isRequired,
  goTo: PropTypes.func.isRequired,
};

export default PaymentPlanSidebar;
