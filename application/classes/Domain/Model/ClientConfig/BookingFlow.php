<?php
/**
 * Booking flow config. model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig;

class BookingFlow implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param string
     */
    private $webservice_uri;

    /**
     * Initialise the model
     *
     * @param string $webservice_uri
     */
    public function __construct(string $webservice_uri)
    {
        $this->webservice_uri = $webservice_uri;
    }

    /**
     * Get the webservice uri
     *
     * @return string
     */
    public function webservice_uri() : string
    {
        return (is_null($this->webservice_uri)) ? "" : $this->webservice_uri;
    }
}
