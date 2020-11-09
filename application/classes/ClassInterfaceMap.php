<?php
/**
 * This class provides a mapping from interface classes to concrete classes
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
final class ClassInterfaceMap implements PackmanSystems\Utils\ClassInterfaceMap
{
    /**
     * Get a list of interfaces and the classes they should map to
     *
     * @return array
     */
    final public function get_mappings() : array
    {
        return [
            'Mappers\ConfigMapperInterface' => '\Mappers\F3ORM\ConfigMapper',
        ];
    }
}
