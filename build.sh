#!/bin/bash
#
# SM3 build script for Kaboodle Customer Dashboard deployment to production
#
# @copyright (c) 2019 Kaboodle Solutions Ltd
# @package Kaboodle Customer Dashboard
# @author David Henderson <david.henderson@kaboodle.co.uk>
# @author Sunny Lum <sunny.lum@outgoing.co.uk>
# @author Alan Horrocks <alan.horrocks@outgoing.co.uk>
# @version $id$
#

MKDIR="mkdir -p -m 0775"            # create directory, fail gracefully if exists
LN="ln -sfn"                        # create/overwrite existing symbolic link
CP="cp -n"                          # copy without clobbering existing
CM="sudo chmod -R 775"              # change permissions
CO="sudo chown -R www-data:users"   # change owner permissions

# revert changes to package.json
cleanup() {
	if [ -f "package.json.bak" ]; then
		mv package.json.bak package.json
	fi
}

# ensure we have a version
if [ "$#" -ne 1 ]; then
	echo "usage: $0 version"
	exit 1
fi

# revert changes on exit
trap cleanup EXIT
set -e

# replace version in package.json
sed -i.bak "s/\"version\":\s*\"0\.0\.0\"/\"version\": \"${1#v}\"/g" package.json

# install node modules
npm install --loglevel error

# build the production scripts
ENABLE_SENTRY=1 npm run build
