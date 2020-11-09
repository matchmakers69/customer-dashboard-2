#!/usr/bin/env bash
if [ ! -z ${CLIENT_ID} ]; then 
    echo export CLIENT_ID=${CLIENT_ID} >> /etc/apache2/envvars
fi
/usr/sbin/apache2ctl -D FOREGROUND
