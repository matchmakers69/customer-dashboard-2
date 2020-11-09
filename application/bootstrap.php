<?php
/**
 * Bootstrap the framework
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@kaboodle.co.uk>
 */
$f3 = require(LIBPATH . "base.php");

/**
 * Check external dependencies
 */
if ((float)PCRE_VERSION < 7.9)
{
    trigger_error("PCRE version is out of date");
}

/**
 * Set up the autoloader paths
 */
$f3->set("AUTOLOAD", APPPATH . "classes/;");
require_once(VENDORPATH . "/autoload.php");

/**
 * Load configurations
 */
$configuration_files = [
    "config.ini",
];

foreach ($configuration_files as $file)
{
    $f3->config(APPPATH . $file);
}

/**
 * Set up the environment
 */
\Server::set_environment((isset($_SERVER["WSENVIRONMENT"]) && !empty($_SERVER["WSENVIRONMENT"])) ? constant("\Server::" . strtoupper($_SERVER["WSENVIRONMENT"])) : \Server::DEVELOPMENT);

if (\Server::is_development())
{
    $path = __DIR__ . "/development.ini";
    if (!file_exists($path))
    {
        die("Unable to load the development config");
    }
    $f3->config($path);
    $f3->set("DEBUG", 1);
}

/**
 * Set the default time zone.
 *
 * @link http://www.php.net/manual/timezones
 */
date_default_timezone_set("Europe/London");

/**
 * Set the default locale.
 *
 * @link http://www.php.net/manual/function.setlocale
 */
$locale = "en_GB.utf-8";
$lang = "en-gb";

$tld = strtolower(substr($_SERVER["HTTP_HOST"], strrpos($_SERVER["HTTP_HOST"], ".") + 1));

// Each of these countries use the same code for language and locale
if (in_array($tld, ["at", "de", "es", "fr", "it", "nl"]))
{
    $utld = strtoupper($tld);
    $locale = "{$tld}_{$utld}.utf-8";
    $lang = "{$tld}-{$tld}";
}

setlocale(LC_ALL, $locale);

// @todo set up system/request logging

// \OGLog::register("REST", "f3ws", "rest.log", \OGLog::LOG_LEVEL_INFO);

if (\Server::is_development())
{
    //$f3->copy('HEADERS.Origin','CORS.origin');
    //$f3->set("CORS.credentials", TRUE);
}

/**
 * Set up database environment
 */
foreach (["host", "port", "dbname", "user", "password"] as $key)
{
    $$key = $f3->get("database." . \Server::environment_name() . ".{$key}");
}

$f3->set("DB", new DB\SQL("mysql:host={$host};port={$port};dbname={$dbname}", $user, $password));

/**
 * Set up pacman environment
 */
foreach (["host", "port", "protocol", "client_id"] as $key)
{
    $$key = $f3->get("pacman." . \Server::environment_name() . ".{$key}");
}

if (getenv("CLIENT_ID") !== false && getenv("CLIENT_ID") !== "") {
    $client_id = (int) getenv("CLIENT_ID");
}

$f3->set("pacman_host", $protocol . $host);
$f3->set("pacman_port", $port ?? 443);
$f3->set("client_id", $client_id);

/**
 * Set up cms environment
 */
foreach (["host", "protocol"] as $key)
{
    $$key = $f3->get("cms." . \Server::environment_name() . ".{$key}");
}

$f3->set("cms_host", $protocol . $host);

/**
 * Set GTM Variables
 */
$gtm_container_id = $f3->get("gtm." . \Server::environment_name() . ".container_id");
$f3->set("gtm_container_id", $gtm_container_id);

/**
 * Set up caching
 */
if ($f3->get("cache.enabled"))
{
    $f3->set("CACHE", strtolower($f3->get("cache.type")) . "=" . strtolower($f3->get("cache.host")) . ":" . $f3->get("cache.port"));
}

/**
 * Pull in our routes
 */
require(APPPATH . "routes.php");

/**
 * Resolver
 */
\PackmanSystems\Utils\Resolver::instance(new \ClassInterfaceMap);

/**
 * Initialise our loggers!
 */
(PackmanSystems\Utils\Resolver::instance())->bind(Kaboodle\Logger\LogInterface::class, function ()
{
    if (\Server::is_development()) {
        $factory = new Kaboodle\Logger\Handler\Filesystem("/var/log/kaboodle/customer-dashboard");
        $throws  = true;
    } else {
        $factory = new Kaboodle\Logger\Handler\Stackdriver;
        $throws  = false;
    }
    $logLevel = (\Server::is_production() || \Server::is_staging()) ? Psr\Log\LogLevel::ERROR : Psr\Log\LogLevel::INFO;
    $logger = new Kaboodle\Logger\Log($factory, $throws);
    $logger->register("DAS-WS", $logLevel);

    return $logger;
});

/**
 * Process the request
 */
$f3->run();

