import {
  Address,
  Button,
  Col,
  Form,
  Grid,
  Select,
} from '@kaboodle-solutions/design-system';
import React, { useState } from 'react';

import InputField from '../InputField';
import PropTypes from 'prop-types';
import styles from './AddressManagement.styles';
import withStyles from 'react-jss';

const AddressManagement = ({ address, classes, countries, onChange }) => {
  const [showNewAddressForm, formVisible] = useState(false);

  const handleChange = (field, value) => onChange(field, value);

  const handleOnClick = () => {
    formVisible(false);
  };

  const isValid = () =>
    address.address_1.length &&
    address.city.length &&
    address.postcode.length &&
    Object.keys(address.country).length;

  return (
    <div>
      <Form.Fieldset>
        <Form.Legend>Billing Address</Form.Legend>
        {!showNewAddressForm && (
          <Grid>
            <Col sm={6}>
              <Address address={address} />
            </Col>
            <Col sm={6} className={classes.alignRight}>
              <Button
                loading={!countries.length}
                onClick={() => formVisible(!showNewAddressForm)}>
                {isValid() ? 'Change Address' : 'Add Address'}
              </Button>
            </Col>
          </Grid>
        )}
        {showNewAddressForm && (
          <>
            <InputField
              id="address_1"
              label="Address Line 1"
              type="string"
              value={address.address_1}
              onChange={event => handleChange('address_1', event.target.value)}
              required
            />
            <InputField
              id="address_2"
              label="Address Line 2"
              type="string"
              value={address.address_2}
              onChange={event => handleChange('address_2', event.target.value)}
            />
            <InputField
              id="address_3"
              label="Address Line 3"
              type="string"
              value={address.address_3}
              onChange={event => handleChange('address_3', event.target.value)}
            />
            <InputField
              id="city"
              label="City"
              type="string"
              value={address.city}
              onChange={event => handleChange('city', event.target.value)}
              required
            />
            <InputField.Group>
              <InputField
                id="county"
                label="County"
                type="string"
                value={address.county}
                groupedWidth={4}
                onChange={event => handleChange('county', event.target.value)}
              />
              <InputField
                id="postcode"
                label="Postcode"
                type="string"
                value={address.postcode}
                required
                onChange={event => handleChange('postcode', event.target.value)}
                groupedWidth={4}
              />
            </InputField.Group>
            <div className={classes.select}>
              <Select
                placeholder="Country"
                label="Country"
                options={countries}
                value={address.country}
                onChange={value => handleChange('country', value)}
                required
              />
            </div>

            <div className={classes.actions}>
              <Button
                disabled={!isValid()}
                variant="success"
                type="button"
                onClick={handleOnClick}>
                Update Address
              </Button>
            </div>
          </>
        )}
      </Form.Fieldset>
    </div>
  );
};

AddressManagement.propTypes = {
  address: PropTypes.shape({
    address_1: PropTypes.string.isRequired,
    address_2: PropTypes.string,
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      label: PropTypes.string,
    }).isRequired,
  }).isRequired,
  classes: PropTypes.shape({
    actions: PropTypes.string,
    select: PropTypes.string,
    alignRight: PropTypes.string,
  }).isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};

AddressManagement.defaultProps = {
  countries: [],
};

export default withStyles(styles)(AddressManagement);
