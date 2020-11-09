<?php

namespace Http;

use Controller\Base;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Kaboodle\Logger\LogInterface;
use PackmanSystems\Utils\Resolver;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Log\LoggerInterface;
use Psr\Log\LogLevel;

class HttpClient {
    private $client;
    private $request;
    private $logger;

    private $f3;

    private $ws = "v3.0";

    public function __construct() {
        $this->f3 = \Base::instance();

        $this->client = new Client([
            'base_uri' => "{$this->f3->get("pacman_host")}:{$this->f3->get("pacman_port")}/ws/",
        ]);

        $this->logger = (Resolver::instance())->resolve(LogInterface::class)->get("DAS-WS");
        assert($this->logger instanceof LoggerInterface);
    }

    /**
     * Sets web service version to WS2 for requests to legacy WS.
     *
     * @return void
     */
    public function useWs2() {
        $this->ws = "v2.0";
        return $this;
    }
    /**
     * Wrapper around the request method, passes GET as method verb. 
     *
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    public function get($uri, $headers = [], $body = null) {
        $this->request("GET", $uri, $headers, $body);
        return $this;
    }

    /**
     * Wrapper around the request method, passes POST as method verb. 
     *
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    public function post($uri, $headers = [], $body = null) {
        $this->request("POST", $uri, $headers, $body);
        return $this;
    }

    /**
     * Wrapper around the request method, passes PUT as method verb. 
     *
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    public function put($uri, $headers = [], $body = null) {
        $this->request("PUT", $uri, $headers, $body);
        return $this;
    }

    /**
     * Wrapper around the request method, passes PATCH as method verb. 
     *
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    public function patch($uri, $headers = [], $body = null) {
        $this->request("PATCH", $uri, $headers, $body);
        return $this;
    }

    /**
     * Wrapper around the request method, passes OPTIONS as method verb. 
     *
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    public function options($uri, $headers = [], $body = null) {
        $this->request("OPTIONS", $uri, $headers, $body);
        return $this;
    }

    /**
     * Wrapper around the request method, passes DELETE as method verb. 
     *
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    public function delete($uri, $headers = [], $body = null) {
        $this->request("DELETE", $uri, $headers, $body);
        return $this;
    }

    /**
     * Retrieve login token from session and decorate request with header.
     *
     * @return void
     */
    public function withToken() {
        $f3 = \Base::instance();
        $token = $f3->get("SESSION.das.login_token");

        if($token) {
           $this->request = $this->request->withHeader("X-OGToken", $token); 
        }

        return $this;
    }

    /**
     * Execute the request, wrap the response, log the request and then clear it for future requests.
     *
     * @return void
     */
    public function execute() {
        // Prefix the URI with the web service version requested.
        $uri = $this->request->getUri();
        $uri = $uri->withPath("{$this->ws}/{$this->request->getUri()->getPath()}");

        // Add client authentication header.
        $this->applyAuthentication();
        $this->request = $this->request->withUri($uri);

        $response = null;

        try {
            $response = new ApiResponse($this->client->send($this->request));
            $this->log($this->request, $response);
            $this->reset();
        } catch(BadResponseException $e) {
            $responseBody = $e->getResponse()->getBody()->getContents();

            $xml = new \DOMDocument();
            if(@$xml->loadXML($responseBody)) {
                $process = new \PackmanSystems\Utils\Transform\XML2Json($xml);
                $json = $process->convert();
            } else {
                $json = $responseBody;
            }

            $response = new ApiResponse(
                new Response(
                    $e->getResponse()->getStatusCode(), 
                    ['Content-Type' => 'application/json'], 
                    $json
                )
            );
        } catch(\Exception $e) {
            $response = new ApiResponse(
                new Response(
                    500, 
                    ['Content-Type' => 'application/json'], 
                    json_encode(['errors' => [
                            ["message" => "Failed to process request."]
                        ]
                    ])
                )
            );
        }

        return $response;
    }

    /**
     * Log the request. If XML or JSON, the response will be logged.
     *
     * @param RequestInterface $request
     * @param ResponseInterface $response
     * 
     * @return void
     */
    private function log(RequestInterface $request, ResponseInterface $response) {
        // Only log responses of the following types. Files etc., shouldn't be logged.
        $logTypes = ['application/xml; charset=UTF-8', 'application/json; charset=UTF-8'];
        $loggable = in_array($response->getHeader('Content-Type')[0], $logTypes); 

        
        // Clean up the request and produce response message based on the above.
        $requestBody = $request->getBody();
        $requestBody->rewind();
        $requestBody = $this->sanitizeRequest($requestBody->getContents());

        $responseBody = $loggable ? $response->getBody()->getContents() : "Response format not logged";
        $uri = $request->getUri()->getPath();

        $this->logger->log(LogLevel::INFO, $uri, [
            "request"  => $requestBody,
            "response" => $responseBody,
        ]);
    }

    /**
     * Apply client web service authentication header.
     *
     * @return void
     */
    private function applyAuthentication() {
        // Retrieve client config, for WS credentials
        $clientId = $this->f3->get("client_id");
        $clientConfigService = Resolver::instance()->resolve('\Service\ClientConfig');
        $clientConfig = $clientConfigService->get($clientId);

        $wsUsername = $clientConfig->webservice_username();
        $wsPassword = $clientConfig->webservice_password();

        $authString = base64_encode("{$wsUsername}:{$wsPassword}");
        $this->request = $this->request->withHeader("Authorization", "Basic {$authString}");
    }
    
    /**
     * Create and set the Request, ready to be decorated and executed.
     *
     * @param string $method
     * @param string $uri
     * @param array $headers
     * @param string $body
     * @return void
     */
    private function request($method, $uri, $headers, $body) {
        $this->request = new Request($method, $uri, $headers, $body);
    }

    /**
     * Reset the request and web service version for future requests.
     *
     * @return void
     */
    private function reset() {
        $this->request = null;
        $this->ws = "v3.0";
    }

    /**
     * Remove sensitive data from the request.
     *
     * @param string $requestBody
     * @return void
     */
    private function sanitizeRequest($requestBody) {
        $res = preg_replace('/(password|cvv|last4)=[^&|]*/', '$1=XXXXX', $requestBody);
        $res = preg_replace('/(password|cvv)="[^"]*"/', '$1="XXXXX"', $res);
        $res = preg_replace('/<card(.*) number="[^"]*"(.*)>/', '<card$1 number="XXXXX"$2>', $res);
        $res = preg_replace('/(<password>).*(<\/password>)/', '$1XXXXX$2', $res);
        $res = preg_replace('/(\[(?:.*password|cvv|last4)\] => ).*$/m', '$1XXXXX', $res);

        return $res;
    }
}
