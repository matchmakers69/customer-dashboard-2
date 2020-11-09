import PropTypes from 'prop-types';
import React from 'react';
import { Title } from '@kaboodle-solutions/design-system';
import camelCase from 'lodash/camelCase';
import styles from './SidebarActions.styles';
import withStyles from 'react-jss';

const SidebarActions = ({ classes, actions }) => (
  <div className={classes.sidebar}>
    <Title>Actions</Title>
    {actions
      .filter(action => action.active)
      .map(({ label, action }) => {
        const handleAction = action;
        return (
          <button
            data-test={`sidebarAction-${camelCase(label)}`}
            key={label}
            type="button"
            className={classes.action}
            onClick={handleAction}>
            {label}
          </button>
        );
      })}
  </div>
);

SidebarActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  classes: PropTypes.shape({
    action: PropTypes.string.isRequired,
    sidebar: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SidebarActions);
