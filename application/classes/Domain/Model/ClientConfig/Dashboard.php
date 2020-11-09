<?php
/**
 * Dashboard config. model
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Domain\Model\ClientConfig;

class Dashboard implements \serializable
{
    use \Domain\Data\SerializeTrait;

    /**
     * @var string
     */
    private $webservice_uri;

    /**
     * @var bool
     */
    private $show_login_message;

    /**
     * @var \Domain\Model\ClientConfig\Dashboard\AllowAdd
     */
    private $allow_add;

    /**
     * @var \Domain\Model\ClientConfig\Dashboard\MandatoryCustomerFields
     */
    private $mandatory_customer_fields;

    /**
     * @var \Domain\Model\ClientConfig\Dashboard\EditableCustomerFields
     */
    private $editable_customer_fields;

    /**
     * @var \Domain\Model\ClientConfig\Dashboard\ProfileTabs
     */
    private $profile_tabs;

    /**
     * Initialise the object
     *
     * @param string                                                        $webservice_uri
     * @param bool                                                          $show_login_message
     * @param \Domain\Model\ClientConfig\Dashboard\AllowAdd                 $allow_add
     * @param \Domain\Model\ClientConfig\Dashboard\MandatoryCustomerFields  $mandatory_customer_fields
     * @param \Domain\Model\ClientConfig\Dashboard\EditableCustomerFields   $editable_customer_fields
     * @param \Domain\Model\ClientConfig\Dashboard\ProfileTabs              $profile_tabs
     */
    public function __construct(string $webservice_uri,
                                bool $show_login_message,
                                \Domain\Model\ClientConfig\Dashboard\AllowAdd $allow_add,
                                \Domain\Model\ClientConfig\Dashboard\MandatoryCustomerFields $mandatory_customer_fields,
                                \Domain\Model\ClientConfig\Dashboard\EditableCustomerFields $editable_customer_fields,
                                \Domain\Model\ClientConfig\Dashboard\ProfileTabs $profile_tabs)
    {
        $this->webservice_uri = $webservice_uri;
        $this->show_login_message = $show_login_message;
        $this->allow_add = $allow_add;
        $this->mandatory_customer_fields = $mandatory_customer_fields;
        $this->editable_customer_fields = $editable_customer_fields;
        $this->profile_tabs = $profile_tabs;
    }

    /**
     * Get the webservice URL
     *
     * @return string
     */
    public function webservice_uri() : string
    {
        return $this->webservice_uri;
    }

    /**
     * Determine whether to show the login message
     *
     * @return bool
     */
    public function show_login_message() : bool
    {
        return $this->show_login_message;
    }

    /**
     * Get the AllowAdd config. object
     *
     * @return \Domain\Model\ClientConfig\Dashboard\AllowAdd
     */
    public function allow_add() : \Domain\Model\ClientConfig\Dashboard\AllowAdd
    {
        return $this->allow_add;
    }

    /**
     * Get the MandatoryCustomerFields config. object
     *
     * @return \Domain\Model\ClientConfig\Dashboard\MandatoryCustomerFields
     */
    public function mandatory_customer_fields() : \Domain\Model\ClientConfig\Dashboard\Dashboard\MandatoryCustomerFields
    {
        return $this->mandatory_customer_fields;
    }

    /**
     * Get the EditableCustomerFields config. object
     *
     * @return \Domain\Model\ClientConfig\Dashboard\EditableCustomerFields
     */
    public function editable_customer_fields() : \Domain\Model\ClientConfig\Dashboard\Dashboard\EditableCustomerFields
    {
        return $this->editable_customer_fields;
    }

    /**
     * Get the ProfileTabs config. object
     *
     * @return \Domain\Model\ClientConfig\Dashboard\ProfileTabs
     */
    public function profile_tabs() : \Domain\Model\ClientConfig\Dashboard\Dashboard\ProfileTabs
    {
        return $this->profile_tabs;
    }
}
