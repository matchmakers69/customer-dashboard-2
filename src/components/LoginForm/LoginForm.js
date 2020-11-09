import { Button, InputField } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import constants from '../../constants';
import { isEmail } from 'validator';
import styles from './LoginForm.styles';
import withStyles from 'react-jss';

class LoginForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    classes: {},
    loading: false,
    onSubmit: null,
  };

  state = {
    email: '',
    emailFocused: false,
    emailDirty: false,
    password: '',
    passwordFocused: false,
    passwordDirty: false,
  };

  getEmailErrors = () => {
    const { email, emailDirty, emailFocused } = this.state;

    return emailDirty && !emailFocused && !isEmail(email)
      ? ['Invalid email address']
      : [];
  };

  getPasswordErrors = () => {
    const { password, passwordDirty, passwordFocused } = this.state;

    return passwordDirty && !passwordFocused && password.length === 0
      ? ['Password must not be empty']
      : [];
  };

  handleEmailBlur = () => this.setState({ emailFocused: false });

  handleEmailChange = value => this.setState({ email: value });

  handleEmailFocus = () => {
    this.setState({
      emailFocused: true,
      emailDirty: true,
    });
  };

  handlePasswordBlur = () => this.setState({ passwordFocused: false });

  handlePasswordChange = value => this.setState({ password: value });

  handlePasswordFocus = () => {
    this.setState({
      passwordFocused: true,
      passwordDirty: true,
    });
  };

  isValid = () =>
    this.getEmailErrors().length === 0 && this.getPasswordErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    // If details aren't valid, or a request is already in process, return.
    if (!this.isValid() || this.props.loading) {
      this.setState({ emailDirty: true, passwordDirty: true });
      return;
    }

    this.props.onSubmit(this.state.email, this.state.password);
  };

  render() {
    const { RESET_PASSWORD_URL } = constants;
    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <div className={classes.row}>
          <InputField
            id="email"
            label="Email"
            errors={this.getEmailErrors()}
            onChange={this.handleEmailChange}
            onBlur={this.handleEmailBlur}
            onFocus={this.handleEmailFocus}
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="password"
            label="Password"
            type="password"
            errors={this.getPasswordErrors()}
            onChange={this.handlePasswordChange}
            onBlur={this.handlePasswordBlur}
            onFocus={this.handlePasswordFocus}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            variant="secondary"
            loading={this.props.loading}>
            Login
          </Button>
        </div>
        <div className={classes.links}>
          <Link className={classes.link} to={RESET_PASSWORD_URL}>
            Forgotten your password?
          </Link>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
