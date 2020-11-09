<?php
/**
 * The directory in which your application specific resources are located.
 * The application directory must contain the bootstrap.php file.
 */
$application = '../application';

/**
 * The directory in which vendor resources are located.
 */
$vendor = '../vendor';

/**
 * The directory in which the f3 library files are located
 */
$lib = $vendor . '/bcosca/fatfree-core';

/**
 * Set the PHP error reporting level. If you set this in php.ini, you remove this.
 * @link http://www.php.net/manual/errorfunc.configuration#ini.error-reporting
 *
 * When developing your application, it is highly recommended to enable notices
 * and strict warnings. Enable them by using: E_ALL | E_STRICT
 *
 * In a production environment, it is safe to ignore notices and strict warnings.
 * Disable them by using: E_ALL ^ E_NOTICE
 *
 * When using a legacy application with PHP >= 5.3, it is recommended to disable
 * deprecated notices. Disable with: E_ALL & ~E_DEPRECATED
 */
error_reporting(E_ALL ^ E_NOTICE);

if (isset($_SERVER['WSENVIRONMENT']) && !empty($_SERVER['WSENVIRONMENT']) && strtolower($_SERVER['WSENVIRONMENT']) != 'development')
{
    error_reporting((E_ALL | E_STRICT) & ~E_NOTICE & ~E_DEPRECATED);
}

// Define the version number of the application
define('APPVER', '##appver##');

// Set the full path to the docroot
define('DOCROOT', realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR);

// Define the absolute paths for configured directories
define('APPPATH', realpath($application).DIRECTORY_SEPARATOR);
define('LIBPATH', realpath($lib).DIRECTORY_SEPARATOR);
define('VENDORPATH', realpath($vendor).DIRECTORY_SEPARATOR);

// Clean up the configuration vars
unset($application, $lib, $vendor);

// Bootstrap the application
require APPPATH.'bootstrap.php';
