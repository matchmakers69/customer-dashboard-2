<?php
/**
 * AdWords conversion tracking config model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 */
namespace Domain\Model\ClientConfig;

class AdWordsConversion implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param bool
     */
    private $enabled;

    /**
     * @param string[]
     */
    private $trackers;

    /**
     * Initialise the model
     *
     * @param bool        $enabled
     * @param string[]    $app_id
     */
    public function __construct(bool $enabled, array $trackers)
    {
        $this->enabled = $enabled;
        $this->trackers = $trackers;
    }

    /**
     * Returns whether or not AdWords conversion tracking is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled;
    }

    /**
     * Returns the AdWords tracker options
     *
     * @return string
     */
    public function trackers() : array
    {
        return $this->trackers ?? [];
    }
}
