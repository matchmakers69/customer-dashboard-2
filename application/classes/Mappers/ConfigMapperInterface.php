<?php
/**
 * Config mapper interface
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Andy Hartley <andrew.hartley@outgoing.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Mappers;

interface ConfigMapperInterface extends MapperInterface
{
    /**
     * Find a configuration based on it's handle
     *
     * @param string $handle
     * @return mixed
     */
    public function find_by_handle(string $handle);
}
