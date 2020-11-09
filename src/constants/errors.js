/* eslint-disable import/exports-last */
import { routes } from './routes';

/*
 *  Web Service Errors
 */
export const LOGIN_TOKEN_NOT_SUPPLIED = 11000011;
export const LOGIN_TOKEN_EXPIRED = 11000010;

// Booking related errors (13 series)
const BOOKING_NOT_FOUND = 13000010;

// Customer account related errors (15 series)
export const CUSTOMER_ACCOUNT_NOT_FOUND = 15000010;
export const CUSTOMER_ACCOUNT_LOCKED = 15000030;
export const CUSTOMER_EMAIL_NOT_VERIFIED = 15000040;
export const CUSTOMER_PASSWORD_INCORRECT = 15000050;
export const CUSTOMER_PASSWORD_RESET_REQUIRED = 15000060;
export const CUSTOMER_CURRENT_PASSWORD_INCORRECT = 15000190;
export const CUSTOMER_PASSWORD_NOT_CHANGED = 15000080;

// Resale related errors
export const BOOKING_TICKET_RESALE_NOT_FOR_RESALE = 500036010;

/*
 *  Application Errors
 */

export const DAS_CHANGE_PASSWORD_FAILED = 'DAS_CHANGE_PASSWORD_FAILED';
export const DAS_RESET_PASSWORD_FAILED = 'DAS_RESET_PASSWORD_FAILED';
export const DAS_UPDATE_CUSTOMER_FAILED = 'DAS_UPDATE_CUSTOMER_FAILED';
export const DAS_LOGOUT_FAILED = 'DAS_LOGOUT_FAILED';
export const DAS_LOGIN_FAILED = 'DAS_LOGIN_FAILED';
export const DAS_AUTHENTICATION_FAILED = 'DAS_AUTHENTICATION_FAILED';
export const DAS_GET_CUSTOMER_FAILED = 'DAS_GET_CUSTOMER_FAILED';
export const DAS_GET_BOOKING_FAILED = 'DAS_GET_BOOKING_FAILED';
export const DAS_GET_BOOKINGS_FAILED = 'DAS_GET_BOOKINGS_FAILED';
export const DAS_GET_GENDERS_FAILED = 'DAS_GET_GENDERS_FAILED';
export const DAS_GET_COUNTRIES_FAILED = 'DAS_GET_COUNTRIES_FAILED';
export const DAS_UPDATE_BOOKING_DELIVERY_FAILED =
  'DAS_UPDATE_BOOKING_DELIVERY_FAILED';
export const DAS_UPDATE_BOOKING_RESALE_FAILED =
  'DAS_UPDATE_BOOKING_RESALE_FAILED';

export const errorLogLevels = {
  fatal: 4,
  error: 3,
  warning: 2,
  info: 1,
};

// Map the errors to their respective user friendly error messages and redirect paths.
const errorMappings = {
  /*
   *  Web Service Error Mappings
   */
  [LOGIN_TOKEN_NOT_SUPPLIED]: {
    message: null,
    key: 'LOGIN_TOKEN_NOT_SUPPLIED',
    severity: errorLogLevels.info,
    redirectPath: routes.LOGIN_URL,
    revokeAuth: true,
  },

  [LOGIN_TOKEN_EXPIRED]: {
    message:
      'You have been automatically logged out after a period of inactivity. Please login again.',
    key: 'LOGIN_TOKEN_EXPIRED',
    severity: errorLogLevels.info,
    redirectPath: routes.LOGIN_URL,
    revokeAuth: true,
  },

  [BOOKING_NOT_FOUND]: {
    message: "We couldn't find a matching booking. Please try again.",
    key: 'BOOKING_NOT_FOUND',
    severity: errorLogLevels.info,
    redirectPath: routes.BOOKINGS_URL,
  },

  [CUSTOMER_ACCOUNT_NOT_FOUND]: {
    message:
      "We couldn't find an account with those details. Please try again.",
    key: 'CUSTOMER_ACCOUNT_NOT_FOUND',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },
  [CUSTOMER_EMAIL_NOT_VERIFIED]: {
    message:
      'This account has not been verified yet, please check your emails for instructions',
    key: 'CUSTOMER_EMAIL_NOT_VERIFIED',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },
  [CUSTOMER_ACCOUNT_LOCKED]: {
    message: 'Your account has been locked, please contact our support team',
    key: 'CUSTOMER_ACCOUNT_LOCKED',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },
  [CUSTOMER_PASSWORD_INCORRECT]: {
    message:
      "We couldn't find an account with those details. Please try again.",
    key: 'CUSTOMER_PASSWORD_INCORRECT',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },

  [CUSTOMER_CURRENT_PASSWORD_INCORRECT]: {
    message: "We couldn't verify your current password, please try again.",
    key: 'CUSTOMER_CURRENT_PASSWORD_INCORRECT',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },

  [CUSTOMER_PASSWORD_RESET_REQUIRED]: {
    message: null,
    key: 'CUSTOMER_PASSWORD_RESET_REQUIRED',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },

  [CUSTOMER_PASSWORD_NOT_CHANGED]: {
    message:
      "Please ensure your new password isn't the same as your old password.",
    key: 'CUSTOMER_PASSWORD_NOT_CHANGED',
    severity: errorLogLevels.info,
    redirectPath: null,
    revokeAuth: false,
  },

  /*
   *  Application Error Mappings
   */

  [DAS_CHANGE_PASSWORD_FAILED]: {
    message:
      "We're unable to update your password at this time, please try again.",
    key: 'DAS_CHANGE_PASSWORD_FAILED',
    severity: errorLogLevels.error,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_RESET_PASSWORD_FAILED]: {
    message:
      "We're unable to reset your password at this time, please try again.",
    key: 'DAS_RESET_PASSWORD_FAILED',
    severity: errorLogLevels.error,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_UPDATE_CUSTOMER_FAILED]: {
    message:
      "We're unable to update your details at this time, please try again.",
    key: 'DAS_UPDATE_CUSTOMER_FAILED',
    severity: errorLogLevels.error,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_LOGOUT_FAILED]: {
    message: "We're unable to sign you out at this time, please try again.",
    key: 'DAS_LOGOUT_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_AUTHENTICATION_FAILED]: {
    message: "We're unable to verify that you're logged in, please try again.",
    key: 'DAS_AUTHENTICATION_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_GET_CUSTOMER_FAILED]: {
    message:
      "We're having issues retrieving your details. Please refresh the page.",
    key: 'DAS_GET_CUSTOMER_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_LOGIN_FAILED]: {
    message: "We're unable to sign you in at this time, please try again.",
    key: 'DAS_LOGIN_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_GET_BOOKING_FAILED]: {
    message:
      "We're having a few problems loading your booking. Please try again.",
    key: 'DAS_GET_BOOKING_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: routes.BOOKINGS_URL,
    revokeAuth: false,
  },

  [DAS_GET_BOOKINGS_FAILED]: {
    message:
      "We're having a few problems loading your bookings. Please refresh the page.",
    key: 'DAS_GET_BOOKINGS_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_GET_GENDERS_FAILED]: {
    message: "We're having a few problems loading this page. Please try again.",
    key: 'DAS_GET_GENDERS_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: routes.PROFILE_DETAILS_URL,
    revokeAuth: false,
  },

  [DAS_GET_COUNTRIES_FAILED]: {
    message: "We're having a few problems loading this page. Please try again.",
    key: 'DAS_GET_COUNTRIES_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: routes.PROFILE_DETAILS_URL,
    revokeAuth: false,
  },

  [DAS_UPDATE_BOOKING_DELIVERY_FAILED]: {
    message:
      "We're having a few problems updating your delivery address. Please try again.",
    key: 'DAS_UPDATE_BOOKING_DELIVERY_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
    revokeAuth: false,
  },

  [DAS_UPDATE_BOOKING_RESALE_FAILED]: {
    message:
      "We're having a problem adding your tickets to resale. Please try again.",
    key: 'DAS_UPDATE_BOOKING_RESALE_FAILED',
    severity: errorLogLevels.fatal,
    redirectPath: null,
  },

  [BOOKING_TICKET_RESALE_NOT_FOR_RESALE]: {
    message:
      "We're unable to update the resale status of some of your tickets right now.",
    key: 'BOOKING_TICKET_RESALE_NOT_FOR_RESALE',
    severity: errorLogLevels.fatal,
    redirectPath: null,
  },

  /*
   *  Default Error Mapping
   */

  default: {
    message: "It looks like we're having a few problems with your request.",
    key: 'UNKNOWN',
    severity: errorLogLevels.fatal,
    redirectPath: null,
  },
};

export default errorMappings;
