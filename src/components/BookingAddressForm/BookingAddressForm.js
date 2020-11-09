import { Button, InputField, Select } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import styles from './BookingAddressForm.styles';
import withStyles from 'react-jss';

class BookingAddressForm extends PureComponent {
  static propTypes = {
    address: PropTypes.shape({
      address_1: PropTypes.string.isRequired,
      address_2: PropTypes.string,
      address_3: PropTypes.string,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      postcode: PropTypes.string.isRequired,
      country: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
      }).isRequired,
    }).isRequired,
    allocationId: PropTypes.number.isRequired,
    bookingReference: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    address_1: this.props.address.address_1,
    address1Dirty: false,

    address_2: this.props.address.address_2,
    address2Dirty: false,

    address_3: this.props.address.address_3,
    address3Dirty: false,

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
    this.setState(prevState => ({
      [field]: value,
      [`${field}Dirty`]: value !== prevState[field],
    }));
  };

  isValid = () =>
    this.state.address_1 &&
    this.state.address_2 &&
    this.state.address_3 &&
    this.state.city &&
    this.state.county &&
    this.state.postcode &&
    this.state.country;

  handleSubmit = event => {
    event.preventDefault();

    // Don't submit unless required fields filled in.
    if (!this.isValid()) {
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

    this.props.onSubmit(this.props.bookingReference, this.props.allocationId, {
      address: {
        address_1,
        address_2,
        address_3,
        city,
        postcode,
        county,
        country_id: country.value,
      },
    });
  };

  render() {
    const {
      classes,
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
    } = this.props;
    return (
      <form
        data-test="booking-address-form"
        className={classes.form}
        onSubmit={this.handleSubmit}>
        <h1 className={classes.header}>Update Delivery Address</h1>
        <p className={classes.description}>
          Update the delivery address for this booking.
        </p>
        <div className={classes.row}>
          <InputField
            id="address_1"
            label="Address Line 1"
            onChange={value => this.handleAddressRowChange('address_1', value)}
            defaultValue={address_1}
            required
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="address_2"
            label="Address Line 2"
            onChange={value => this.handleAddressRowChange('address_2', value)}
            defaultValue={address_2}
            required
          />
        </div>
        <div className={classes.row}>
          <InputField
            id="address_3"
            label="Address Line 3"
            onChange={value => this.handleAddressRowChange('address_3', value)}
            defaultValue={address_3}
            required
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
            required
          />
        </div>
        <div className={classes.row}>
          <Select
            className="Select__country"
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
            disabled={!this.isValid()}>
            Update
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(BookingAddressForm);
