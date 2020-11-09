<?php
/**
 * Welcome index view class
 * 
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace View\Welcome;

class Index extends \View\Base
{
    public $title = "Welcome";

    // @todo add before and after methods

    public function test()
    {
        return "goodbye";
    }
}
