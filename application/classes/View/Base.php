<?php
/**
 * Base view class
 *
 * @copyright (c) 2017 Packman Systems Ltd
 * @package KBF
 * @author Josh McEwen <josh.mcewen@kaboodle.co.uk>
 * @author Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */
namespace View;

abstract class Base
{
    /**
     * The name of the content partial in a layout
     * @var string
     */
    const CONTENT_PARTIAL = "content";

    /**
     * Layout filename
     * @var string
     */
    protected $_layout_filename = NULL;

    /**
     * Template filename
     * @var string
     */
    protected $_template = NULL;

    /**
     * Control use of layout file
     * @var bool
     */
    protected $_render_layout = TRUE;

    /**
     * The path to the template files
     * @var string
     */
    protected $_loader_path = NULL;

    /**
     * The path for partials
     * @var string
     */
    protected $_partials_dir = NULL;

    /**
     * Template filename extension
     * @var string
     */
    protected $_template_file_extension = NULL;

    /**
     * Renderer
     * @var \Mustache_Engine
     */
    protected $_renderer = NULL;

    /**
     * @var mixed
     */
    public $data;

    /**
     * @var string
     */
    public $release_tag;

    /**
     * @var string
     */
    public $manifest;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->release_tag = (APPVER == "##appver##") ? "dev" : APPVER;

        $f3 = \Base::instance();

        if(file_exists($f3->get('mustache.manifest_file')))
        {
            $this->manifest = json_decode(file_get_contents($f3->get('mustache.manifest_file')));
        }
        else
        {
            $this->manifest = "";
        }

        $this->_loader_path = $f3->get('mustache.loader_path');
        $this->_partials_dir = $f3->get('mustache.partials_dir');
        $this->_template_file_extension = $f3->get('mustache.template_file_extension');
        $this->_layout_filename = $f3->get('mustache.layout_filename');

        $this->_template = strtolower(str_replace(["View\\", "\\"], ["", "/"], get_class($this))) . ".{$this->_template_file_extension}";

        $this->_renderer = new \Mustache_Engine([
            "loader"            => new \Mustache_Loader_FilesystemLoader($this->_loader_path, ["extension" => $this->_template_file_extension]),
            "partials_loader"   => new \MustacheLoader($this->_loader_path . $this->_partials_dir),
        ]);
    }

    /**
     * Assign a variable to the template
     *
     * @param string/array $key
     * @param mixed $value
     * @return void
     */
    public function __set($key, $value = NULL)
    {
        if (is_array($key))
        {
            foreach ($key as $name => $value)
            {
                $this->$name = $value;
            }
        }
        else
        {
            $this->$key = $value;
        }
    }

    /**
     * Allows testing with empty() and isset() to work
     *
     * @param string $key
     * @return bool
     */
    public function __isset($key)
    {
        return isset($key, $this);
    }

    /**
     * Set the layout template filename
     *
     * @param string $filename
     * @return void
     */
    public function set_layout(string $filename)
    {
        $this->_layout_filename = $filename;
    }

    /**
     * Control whether to use the layout template
     *
     * @param bool $use_layout_template
     * @return void
     */
    public function render_layout(bool $use_template)
    {
        $this->_render_layout = $use_template;
    }

    // Placeholder method - replace it in the derived class
    public function before() { }

    /**
     * Render and return the view
     *
     * @return string
     */
    public function render() : string
    {
        if ($this->_render_layout === TRUE && $this->_layout_filename != NULL)
        {
            // Get the content of the template file and pass it into the layout as a partial
            $template_content = file_get_contents("{$this->_loader_path}/{$this->_template}");
            $this->_renderer->setPartials([self::CONTENT_PARTIAL => $template_content]);

            // Then replace the template filename with the layout filename
            $this->_template = $this->_layout_filename . (!is_null($this->_template_file_extension) ? ".{$this->_template_file_extension}" : "");
        }

        // Pre-process the view data
        $this->before();

        return $this->_renderer->render($this->_template, $this);
    }
}
