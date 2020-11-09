<?php
/**
 * Strict properties trait
 *
 * Add this to a class to implement strict use of object properties - basically
 * it will stop you from being able to add properties to a class "on-the-fly"
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Data;

trait StrictPropertiesTrait
{
    /**
     * Magic setter
     *
     * Will only allow pre-defined properties to be set
     *
     * @param string $name
     * @param mixed $value
     * @throws Exception
     */
    public function __set($name, $value)
    {
        $class_name = get_class($this);
        throw new \Exception("property {$name} is inaccessible or does not exist on {$class_name}");
    }
}
