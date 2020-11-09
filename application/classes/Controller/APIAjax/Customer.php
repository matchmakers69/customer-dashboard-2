<?php
/**
 * Customer Ajax Controller
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Andy Hartley <andrew.hartley@outgoing.co.uk>
 */

namespace Controller\APIAjax;

class Customer extends \Controller\APIAjax
{
    protected $_error_message;

    private $endpoint = 'customer';

    /**
     * Create Customer (POST)
     *
     * @return
     */
    public function create($f3)
    {
        $this->view = new \View\XML\Customer;
        $this->auto_render_view = FALSE;

        $this->view->data = $f3->get('POST');
        $doc = $this->view->render();

        $this->uri = $this->endpoint;

        $this->request_params = ['method' => 'POST', 'xml' => $doc];
        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function get($f3, $params)
    {
        $this->apply_customer_login_token();

        $id = $f3->get("SESSION.{$this->session_ident}.customer_id");

        $this->uri = $this->endpoint . '/' . $id;

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function update($f3, $params)
    {
        $this->view = new \View\XML\UpdateCustomer;
        $this->auto_render_view = FALSE;

        $this->view->data = json_decode($f3->BODY);
        $doc = $this->view->render();

        $this->apply_customer_login_token();

        $id = $f3->get("SESSION.{$this->session_ident}.customer_id");

        $this->uri = $this->endpoint . '/' . $id . '?package_id=' . $f3->get("SESSION.{$this->session_ident}.package_id");

        $this->request_params = array_merge($this->request_params, [
            'method' => 'PUT',
            'xml' => $doc
        ]);

        $this->request();
        $this->process();
    }

    /**
     * Process customer authentication, set session if authenticated correctly. 
     *
     * @param [type] $f3
     * @return void
     */    
    public function login($f3)
    {
        // Retrieve parameters from the POST body.
        $body = json_decode($f3->BODY, true);

        $this->uri = $this->endpoint . "/authentication/login";

        $this->request_params = array_merge(
            $this->request_params, 
            [
                'method' => 'POST',
                'xml' => $body,
            ]
        );

        $this->request();

        // Persist customer ID and token to session if available.
        $customer_node = $this->xml_doc->getElementsByTagName("customer");

        if (count($customer_node) > 0 && $customer_node->item(0)->hasAttribute("token"))
        {
            $token = $customer_node->item(0)->getAttribute("token");
            $f3->set("SESSION.{$this->session_ident}.login_token", $token);

            $id = $customer_node->item(0)->getAttribute("id");
            $f3->set("SESSION.{$this->session_ident}.customer_id", $id);

            $xpath = new \DOMXPath($this->xml_doc);
            $error = $xpath->query('//error[@code="15000060"]');

            // Set flag in session, whether customer needs to reset their password or not.
            // Used to redirect user on page refresh, as this error is only returned on login, no guarantee
            // we'll get it from elsewhere unless subsequent requests are made.
            $f3->set("SESSION.{$this->session_ident}.reset_required", $error->length > 0);
        }

        $this->process();
    }

    public function check($f3)
    {
        $token = $f3->get("SESSION.{$this->session_ident}.login_token");
        $id = $f3->get("SESSION.{$this->session_ident}.customer_id");
        $reset_required = $f3->get("SESSION.{$this->session_ident}.reset_required");

        $json_array = [];

        // Check also returns reset state of customer, used to redirect to password page.
        $json_array['customer'] = ['@id' => (int) $id, 'authenticated' => TRUE, 'reset_required' => $reset_required];

        if (empty($token))
        {
            $json_array['customer'] = ['authenticated' => FALSE];
        }

        $this->json = json_encode($json_array);
        $this->render();
        return;
    }

    /**
     *
     *
     * @return
     */
    public function logout($f3)
    {
        $f3->set("SESSION.{$this->session_ident}.login_token", null);
        $f3->set("SESSION.{$this->session_ident}.customer_id", null);

        $json_array = [];
        $json_array['customer'] = ['@id' => null, 'authenticated' => FALSE];

        $this->json = json_encode($json_array);
        $this->render();
        return;
    }

    /**
     *
     *
     * @return
     */
    public function reset_password($f3)
    {
        // Retrieve parameters from the POST body.
        $body = json_decode($f3->BODY, true);

        $this->uri = $this->endpoint . "/password/reset";
        $this->uri .= "?email={$body['email']}";

        $this->request();
        $this->process();
    }

    /**
     *
     *
     * @return
     */
    public function change_password($f3)
    {
        // query params should be
        // 'email'

        $this->apply_customer_login_token();
        $this->uri = $this->endpoint . "/password/change";

        // Retrieve parameters from the POST body.
        $body = json_decode($f3->BODY, true);

        $this->request_params = array_merge($this->request_params, [
            'method' => 'POST',
            'xml' => $body,
        ]);

        $this->request();
        $this->process();

        $response = json_decode($this->json, true);

        // Successful password resets will toggle the session flag, so customer can resume normal activity.
        if($response["success"] === true) {
            $f3->set("SESSION.{$this->session_ident}.reset_required", false);
        }

    }

    /**
     * Check if account already exists
     * SL says: @TODO
     * @return
     */
    public function check_email($f3)
    {
        // query params should be
        // 'email'

        $this->uri = $this->endpoint . "/email/check";
        $this->uri .= "?" . $f3->get('QUERY') . "&package_id=" . $f3->get("SESSION.{$this->session_ident}.package_id");

        $this->request();
        $this->process();
    }

    /**
     * Get customer addresses
     *
     * @return
     */
    public function get_addresses($f3)
    {
        $this->apply_customer_login_token();

        $id = $f3->get("SESSION.{$this->session_ident}.customer_id");

        $this->uri = $this->endpoint . '/' . $id . '/addresses';

        $this->request();
        $this->process();
    }

}
