<?php
/**
 * Standard error codes and responses
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain;

class Errors
{
    /**
     * Return an error message
     *
     * @param integer $error_code
     * @return string
     */
    public static function message($error_code)
    {
        return (isset(self::$error_messages[$error_code])) ? self::$error_messages[$error_code] : "Unknown error";
    }

    /**
     * Return an error code and message, optionally overriding the default message
     *
     * @param integer $error_code
     * @param string $error_message     Optional override message
     * @return array
     */
    public static function response($error_code, $error_message = NULL)
    {
        $err_msg = isset(self::$error_messages[$error_code]) ? self::$error_messages[$error_code] : "Unknown error";
        $err_msg = isset($error_message) ? $error_message : $err_msg;

        return [
            "error_code"    => $error_code,
            "error_message" => $err_msg,
        ];
    }

    // General errors (10 series)
    const OK                                                                = 10000010;
    const COMPLETED_WITH_ERRORS                                             = 10000020;
    const CONTINUE_TO_NEXT_STEP                                             = 10000030;
    const FAILED_TO_ADD_REQUESTED_QUANTITY                                  = 10000040;
    const FAILED_TO_ADD_REQUESTED_PRODUCT                                   = 10000050;
    const UPDATE_FAILED                                                     = 10000060;
    const CREATE_FAILED                                                     = 10000070;

    const CANNOT_COMPLETE_ACTION                                            = 10500010;
    const RESOURCE_NOT_FOUND                                                = 10500020;

    // Login related errors (11 series)
    const LOGIN_TOKEN_INVALID                                               = 11000010;
    const LOGIN_TOKEN_NOT_SUPPLIED                                          = 11000011;
    const MISSING_MANDATORY_DATA                                            = 11000020;
    const CONFIGURATION_ERROR                                               = 11000030;
    const NO_AUTH_SUPPLIED                                                  = 11000040;
    const LOGIN_USER_NOT_FOUND                                              = 11000050;
    const LOGIN_USER_TOO_MANY_CLIENTS                                       = 11000060;
    const LOGIN_USER_CLIENT_NOT_FOUND                                       = 11000070;

    // Request related errors (12 series)
    const INVALID_REQUEST                                                   = 12000010;
    const INVALID_REQUEST_TYPE                                              = 12000020;
    const MISSING_ARGUMENTS                                                 = 12000030;
    const INVALID_REQUEST_DATA                                              = 12000040;
    const VALIDATION_ERROR                                                  = 12000050;

    // Booking related errors (13 series)
    const BOOKING_NOT_FOUND                                                 = 13000010;

    // Package related errors (14 series)
    const PACKAGE_NOT_FOUND                                                 = 14000010;
    const PACKAGE_NOT_IN_CORRECT_STATUS                                     = 14000020;
    const PACKAGE_EXTRA_RULES_VIOLATION                                     = 14000030;
    const PACKAGE_ACCOMMODATION_RULES_VIOLATION                             = 14000040;
    const PACKAGE_TRANSPORT_RULES_VIOLATION                                 = 14000050;
    const PACKAGE_TICKET_RULES_VIOLATION                                    = 14000060;

    const PACKAGE_ROOM_NOT_FOUND                                            = 14002000;
    const PACKAGE_ROOM_INCORRECT_TYPE                                       = 14002010;
    const PACKAGE_ROOM_INVALID_OCCUPANCY                                    = 14002020;

    // Customer account related errors (15 series)
    const CUSTOMER_ACCOUNT_NOT_FOUND                                        = 15000010;
    const CUSTOMER_ACCOUNT_EXISTS                                           = 15000020;
    const CUSTOMER_ACCOUNT_LOCKED                                           = 15000030;
    const CUSTOMER_EMAIL_NOT_VERIFIED                                       = 15000040;
    const CUSTOMER_PASSWORD_INCORRECT                                       = 15000050;
    const CUSTOMER_PASSWORD_RESET_REQUIRED                                  = 15000060;
    const CUSTOMER_PASSWORD_NOT_DIFFERENT                                   = 15000070;
    const CUSTOMER_PASSWORD_NOT_CHANGED                                     = 15000080;
    const CUSTOMER_PASSWORD_NOT_RESET                                       = 15000090;
    const CUSTOMER_ACCOUNT_INVALID_STATE                                    = 15000100;
    const CUSTOMER_NOT_ON_BOOKING                                           = 15000110;
    const CUSTOMER_EMAIL_NOT_CHANGED                                        = 15000120;
    const CUSTOMER_CREATE_FAILED                                            = 15000130;
    const CUSTOMER_ADDRESS_CREATE_FAILED                                    = 15000140;
    const CUSTOMER_NOT_AN_AGENT                                             = 15000150;
    const CUSTOMER_NOT_A_SUPER_AGENT                                        = 15000160;

    // Payment related errors (16 series)
    const PAYMENT_RECORD_NOT_FOUND                                          = 16000010;
    const PAYMENT_RECORD_EXISTS                                             = 16000020;
    const NO_OUTSTANDING_BALANCE                                            = 16000030;
    const INVALID_CARD_NUMBER                                               = 16000040;
    const INVALID_CARD_START_DATE                                           = 16000050;
    const INVALID_CARD_EXPIRY_DATE                                          = 16000060;
    const INVALID_CARD_CVV2                                                 = 16000070;
    const PAYMENT_3DS_REQUIRED                                              = 16000080;
    const PAYMENT_ERROR                                                     = 16000090;
    const PAYMENT_AUTH_FAIL                                                 = 16000100;
    const PAYMENT_NOT_PAID                                                  = 16000110;
    const PAYMENT_ALREADY_APPORTIONED                                       = 16000120;
    const PAYMENT_3DS_FAILED                                                = 16000130;
    const PAYMENT_ALREADY_COMPLETED                                         = 16000140;

    // Pax related errors (17 series)
    const PAX_NOT_FOUND                                                     = 17000010;

    // Accommodation related errors (18 series)
    const ACCOMMODATION_NOT_FOUND                                           = 18000020;
    const ACCOMMODATION_ROOM_TYPE_NOT_FOUND                                 = 18000030;

    // Product specific error messages (30 series)
    const INSURANCE_POLICY_INVALID_CUSTOMER_DISCLAIMERS                     = 30000010;

    const EXTRA_NOT_FOUND                                                   = 31000010;
    const EXTRA_GROUP_NOT_FOUND                                             = 31000020;
    const EXTRA_OPTION_NOT_FOUND                                            = 31000030;


    // Error messages
    protected static $error_messages = [

        // General errors (10 series)
        self::OK                                                            => "OK",
        self::COMPLETED_WITH_ERRORS                                         => "Action completed with non-fatal errors",
        self::CONTINUE_TO_NEXT_STEP                                         => "Continue to next step",
        self::FAILED_TO_ADD_REQUESTED_QUANTITY                              => "Failed to add requested quantity",
        self::FAILED_TO_ADD_REQUESTED_PRODUCT                               => "Failed to add requested product",
        self::UPDATE_FAILED                                                 => "Update failed",
        self::CREATE_FAILED                                                 => "Create failed",

        self::CANNOT_COMPLETE_ACTION                                        => "Unable to complete the requested action at this time",
        self::RESOURCE_NOT_FOUND                                            => "Resource not found",

        // Login related errors (11 series)
        self::LOGIN_TOKEN_INVALID                                           => "Login token invalid/expired",
        self::LOGIN_TOKEN_NOT_SUPPLIED                                      => "Login token not supplied",
        self::MISSING_MANDATORY_DATA                                        => "Missing mandatory data",
        self::CONFIGURATION_ERROR                                           => "Configuration error",
        self::NO_AUTH_SUPPLIED                                              => "No authentication credentials supplied",
        self::LOGIN_USER_NOT_FOUND                                          => "Login user not found",
        self::LOGIN_USER_TOO_MANY_CLIENTS                                   => "Login user - too many clients configured",
        self::LOGIN_USER_CLIENT_NOT_FOUND                                   => "Login user - configured client not found",

        // Request related errors (12 series)
        self::INVALID_REQUEST                                               => "Invalid request",
        self::INVALID_REQUEST_TYPE                                          => "Invalid request type",
        self::MISSING_ARGUMENTS                                             => "Missing arguments",
        self::INVALID_REQUEST_DATA                                          => "Invalid request data",
        self::VALIDATION_ERROR                                              => "Error validating parameters/arguments",

        // Booking related errors (13 series)
        self::BOOKING_NOT_FOUND                                             => "Booking not found",

        // Package related errors (14 series)
        self::PACKAGE_NOT_FOUND                                             => "Package not found",
        self::PACKAGE_NOT_IN_CORRECT_STATUS                                 => "Package not in correct status",
        self::PACKAGE_EXTRA_RULES_VIOLATION                                 => "Extra rules violation",
        self::PACKAGE_ACCOMMODATION_RULES_VIOLATION                         => "Accommodation rules violation",
        self::PACKAGE_TRANSPORT_RULES_VIOLATION                             => "Transport rules violation",
        self::PACKAGE_TICKET_RULES_VIOLATION                                => "Ticket rules violation",

        self::PACKAGE_ROOM_NOT_FOUND                                        => "Package room not found",
        self::PACKAGE_ROOM_INCORRECT_TYPE                                   => "Package room incorrect type",
        self::PACKAGE_ROOM_INVALID_OCCUPANCY                                => "Package room invalid occupancy",

        // Customer account related errors (15 series)
        self::CUSTOMER_ACCOUNT_NOT_FOUND                                    => "Customer account not found",
        self::CUSTOMER_ACCOUNT_EXISTS                                       => "Customer account exists",
        self::CUSTOMER_ACCOUNT_LOCKED                                       => "Customer account locked",
        self::CUSTOMER_EMAIL_NOT_VERIFIED                                   => "Customer email not verified",
        self::CUSTOMER_PASSWORD_INCORRECT                                   => "Password incorrect",
        self::CUSTOMER_PASSWORD_RESET_REQUIRED                              => "Password reset required",
        self::CUSTOMER_PASSWORD_NOT_DIFFERENT                               => "Password not different",
        self::CUSTOMER_PASSWORD_NOT_CHANGED                                 => "Password not changed",
        self::CUSTOMER_PASSWORD_NOT_RESET                                   => "Password not reset",
        self::CUSTOMER_NOT_ON_BOOKING                                       => "Customer not on booking",
        self::CUSTOMER_EMAIL_NOT_CHANGED                                    => "Email address not changed",
        self::CUSTOMER_CREATE_FAILED                                        => "Failed to create customer account",
        self::CUSTOMER_ADDRESS_CREATE_FAILED                                => "Failed to create customer address",
        self::CUSTOMER_ACCOUNT_INVALID_STATE                                => "Account services not available for this customer at the present time",
        self::CUSTOMER_NOT_AN_AGENT                                         => "Customer is not an agent",
        self::CUSTOMER_NOT_A_SUPER_AGENT                                    => "Customer is not a super agent",

        // Payment related errors (16 series)
        self::PAYMENT_RECORD_NOT_FOUND                                      => "Payment record not found",
        self::PAYMENT_RECORD_EXISTS                                         => "Payment record exists",
        self::NO_OUTSTANDING_BALANCE                                        => "No outstanding balance",
        self::INVALID_CARD_NUMBER                                           => "Invalid card number",
        self::INVALID_CARD_START_DATE                                       => "Invalid card start date",
        self::INVALID_CARD_EXPIRY_DATE                                      => "Invalid card expiry date",
        self::INVALID_CARD_CVV2                                             => "Invalid CVV2 number",
        self::PAYMENT_3DS_REQUIRED                                          => "3DS authorisation required",
        self::PAYMENT_ERROR                                                 => "Payment Declined, please try another card.",
        self::PAYMENT_AUTH_FAIL                                             => "Authorisation failure.",
        self::PAYMENT_NOT_PAID                                              => "Payment not paid.",
        self::PAYMENT_ALREADY_APPORTIONED                                   => "Payment already apportioned",
        self::PAYMENT_3DS_FAILED                                            => "3D Secure verification failed - please try again or use a different card",
        self::PAYMENT_ALREADY_COMPLETED                                     => "This payment has already been authorised - check for duplicate transaction",

        // Pax related errors (17 series)
        self::PAX_NOT_FOUND                                                 => "Pax not found",

        // Accommodation related errors (18 series)
        self::ACCOMMODATION_NOT_FOUND                                       => "Accommodation not found",
        self::ACCOMMODATION_ROOM_TYPE_NOT_FOUND                             => "Accommodation room type not found",

        // Product specific error messages (30 series)
        self::INSURANCE_POLICY_INVALID_CUSTOMER_DISCLAIMERS                 => "Invalid insurance policy customer disclaimers",

        self::EXTRA_NOT_FOUND                                               => "Extra not found",
        self::EXTRA_GROUP_NOT_FOUND                                         => "Extra group not found",
        self::EXTRA_OPTION_NOT_FOUND                                        => "Extra option not found",
    ];
}
