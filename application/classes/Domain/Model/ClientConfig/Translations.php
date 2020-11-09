<?php
/**
 * Simple translation config model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 */
namespace Domain\Model\ClientConfig;

class Translations implements \serializable
{
    use \Domain\Data\SerializeTrait;

    private $translations;

    /**
     * Initialise the model
     *
     * @param array $translations
     */
    public function __construct(array $translations)
    {
        $this->translations = $translations;
    }

    /**
     * Returns the translations
     *
     * @return array
     */
    public function translations() : array
    {
        return $this->translations;
    }
}
