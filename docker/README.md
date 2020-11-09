# Run DAS2 in Docker

## Usage

`docker/development.sh start` to run install and build steps and start the Dashboard container.

Go to `localhost:3002` and see Dashboard running.

`docker/development.sh stop` to stop the container.

### Environment Variables

By default, Dashboard will set the pacman web service url to `hostname:3000`. You can override this with environment variables. For example:

`PACMAN_HOST=dev.pacman.mike PACMAN_PORT=80 docker/development.sh start`

In the same manner, you can also set the port that DAS will be hosted on:

`DAS_PORT=3550 docker/development.sh start`

## Advanced Usage

### Connect vscode to xdebug

In your `.vscode/launch.json` file, add this configuration:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",
            "pathMappings": {
                "/dashboard": "${workspaceRoot}"
            },
            "port": 9000
        }
    ]
}
```

If you press F5, you will be attached to XDebug.
