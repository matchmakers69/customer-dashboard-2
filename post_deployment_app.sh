#!/bin/bash
#
# Post deployment script for KBF
#
# @copyright (c) 2019 Packman Systems Ltd
# @package Kaboodle Customer Dashboard
# @author David Henderson <david.henderson@kaboodle.co.uk>
# @author Alan Horrocks <alan.horrocks@kaboodle.co.uk>
# @author Sunny Lum <sunny.lum@kaboodle.co.uk>
# @version $id$
#

MKDIR="mkdir -p -m 0775"            # create directory, fail gracefully if exists
LN="ln -sfn"                        # create/overwrite existing symbolic link
CP="cp -n"                          # copy without clobbering existing
CM="sudo chmod -R 0775"             # change permissions
CO="sudo chown -R www-data:users"   # change owner permissions

