import * as Yup from 'yup';

import { Button, Form, Select } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { compose } from 'redux';
import { ordinalDays } from '../../lib/dates';
import styles from './ChangeDayForm.styles';
import { withFormik } from 'formik';
import withStyles from 'react-jss';

const ChangeDayForm = ({
  classes,
  setValues,
  values,
  isValid,
  handleSubmit,
  dirty,
}) => {
  const handleSelectingDay = (field, value, requiresSelect = false) => {
    setValues({
      day: value,
      complete: true,
      meta: {
        field,
        requiresSelect,
      },
    });
  };

  const handleShowSelector = () => {
    if (values.meta.requiresSelect) {
      return;
    }
    setValues({
      day: null,
      complete: false,
      meta: {
        field: 'specificDay',
        requiresSelect: true,
      },
    });
  };

  const isSelected = id => (id === values.meta.field ? 'info' : 'default');

  const showSelectClasses = classNames({
    [classes.requiresSelect]: true,
    [classes.showSelect]: values.meta.requiresSelect,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.form}>
        <Form.Fieldset>
          <Form.Legend>Select day option</Form.Legend>
          <div className={classes.suggestedDates}>
            <Button
              variant={isSelected('firstDay')}
              size="small"
              onClick={() => {
                handleSelectingDay('firstDay', 1);
              }}>
              1st
            </Button>

            <Button
              variant={isSelected('lastDay')}
              size="small"
              onClick={() => {
                handleSelectingDay('lastDay', 31);
              }}>
              Last day of the month
            </Button>
          </div>
          <Button
            variant={isSelected('specificDay')}
            size="small"
            onClick={handleShowSelector}>
            Specific day
          </Button>
        </Form.Fieldset>
        <Form.Fieldset>
          <div className={showSelectClasses}>
            <Form.Legend>Select specific Day</Form.Legend>
            <Select
              options={ordinalDays}
              disabled={!values.meta.requiresSelect}
              onChange={({ value }) =>
                handleSelectingDay('specificDay', value, true)
              }
            />
          </div>
        </Form.Fieldset>
      </div>
      <div className={classes.actions}>
        <Button
          variant="success"
          type="submit"
          size="medium"
          disabled={!isValid || !dirty}>
          Show new payment plan
        </Button>
      </div>
    </Form>
  );
};

ChangeDayForm.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    suggestedDates: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
    requiresSelect: PropTypes.string.isRequired,
    showSelect: PropTypes.string.isRequired,
  }).isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape({
    day: PropTypes.number,
    complete: PropTypes.bool.isRequired,
    meta: PropTypes.shape({
      field: PropTypes.string,
      requiresSelect: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      day: null,
      complete: false,
      meta: {
        field: null,
        requiresSelect: false,
      },
    }),
    validationSchema: () =>
      Yup.object().shape({
        day: Yup.number().required(),

        complete: Yup.bool()
          .required()
          .oneOf([true]),
      }),
    handleSubmit: (values, { props }) => {
      props.updateSelectedDay(values.day);
      props.onRequest({ bookingReference: props.bookingReference, ...values });
    },
    displayName: 'ChangeDayForm',
  }),

  withStyles(styles),
)(ChangeDayForm);
