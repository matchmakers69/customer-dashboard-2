import { Button } from '@kaboodle-solutions/design-system';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { goBack as goBackFunc } from 'connected-react-router';
import { noop } from 'lodash.noop';
import styles from './PageNotFound.styles';
import withStyles from 'react-jss';

const PageNotFound = ({ history, goBack, classes }) => (
  <div className={classes.container}>
    <h1 className={classes.header}>This page does not exist!</h1>
    <p>The page you&apos;re looking for cannot be found.</p>
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

PageNotFound.propTypes = {
  classes: PropTypes.object,
  goBack: PropTypes.func,
  history: PropTypes.object,
};

PageNotFound.defaultProps = {
  classes: {},
  goBack: noop,
  history: {},
};

const mapDispatchToProps = {
  goBack: goBackFunc,
};

export { PageNotFound };

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(PageNotFound);
