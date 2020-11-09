/**
 * App
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package DAS2
 * @author David Henderson <jack.wilsdon@kaboodle.co.uk>
 * @version id$
 */

import * as Sentry from '@sentry/browser';

import { UIContext, baseTheme } from '@kaboodle-solutions/design-system';
import store, { history } from './store';

import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'react-jss';
import { isSentryEnabled } from './lib/logging';
import { render } from 'react-dom';

if (isSentryEnabled()) {
  Sentry.init({
    dsn: 'https://7fe6a341ba8d44a08bc5024986bb9e78@sentry.io/1475506',
  });
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={baseTheme}>
        <UIContext.Provider
          value={{ currencyExponent: 2, currencySymbol: '£' }}>
          <App />
        </UIContext.Provider>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
