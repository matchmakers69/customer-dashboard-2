<?php
/**
 * API Ajax base controller
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package DAS2
 * @author Josh McEwen <josh.mcewen@kaboodle.co.uk>
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Andy Hartley <andy.hartley@kaboodle.co.uk>
 */

namespace Controller;

use \Domain\Errors;
use Http\HttpClient;
use Kaboodle\Logger\LogInterface;
use PackmanSystems\Utils\Resolver;
use Psr\Log\LoggerInterface;
use Psr\Log\LogLevel;

abstract class APIAjax extends Base
{
    protected $_error_message;
    protected $xml;
    protected $response;
    protected $uri;
    protected $request_params = [];

    private $ws;
    private $webservice_host;
    private $webservice_version = "3.0";
    protected $client_config;
    protected $json;
    protected $xml_doc;
    
    protected $client;
    private $logger;

    public function __construct() {
        $this->client = new HttpClient();

        $this->logger = (Resolver::instance())->resolve(LogInterface::class)->get("DAS-WS");
        assert($this->logger instanceof LoggerInterface);
    }

    /**
     * Defer to WS2 for proceeding requests.
     * @return void
     */
    protected function use_ws2() {
        $this->webservice_version = "2.0";
    }

    /**
     *
     *
     * @return
     */
    protected function request()
    {
        $params = $this->request_params;
        $this->get_client_config();

        if (empty($this->uri))
        {
            throw new \Exception('URI must be set to send a request');
        }

        if (empty($this->webservice_host))
        {
            $this->webservice_host = \Base::instance()->get("pacman_host");
        }

        if (empty($this->webservice_port))
        {
            $this->webservice_port = \Base::instance()->get("pacman_port");
        }

        $webservice_endpoint = "/ws/v{$this->webservice_version}/";

        $this->ws = new \PackmanSystems\Utils\Comms\WebServiceRequest(
            new \PackmanSystems\Utils\Comms\CurlHTTPRequest,
            $this->webservice_host,
            $webservice_endpoint . $this->uri,
            $this->webservice_port
        );

        // Explicity return to WS3 after web service has been initialised.
        $this->webservice_version = "3.0";

        $this->ws->request_type($params['method'] ?? 'GET');

        if (!empty($params['login_token']))
        {
            $this->ws->set_header('X-OGToken', $params['login_token']);
        }

        if (!empty($params['xml']))
        {
            $this->ws->request_data($params['xml']);
        }

        $this->ws->credentials($this->client_config->webservice_username(), $this->client_config->webservice_password());
        $this->response = $this->ws->send()->response();

        // Log the request/response.

        $uri = $this->sanitize($this->webservice_host . $webservice_endpoint . $this->uri);

        $this->logger->log(LogLevel::INFO, $uri, [
            "request"  => $this->sanitize(print_r(($params['xml'] ?? ''), TRUE)),
            "response" => $this->sanitize(print_r($this->response, TRUE)),
        ]);

        $this->xml_doc = new \DOMDocument();
        if (@$this->xml_doc->loadXML($this->response) === FALSE)
        {
            http_response_code(500);
            $this->json = json_encode(['errors'=>[['message'=>'XML would not load']]]);
            $this->render();
            $this->afterRoute();

            exit;
        }

        if ($this->has_error())
        {
            http_response_code(400);
        }
    }

     /**
     * Get the client config
     *
     * @return void
     */
    protected function get_client_config()
    {
        $client_id = \Base::instance()->get("client_id");

        if (empty($client_id))
        {
            throw new \Exception('No Client Set', 4000);
        }

        $client_config_service = \PackmanSystems\Utils\Resolver::instance()->resolve('\Service\ClientConfig');
        $this->client_config = $client_config_service->get($client_id);
    }

    /**
     * Convert to Json
     *
     * @return void
     */
    protected function process($mockXML = false)
    {
        try
        {
            if($mockXML) {
                $this->xml_doc = $mockXML;
            }
            $process = new \PackmanSystems\Utils\Transform\XML2Json($this->xml_doc);
            $this->json = $process->convert();
        }
        catch (\Exception $e)
        {
            \error_log($e);
            $this->json = json_encode(['errors'=>[['message'=>'XML could not be translated: ' . $e->getMessage()]]]);
        }

        $this->render();
    }

    protected function render()
    {
        if (empty($this->json))
        {
            http_response_code(500);
            $this->json = json_encode(['errors'=>[['message'=>'No response was set']]]);
        }

        $this->view = new \View\Json\Response;

        $this->view->json = $this->json;
        $this->auto_render_view = TRUE;
        $this->view->render_layout(TRUE);
    }

    /**
     * Checks for an error in the response XML
     *
     * @return
     */
    protected function has_error()
    {
        return $this->xml_doc->getElementsByTagName('errors_list/error')->length > 0;
    }

    /**
     * applies the customer token stored in the session to the request
     * or sends an error back to the front end if no token in session
     *
     * @return void
     */
    protected function apply_customer_login_token()
    {
        $f3 = \Base::instance();
        $token = $f3->get("SESSION.{$this->session_ident}.login_token");

        if (empty($token))
        {
            http_response_code(403);
            $this->json = json_encode(['errors'=>[ Errors::response(Errors::LOGIN_TOKEN_NOT_SUPPLIED) ]]);
            $this->render();
            $this->afterRoute();

            exit;
        }

        $this->request_params['login_token'] = $token;
    }

    /**
     * Override the default session ident
     *
     * @param {int} $package_id package id
     */
    protected function override_session_ident($package_id)
    {
        $this->session_ident = self::SESSION_IDENT_PREFIX . $package_id;
    }

}
