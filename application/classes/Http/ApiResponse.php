<?php

namespace Http;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamInterface;

class ApiResponse implements ResponseInterface {
    private $response;

    public function __construct($response) {
        $this->response = $response;
    }

    public function getStatusCode() {
        return $this->response->getStatusCode();
    }

    public function withStatus($code, $reasonPhrase = '') {
        return $this->response->withStatus($code, $reasonPhrase);
    }

    public function getReasonPhrase() {
        return $this->response->getReasonPhrase();
    }

    public function getProtocolVersion() {
        return $this->response->getProtocolVersion();
    }

    public function withProtocolVersion($version) {
        return $this->response->withProtocolVersion($version);
    }

    public function getHeaders() {
        return $this->response->getHeaders();
    }
    public function hasHeader($name) {
        return $this->response->hasHeader($name);
    }

    public function getHeader($name) {
        return $this->response->getHeader($name);
    }

    public function getHeaderLine($name) {
        return $this->response->getHeaderLine($name);
    }

    public function withHeader($name, $value) {
        return $this->response->withHeader($name, $value);
    }

    public function withAddedHeader($name, $value) {
        return $this->response->withAddedHeader($name, $value);
    }

    public function withoutHeader($name) {
        return $this->response->withoutHeader($name);
    }

    public function getBody() {
        return $this->response->getBody();
    }

    public function withBody(StreamInterface $body) {
        return $this->response->withBody($body);
    }

    /**
     * Attempts to convert XML response to JSON using XSL templates.
     *
     * @return void
     */
    public function convertXML() {
        $xml = new \DOMDocument();
        if (@$xml->loadXML($this->getBody()) === false) {
            return json_encode([
                'errors' => [
                    ['message' => 'XML would not load']
                ],
            ]);
        } else {
            try {
                $process = new \PackmanSystems\Utils\Transform\XML2Json($xml);
                return $process->convert();
            } catch (\Exception $e) {
                return json_encode([
                    'errors' => [
                        ['message' => 'XML could not be translated: ' . $e->getMessage()]
                    ],
                ]);
            }
        }
    }
}