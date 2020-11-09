<?php
/**
 * Client config model factory
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\Factory;

use \Domain\Model\ClientConfig\Dashboard\{AllowAdd, MandatoryCustomerFields, EditableCustomerFields, ProfileTabs};
use \Domain\Model\ClientConfig\{BookingFlow, Dashboard, FacebookLogin, HotJar, GoogleAnalytics, DoubleClick, TwitterConversion, AdWordsConversion, AdWords, Translations, GoogleTagManager, CraftyClicks};
use \Domain\Model\ClientConfig as ClientConfigModel;

class ClientConfig
{
    /**
     * Create a new client config object
     *
     * @return \Domain\Model\ClientConfig
     */
    public static function create() : \Domain\Model\ClientConfig
    {
        throw new \Exception("Not implemented");
    }

    /**
     * Create a new client config object from an array of data
     * The structure of the array is the agreed-upon JSON schema for this application
     *
     * @param array $data
     * @return \Domain\Model\ClientConfig
     */
    public static function create_from_array(array $data) : \Domain\Model\ClientConfig
    {
        $aa = $data["dashboard"]["allow_add"];
        $allow_add = new AllowAdd($aa["ACCOMMODATION"], $aa["TRANSPORT"], $aa["TICKET"], $aa["EXTRA"], $aa["INSURANCE"]);

        $mcf = $data["dashboard"]["mandatory_customer_fields"];
        $mandatory_customer_fields = new MandatoryCustomerFields(
                                        $mcf["title"], $mcf["first_name"], $mcf["last_name"], $mcf["telephone_number"], $mcf["sex"],
                                        $mcf["date_of_birth"], $mcf["emergency_contact_name"], $mcf["emergency_contact_telephone"],
                                        $mcf["address_1"], $mcf["address_city"], $mcf["address_postcode"], $mcf["address_country"],
                                        $mcf["passport_full_name"], $mcf["passport_number"], $mcf["passport_issue_country"],
                                        $mcf["passport_nationality"], $mcf["bank_account_name"], $mcf["bank_account_number"],
                                        $mcf["bank_account_sort_code"], $mcf["bank_account_iban"]
                                    );

        $editable_customer_fields = new EditableCustomerFields($data["dashboard"]["editable_customer_fields"]["club_membership_number"]);
        $profile_tabs             = new ProfileTabs($data["dashboard"]["profile_tabs"]["show_bankaccount"], $data["dashboard"]["profile_tabs"]["show_passport"]);
        $booking_flow             = new BookingFlow($data["booking_flow"]["webservice_uri"]);
        $dashboard                = new Dashboard($data["dashboard"]["webservice_uri"], $data["dashboard"]["show_login_message"], $allow_add, $mandatory_customer_fields, $editable_customer_fields, $profile_tabs);
        $facebook_login           = new FacebookLogin($data["facebook_login"]["enabled"], $data["facebook_login"]["app_id"], $data["facebook_login"]["tracking_ids"], $data["facebook_login"]["engine_tracking_ids"]);
        $hotjar                   = new HotJar($data["hotjar"]["enabled"], $data["hotjar"]["hjid"]);
        $google_analytics         = new GoogleAnalytics($data["google_analytics"]["enabled"], $data["google_analytics"]["tracking_ids"]);
        $doubleclick              = new DoubleClick($data["doubleclick"]["enabled"], $data["doubleclick"]["urls"]);
        $twitter_conversion       = new TwitterConversion($data["twitter_conversion"]["enabled"], $data["twitter_conversion"]["tracking_ids"]);
        $adwords_conversion       = new AdWordsConversion($data["adwords_conversion"]["enabled"], $data["adwords_conversion"]["trackers"]);
        $adwords                  = new AdWords($data["adwords"]["enabled"], $data["adwords"]["trackers"]);
        $translations             = new Translations($data["translations"]);
        $google_tag_manager       = new GoogleTagManager($data["google_tag_manager"]["enabled"], $data["google_tag_manager"]["gtmids"]);
        $crafty_clicks            = new CraftyClicks($data["crafty_clicks"]["enabled"], $data["crafty_clicks"]["access_token"]);

        return new ClientConfigModel(
            $data["webservice_username"],
            $data["webservice_password"],
            $data["client_id"],
            $data["client_handle"],
            $booking_flow,
            $dashboard,
            $facebook_login,
            $hotjar,
            $google_analytics,
            $doubleclick,
            $twitter_conversion,
            $adwords_conversion,
            $adwords,
            $translations,
            $google_tag_manager,
            $crafty_clicks
        );
    }
}
