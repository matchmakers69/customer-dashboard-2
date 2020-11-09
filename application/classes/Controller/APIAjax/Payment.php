<?php
/**
 * Payment Ajax Controller
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Andy Hartley <andrew.hartley@outgoing.co.uk>
 */

 namespace Controller\APIAjax;

class Payment extends \Controller\APIAjax
{
    protected $_error_message;
    private $basket_id;

    private $endpoint = 'payment';

    /**
     *
     *
     * @return
     */
    public function create($f3)
    {
        $this->view = new \View\XML\CreatePayment;
        $this->auto_render_view = false;

        $this->view->data = json_decode($f3->get('BODY'));
        $xml = $this->view->render();


        $response = $this->client->post(
            "payment", 
            [], 
            $xml
        )
            ->withToken()
            ->execute();

        echo $response->convertXML();
    }

    /**
     *
     *
     * @return
     */
    public function complete($f3)
    {
        $this->view = new \View\XML\CompletePayment;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('REQUEST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint;

        $this->request_params = [
            'method' => 'PUT',
            'xml' => $doc,
        ];

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function trace_number($f3)
    {
        $this->uri = 'paymenttracenumber';

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
        $this->uri = 'cardcharge';

        parse_str($f3->get('QUERY'), $query);

        $qstring = [
            'card_type'   => $query['card_type'],
            'amount'      => $query['amount'],
            'currency_id' => $f3->get("SESSION.{$this->session_ident}.currency_id"),
        ];

        $this->uri .= '?' . http_build_query($qstring);

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    private function make_booking($f3)
    {
        $this->basket_id = $f3->get("SESSION.{$this->session_ident}.basket_id");

        if (empty($this->basket_id))
        {
            http_response_code(500);
            $this->json = json_encode(['errors'=>[['message'=>'No Basket ID in session']]]);
            $this->render();
            $this->afterRoute();

            exit;
        }

        return TRUE;
    }
}
