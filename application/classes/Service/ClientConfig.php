<?php
/**
 * Client Config service
 *
 * Client config is actually an aggregate root containing other config objects
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Service;

class ClientConfig
{
    /**
     * @var \Mappers\ConfigMapperInterface
     */
    private $mapper;

    /**
     * Initialise the service
     *
     * @param \Mappers\ConfigMapperInterface $mapper
     */
    public function __construct(\Mappers\ConfigMapperInterface $mapper)
    {
        $this->mapper = $mapper;
    }

    /**
     * Get a client config model by handle
     *
     * @param string $handle
     * @return \Domain\Model\ClientConfig
     */
    public function get(string $client_handle) : \Domain\Model\ClientConfig
    {
        return $this->mapper->find_by_handle($client_handle);
    }
}
