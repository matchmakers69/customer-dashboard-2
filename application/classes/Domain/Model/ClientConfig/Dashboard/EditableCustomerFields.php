<?php
/**
 * Dashboard config. editable customer fields model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig\Dashboard;

class EditableCustomerFields implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var bool
     */
    private $club_membership_number;

    /**
     * Initialise the object
     *
     * @param bool $club_membership_number
     */
    public function __construct(bool $club_membership_number)
    {
        $this->club_membership_number = $club_membership_number;
    }

    /**
     * Get a list of editable fields
     *
     * @return array
     */
    public function get_list() : array
    {
        return [
            "club_membership_number" => $this->club_membership_number,
        ];
    }

    /**
     * Determine if club membership number is editable
     *
     * @return bool
     */
    public function club_membership_number() : bool
    {
        return $this->club_membership_number;
    }
}
