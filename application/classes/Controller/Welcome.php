<?php
/**
 * Welcome controller
 *
 * @copyright (c) 2019 Kaboodle Solutions Ltd
 * @package KBF
 * @author Josh McEwen <josh.mcewen@kaboodle.co.uk>
 * @author Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Controller;

class Welcome extends Base
{
    /**
     * Default action
     */
    public function index()
    {
        $gtm_container_id = \Base::instance()->get("gtm_container_id");

        $this->view = new \View\Welcome\Index;

        $this->view->__set([
            'gtm_container_id' => $gtm_container_id,
        ]);
    }
}
