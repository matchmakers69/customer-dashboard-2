import * as Sentry from '@sentry/browser';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer, { authTypes } from './auth';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import bookingReducer from './booking';
import bookingsReducer from './bookings';
import clientReducer from './client/reducers';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import createSentryMiddleware from 'redux-sentry-middleware';
import customerReducer from './customer/reducers';
import errorsReducer from './errors/reducers';
import { isSentryEnabled } from '../lib/logging';
import messagesReducer from './messages/reducers';
import paymentsReducer from './payments/reducers';
import sagas from '../sagas';
import uiReducer from './ui/reducers';

const history = createBrowserHistory();

const appReducer = combineReducers({
  auth: authReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  customer: customerReducer,
  client: clientReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  ui: uiReducer,
  payments: paymentsReducer,
  router: connectRouter(history),
});

const rootReducer = (state, action) => {
  // If logged out, reset the application state to clear any user data.
  if (action.type === authTypes.LOGOUT_SUCCESS) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];

if (isSentryEnabled()) {
  middleware.push(createSentryMiddleware(Sentry));
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

sagaMiddleware.run(sagas);

export { history };

export default store;
