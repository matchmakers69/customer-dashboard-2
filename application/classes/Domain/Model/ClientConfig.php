<?php
/**
 * Client Config model
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model;

class ClientConfig implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var string
     */
    private $webservice_username;

    /**
     * @var string
     */
    private $webservice_password;

    /**
     * @var int
     */
    private $client_id;

    /**
     * @var string
     */
    private $client_handle;

    /**
     * @var \Domain\Model\ClientConfig\BookingFlow
     */
    private $booking_flow;

    /**
     * @var \Domain\Model\ClientConfig\Dashboard
     */
    private $dashboard;

    /**
     * @var \Domain\Model\ClientConfig\FacebookLogin
     */
    private $facebook_login;

    /**
     * @var \Domain\Model\ClientConfig\HotJar
     */
    private $hotjar;

    /**
     * @var \Domain\Model\ClientConfig\GoogleAnalytics
     */
    private $google_analytics;

    /**
     * @var \Domain\Model\ClientConfig\DoubleClick
     */
    private $doubleclick;

    /**
     * @var \Domain\Model\ClientConfig\TwitterConversion
     */
    private $twitter_conversion;

    /**
     * @var \Domain\Model\ClientConfig\AdwordsConversion
     */
    private $adwords_conversion;

    /**
     * @var \Domain\Model\ClientConfig\Adwords
     */
    private $adwords;

    /**
     * @var \Domain\Model\ClientConfig\Translations
     */
    private $translations;

    /**
     * @var \Domain\Model\ClientConfig\GoogleTagManager
     */
    private $google_tag_manager;

    /**
     * @var \Domain\Model\ClientConfig\CraftyClicks
     */
    private $crafty_clicks;

    /**
     * Initialise the client config
     *
     * @param string $webservice_username
     * @param string $webservice_password
     * @param int $client_id
     * @param string $client_handle
     * @param \Domain\Model\ClientConfig\BookingFlow $booking_flow
     * @param \Domain\Model\ClientConfig\Dashboard $dashboard
     * @param \Domain\Model\ClientConfig\FacebookLogin $facebook_login
     * @param \Domain\Model\ClientConfig\HotJar $hotjar
     * @param \Domain\Model\ClientConfig\GoogleAnalytics $google_analytics
     * @param \Domain\Model\ClientConfig\DoubleClick $doubleclick
     * @param \Domain\Model\ClientConfig\TwitterConversion $twitter_conversion
     * @param \Domain\Model\ClientConfig\AdWordsConversion $adwords_conversion
     * @param \Domain\Model\ClientConfig\AdWords $adwords
     * @param \Domain\Model\ClientConfig\Translations $translations
     * @param \Domain\Model\ClientConfig\GoogleTagManager $google_tag_manager
     * @param \Domain\Model\ClientConfig\CraftyClicks $crafty_clicks
     */
    public function __construct(string $webservice_username,
                                string $webservice_password,
                                int $client_id,
                                string $client_handle,
                                \Domain\Model\ClientConfig\BookingFlow $booking_flow,
                                \Domain\Model\ClientConfig\Dashboard $dashboard,
                                \Domain\Model\ClientConfig\FacebookLogin $facebook_login,
                                \Domain\Model\ClientConfig\HotJar $hotjar,
                                \Domain\Model\ClientConfig\GoogleAnalytics $google_analytics,
                                \Domain\Model\ClientConfig\DoubleClick $doubleclick,
                                \Domain\Model\ClientConfig\TwitterConversion $twitter_conversion,
                                \Domain\Model\ClientConfig\AdWordsConversion $adwords_conversion,
                                \Domain\Model\ClientConfig\AdWords $adwords,
                                \Domain\Model\ClientConfig\Translations $translations,
                                \Domain\Model\ClientConfig\GoogleTagManager $google_tag_manager,
                                \Domain\Model\ClientConfig\CraftyClicks $crafty_clicks)
    {
        $this->webservice_username = $webservice_username;
        $this->webservice_password = $webservice_password;
        $this->client_id           = $client_id;
        $this->client_handle       = $client_handle;
        $this->booking_flow        = $booking_flow;
        $this->dashboard           = $dashboard;
        $this->facebook_login      = $facebook_login;
        $this->hotjar              = $hotjar;
        $this->google_analytics    = $google_analytics;
        $this->doubleclick         = $doubleclick;
        $this->twitter_conversion  = $twitter_conversion;
        $this->adwords_conversion  = $adwords_conversion;
        $this->adwords             = $adwords;
        $this->translations        = $translations;
        $this->google_tag_manager  = $google_tag_manager;
        $this->crafty_clicks       = $crafty_clicks;
    }

    /**
     * Get the webservice username
     *
     * @return string
     */
    public function webservice_username() : string
    {
        return $this->webservice_username;
    }

    /**
     * Get the webservice password
     *
     * @return string
     */
    public function webservice_password() : string
    {
        return $this->webservice_password;
    }

    /**
     * Get the client id
     *
     * @return int
     */
    public function client_id() : int
    {
        return (int) $this->client_id;
    }

    /**
     * Get the client handle / lookup code
     *
     * @return string
     */
    public function client_handle() : string
    {
        return $this->client_handle;
    }

    /**
     * Get the BookingFlow config. object
     *
     * @return \Domain\Model\ClientConfig\BookingFlow
     */
    public function booking_flow() : \Domain\Model\ClientConfig\BookingFlow
    {
        return $this->booking_flow;
    }

    /**
     * Get the Dashboard config. object
     *
     * @return \Domain\Model\ClientConfig\Dashboard
     */
    public function dashboard() : \Domain\Model\ClientConfig\Dashboard
    {
        return $this->dashboard;
    }

    /**
     * Get the FacebookLogin config. object
     *
     * @return \Domain\Model\ClientConfig\FacebookLogin
     */
    public function facebook_login() : \Domain\Model\ClientConfig\FacebookLogin
    {
        return $this->facebook_login;
    }

    /**
     * Get the HotJar config. object
     *
     * @return \Domain\Model\ClientConfig\HotJar
     */
    public function hotjar() : \Domain\Model\ClientConfig\HotJar
    {
        return $this->hotjar;
    }

    /**
     * Get the GoogleAnalytics config. object
     *
     * @return \Domain\Model\ClientConfig\GoogleAnalytics
     */
    public function google_analytics() : \Domain\Model\ClientConfig\GoogleAnalytics
    {
        return $this->google_analytics;
    }

    /**
     * Get the DoubleClick configuration
     *
     * @return \Domain\Model\ClientConfig\DoubleClick
     */
    public function doubleclick() : \Domain\Model\ClientConfig\DoubleClick
    {
        return $this->doubleclick;
    }

    /**
     * Get the Twitter conversion tracking configuration
     *
     * @return \Domain\Model\ClientConfig\TwitterConversion
     */
    public function twitter_conversion() : \Domain\Model\ClientConfig\TwitterConversion
    {
        return $this->twitter_conversion;
    }

    /**
     * Get the AdWords conversion tracking configuration
     *
     * @return \Domain\Model\ClientConfig\AdWordsConversion
     */
    public function adwords_conversion() : \Domain\Model\ClientConfig\AdWordsConversion
    {
        return $this->adwords_conversion;
    }

    /**
     * Get the AdWords conversion tracking configuration
     *
     * @return \Domain\Model\ClientConfig\AdWords
     */
    public function adwords() : \Domain\Model\ClientConfig\AdWords
    {
        return $this->adwords;
    }

    /**
     * Get the translation configuration
     *
     * @return \Domain\Model\ClientConfig\Translations
     */
    public function translations() : \Domain\Model\ClientConfig\Translations
    {
        return $this->translations;
    }

    /**
     * Get the translation configuration
     *
     * @return \Domain\Model\ClientConfig\GoogleTagManager
     */
    public function google_tag_manager() : \Domain\Model\ClientConfig\GoogleTagManager
    {
        return $this->google_tag_manager;
    }

    /**
     * Get the translation configuration for crafty clicks
     *
     * @return \Domain\Model\ClientConfig\CraftyClicks
     */
    public function crafty_clicks() : \Domain\Model\ClientConfig\CraftyClicks
    {
        return $this->crafty_clicks;
    }
}
