<?php
/**
 * Dashboard config. mandatory customer fields model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig\Dashboard;

class MandatoryCustomerFields implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var bool
     */
    private $title;

    /**
     * @var bool
     */
    private $first_name;

    /**
     * @var bool
     */
    private $last_name;

    /**
     * @var bool
     */
    private $telephone_number;

    /**
     * @var bool
     */
    private $sex;

    /**
     * @var bool
     */
    private $date_of_birth;

    /**
     * @var bool
     */
    private $emergency_contact_name;

    /**
     * @var bool
     */
    private $emergency_contact_telephone;

    /**
     * @var bool
     */
    private $address_1;

    /**
     * @var bool
     */
    private $address_city;

    /**
     * @var bool
     */
    private $address_postcode;

    /**
     * @var bool
     */
    private $address_country;

    /**
     * @var bool
     */
    private $passport_full_name;

    /**
     * @var bool
     */
    private $passport_number;

    /**
     * @var bool
     */
    private $passport_issue_country;

    /**
     * @var bool
     */
    private $passport_nationality;

    /**
     * @var bool
     */
    private $bank_account_name;

    /**
     * @var bool
     */
    private $bank_account_number;

    /**
     * @var bool
     */
    private $bank_account_sort_code;

    /**
     * @var bool
     */
    private $bank_account_iban;

    /**
     * Initialise the object
     *
     * @param bool $title
     * @param bool $first_name
     * @param bool $last_name
     * @param bool $telephone_number
     * @param bool $sex
     * @param bool $date_of_birth
     * @param bool $emergency_contact_name
     * @param bool $emergency_contact_telephone
     * @param bool $address_1
     * @param bool $address_city
     * @param bool $address_postcode
     * @param bool $address_country
     * @param bool $passport_full_name
     * @param bool $passport_number
     * @param bool $passport_issue_country
     * @param bool $passport_nationality
     * @param bool $bank_account_name
     * @param bool $bank_account_number
     * @param bool $bank_account_sort_code
     * @param bool $bank_account_iban
     */
    public function __construct(bool $title, bool $first_name, bool $last_name, bool $telephone_number, bool $sex,
                                bool $date_of_birth, bool $emergency_contact_name, bool $emergency_contact_telephone,
                                bool $address_1, bool $address_city, bool $address_postcode, bool $address_country,
                                bool $passport_full_name, bool $passport_number, bool $passport_issue_country,
                                bool $passport_nationality, bool $bank_account_name, bool $bank_account_number,
                                bool $bank_account_sort_code, bool $bank_account_iban)
    {
        $this->title = $title;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->telephone_number = $telephone_number;
        $this->sex = $sex;
        $this->date_of_birth = $date_of_birth;
        $this->emergency_contact_name = $emergency_contact_name;
        $this->emergency_contact_telephone = $emergency_contact_telephone;
        $this->address_1 = $address_1;
        $this->address_city = $address_city;
        $this->address_postcode = $address_postcode;
        $this->address_country = $address_country;
        $this->passport_full_name = $passport_full_name;
        $this->passport_number = $passport_number;
        $this->passport_issue_country = $passport_issue_country;
        $this->passport_nationality = $passport_nationality;
        $this->bank_account_name = $bank_account_name;
        $this->bank_account_number = $bank_account_number;
        $this->bank_account_sort_code = $bank_account_sort_code;
        $this->bank_account_iban = $bank_account_iban;
    }

    /**
     * Get a list of editable fields
     *
     * @return array
     */
    public function get_list() : array
    {
        return [
            "title"                         => $this->title,
            "first_name"                    => $this->first_name,
            "last_name"                     => $this->last_name,
            "telephone_number"              => $this->telephone_number,
            "sex"                           => $this->sex,
            "date_of_birth"                 => $this->date_of_birth,
            "emergency_contact_name"        => $this->emergency_contact_name,
            "emergency_contact_telephone"   => $this->emergency_contact_telephone,
            "address_1"                     => $this->address_1,
            "address_city"                  => $this->address_city,
            "address_postcode"              => $this->address_postcode,
            "address_country"               => $this->address_country,
            "passport_full_name"            => $this->passport_full_name,
            "passport_number"               => $this->passport_number,
            "passport_issue_country"        => $this->passport_issue_country,
            "passport_nationality"          => $this->passport_nationality,
            "bank_account_name"             => $this->bank_account_name,
            "bank_account_number"           => $this->bank_account_number,
            "bank_account_sort_code"        => $this->bank_account_sort_code,
            "bank_account_iban"             => $this->bank_account_iban,
        ];
    }

    /**
     * Determine if title is mandatory
     *
     * @return bool
     */
    public function title() : bool
    {
        return $this->title;
    }

    /**
     * Determine if first name is mandatory
     *
     * @return bool
     */
    public function first_name() : bool
    {
        return $this->first_name;
    }

    /**
     * Determine if last name is mandatory
     *
     * @return bool
     */
    public function last_name() : bool
    {
        return $this->last_name;
    }

    /**
     * Determine if telephone number is mandatory
     *
     * @return bool
     */
    public function telephone_number() : bool
    {
        return $this->telephone_number;
    }

    /**
     * Determine if sex is mandatory
     *
     * @return bool
     */
    public function sex() : bool
    {
        return $this->sex;
    }

    /**
     * Determine if date of birth is mandatory
     *
     * @return bool
     */
    public function date_of_birth() : bool
    {
        return $this->date_of_birth;
    }

    /**
     * Determine if emergency contact name is mandatory
     *
     * @return bool
     */
    public function emergency_contact_name() : bool
    {
        return $this->emergency_contact_name;
    }

    /**
     * Determine if emergency contact telephone is mandatory
     *
     * @return bool
     */
    public function emergency_contact_telephone() : bool
    {
        return $this->emergency_contact_telephone;
    }
    /**
     * Determine if address_1 is mandatory
     *
     * @return bool
     */
    public function address_1() : bool
    {
        return $this->address_1;
    }
    /**
     * Determine if address city is mandatory
     *
     * @return bool
     */
    public function address_city() : bool
    {
        return $this->address_city;
    }

    /**
     * Determine if address postcode is mandatory
     *
     * @return bool
     */
    public function address_postcode() : bool
    {
        return $this->address_postcode;
    }

    /**
     * Determine if address country is mandatory
     *
     * @return bool
     */
    public function address_country() : bool
    {
        return $this->address_country;
    }

    /**
     * Determine if passport full name is mandatory
     *
     * @return bool
     */
    public function passport_full_name() : bool
    {
        return $this->passport_full_name;
    }

    /**
     * Determine if passport number is mandatory
     *
     * @return bool
     */
    public function passport_number() : bool
    {
        return $this->passport_number;
    }

    /**
     * Determine if passport issue country is mandatory
     *
     * @return bool
     */
    public function passport_issue_country() : bool
    {
        return $this->passport_issue_country;
    }

    /**
     * Determine if passport nationality is mandatory
     *
     * @return bool
     */
    public function passport_nationality() : bool
    {
        return $this->passport_nationality;
    }

    /**
     * Determine if bank account name is mandatory
     *
     * @return bool
     */
    public function bank_account_name() : bool
    {
        return $this->bank_account_name;
    }

    /**
     * Determine if bank account number is mandatory
     *
     * @return bool
     */
    public function bank_account_number() : bool
    {
        return $this->bank_account_number;
    }

    /**
     * Determine if bank account sort code is mandatory
     *
     * @return bool
     */
    public function bank_account_sort_code() : bool
    {
        return $this->bank_account_sort_code;
    }

    /**
     * Determine if bank account iban is mandatory
     *
     * @return bool
     */
    public function bank_account_iban() : bool
    {
        return $this->bank_account_iban;
    }
}
