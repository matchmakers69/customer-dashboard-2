import { Button, InputField, Select } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import constants from '../../constants';
import styles from './ProfileAddressForm.styles';
import withStyles from 'react-jss';

class ProfileAddressForm extends PureComponent {
  static propTypes = {
    address: PropTypes.shape({
      address_1: PropTypes.string.isRequired,
      address_2: PropTypes.string,
      address_3: PropTypes.string,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      postcode: PropTypes.string.isRequired,
      country: PropTypes.shape({
        code: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number,
      }).isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    address_1: this.props.address.address_1,
    address_1Dirty: false,

    address_2: this.props.address.address_2,
    address_2Dirty: false,

    address_3: this.props.address.address_3,
    address_3Dirty: false,

    city: this.props.address.city,
    cityDirty: false,

    postcode: this.props.address.postcode,
    postcodeDirty: false,

    county: this.props.address.county,
    countyDirty: false,

    countryDirty: false,
    country: this.props.address.country,

    updating: false,
  };

  handleAddressRowChange = (field, value) => {
    this.setState(prevValue => ({
      [field]: value,
      [`${field}Dirty`]: value !== prevValue[field],
    }));
  };

  isDirty = () =>
    this.state.address_1Dirty ||
    this.state.address_2Dirty ||
    this.state.address_3Dirty ||
    this.state.cityDirty ||
    this.state.postcodeDirty ||
    this.state.countyDirty ||
    this.state.countryDirty;

  isValid = () =>
    this.state.address_1 &&
    this.state.city &&
    this.state.postcode &&
    this.state.country;

  handleSubmit = event => {
    event.preventDefault();

    // Don't submit unless details have been changed and required fields filled in.
    if (!this.isDirty() || !this.isValid()) {
      return;
    }

    const {
      address_1,
      address_2,
      address_3,
      city,
      postcode,
      county,
      country,
    } = this.state;

    this.setState({ updating: true });

    this.props.onSubmit(
      {
        address: {
          id: -1,
          type_id: 'home',
          address_1,
          address_2,
          address_3,
          city,
          post_code: postcode,
          county,
          country_code: country.code,
          country_id: country.value,
        },
      },
      constants.PROFILE_DETAILS_ADDRESSES_URL,
    );
  };

  render() {
    const {
      address: {
        address_1,
        address_2,
        address_3,
        city,
        county,
        postcode,
        country,
      },
      countries,
      classes,
    } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <h1 className={classes.header}>Update Address</h1>
        <p className={classes.description}>Update your primary address.</p>
        <div className={classes.row}>
          <InputField
            id="address1"
            label="Address Line 1"
            onChange={value => this.handleAddressRowChange('address_1', value)}
            defaultValue={address_1}
            required
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="address2"
            label="Address Line 2"
            onChange={value => this.handleAddressRowChange('address_2', value)}
            defaultValue={address_2}
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="address3"
            label="Address Line 3"
            onChange={value => this.handleAddressRowChange('address_3', value)}
            defaultValue={address_3}
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="city"
            label="City"
            onChange={value => this.handleAddressRowChange('city', value)}
            defaultValue={city}
            required
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="postcode"
            label="Postcode"
            onChange={value => this.handleAddressRowChange('postcode', value)}
            defaultValue={postcode}
            required
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="county"
            label="County"
            onChange={value => this.handleAddressRowChange('county', value)}
            defaultValue={county}
          />
        </div>
        <div className={classes.row}>
          <Select
            label="Country"
            options={countries}
            onChange={value => this.handleAddressRowChange('country', value)}
            defaultValue={country}
            required
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            variant="success"
            loading={this.state.updating}
            disabled={!this.isDirty() && !this.isValid()}>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ProfileAddressForm);
