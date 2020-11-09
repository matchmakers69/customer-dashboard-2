import { Button } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import camelCase from 'lodash/camelCase';
import constants from '../../constants';
import { withParams } from '../../lib/router';

const BookingCardActions = ({ bookingReference, goTo, paymentType }) => {
  const actions = [
    {
      active: true,
      action: () =>
        goTo(
          withParams(constants.BOOKING_URL, {
            booking_reference: bookingReference,
          }),
        ),
      label: 'View Booking Summary',
      sort: 1,
    },
  ];

  if (paymentType === constants.BOOKING_DEPOSIT) {
    actions.unshift({
      active: false,
      action: () =>
        goTo(
          withParams(constants.BOOKING_MAKE_PAYMENT_URL, {
            booking_reference: bookingReference,
          }),
        ),
      label: 'Pay Outstanding Balance',
      sort: 10,
    });
  }

  if (paymentType === constants.BOOKING_PAYMENT_PLAN) {
    actions.unshift({
      active: true,
      action: () =>
        goTo(
          withParams(constants.BOOKING_PAYMENT_PLAN_VIEW_URL, {
            booking_reference: bookingReference,
          }),
        ),
      label: 'View Payment Plan',
      sort: 20,
    });
  }

  return actions
    .filter(action => action.active)
    .sort((firstAction, secondAction) =>
      firstAction.sort < secondAction.sort ? 1 : -1,
    )
    .map(({ label, action }, index) => {
      const variant = index === 0 ? 'success' : 'default';
      const handleAction = action;
      return (
        <Button
          testId={`bookingAction-${camelCase(label)}`}
          key={label}
          type="button"
          variant={variant}
          onClick={handleAction}>
          {label}
        </Button>
      );
    });
};

BookingCardActions.propTypes = {
  bookingReference: PropTypes.string.isRequired,
  goTo: PropTypes.func.isRequired,
  paymentType: PropTypes.oneOf(['payInFull', 'deposit', 'paymentPlan']),
};

export default BookingCardActions;
