import * as Yup from 'yup';
import { Button, Form } from '@kaboodle-solutions/design-system';
import React, { useEffect, useRef } from 'react';

import { goToRoute, withParams } from '../../lib/router';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import constants from '../../constants';
import styles from './SubmitChangeDayForm.styles';
import { withFormik } from 'formik';
import withStyles from 'react-jss';

const SubmitChangeDayForm = ({
  bookingReference,
  classes,
  handleSubmit,
  selectedDay,
  sendMessage,
  setValues,
  updating,
}) => {
  const prevDayRef = useRef();
  useEffect(() => {
    prevDayRef.current = selectedDay;
  });
  const prevDay = prevDayRef.current;

  if (selectedDay !== prevDay) {
    setValues({ payment_day: selectedDay });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.submitButtonContainer}>
        <Button
          id="submitButton"
          type="submit"
          variant="success"
          disabled={selectedDay === null || updating}
          loading={updating}>
          Save & Update
        </Button>
        <Button
          id="cancelButton"
          type="button"
          variant="default"
          onClick={() =>
            sendMessage({
              displayType: 'prompt',
              message:
                'Your new payment plan will not be saved. Are you sure you want to cancel?',
              actions: [
                {
                  type: 'success',
                  text: 'Yes, cancel',
                  onClick: goToRoute(
                    withParams(constants.BOOKING_PAYMENT_PLAN_VIEW_URL, {
                      booking_reference: bookingReference,
                    }),
                  ),
                },
                { text: 'No, take me back' },
              ],
            })
          }>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

SubmitChangeDayForm.propTypes = {
  bookingReference: PropTypes.string.isRequired,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  selectedDay: PropTypes.number,
  sendMessage: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  updating: PropTypes.bool,
};

SubmitChangeDayForm.defaultProps = {
  classes: {},
  selectedDay: null,
  updating: false,
};

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      payment_day: null,
    }),
    validationSchema: () =>
      Yup.object().shape({
        payment_day: Yup.number().required(),
      }),
    handleSubmit: (values, { props }) => {
      props.onSave({ bookingReference: props.bookingReference, ...values });
    },
    displayName: 'SubmitChangeDayForm',
  }),

  withStyles(styles),
)(SubmitChangeDayForm);
