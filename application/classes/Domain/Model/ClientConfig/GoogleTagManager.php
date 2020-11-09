<?php
/**
 * GoogleTagManager config. model
 *
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 */
namespace Domain\Model\ClientConfig;

class GoogleTagManager implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param bool
     */
    private $enabled;

    /**
     * @param array
     */
    private $gtmids;

    /**
     * Initialise the model
     *
     * @param bool        $enabled
     * @param array       $gtmids
     */
    public function __construct(bool $enabled = NULL, array $gtmids = [])
    {
        $this->enabled = $enabled;
        $this->gtmids  = $gtmids;
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
     * Get the google tag manager ids
     *
     * @return array
     */
    public function gtmids() : array
    {
        return $this->gtmids ?? [];
    }
}
