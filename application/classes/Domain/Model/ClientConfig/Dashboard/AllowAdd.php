<?php
/**
 * Dashboard config. allow add model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig\Dashboard;

class AllowAdd implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var bool
     */
    private $accommodation;

    /**
     * @var bool
     */
    private $transport;

    /**
     * @var bool
     */
    private $ticket;

    /**
     * @var bool
     */
    private $extra;

    /**
     * @var bool
     */
    private $insurance;

    /**
     * Initialise the object
     *
     * @param bool $accommodation
     * @param bool $transport
     * @param bool $ticket
     * @param bool $extra
     * @param bool $insurance
     */
    public function __construct(bool $accommodation, bool $transport, bool $ticket, bool $extra, bool $insurance)
    {
        $this->accommodation = $accommodation;
        $this->transport = $transport;
        $this->ticket = $ticket;
        $this->extra = $extra;
        $this->insurance = $insurance;
    }

    /**
     * Get a list of allowed engines
     *
     * @return array
     */
    public function get_list() : array
    {
        return [
            "accommodation" => $this->accommodation,
            "transport"     => $this->transport,
            "ticket"        => $this->ticket,
            "extra"         => $this->extra,
            "insurance"     => $this->insurance,
        ];
    }

    /**
     * Determine if accommodation can be added
     *
     * @return bool
     */
    public function accommodation() : bool
    {
        return $this->accommodation;
    }

    /**
     * Determine if transport can be added
     *
     * @return bool
     */
    public function transport() : bool
    {
        return $this->transport;
    }

    /**
     * Determine if tickets can be added
     *
     * @return bool
     */
    public function ticket() : bool
    {
        return $this->ticket;
    }

    /**
     * Determine if extras can be added
     *
     * @return bool
     */
    public function extra() : bool
    {
        return $this->extra;
    }

    /**
     * Determine if insurance can be added
     *
     * @return bool
     */
    public function insurance() : bool
    {
        return $this->insurance;
    }
}
