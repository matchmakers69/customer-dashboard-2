<?php
/**
 * Mustache filesystem loader to allow mixed templates, partials and direct data.
 *
 * @copyright (c) 2017 Packman System Ltd
 * @package KBF
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
class MustacheLoader implements \Mustache_Loader, \Mustache_Loader_MutableLoader
{
    /**
     * @var string
     */
    private $_base_dir = "views";

    /**
     * @var string
     */
    private $_extension = "mustache";

    /**
     * @var array
     */
    private $_templates = [];

    /**
     * Initialise the template loader
     *
     * @param string $base_dir
     * @param array $options
     */
    public function __construct(string $base_dir = NULL, array $options = [])
    {
        if (!is_null($base_dir))
        {
            $this->_base_dir = $base_dir;
        }

        if (isset($options["extension"]))
        {
            $this->_extension = ltrim($options["extension"], ".");
        }
    }

    // Mustache_Loader and Mustache_Loader_Mutable interface methods

    /**
     * Lazy-load template files
     *
     * @param string $name
     * @return string
     */
    public function load($name)
    {
        if (!isset($this->_templates[$name]))
        {
            $this->_templates[$name] = $this->_load_file($name);
        }

        return $this->_templates[$name];
    }

    /**
     * Set a Template source by name.
     *
     * @param string $name
     * @param string $template Mustache Template source
     * @return void
     */
    public function setTemplate($name,$template)
    {
        $this->_templates[$name] = $template;
    }

    // Local helper methods

    /**
     * Load the template file
     *
     * @param string $name
     * @return string
     * @throws \Exception
     */
    protected function _load_file(string $name) : string
    {
        $name = strtolower($name);
        $filename = "{$this->_base_dir}/{$name}.{$this->_extension}";

        if (!$filename)
        {
            throw new \Exception("Mustache template \"{$name}\" not found");
        }

        return file_get_contents($filename);
    }

    /**
     * Set an associative array of Template sources for this loader.
     *
     * @param array $templates
     * @return void
     */
    public function setTemplates(array $templates)
    {
        $this->_templates = array_merge($this->_templates, $templates);
    }
}
