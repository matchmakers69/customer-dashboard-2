<?php
/**
 * Twitter conversion tracking config model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 */
namespace Domain\Model\ClientConfig;

class TwitterConversion implements \serializable
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
    public function __construct(bool $enabled, array $tracking_ids)
    {
        $this->enabled = $enabled;
        $this->tracking_ids = $tracking_ids;
    }

    /**
     * Returns whether or not Twitter conversion tracking is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled;
    }

    /**
     * Returns the Twitter tracking IDs
     *
     * @return string
     */
    public function tracking_ids() : array
    {
        return $this->tracking_ids ?? [];
    }
}
