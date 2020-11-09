<?php
/**
 * Hydrate trait
 *
 * Add this to a class implementing HydraterInterface
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Data;

trait HydrateTrait
{
    /**
     * Create a constructor-less instance and hydrate it
     *
     * @param array $data
     * @return object
     */
    public static function factory(array $data)
    {
        $object = (new \ReflectionClass(__CLASS__))->newInstanceWithoutConstructor();
        return $object->hydrate($data);
    }

    /**
     * Hydrate the current object
     *
     * @param array $data   An array of key => value pairs
     * @return object       Fluent interface
     */
    public function hydrate(array $data)
    {
        foreach ($data as $key => $value)
        {
            $key = strtolower($key);
            $setter = "set_{$key}";

            // If a setter exists, use it
            if (method_exists($this, $setter))
            {
                $this->{$setter}($value);
            }
            // Otherwise, try to set the property directly
            else if (property_exists($this, $key))
            {
                $this->{$key} = $value;
            }

            // @todo should we be throwing exceptions for non-existent properties?
        }

        return $this;
    }
}
