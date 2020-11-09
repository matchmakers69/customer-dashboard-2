import React, { Component, Suspense } from 'react';

import { Helmet } from 'react-helmet';
import { Loader } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { authOperations } from './store/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from './constants';
import { getCurrentPath } from './selectors/router';
import { uiOperations } from './store/ui';
import { validateAuthInStore } from './selectors/auth';
import { withRouter } from 'react-router';

class PageLoader extends Component {
  static propTypes = {
    apiCheck: PropTypes.bool.isRequired,
    checkAuth: PropTypes.func.isRequired,
    component: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    resetRequired: PropTypes.bool.isRequired,
    ui: PropTypes.shape({
      displayHeader: PropTypes.bool,
      displayFooter: PropTypes.bool,
    }).isRequired,
    updateUI: PropTypes.func.isRequired,
    validAuthInStore: PropTypes.bool.isRequired,
  };

  static getDerivedStateFromError() {
    return { has_errors: true };
  }

  constructor() {
    super();
    this.state = {
      has_errors: false,
    };
  }

  componentDidMount() {
    this.updateUI();
    if (!this.props.validAuthInStore) {
      this.props.checkAuth();
    }
  }

  updateUI() {
    if (this.props.ui) {
      this.props.updateUI(this.props.ui);
    } else {
      this.props.updateUI({
        displayHeader: true,
        displayFooter: true,
      });
    }
  }

  render() {
    const { ERROR_URL, LOGIN_URL, CHANGE_PASSWORD_URL } = constants;

    if (this.state.has_errors) {
      return (
        <div data-testid="error-found">
          <Redirect to={ERROR_URL} />
        </div>
      );
    }

    if (this.props.validAuthInStore && this.props.apiCheck) {
      // Redirect to password change if reset required.
      if (
        this.props.resetRequired &&
        this.props.currentPath !== CHANGE_PASSWORD_URL &&
        this.props.currentPath !== LOGIN_URL
      ) {
        return <Redirect to={CHANGE_PASSWORD_URL} />;
      }

      const LoadedComponent = this.props.component;

      return (
        <Suspense fallback={<Loader />}>
          <Helmet title={this.props.title} />
          <LoadedComponent {...this.props} />
        </Suspense>
      );
    }

    if (!this.props.validAuthInStore && this.props.apiCheck) {
      return (
        <div data-testid="login-failed">
          <Redirect to={LOGIN_URL} />
        </div>
      );
    }

    return <Loader />;
  }
}

PageLoader.propTypes = {
  title: PropTypes.string,
  ui: PropTypes.shape({
    displayHeader: PropTypes.bool,
    displayFooter: PropTypes.bool,
  }),
};

PageLoader.defaultProps = {
  title: 'Dashboard',
  ui: {
    displayHeader: true,
    displayFooter: true,
  },
};

const mapStateToProps = state => ({
  validAuthInStore: validateAuthInStore(state),
  apiCheck: state.auth.apiCheck,
  resetRequired: state.auth.resetRequired,
  currentPath: getCurrentPath(state),
});

const mapDispatchToProps = {
  checkAuth: authOperations.loginCheck,
  updateUI: uiOperations.updateUI,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PageLoader);
