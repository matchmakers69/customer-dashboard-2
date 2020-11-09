<?php
/**
 * F3 ORM base mapper
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Mappers\F3ORM;

abstract class BaseMapper
{
    /**
     * @var \Base
     */
    protected $f3;

    /**
     * @var \DB\SQL\Mapper
     */
    protected $db;

    /**
     * @var string
     */
    protected $table_name;

    /**
     * @var array
     */
    protected $fields = NULL;

    /**
     * @var int
     */
    protected $cache_time = NULL;

    /**
     * @var array of strings
     */
    protected $standard_clauses;

    /**
     * @var array of key => value pairs
     */
    //protected $options;

    /**
     * Initialise the mapper
     */
    public function __construct()
    {
        $this->f3 = \Base::instance();
        $this->db = new \DB\SQL\Mapper($this->f3->get("DB"), $this->table_name, $this->fields, $this->cache_time);

        $this->standard_clauses = [];
        //$this->options = [
        //    "order"     => [],
        //    "group"     => [],
        //    "limit"     => "",
        //    "offset"    => "",
        //];
    }

    /**
     * Add standard query clauses based on table fields
     *
     * @paran string $query
     * @return string
     */
    protected function add_standard_clauses(string $query = "")
    {
        if ($this->db->exists("enabled"))
        {
            $this->standard_clauses[] = "enabled=1";
        }

        if ($this->db->exists("deleted"))
        {
            $this->standard_clauses[] = "deleted=0";
        }

        if (!empty($this->standard_clauses))
        {
            if (!empty($query))
            {
                $query .= " AND ";
            }

            $query .= implode(" AND ", $this->standard_clauses);
        }

        return $query;
    }

    /**
     * Add standard options based on table fields
     *
     * @return void
     */
    //protected function add_standard_options()
    //{
    //    if ($this->db->exists("sort_order"))
    //    {
    //        $this->options["order"][] = "sort_order";
    //    }
    //
    //    if ($this->db->exists("name"))
    //    {
    //        $this->options["order"][] = "name";
    //    }
    //}
}
