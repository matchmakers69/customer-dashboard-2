import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCustomerActionsArray } from '../../selectors/customer';
import { goToRoute } from '../../lib/router';
import styles from './CustomerActions.styles';
import withStyles from 'react-jss';

const CustomerActions = ({ goTo, customerActions, classes }) => (
  <Fragment>
    {customerActions.map(action => (
      <Fragment key={action.id}>
        {action.updatable && (
          <button
            type="button"
            className={`${classes.link} ${action.id}`}
            onClick={() => goTo(action.link)}>
            {action.title}
          </button>
        )}
      </Fragment>
    ))}
  </Fragment>
);

CustomerActions.defaultProps = {
  customerActions: [],
};

CustomerActions.propTypes = {
  classes: PropTypes.shape({
    link: PropTypes.string.isRequired,
  }).isRequired,
  customerActions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      updatable: PropTypes.bool.isRequired,
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  goTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customerActions: getCustomerActionsArray(state),
});

const mapDispatchToProps = {
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CustomerActions);
