<?php
/**
 * Dashboard config. profile tabs model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig\Dashboard;

class ProfileTabs implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var bool
     */
    private $show_bankaccount;

    /**
     * @var bool
     */
    private $show_passport;

    /**
     * Initialise the object
     *
     * @param bool $show_bankaccount
     * @param bool $show_passport
     */
    public function __construct(bool $show_bankaccount, bool $show_passport)
    {
        $this->show_bankaccount = $show_bankaccount;
        $this->show_passport = $show_passport;
    }

    /**
     * Get a list of profile tabs
     *
     * @return array
     */
    public function get_list() : array
    {
        return [
            "bank_account"  => $this->show_bankaccount,
            "passport"      => $this->show_passport,
        ];
    }

    /**
     * Determine if the bank account tab should be shown
     *
     * @return bool
     */
    public function show_bankaccount() : bool
    {
        return $this->show_bankaccount;
    }

    /**
     * Determine if the passport tab should be shown
     *
     * @return bool
     */
    public function show_passport() : bool
    {
        return $this->show_passport;
    }
}
