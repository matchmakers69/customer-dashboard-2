FROM ubuntu:bionic
COPY docker/conf/apache2.conf /etc/apache2/apache2.conf
COPY docker/conf/dashboard.conf /etc/apache2/sites-available/
ARG PHP_VERSION=7.3
COPY docker/conf/php.ini /etc/php/$PHP_VERSION/apache2/php.ini
COPY docker/init/init.sh /init.sh
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update &&\
    apt-get install --no-install-recommends -y\
        software-properties-common &&\
    add-apt-repository ppa:ondrej/php -y -u &&\
    apt-get install --no-install-recommends -y\
        libapache2-mod-php$PHP_VERSION\
        apache2\
        php$PHP_VERSION\
        php$PHP_VERSION-curl\
        php$PHP_VERSION-mysql\
        php$PHP_VERSION-xdebug\
        php$PHP_VERSION-xsl &&\
    apt-get clean &&\
    rm -rf /var/lib/apt/lists/* &&\
    mkdir -p /var/log/og /var/log/kaboodle &&\
    chmod -R +777 /var/log/og /var/log/kaboodle &&\
    a2enmod rewrite &&\
    a2dissite 000-default.conf &&\
    a2ensite dashboard

RUN chmod +x /init.sh

CMD ["/init.sh"]
