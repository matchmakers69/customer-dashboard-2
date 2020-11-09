<?php
/**
 * CraftyClicks config. model
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig;

class CraftyClicks implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param bool
     */
    private $enabled;

    /**
     * @param string
     */
    private $access_token;

    /**
     * Initialise the model
     *
     * @param bool      $enabled
     * @param string    $app_id
     */
    public function __construct(bool $enabled = false, string $access_token = '')
    {
        $this->enabled = $enabled;
        $this->access_token = $access_token;
    }

    /**
     * Determine if CraftyClicks is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled;
    }

    /**
     * Get the CraftyClicks access_token
     *
     * @return string
     */
    public function access_token() : string
    {
        return $this->access_token;
    }
}
