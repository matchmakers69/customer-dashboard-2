<?php
/**
 * Base controller
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package KBF
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Controller;

abstract class Base
{
    const SESSION_IDENT_PREFIX = 'das';

    /**
     * @var \View\Base object
     */
    protected $view;

    /**
     * @var bool Set to FALSE to stop the view from being auto-rendered
     */
    protected $auto_render_view = TRUE;

    /**
     * @var string session ident
     */
    protected $session_ident;

    /**
     * Do any pre-processing
     */
    public function beforeRoute($f3)
    {
        // initialise the session identifier from headers
        $this->session_ident = self::SESSION_IDENT_PREFIX;
    }

    /**
     * Do any post-processing
     */
    public function afterRoute()
    {
        if ($this->auto_render_view && !empty($this->view) && $this->view instanceof \View\Base)
        {
            echo $this->view->render();
        }
    }

    /**
     * Sanitize string
     *
     * @param string $string
     * @return string
     */
    protected function sanitize($string)
    {
        $res = $string;
        $res = preg_replace('/(password|cvv|last4)=[^&|]*/', '$1=XXXXX', $res);
        $res = preg_replace('/(password|cvv)="[^"]*"/', '$1="XXXXX"', $res);
        $res = preg_replace('/<card(.*) number="[^"]*"(.*)>/', '<card$1 number="XXXXX"$2>', $res);
        $res = preg_replace('/(<password>).*(<\/password>)/', '$1XXXXX$2', $res);
        $res = preg_replace('/(\[(?:.*password|cvv|last4)\] => ).*$/m', '$1XXXXX', $res);

        return $res;
    }
}
