<?php
/**
 * Package Ajax Controller
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Andy Hartley <andrew.hartley@outgoing.co.uk>
 */

namespace Controller\APIAjax;

class Package extends \Controller\APIAjax
{
    /**
     * Module component
     * @var string
     */
    public $module_component = "bf";

    private $endpoint = 'package';
    private $package_id = NULL;

    /**
     * Sets vars before calling route
     *
     * @return void
     */
    public function beforeRoute($f3)
    {
        parent::beforeRoute($f3);

        if ((int)$f3->get("SESSION.{$this->session_ident}.package_id") > 0)
        {
            $this->package_id = (int)$f3->get("SESSION.{$this->session_ident}.package_id");
        }

        $this->check_vars();
    }

    /**
     * Check to see if a package ID is set
     *
     * @return void
     * @throws \Exception on false
     */
    private function check_vars()
    {
        if (empty($this->package_id))
        {
            throw new \Exception('No Package ID Set');
        }
    }

    /**
     *
     *
     * @return void
     */
    public function get_extras($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/extras";

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_extra($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/extra/" . $params['extra_id'];

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_extrasavailability($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/extrasavailability";

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_extraavailability($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/extra/" . $params['extra_id'] . "/availability";

        if (!empty($f3->get('QUERY')))
        {
            $this->uri .= "?" . $f3->get('QUERY');
        }

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_transport($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/transport";

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_transportavailability($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/transportavailability";

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_accommodation($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/accommodation";

        if (!empty($params['accommodation_id']))
        {
             $this->uri .= "/" . $params['accommodation_id'];
        }

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return void
     */
    public function get_accommodationavailability($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/accommodationavailability";

        if (!empty($params['accommodation_id']))
        {
            $this->uri = $this->endpoint . "/" . $this->package_id . "/accommodation/" . $params['accommodation_id'] . "/availability";
        }

        if (!empty($params['room_id']))
        {
             $this->uri .= "/" . $params['room_id'];
        }

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function get_tickets($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/tickets";

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function get_ticketsavailability($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/ticketavailability";

        if (!empty($params['event_id']))
        {
            $this->uri .= "/" . $params['event_id'];
        }

        if (!empty($params['ticket_id']))
        {
            $query_params = [
                'ticket_id' => $params['ticket_id'],
            ];

            $this->uri .= "?" . http_build_query($query_params);
        }

        $this->request();
        $this->process();
    }

    /**
     * Get insurance on package
     *
     * @param F3Hive $f3
     * @param array $params
     * @return void
     */
    public function get_insurance($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/insurance";

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     * Get delivery options on package
     *
     * @param F3Hive $f3
     * @param array $params
     * @return void
     */
    public function get_delivery($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id . "/delivery";

        if (!empty($params['delivery_id']))
        {
            $this->uri .= "/" . $params['delivery_id'];
        }

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }

    /**
     * Get package
     *
     * @return void
     */
    public function get($f3, $params)
    {
        $this->uri = $this->endpoint . "/" . $this->package_id;

        $this->uri .= "?currency_id=" . (int)$f3->get("SESSION.{$this->session_ident}.currency_id");

        $this->request();
        $this->process();
    }
}
