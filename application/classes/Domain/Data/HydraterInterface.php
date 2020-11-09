<?php
/**
 * Hydrater interface
 *
 * A class implementing this interface can be hydrated by a mapper class
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Data;

interface HydraterInterface
{
    /**
     * Create a constructor-less instance and hydrate it
     *
     * @param array $data
     * @return object
     */
    public static function factory(array $data);

    /**
     * Hydrate the current object
     *
     * @param array $data   An array of key => value pairs
     * @return object       Fluent interface
     */
    public function hydrate(array $data);
}
