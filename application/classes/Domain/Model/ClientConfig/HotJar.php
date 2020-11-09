<?php
/**
 * HotJar config. model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig;

class HotJar implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @param bool
     */
    private $enabled;

    /**
     * @param string
     */
    private $hjid;

    /**
     * Initialise the model
     *
     * @param bool      $enabled
     * @param string    $app_id
     */
    public function __construct(bool $enabled = NULL, string $hjid = NULL)
    {
        $this->enabled = $enabled;
        $this->hjid = $hjid;
    }

    /**
     * Determine if Facebook login is enabled
     *
     * @return bool
     */
    public function is_enabled() : bool
    {
        return $this->enabled ?? FALSE;
    }

    /**
     * Get the app id
     *
     * @return string
     */
    public function hjid() : string
    {
        return $this->hjid ?? '';
    }
}
