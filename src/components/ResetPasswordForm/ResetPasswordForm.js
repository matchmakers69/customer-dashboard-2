import { Button, InputField } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import constants from '../../constants';
import { isEmail } from 'validator';
import styles from './ResetPasswordForm.styles';
import withStyles from 'react-jss';

class ResetPasswordForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    classes: {},
    onSubmit: null,
  };

  state = {
    email: '',
    emailFocused: false,
    emailDirty: false,
  };

  getEmailErrors = () => {
    const { email, emailDirty, emailFocused } = this.state;

    return emailDirty && !emailFocused && !isEmail(email)
      ? ['Invalid email address']
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

  isValid = () => this.getEmailErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    // If details aren't valid, return.
    if (!this.isValid()) {
      this.setState({ emailDirty: true });
      return;
    }

    this.props.onSubmit(this.state.email);
  };

  render() {
    const { LOGIN_URL } = constants;
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
        <div className={classes.actions}>
          <Button
            type="submit"
            variant="secondary"
            disabled={!isEmail(this.state.email)}>
            Reset Password
          </Button>
        </div>
        <div className={classes.links}>
          <Link className={classes.link} to={LOGIN_URL}>
            Login with an existing account
          </Link>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ResetPasswordForm);
