import React, { PureComponent } from 'react';

import { Button } from '@kaboodle-solutions/design-system';
import InputField from '../InputField';
import PropTypes from 'prop-types';
import constants from '../../constants';
import format from 'date-fns/format';
import noop from 'lodash/noop';
import styles from './ProfileDateOfBirthForm.styles';
import withStyles from 'react-jss';

class ProfileDateOfBirthForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dateOfBirth: PropTypes.instanceOf(Date),
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    dateOfBirth: null,
    onSubmit: noop,
  };

  state = {
    dateOfBirthDirty: false,
    day: '',
    month: '',
    year: '',
    updating: false,
  };

  componentDidMount = () => {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      day: this.getDefaultDay(),
      month: this.getDefaultMonth(),
      year: this.getDefaultYear(),
    });
  };

  checkDate = (year, month, day) => {
    const lastDayOfMonth = new Date(year, month, 0);
    return day > 0 && day <= lastDayOfMonth.getDate();
  };

  getDayErrors = () => {
    const { dateOfBirthDirty, day, month, year } = this.state;
    return dateOfBirthDirty && (day < 1 || !this.checkDate(year, month, day))
      ? ['Invalid day']
      : [];
  };

  getMonthErrors = () => {
    const { dateOfBirthDirty, month } = this.state;
    return dateOfBirthDirty && (month < 1 || month > 12)
      ? ['Invalid month']
      : [];
  };

  getDateOfBirthErrors = () => {
    const today = new Date();
    const minDate = new Date(1900, 0);
    const { day, dateOfBirthDirty, month, year } = this.state;

    if (dateOfBirthDirty) {
      // if at least one field has been changed, assign date to new Date object
      // month is -1 because JS dates start from zero
      const dob = new Date(year, month - 1, day);
      if (dob >= today) {
        // return an error if the given date is after today
        return ['Date of birth must be in the past'];
      } else if (dob <= minDate) {
        // return an error if year is before 1900, or is fewer than 4 chars
        return ['Please enter a valid year'];
      }
      return [];
    }
    // reset errors to prevent crashing on field re-entry
    return [];
  };

  getErrors = () => [
    ...this.getDayErrors(),
    ...this.getMonthErrors(),
    ...this.getDateOfBirthErrors(),
  ];

  getDefaultDay = () =>
    this.props.dateOfBirth ? this.props.dateOfBirth.getDate() : '';

  getDefaultMonth = () =>
    this.props.dateOfBirth ? this.props.dateOfBirth.getMonth() + 1 : '';

  getDefaultYear = () =>
    this.props.dateOfBirth ? this.props.dateOfBirth.getFullYear() : '';

  handleDateOfBirthChange = (field, value, maxLength = 4) => {
    if (value.length > maxLength) {
      return;
    }
    this.setState({
      [field]: value,
      // set dirty to false if field is entered and then erased to prevent empty submissions
      dateOfBirthDirty: Boolean(value),
    });
  };

  isValid = () =>
    this.state.dateOfBirthDirty &&
    this.getDayErrors().length === 0 &&
    this.getMonthErrors().length === 0 &&
    this.getDateOfBirthErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    const { day, dateOfBirthDirty, month, year } = this.state;

    // If dateOfBirth hasn't been changed, return.
    if (!dateOfBirthDirty || !this.isValid()) {
      return;
    }

    const dateOfBirthFormatted = format(
      new Date(`${year}-${month}-${day}`),
      'YYYY-MM-DD',
    );

    this.setState({ updating: true });

    this.props.onSubmit(
      {
        personal_details: { date_of_birth: dateOfBirthFormatted },
      },
      constants.PROFILE_DETAILS_URL,
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <h1 className={classes.header}>Update date of birth</h1>
        <p className={classes.description}>
          Your date of birth may be needed for some events. <br /> Example: 29
          07 2000
        </p>
        <div className={classes.row}>
          <InputField.Group errors={this.getErrors()}>
            <InputField
              id="day"
              label="Day"
              pattern="\d*"
              autoComplete="bday-day"
              type="number"
              required
              onChange={event =>
                this.handleDateOfBirthChange('day', event.target.value, 2)
              }
              defaultValue={this.getDefaultDay()}
              value={this.state.day}
            />
            <InputField
              id="month"
              label="Month"
              pattern="\d*"
              autoComplete="bday-month"
              type="number"
              required
              onChange={event =>
                this.handleDateOfBirthChange('month', event.target.value, 2)
              }
              defaultValue={this.getDefaultMonth()}
              value={this.state.month}
            />
            <InputField
              id="year"
              label="Year"
              pattern="\d*"
              autoComplete="bday-year"
              type="number"
              required
              onChange={event =>
                this.handleDateOfBirthChange('year', event.target.value, 4)
              }
              defaultValue={this.getDefaultYear()}
              value={this.state.year}
            />
          </InputField.Group>
        </div>
        <div className="ProfileUpdateForm__actions">
          <Button
            type="submit"
            variant="success"
            loading={this.state.updating}
            disabled={!this.state.dateOfBirthDirty || !this.isValid()}>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ProfileDateOfBirthForm);
