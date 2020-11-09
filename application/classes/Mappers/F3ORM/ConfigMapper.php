<?php
/**
 * Config mapper
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Andy Hartley <andrew.hartley@outgoing.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace Mappers\F3ORM;

class ConfigMapper extends BaseMapper implements \Mappers\ConfigMapperInterface
{
    const CACHE_TIME = NULL; //86400;   // Cache for 1 day

    /**
     * @var string
     */
    protected $table_name = "config";

    /**
     * @var int
     */
    protected $cache_time = self::CACHE_TIME;

    /**
     * Find a configuration based on it's handle
     *
     * @param string $handle
     * @return mixed
     * @throws \Exception
     */
    public function find_by_handle(string $handle)
    {
        $query = "handle=? AND environment=?";
        $query = $this->add_standard_clauses($query);

        $record = $this->db->load([$query, $handle, strtoupper(\Server::environment_name())]);
        if ($record === FALSE)
        {
            throw new \Exception("Client config. not found: {$handle}");
        }

        $config = json_decode($record->data, TRUE);
        if (is_null($config))
        {
            throw new \Exception("Invalid client config. data: {$handle}");
        }

        $config["client_handle"] = $handle;
        return \Domain\Model\Factory\ClientConfig::create_from_array($config);
    }
}
