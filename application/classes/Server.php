<?php
/**
 * Server configuration class
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
class Server
{
    // Server environment definitions
    const DEVELOPMENT   = 10;
    const STAGING       = 20;
    const TESTING       = 30;
    const PRODUCTION    = 40;

    /**
     * @var array mapping of environment constants to names
     */
    private static $environments = [
        self::DEVELOPMENT   => "development",
        self::TESTING       => "testing",
        self::STAGING       => "staging",
        self::PRODUCTION    => "production",
    ];

    /**
     * @var int the current server environment
     */
    private static $environment = self::DEVELOPMENT;

    /**
     * Set the server environment
     *
     * @param int $environment
     * @return void
     * @throws \InvalidArgumentException
     */
    public static function set_environment(int $environment)
    {
        if (!array_key_exists($environment, self::$environments))
        {
            throw new \InvalidArgumentException("Invalid environment");
        }

        self::$environment = $environment;
    }

    /**
     * Get the name for the current environment
     *
     * @return string
     */
    public static function environment_name() : string
    {
        return self::$environments[self::$environment];
    }

    /**
     * Determine if the environment is development
     *
     * @return bool
     */
    public static function is_development() : bool
    {
        return self::$environment == self::DEVELOPMENT;
    }

    /**
     * Determine if the environment is testing
     *
     * @return bool
     */
    public static function is_testing() : bool
    {
        return self::$environment == self::TESTING;
    }

    /**
     * Determine if the environment is staging
     *
     * @return bool
     */
    public static function is_staging() : bool
    {
        return self::$environment == self::STAGING;
    }

    /**
     * Determine if the environment is production
     *
     * @return bool
     */
    public static function is_production() : bool
    {
        return self::$environment == self::PRODUCTION;
    }
}
