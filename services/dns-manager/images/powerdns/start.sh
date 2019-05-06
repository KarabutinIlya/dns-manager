#!/bin/sh

/usr/sbin/pdns_server \
    --gpgsql-host=$DB_HOST \
    --gpgsql-port=$DB_PORT \
    --gpgsql-dbname=$DB_NAME \
    --gpgsql-user=$DB_USER \
    --gpgsql-password=$DB_PASSWORD \
    --gpgsql-dnssec="no" \
    --webserver=$WEB_ENABLED \
    --webserver-address=0.0.0.0 \
    --webserver-port=$WEB_PORT
