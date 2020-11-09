<?php
/**
 * Basket Ajax Controller
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Andy Hartley <andy.hartley@kaboodle.co.uk>
 */
namespace Controller\APIAjax;

class Basket extends \Controller\APIAjax
{
    protected $_error_message;

    private $endpoint = 'basket';
    private $basket_id = NULL;

    /**
     * Run before route operations
     *
     * @return void
     */
    public function beforeRoute($f3)
    {
        parent::beforeRoute($f3);

        if ((int)$f3->get("SESSION.{$this->session_ident}.basket_id") > 0)
        {
            $this->basket_id = (int)$f3->get("SESSION.{$this->session_ident}.basket_id");
        }
    }

    /**
     * Get the basket
     *
     * @return
     */
    public function get($f3, $params)
    {
        parse_str($f3->get('QUERY'), $query);

        // enable passed in basket id for testing
        if (\Server::is_development() && !empty($query['basket_id']))
        {
            $this->basket_id = $query['basket_id'];

            $f3->set("SESSION.{$this->session_ident}.basket_id", $this->basket_id);
        }

        if (empty($this->basket_id))
        {
            $this->json = json_encode(['errors'=>[['message'=>'No basket ID found in session']]]);
            $this->render();
            return;
        }

        $this->uri = $this->endpoint . '/' . $this->basket_id;

        $qstring = [];

        if (isset($query['summary']))
        {
            $qstring['summary'] = 1;
        }
        if (isset($query['booking_summary']))
        {
            $qstring['booking_summary'] = 1;
        }
        if (isset($query['status']))
        {
            $qstring['status'] = 1;
        }
        if (!empty($qstring))
        {
            $this->uri .= '?' . http_build_query($qstring);
        }

        $this->request();
        $this->process();
    }

    /**
     * Delete item(s) from the basket
     *
     * @return
     */
    public function delete($f3, $params)
    {
        $allowed_engines = [
            'extra',
            'tickets',
            'accommodation',
            'transport',
            'insurance',
            'pax',
            'discountcode',
            'delivery',
        ];

        if (!in_array($params['engine'], $allowed_engines))
        {
            http_response_code(500);
            $this->json = json_encode(['errors'=>[['message'=>'Engine not recognised']]]);
            $this->render();
            $this->afterRoute();

            exit;
        }

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/' . $params['engine'] . '/' . $params['id'];

        $this->request_params = ['method' => 'DELETE'];
        $this->request();
        $this->process();
    }

    /**
     * Request a new basket from pacman
     *
     * @return
     */
    public function create($f3)
    {
        $this->view = new \View\XML\CreateBasket;
        $this->auto_render_view = FALSE;

        if ($f3->get("SESSION.{$this->session_ident}.package_id") > 0)
        {
            $this->view->data = [
                'package_id'    => $f3->get("SESSION.{$this->session_ident}.package_id"),
                'agent_id'      => $f3->get("SESSION.{$this->session_ident}.agent_id"),
                'currency_id'   => $f3->get("SESSION.{$this->session_ident}.currency_id"),
                'pax' => [
                    'adults'        => $f3->get("SESSION.{$this->session_ident}.adults"),
                    'children'      => $f3->get("SESSION.{$this->session_ident}.children"),
                    'infants'       => $f3->get("SESSION.{$this->session_ident}.infants"),
                ],
            ];
        }

        $xml = $this->view->render();
        $this->uri = $this->endpoint;

        $this->request_params = [
            'method' => 'POST',
            'xml' => $xml,
        ];
        $this->request();

        // grab the basket ID returned and store it in the session
        $basket_node = $this->xml_doc->getElementsByTagName("basket");

        if (count($basket_node) > 0 && !is_null($basket_node->item(0)) && $basket_node->item(0)->hasAttribute("id"))
        {
            $basket_id = $basket_node->item(0)->getAttribute("id");
            $f3->set("SESSION.{$this->session_ident}.basket_id", (int) $basket_id);
            session_regenerate_id();
        }

        $this->process();
    }

    /**
     * Destroy the basket ( Nope - it only kills the session )
     *
     * @return
     */
    public function destroy($f3)
    {
        // clear current basket
        $f3->clear("SESSION.{$this->session_ident}.basket_id");

        // SL says: since we're storing multiple sessions in our session, we can't destroy the session
        // $params = session_get_cookie_params();
        // setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
        // session_destroy();
    }

    /**
     * Add pax to the basket
     *
     * @return
     */
    public function add_pax($f3, $params)
    {
        $this->view = new \View\XML\AddPax;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/pax';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Update Pax info on the basket
     *
     * @return
     */
    public function update_pax($f3, $params)
    {
        $this->view = new \View\XML\UpdatePax;
        $this->auto_render_view = FALSE;

        parse_str($f3->get('BODY'), $this->view->data);
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/pax';
        $this->request_params = ['method' => 'PUT', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Consent to the basket
     *
     * @return
     */
    public function add_consent($f3, $params)
    {
        $this->view = new \View\XML\AddConsent;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/consent';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Update Consent info on the basket
     *
     * @return
     */
    public function update_consent($f3, $params)
    {
        $this->view = new \View\XML\UpdateConsent;
        $this->auto_render_view = FALSE;

        parse_str($f3->get('BODY'), $this->view->data);
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/consent';

        $this->request_params = ['method' => 'PUT', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Transport to the basket
     *
     * @return
     */
    public function add_transport($f3, $params)
    {
        $this->view = new \View\XML\AddTransport;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/transport';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Tickets to the basket
     *
     * @return
     */
    public function add_tickets($f3, $params)
    {
        $this->view = new \View\XML\AddTickets;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/tickets';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }


    /**
     * Add Extras to the basket
     *
     * @return
     */
    public function add_extras($f3, $params)
    {
        $this->view = new \View\XML\AddExtras;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/extra';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Insurance to the basket
     *
     * @return
     */
    public function add_insurance($f3, $params)
    {
        $this->view = new \View\XML\AddInsurance;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/insurance';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Accommodation to the basket
     *
     * @return
     */
    public function add_accommodation($f3, $params)
    {
        $this->view = new \View\XML\AddAccommodation;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/accommodation';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Update Accommodation in the basket
     *
     * @return
     */
    public function update_accommodation($f3, $params)
    {
        $this->view = new \View\XML\AddAccommodation;
        $this->auto_render_view = FALSE;

        parse_str($f3->get('BODY'), $this->view->data);
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/accommodation';

        $this->request_params = ['method' => 'PUT', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Accommodation Extra to the basket
     *
     * @return
     */
    public function add_accommodationextra($f3, $params)
    {
        $this->view = new \View\XML\AddAccommodationExtra;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/accommodation/' . $params['accommodation_id'] . '/extra';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Discount Codes to the basket
     *
     * @return
     */
    public function add_discount($f3, $params)
    {
        $this->view = new \View\XML\AddDiscount;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/discountcode';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Add Delivery Option to the basket
     *
     * @return
     */
    public function add_delivery($f3, $params)
    {
        $this->view = new \View\XML\AddDelivery;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/delivery';

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Update Delivery option on the basket
     *
     * @return
     */
    public function update_delivery($f3, $params)
    {
        $this->view = new \View\XML\UpdateDelivery;
        $this->auto_render_view = FALSE;

        parse_str($f3->get('BODY'), $this->view->data);
        $doc = $this->view->render();

        $this->uri = $this->endpoint . '/' . $this->basket_id . '/delivery/' . $params['delivery_id'];

        $this->request_params = ['method' => 'PUT', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     * Complete the basket
     *
     * @return void
     */
    public function complete()
    {
        $this->uri = 'booking/complete?basket_id=' . $this->basket_id;
        $this->request_params = [
            'method' => 'POST',
            // SL says: GCP requires POSTS to have content and rejects 0 Content-Length, so we need this!
            'xml' => ' ',
        ];

        $this->request();
        $this->process();
    }
}
