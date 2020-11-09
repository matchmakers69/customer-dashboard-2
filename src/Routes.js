import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from './containers/ErrorPage';
import { Helmet } from 'react-helmet';
import LoginPage from './containers/LoginPage';
import PageLoader from './PageLoader';
import PageNotFound from './containers/PageNotFound';
import ResetPasswordPage from './containers/ResetPasswordPage';
import asyncComponent from './lib/asyncComponent';
import constants from './constants';

const {
  BOOKINGS_URL,
  BOOKING_URL,
  BOOKING_RESALE_URL,
  BOOKING_UPDATE_DELIVERY_URL,
  BOOKING_PAYMENT_PLAN_VIEW_URL,
  BOOKING_PAYMENT_PLAN_CHANGE_PAYMENT_URL,
  BOOKING_PAYMENT_PLAN_CHANGE_DAY_URL,
  BOOKING_MAKE_PAYMENT_URL,
  PROFILE_URL,
  PROFILE_DETAILS_URL,
  PROFILE_DETAILS_TELEPHONE_URL,
  PROFILE_DETAILS_DOB_URL,
  PROFILE_DETAILS_PASSWORD_URL,
  PROFILE_DETAILS_EMERGENCY_CONTACT_URL,
  PROFILE_DETAILS_ADDRESSES_URL,
  PROFILE_DETAILS_ADDRESS_URL,
  LOGIN_URL,
  ERROR_URL,
  RESET_PASSWORD_URL,
  CHANGE_PASSWORD_URL,
  PAGE_TITLE_SUFFIX,
} = constants;

const getPageTitle = title => `${title} - ${PAGE_TITLE_SUFFIX}`;

const renderWithTitle = (title, Page) => (
  <Fragment>
    <Helmet title={getPageTitle(title)} />
    <Page />
  </Fragment>
);

const routesMapper = [
  {
    path: BOOKINGS_URL,
    title: getPageTitle('Bookings'),
    component: asyncComponent(() => import('./containers/BookingsPage')),
  },
  {
    path: BOOKING_URL,
    title: getPageTitle('My Booking'),
    component: asyncComponent(() => import('./containers/BookingPage')),
  },
  {
    path: BOOKING_RESALE_URL,
    title: getPageTitle('Booking Resale'),
    component: asyncComponent(() => import('./containers/BookingResalePage')),
  },
  {
    path: BOOKING_PAYMENT_PLAN_VIEW_URL,
    title: getPageTitle('Payment Plan'),
    component: asyncComponent(() => import('./containers/PaymentPlanPage')),
  },
  {
    path: BOOKING_PAYMENT_PLAN_CHANGE_PAYMENT_URL,
    title: getPageTitle('Change Payment Details'),
    component: asyncComponent(() =>
      import('./containers/PaymentPlanChangePaymentPage'),
    ),
  },
  {
    path: BOOKING_PAYMENT_PLAN_CHANGE_DAY_URL,
    title: getPageTitle('Change Payment Day'),
    component: asyncComponent(() =>
      import('./containers/PaymentPlanChangeDayPage'),
    ),
  },
  {
    path: BOOKING_MAKE_PAYMENT_URL,
    title: getPageTitle('Your Outstanding Balance'),
    component: asyncComponent(() => import('./containers/MakePaymentPage')),
  },
  {
    path: BOOKING_UPDATE_DELIVERY_URL,
    title: getPageTitle('Update Delivery Address'),
    component: asyncComponent(() => import('./containers/BookingAddressPage')),
  },
  {
    path: PROFILE_URL,
    title: getPageTitle('My Profile'),
    component: asyncComponent(() => import('./containers/ProfilePage')),
  },
  {
    path: PROFILE_DETAILS_URL,
    title: getPageTitle('My Details'),
    component: asyncComponent(() => import('./containers/ProfileDetailsPage')),
  },
  {
    path: PROFILE_DETAILS_TELEPHONE_URL,
    title: getPageTitle('Update Telephone Number'),
    component: asyncComponent(() =>
      import('./containers/ProfileTelephonePage'),
    ),
  },
  {
    path: PROFILE_DETAILS_DOB_URL,
    title: getPageTitle('Update Date of Birth'),
    component: asyncComponent(() =>
      import('./containers/ProfileDateOfBirthPage'),
    ),
  },
  {
    path: PROFILE_DETAILS_PASSWORD_URL,
    title: getPageTitle('Update Password'),
    component: asyncComponent(() => import('./containers/ProfilePasswordPage')),
  },
  {
    path: PROFILE_DETAILS_EMERGENCY_CONTACT_URL,
    title: getPageTitle('Update Emergency Contact Details'),
    component: asyncComponent(() =>
      import('./containers/ProfileEmergencyContactPage'),
    ),
  },
  {
    path: PROFILE_DETAILS_ADDRESSES_URL,
    title: getPageTitle('Address Book'),
    component: asyncComponent(() =>
      import('./containers/ProfileAddressesPage'),
    ),
  },
  {
    path: PROFILE_DETAILS_ADDRESS_URL,
    title: getPageTitle('Update Saved Address'),
    component: asyncComponent(() => import('./containers/ProfileAddressPage')),
  },
  {
    path: CHANGE_PASSWORD_URL,
    title: getPageTitle('Update Password'),
    component: asyncComponent(() => import('./containers/ChangePasswordPage')),
  },
];

const Routes = () => (
  <Switch>
    {routesMapper.map(route => (
      <Route
        key={route.path}
        exact
        path={route.path}
        render={() => (
          <PageLoader
            title={route.title}
            component={route.component}
            ui={route.ui}
          />
        )}
      />
    ))}

    <Route
      exact
      path={LOGIN_URL}
      render={() => renderWithTitle('Login', LoginPage)}
    />
    <Route
      exact
      path={RESET_PASSWORD_URL}
      render={() => renderWithTitle('Password Reset', ResetPasswordPage)}
    />
    <Route
      path={ERROR_URL}
      render={() => renderWithTitle('Error', ErrorPage)}
    />
    <Route render={() => renderWithTitle('Page Not Found', PageNotFound)} />
  </Switch>
);

export default Routes;
