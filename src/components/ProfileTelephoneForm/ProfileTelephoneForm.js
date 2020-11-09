import { Button, InputField } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import constants from '../../constants';
import { isMobilePhone } from 'validator';
import noop from 'lodash/noop';
import styles from './ProfileTelephoneForm.styles';
import withStyles from 'react-jss';

class ProfileTelephoneForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func,
    telephone: PropTypes.string,
  };

  static defaultProps = {
    loading: false,
    onSubmit: noop,
    telephone: '',
  };

  state = {
    telephone: '',
    telephoneFocused: false,
    telephoneDirty: false,
    updating: false,
  };

  getTelephoneErrors = () => {
    const { telephone, telephoneDirty, telephoneFocused } = this.state;

    return telephoneDirty && !telephoneFocused && !isMobilePhone(telephone)
      ? ['Invalid telephone number']
      : [];
  };

  handleTelephoneBlur = () => this.setState({ telephoneFocused: false });

  handleTelephoneChange = value => this.setState({ telephone: value });

  handleTelephoneFocus = value => {
    this.setState({
      telephone: value,
      telephoneFocused: true,
      telephoneDirty: true,
    });
  };

  isValid = () => this.getTelephoneErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    // If details aren't valid, or a request is already in process or telephone not updated, return.
    if (!this.isValid() || this.props.loading || !this.state.telephoneDirty) {
      this.setState({ telephoneDirty: true });
      return;
    }

    this.setState({ updating: true });

    this.props.onSubmit(
      { personal_details: { telephone: this.state.telephone } },
      constants.PROFILE_DETAILS_URL,
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <h1 className={classes.header}>Update Telephone</h1>
        <p className={classes.description}>
          If we need to get in touch about one of your bookings with us, We‘ll
          use this number to contact you.
        </p>
        <div className={classes.row}>
          <InputField
            id="telephone"
            label="Telephone"
            type="tel"
            errors={this.getTelephoneErrors()}
            onChange={this.handleTelephoneChange}
            onBlur={this.handleTelephoneBlur}
            onFocus={this.handleTelephoneFocus}
            defaultValue={this.props.telephone}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            variant="success"
            loading={this.state.updating}
            disabled={!this.state.telephoneDirty}>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ProfileTelephoneForm);
