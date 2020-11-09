import { Button } from '@kaboodle-solutions/design-system';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { goBack as goBackFunc } from 'connected-react-router';
import { noop } from 'lodash.noop';
import styles from './ErrorPage.styles';
import withStyles from 'react-jss';

const ErrorPage = ({ goBack, history, classes }) => (
  <div className={classes.container}>
    <h1 className={classes.header}>It seems something went wrong.</h1>
    <p>
      There seems to have been an issue handling your request. Please try again.
    </p>
    <br />
    {history.length > 2 ? (
      <Button onClick={goBack}>Go back to previous page</Button>
    ) : (
      <Link to={constants.BOOKINGS_URL}>
        <Button>Go to dashboard</Button>
      </Link>
    )}
  </div>
);

ErrorPage.propTypes = {
  classes: PropTypes.object,
  goBack: PropTypes.func,
  history: PropTypes.object,
};

ErrorPage.defaultProps = {
  classes: {},
  goBack: noop,
  history: {},
};

const mapDispatchToProps = {
  goBack: goBackFunc,
};

export { ErrorPage };

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(ErrorPage);
