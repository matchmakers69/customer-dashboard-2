import { Address } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './DetailsListAddressField.styles';
import withStyles from 'react-jss';

const DetailsListAddressField = ({
  title,
  value: address,
  type,
  children,
  classes,
}) => (
  <div className={classes.detailsListAddressField}>
    <div className={classes.summary}>
      <div className={classes.title}>{title}</div>
      {type !== 'hidden' && (
        <div className={classes.value}>
          <Address address={address} />
        </div>
      )}
    </div>
    <div className={classes.buttons}>{children}</div>
  </div>
);

DetailsListAddressField.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.shape({
    // eslint-disable-next-line camelcase
    address_1: PropTypes.string.isRequired,
    // eslint-disable-next-line camelcase
    address_2: PropTypes.string,
    // eslint-disable-next-line camelcase
    address_3: PropTypes.string,
    city: PropTypes.string.isRequired,
    county: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    country: PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

DetailsListAddressField.defaultProps = {
  children: null,
  classes: {},
  title: '',
  type: undefined,
};

export default withStyles(styles)(DetailsListAddressField);
