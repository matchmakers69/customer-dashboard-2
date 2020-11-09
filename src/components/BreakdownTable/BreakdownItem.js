import { Badge, Icon, withUI } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { formatPrice } from '../../lib/formatting';
import styles from './BreakdownItem.styles';
import withStyles from 'react-jss';

const BreakdownItem = ({
  subItem,
  title,
  subtitle,
  quantity,
  cost,
  costText,
  badges,
  type,
  showIcon,
  currencyExponent,
  currencySymbol,
  classes,
  disabled,
}) => {
  const rootClasses = classNames({
    [classes.breakdownItem]: true,
    [classes.disabled]: disabled,
    [classes.subItem]: subItem,
  });
  const typeMappings = {
    accommodation: 'iconAccommodation',
    tickets: 'iconTicket',
    extras: 'iconExtra',
    'accommodation-extras': 'iconExtra',
    delivery: 'iconDelivery',
  };

  return (
    <div className={rootClasses}>
      <div className={classes.icon}>
        {showIcon && <Icon icon={typeMappings[type]} />}
      </div>
      <div className={classes.description}>
        {title}
        {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
        {badges.length > 0 && (
          <div className={classes.badges}>
            {badges.map(badge => (
              <Badge key={badge} text={badge.text} type={badge.type} />
            ))}
          </div>
        )}
      </div>
      <div className={classes.quantity}>{quantity}</div>
      <div className={classes.price}>
        {costText || formatPrice(currencySymbol, cost, currencyExponent)}
      </div>
    </div>
  );
};

BreakdownItem.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
    }),
  ),
  classes: PropTypes.object,
  cost: PropTypes.number,
  costText: PropTypes.string,
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  quantity: PropTypes.number,
  showIcon: PropTypes.bool,
  subItem: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

BreakdownItem.defaultProps = {
  badges: [],
  classes: {},
  cost: null,
  costText: '',
  disabled: false,
  quantity: null,
  showIcon: false,
  subItem: false,
  subtitle: null,
};

export default withUI(withStyles(styles)(BreakdownItem));
