import { Button, InputField } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import hasValidPassword from '../../lib/validation/hasValidPassword';
import noop from 'lodash/noop';

class ChangePasswordForm extends PureComponent {
  static propTypes = {
    email: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    email: '',
    onSubmit: noop,
  };

  state = {
    oldPassword: '',
    oldPasswordFocused: false,
    oldPasswordDirty: false,

    newPassword: '',
    newPasswordFocused: false,
    newPasswordDirty: false,

    passwordConfirmation: '',
    passwordConfirmationFocused: false,
    passwordConfirmationDirty: false,
  };

  getOldPasswordErrors = () => {
    const { oldPassword, oldPasswordDirty, oldPasswordFocused } = this.state;

    // Still scope for old passwords before minimum length requirements brought in.
    return oldPasswordDirty && !oldPasswordFocused && !oldPassword.length
      ? ['Password must not be empty']
      : [];
  };

  handleOldPasswordBlur = () => this.setState({ oldPasswordFocused: false });

  handleOldPasswordChange = value => this.setState({ oldPassword: value });

  handleOldPasswordFocus = value => {
    this.setState({
      oldPassword: value,
      oldPasswordFocused: true,
      oldPasswordDirty: true,
    });
  };

  getNewPasswordErrors = () => {
    const { newPassword, newPasswordDirty, newPasswordFocused } = this.state;

    return newPasswordDirty &&
      !newPasswordFocused &&
      !hasValidPassword(newPassword)
      ? ['Password must be a minimum of 8 characters']
      : [];
  };

  handleNewPasswordBlur = () => this.setState({ newPasswordFocused: false });

  handleNewPasswordChange = value => this.setState({ newPassword: value });

  handleNewPasswordFocus = value => {
    this.setState({
      newPassword: value,
      newPasswordFocused: true,
      newPasswordDirty: true,
    });
  };

  getPasswordConfirmationErrors = () => {
    const {
      newPassword,
      passwordConfirmation,
      passwordConfirmationDirty,
      passwordConfirmationFocused,
    } = this.state;

    return passwordConfirmationDirty &&
      !passwordConfirmationFocused &&
      passwordConfirmation !== newPassword
      ? ['Passwords do not match']
      : [];
  };

  handlePasswordConfirmationBlur = () =>
    this.setState({ passwordConfirmationFocused: false });

  handlePasswordConfirmationChange = value =>
    this.setState({ passwordConfirmation: value });

  handlePasswordConfirmationFocus = value => {
    this.setState({
      passwordConfirmation: value,
      passwordConfirmationFocused: true,
      passwordConfirmationDirty: true,
    });
  };

  isValid = () =>
    this.getOldPasswordErrors().length === 0 &&
    this.getNewPasswordErrors().length === 0 &&
    this.getPasswordConfirmationErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    // If details aren't valid, return.
    if (!this.isValid()) {
      this.setState({
        oldPasswordDirty: true,
        newPasswordDirty: true,
        passwordConfirmationDirty: true,
      });
      return;
    }

    this.props.onSubmit({
      email: this.props.email,
      old_password: this.state.oldPassword,
      new_password: this.state.newPassword,
    });
  };

  render() {
    return (
      <form className="ProfileUpdateForm" onSubmit={this.handleSubmit}>
        <h1 className="ProfileUpdateForm__header">Update Password</h1>
        <p className="ProfileUpdateForm__description">
          Your password must contain a minimum of 8 characters.
        </p>
        <div className="ProfileUpdateForm__row">
          <InputField
            id="current_password"
            label="Current Password"
            type="password"
            errors={this.getOldPasswordErrors()}
            onChange={this.handleOldPasswordChange}
            onBlur={this.handleOldPasswordBlur}
            onFocus={this.handleOldPasswordFocus}
          />
        </div>
        <div className="ProfileUpdateForm__row">
          <InputField
            id="new_password"
            label="New Password"
            type="password"
            errors={this.getNewPasswordErrors()}
            onChange={this.handleNewPasswordChange}
            onBlur={this.handleNewPasswordBlur}
            onFocus={this.handleNewPasswordFocus}
          />
        </div>
        <div className="ProfileUpdateForm__row">
          <InputField
            id="confirm_password"
            label="Confirm New Password"
            type="password"
            errors={this.getPasswordConfirmationErrors()}
            onChange={this.handlePasswordConfirmationChange}
            onBlur={this.handlePasswordConfirmationBlur}
            onFocus={this.handlePasswordConfirmationFocus}
          />
        </div>
        <div className="ProfileUpdateForm__actions">
          <Button
            type="submit"
            variant="success"
            disabled={
              !this.state.oldPasswordDirty ||
              !this.state.newPasswordDirty ||
              !this.state.passwordConfirmationDirty
            }>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default ChangePasswordForm;
