import { Button, Select } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import constants from '../../constants';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import styles from './ProfileGenderForm.styles';
import withStyles from 'react-jss';

class ProfileGenderForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    gender: PropTypes.object,
    genderOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    gender: null,

    onSubmit: noop,
  };

  state = {
    gender: '',
    genderFocused: false,
    genderDirty: false,
    updating: false,
  };

  getGenderErrors = () => {
    const { genderOptions } = this.props;
    const { gender, genderDirty, genderFocused } = this.state;

    return genderDirty &&
      !genderFocused &&
      !genderOptions.some(option => isEqual(option, gender))
      ? ['Invalid gender']
      : [];
  };

  handleGenderBlur = () => this.setState({ genderFocused: false });

  handleGenderChange = value =>
    this.setState(prevState => ({
      gender: value,
      genderDirty: prevState.gender !== this.props.gender,
    }));

  handleGenderFocus = value => {
    this.setState({
      gender: value,
      genderFocused: true,
    });
  };

  isValid = () => this.getGenderErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    // If gender hasn't been changed, return.
    if (!this.state.genderDirty || !this.isValid()) {
      return;
    }

    this.setState({ updating: true });

    this.props.onSubmit(
      {
        personal_details: { gender: this.state.gender.value },
      },
      constants.PROFILE_DETAILS_URL,
    );
  };

  render() {
    const { gender, genderOptions, classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <h1 className={classes.header}>Update Gender</h1>
        <p className={classes.description}>Update your gender.</p>
        <div className={classes.row}>
          <Select
            label="Gender"
            onFocus={this.handleGenderFocus}
            onChange={this.handleGenderChange}
            onBlur={this.handleGenderBlur}
            options={genderOptions}
            defaultValue={gender}
            errors={this.getGenderErrors()}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            variant="success"
            loading={this.state.updating}
            disabled={!this.state.genderDirty}>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ProfileGenderForm);
