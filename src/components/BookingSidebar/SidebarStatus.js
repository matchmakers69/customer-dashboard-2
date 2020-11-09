import {
  PAYMENT_STATUS_AWAITING,
  PAYMENT_STATUS_FULLYPAID,
  PAYMENT_STATUS_MESSAGES,
  PAYMENT_STATUS_OUTSTANDING,
  PAYMENT_STATUS_OVERDUE,
  PAYMENT_STATUS_OVERPAID,
} from '../../constants';

import PropTypes from 'prop-types';
import React from 'react';
import { Title } from '@kaboodle-solutions/design-system';
import classNames from 'classnames';
import styles from './BookingSidebar.styles';
import withStyles from 'react-jss';

const SidebarStatus = ({ classes, code }) => {
  const PAYMENT_STATUS_CLASSES = {
    [PAYMENT_STATUS_OUTSTANDING]: 'warning',
    [PAYMENT_STATUS_OVERDUE]: 'danger',
    [PAYMENT_STATUS_FULLYPAID]: 'success',
    [PAYMENT_STATUS_AWAITING]: 'danger',
    [PAYMENT_STATUS_OVERPAID]: 'warning',
  };

  const statusClasses = classNames(
    classes.status,
    classes[PAYMENT_STATUS_CLASSES[code]],
    classes.default,
  );

  return (
    <div className={classes.sidebarSection}>
      <Title>Status</Title>
      <span className={statusClasses}>{PAYMENT_STATUS_MESSAGES[code]}</span>
    </div>
  );
};

SidebarStatus.propTypes = {
  classes: PropTypes.object,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SidebarStatus.defaultProps = {
  classes: {},
  code: '',
};

export default withStyles(styles)(SidebarStatus);
