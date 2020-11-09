<?php
/**
 * Facebook login config. model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig;

class FacebookLogin implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var bool
     */
    private $enabled;

    /**
     * @var string
     */
    private $app_id;

    /**
     * @var string[]
     */
    private $tracking_ids;

    /**
     * @var string[][]
     */
    private $engine_tracking_ids;

    /**
     * Initialise the model
     *
     * @param bool       $enabled
     * @param string     $app_id
     * @param string[]   $tracking_ids
     * @param string[][] $engine_tracking_ids
     */
    public function __construct(bool $enabled, string $app_id, array $tracking_ids, array $engine_tracking_ids)
    {
        $this->enabled             = $enabled;
        $this->app_id              = $app_id;
        $this->tracking_ids        = $tracking_ids;
        $this->engine_tracking_ids = $engine_tracking_ids;
    }

    /**
     * Determine if Facebook login is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled;
    }

    /**
     * Get the app id
     *
     * @return string
     */
    public function app_id() : string
    {
        return $this->app_id ?? '';
    }

    /**
     * Get the tracking ids
     *
     * @return string[]
     */
    public function tracking_ids() : array
    {
        return $this->tracking_ids ?? [];
    }

    /**
     * Get the per-engine tracking ids
     *
     * @return string[][] the per-engine tracking ids with the engine name as the key and an array of engine-specific tracking ids as the value
     */
    public function engine_tracking_ids() : array
    {
        return $this->engine_tracking_ids;
    }
}
