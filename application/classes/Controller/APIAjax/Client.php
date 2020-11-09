<?php
/**
 * Client Ajax Controller
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 * @author Andy Hartley <andrew.hartley@outgoing.co.uk>
 */
namespace Controller\APIAjax;

class Client extends \Controller\APIAjax
{
    protected $_error_message;
    private $endpoint = ''; // endpoint dependant on method

    /**
     *
     *
     * @return
     */
    public function card_types($f3)
    {
        $this->uri = 'cardtypes';

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function card_charge($f3)
    {
        parse_str($f3->get('QUERY'), $query);

        $this->uri = 'cardcharge';

        $qstring = [];

        if (isset($query['card_type']))
        {
            $qstring['card_type'] = $query['card_type'];
        }
        if (isset($query['amount']))
        {
            $qstring['amount'] = $query['amount'];
        }
        if (isset($query['currency_id']))
        {
            $qstring['currency_id'] = $query['currency_id'];
        }

        if (!empty($qstring))
        {
            $this->uri .= '?' . http_build_query($qstring);
        }

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function countries($f3)
    {
        parse_str($f3->get('QUERY'), $query);
        $this->uri = 'countries';

        $qstring = [];

        if (isset($query['name']))
        {
            $qstring['name'] = $query['name'];
        }
        if (isset($query['code']))
        {
            $qstring['code'] = $query['code'];
        }

        if (!empty($qstring))
        {
            $this->uri .= '?' . http_build_query($qstring);
        }

        $this->request();
        $this->process();
    }

    public function genders($f3)
    {
        $this->uri = 'genders';

        $this->request();
        $this->process();
    }

    public function ssrs($f3)
    {
        $this->uri = 'ssrs';

        $this->request();
        $this->process();
    }

    /**
     * Read values from the client config (whitelisted)
     *
     * @return void
     */
    public function config($f3)
    {
        parse_str($f3->get('QUERY'), $query);

        $this->get_client_config();

        $this->json = json_encode(['errors' => ['Unknown node']]);

        if ($query['node'] == 'facebook_login')
        {
            $this->json = json_encode([
                'facebook_login' => [
                    'is_enabled'          => $this->client_config->facebook_login()->is_enabled(),
                    'app_id'              => $this->client_config->facebook_login()->app_id(),
                    'tracking_ids'        => $this->client_config->facebook_login()->tracking_ids(),
                    'engine_tracking_ids' => $this->client_config->facebook_login()->engine_tracking_ids(),
                ]
            ]);
        }

        if ($query['node'] == 'hotjar')
        {
            $this->json = json_encode([
                'hotjar' => [
                    'is_enabled' => $this->client_config->hotjar()->is_enabled(),
                    'hjid'       => $this->client_config->hotjar()->hjid(),
                ]
            ]);
        }

        if ($query['node'] == 'google_analytics')
        {
            $this->json = json_encode([
                'google_analytics' => [
                    'is_enabled'   => $this->client_config->google_analytics()->is_enabled(),
                    'tracking_ids' => $this->client_config->google_analytics()->tracking_ids(),
                ]
            ]);
        }

        if ($query['node'] == 'doubleclick')
        {
            $this->json = json_encode([
                'doubleclick' => [
                    'is_enabled' => $this->client_config->doubleclick()->is_enabled(),
                    'urls'       => $this->client_config->doubleclick()->urls(),
                ],
            ]);
        }

        if ($query['node'] == 'twitter_conversion')
        {
            $this->json = json_encode([
                'twitter_conversion' => [
                    'is_enabled'   => $this->client_config->twitter_conversion()->is_enabled(),
                    'tracking_ids' => $this->client_config->twitter_conversion()->tracking_ids(),
                ],
            ]);
        }

        if ($query['node'] == 'adwords_conversion')
        {
            $this->json = json_encode([
                'adwords_conversion' => [
                    'is_enabled' => $this->client_config->adwords_conversion()->is_enabled(),
                    'trackers'   => $this->client_config->adwords_conversion()->trackers(),
                ],
            ]);
        }

        if ($query['node'] == 'adwords')
        {
            $this->json = json_encode([
                'adwords' => [
                    'is_enabled' => $this->client_config->adwords()->is_enabled(),
                    'trackers'   => $this->client_config->adwords()->trackers(),
                ],
            ]);
        }

        if ($query['node'] == 'translations')
        {
            $this->json = json_encode([
                'translations' => $this->client_config->translations()->translations(),
            ]);
        }

        if ($query['node'] == 'google_tag_manager')
        {
            $this->json = json_encode([
                'google_tag_manager' => [
                    'is_enabled'    => $this->client_config->google_tag_manager()->is_enabled(),
                    'gtmids'        => $this->client_config->google_tag_manager()->gtmids(),
                ]
            ]);
        }

        if ($query['node'] == 'crafty_clicks')
        {
            $this->json = json_encode([
                'crafty_clicks' => [
                    'is_enabled'    => $this->client_config->crafty_clicks()->is_enabled(),
                    'access_token'  => $this->client_config->crafty_clicks()->access_token(),
                ]
            ]);
        }

        $this->render();
    }
}
