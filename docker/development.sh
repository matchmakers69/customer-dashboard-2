#!/bin/bash
set -e

DOCKER_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DASHBOARD_DIR=$DOCKER_DIR/..

BRANCH=$(git -C $DASHBOARD_DIR symbolic-ref --short HEAD)
export CONTAINER_PREFIX=$BRANCH
export COMPOSE_PROJECT_NAME=dashboard_"$BRANCH"
export DASHBOARD_PORT=${DASHBOARD_PORT:=3002}

sedi() {
    sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

stop() {
    docker-compose -f $DASHBOARD_DIR/docker-compose.yml down
}

start() {
    # Overwrite config to point to pacman
    PACMAN_HOST=${PACMAN_HOST:="$(hostname)"}
    PACMAN_PORT=${PACMAN_PORT:=3000}
    cp $DOCKER_DIR/conf/development.ini $DASHBOARD_DIR/application
    sedi s/PACMAN_HOST/$PACMAN_HOST/g $DASHBOARD_DIR/application/development.ini
    sedi s/PACMAN_PORT/$PACMAN_PORT/g $DASHBOARD_DIR/application/development.ini

    # Create a cache folder
    mkdir -p $DASHBOARD_DIR/public/tmp/cache

    # Install dependencies and build
    composer install --no-scripts -d $DASHBOARD_DIR
    npm ci --prefix $DASHBOARD_DIR
    npm run build --prefix $DASHBOARD_DIR

    docker-compose build --pull
    docker-compose -f $DASHBOARD_DIR/docker-compose.yml up -d
}

$1
