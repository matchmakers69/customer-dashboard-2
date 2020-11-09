import { Icon, Price, Switch } from '@kaboodle-solutions/design-system';
import {
  RESALABLE,
  RESALE_ENABLED,
  RESALE_MESSAGES,
  RESALE_SOLD,
} from '../../constants';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import noop from 'lodash.noop';
import styles from './ResaleItem.styles';
import { truncate } from '../../lib/strings';
import withStyles from 'react-jss';

const ResaleItem = ({
  classes,
  title,
  barcode,
  customer,
  price,
  type,
  status,
  editable,
  onChange,
}) => {
  const hasStatus = statusType => status === statusType;
  const resaleMessage = RESALE_MESSAGES[status];

  const ITEM_ICON_MAPPINGS = {
    accommodation: 'iconAccommodation',
    tickets: 'iconTicket',
    extras: 'iconExtra',
    'accommodation-extras': 'iconExtra',
  };
  const icon = ITEM_ICON_MAPPINGS[type];

  return (
    <div
      className={classNames({
        [classes.resaleable]: hasStatus(RESALABLE),
        [classes.resale]: hasStatus(RESALE_ENABLED),
        [classes.resold]: hasStatus(RESALE_SOLD),
        [classes.editable]: editable && !hasStatus(RESALE_SOLD),
      })}>
      <div className={classes.icon}>
        <Icon icon={icon} />
      </div>

      <div className={classes.details}>
        <div className={classes.meta}>
          <div className={classes.title}>{truncate(title)}</div>

          {customer && (
            <div className={classes.customer}>
              <Icon icon="iconCustomer" />
              <span className={classes.customerName}>{customer}</span>
            </div>
          )}
          {barcode && (
            <div className={classes.barcode}>
              <Icon icon="iconBarcode" />
              <span className={classes.barcodeNumber}>{barcode}</span>
            </div>
          )}
          {!hasStatus(RESALE_SOLD) && (
            <div className={classes.price}>
              <Price value={price} />
            </div>
          )}
        </div>

        {editable && !hasStatus(RESALE_SOLD) && (
          <div className={classes.switch}>
            <Switch onChange={onChange} checked={hasStatus(RESALE_ENABLED)} />
          </div>
        )}
        {(!editable || hasStatus(RESALE_SOLD)) && (
          <div className={classes.status}>{resaleMessage}</div>
        )}
      </div>
    </div>
  );
};

ResaleItem.propTypes = {
  barcode: PropTypes.string,
  classes: PropTypes.object.isRequired,
  customer: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  price: PropTypes.number.isRequired,
  status: PropTypes.oneOf([RESALABLE, RESALE_ENABLED, RESALE_SOLD]).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'accommodation',
    'tickets',
    'extras',
    'accommodation-extras',
  ]).isRequired,
};

ResaleItem.defaultProps = {
  barcode: null,
  customer: null,
  editable: false,
  onChange: noop,
};

export default withStyles(styles)(ResaleItem);
