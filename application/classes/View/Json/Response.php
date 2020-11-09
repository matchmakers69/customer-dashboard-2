<?php
/**
 * Json Response view class
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Andy Hartley <andy.hartley@kaboodle.co.uk>
 */
namespace View\Json;

class Response extends \View\Base
{
    public $json;

    public function before()
    {
        header('Content-Type: application/json');
    }
}
