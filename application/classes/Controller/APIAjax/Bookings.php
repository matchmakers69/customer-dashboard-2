<?php

/**
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package DAS2
 * @author Josh McEwen <josh.mcewen@kaboodle.co.uk>
 */

namespace Controller\APIAjax;

use \Controller\APIAjax as APIAjaxController;

class Bookings extends APIAjaxController
{
    protected $_error_message;

    /**
     * Retrieve all bookings for authenticated customer
     *
     * @return void
     */
    public function get()
    {
        $response = $this->client->get("bookings")
            ->withToken()
            ->execute();

        $headers = $response->getHeaders();
        header("Content-Type: {$headers['Content-Type'][0]}");
        echo $response->getBody();
    }

    /**
     * Retrieve specific booking for authenticated customer
     *
     * @return void
     */
    public function get_booking($f3, $params)
    {
        $response = $this->client->get("booking/{$params['booking_id']}")
            ->withToken()
            ->execute();

        $headers = $response->getHeaders();
        header("Content-Type: {$headers['Content-Type'][0]}");
        echo $response->getBody();
    }

     /**
      * Retrieve payment plan projection for specific booking
      *
      * @return void
      */
    public function get_payment_plan_projection($f3, $params)
    {
        parse_str($f3->get('QUERY'), $query);
        $response = $this->client->get("booking/{$params['booking_id']}/paymentplan/projection?day={$query['day']}")
            ->withToken()
            ->execute();

        $this->auto_render_view = true;
        $this->view = new \View\Json\Response;
        $this->view->json = $response->getBody();
    }

    /**
     * Update a delivery allocation
     *
     * @return void
     */
    public function update_delivery($f3, $params)
    {
        $this->view = new \View\XML\UpdateDeliveryAddress;
        $this->auto_render_view = false;

        $this->view->data = json_decode($f3->BODY);
        $xml = $this->view->render();

        $response = $this->client->put(
            "booking/{$params['booking_id']}/allocation/delivery/{$params['allocation_id']}", 
            [], 
            $xml
        )
            ->withToken()
            ->execute();

        echo $response->convertXML();
    }

    /**
     * Update a payment plan based on booking_id
     *
     * @return void
     */
    public function update_payment_plan($f3, $params)
    {
        $this->view = new \View\XML\UpdatePaymentPlan;
        $this->auto_render_view = false;

        $this->view->data = json_decode($f3->BODY);
        $xml = $this->view->render();

        $response = $this->client->put(
            "booking/{$params['booking_id']}/paymentplan", 
            [], 
            $xml
        )
            ->withToken()
            ->execute();

        echo $response->convertXML();
    }

    /**
     * Passes hash to the WS download endpoint, streaming file if it exists.
     *
     * @param  [type] $f3
     * @param  [type] $params
     * @return void
     */
    public function download($f3, $params) 
    {
        $response = $this->client->get("download/{$params['hash']}")
            ->useWs2()
            ->withToken()
            ->execute();

        // Would typically use \View\Json\Response, but file response requires custom headers.
        $headers = $response->getHeaders();
        header("Content-Disposition: {$headers['Content-Disposition'][0]}");
        header("Content-Type: {$headers['Content-Type'][0]}");

        echo $response->getBody();
    }

    /**
     * Put items on resale.
     *
     * @return void
     */
    public function add_resale($f3, $params)
    {
        $view = new \View\XML\AddResale;

        $view->data = json_decode($f3->BODY);
        $xml = $view->render();

        $response = $this->client->post(
            "booking/{$params['booking_id']}/ticket/resale.json", 
            [], 
            $xml
        )
            ->withToken()
            ->execute();
        
        $this->auto_render_view = true;
        $this->view = new \View\Json\Response;
        $this->view->json = $response->getBody();
    }

    /**
     * Remove items from resale
     *
     * @return void
     */
    public function remove_resale($f3, $params)
    {
        if ($params['allocation_id']) {
            $endpoint = "booking/{$params['booking_id']}/ticket/resale/{$params['allocation_id']}.json";
        } else {
            $endpoint = "booking/{$params['booking_id']}/ticket/resale.json";
        }

        $response = $this->client->delete(
            $endpoint,
            [], 
            $xml
        )
            ->withToken()
            ->execute();
        
        $this->view = new \View\Json\Response;
        $this->view->json = $response->getBody();
    }
}