<?php
/**
 * GoogleAnalytics config. model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Tom Wilkinson <tom.wilkinson@kaboodle.co.uk>
 */
namespace Domain\Model\ClientConfig;

class GoogleAnalytics implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param bool
     */
    private $enabled;

    /**
     * @param string[]
     */
    private $tracking_ids;

    /**
     * Initialise the model
     *
     * @param bool        $enabled
     * @param string[]    $app_id
     */
    public function __construct(bool $enabled = NULL, array $tracking_ids = NULL)
    {
        $this->enabled = $enabled;
        $this->tracking_ids = $tracking_ids;
    }

    /**
     * Determine if google analytics is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled ?? FALSE;
    }

    /**
     * Get the Tracking ids
     *
     * @return string
     */
    public function tracking_ids() : array
    {
        return $this->tracking_ids ?? [];
    }
}
