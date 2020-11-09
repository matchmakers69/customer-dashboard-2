<?php
/**
 * DoubleClick config model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 */
namespace Domain\Model\ClientConfig;

class DoubleClick implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param bool
     */
    private $enabled;

    /**
     * @param string[]
     */
    private $urls;

    /**
     * Initialise the model
     *
     * @param bool        $enabled
     * @param string[]    $app_id
     */
    public function __construct(bool $enabled, array $urls)
    {
        $this->enabled = $enabled;
        $this->urls = $urls;
    }

    /**
     * Returns whether or not DoubleClick is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled;
    }

    /**
     * Returns the DoubleClick tracking URLs
     *
     * @return string
     */
    public function urls() : array
    {
        return $this->urls ?? [];
    }
}
