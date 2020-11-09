import { Button, InputField } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import constants from '../../constants';
import { isMobilePhone } from 'validator';
import noop from 'lodash/noop';
import styles from './ProfileEmergencyDetailsForm.styles';
import withStyles from 'react-jss';

class ProfileEmergencyDetailsForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fullName: PropTypes.string,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func,
    telephone: PropTypes.string,
  };

  static defaultProps = {
    fullName: '',
    loading: false,
    onSubmit: noop,
    telephone: '',
  };

  constructor(props) {
    super();
    this.state = {
      fullName: props.fullName,
      telephone: props.telephone,
      nameFocused: false,
      nameDirty: false,
      telephoneDirty: false,
      telephoneFocused: false,
      updating: false,
    };
  }

  getNameErrors = () => {
    const { fullName, nameFocused, nameDirty } = this.state;

    return nameDirty && !nameFocused && fullName.length === 0
      ? ['Name cannot be blank']
      : [];
  };

  getTelephoneErrors = () => {
    const { telephone, telephoneFocused, telephoneDirty } = this.state;

    return telephoneDirty && !telephoneFocused && !isMobilePhone(telephone)
      ? ['Invalid telephone number']
      : [];
  };

  handleNameBlur = value =>
    this.setState({
      nameFocused: false,
      nameDirty: value !== this.props.fullName,
    });

  handleTelephoneBlur = value =>
    this.setState({
      telephoneFocused: false,
      telephoneDirty: value !== this.props.telephone,
    });

  handleTelephoneChange = value =>
    this.setState({
      telephone: value,
      telephoneDirty: value !== this.props.fullName,
    });

  handleNameChange = value =>
    this.setState({
      fullName: value,
      nameDirty: value !== this.props.fullName,
    });

  handleTelephoneFocus = value => {
    this.setState({
      telephone: value,
      telephoneFocused: true,
      telephoneDirty: value !== this.props.telephone,
    });
  };

  handleNameFocus = value => {
    this.setState({
      fullName: value,
      nameFocused: true,
      nameDirty: value !== this.props.fullName,
    });
  };

  isValid = () =>
    this.getTelephoneErrors().length === 0 && this.getNameErrors().length === 0;

  handleSubmit = event => {
    event.preventDefault();

    // If details aren't valid, or a request is already in process or telephone not updated, return.
    if (!this.isValid() || this.props.loading || !this.isDirty()) {
      return;
    }
    this.setState({ updating: true });
    this.props.onSubmit(
      {
        emergency_contact: {
          full_name: this.state.fullName,
          telephone: this.state.telephone,
        },
      },
      constants.PROFILE_DETAILS_URL,
    );
  };

  isDirty = () => this.state.telephoneDirty || this.state.nameDirty;

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <h1 className={classes.header}>Update Emergency Contact Details</h1>
        <p className={classes.description}>
          An emergency contact is someone you‘re happy for us to get in touch
          with on your behalf in the unlikely event we need to.
        </p>
        <div className={classes.row}>
          <InputField
            id="name"
            label="Name"
            errors={this.getNameErrors()}
            onChange={this.handleNameChange}
            onBlur={this.handleNameBlur}
            onFocus={this.handleNameFocus}
            defaultValue={this.props.fullName}
          />
        </div>
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
            disabled={!this.isDirty()}>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ProfileEmergencyDetailsForm);
