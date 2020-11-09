<?php
/**
 * Serialize trait
 *
 * Add this to write model classes to allow serialization of internal data
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Data;

trait SerializeTrait
{
    /**
     * Get all properties as an array
     *
     * @return array
     */
    public function serialize()
    {
        $data = [];

        foreach(array_keys(get_class_vars(__CLASS__)) as $key)
        {
            if ($this->{$key} === TRUE)
            {
                $data[$key] = 1;
            }
            else if ($this->{$key} === FALSE)
            {
                $data[$key] = 0;
            }
            else
            {
                $data[$key] = $this->{$key};
            }
        }

        return serialize($data);
    }

    /**
     * Unserialize a model
     *
     * @note: this method does nothing!
     */
    public function unserialize($data) { }
}
