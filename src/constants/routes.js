export const routes = {
  LOGIN_URL: '/login',
  LOGOUT_URL: '/logout',
  RESET_PASSWORD_URL: '/resetpassword',
  CHANGE_PASSWORD_URL: '/changepassword',

  BOOKINGS_URL: '/',
  BOOKING_URL: '/booking/:booking_reference',
  BOOKING_MAKE_PAYMENT_URL: '/booking/:booking_reference/make-payment',
  BOOKING_RESALE_URL: '/booking/:booking_reference/resale',
  BOOKING_PAYMENT_PLAN_VIEW_URL: '/booking/:booking_reference/payment-plan',
  BOOKING_PAYMENT_PLAN_CHANGE_PAYMENT_URL:
    '/booking/:booking_reference/payment-plan/change-payment',
  BOOKING_PAYMENT_PLAN_CHANGE_DAY_URL:
    '/booking/:booking_reference/payment-plan/change-day',
  BOOKING_UPDATE_DELIVERY_URL: '/booking/:booking_reference/delivery/update',

  // File download endpoint
  DOWNLOAD_URL: '/api/booking/download/:key',

  PROFILE_URL: '/profile',
  PROFILE_DETAILS_URL: '/profile/details',
  PROFILE_DETAILS_GENDER_URL: '/profile/details/gender',
  PROFILE_DETAILS_TELEPHONE_URL: '/profile/details/telephone',
  PROFILE_DETAILS_DOB_URL: '/profile/details/dateofbirth',
  PROFILE_DETAILS_PASSWORD_URL: '/profile/details/password',
  PROFILE_DETAILS_EMERGENCY_CONTACT_URL: '/profile/details/emergency-contact',
  PROFILE_DETAILS_ADDRESSES_URL: '/profile/details/addresses',
  PROFILE_DETAILS_ADDRESS_URL: '/profile/details/addresses/update',

  ERROR_URL: '/error',
  NOT_FOUND_URL: '/404',
};
