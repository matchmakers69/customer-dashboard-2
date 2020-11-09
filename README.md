# DAS2 - Customer Dashboard 2 (Working Title)

DAS2, also referred to as _Customer Dashboard 2_ is a customer-facing product which allows users to manage, amend and add to pre-existing bookings.

DAS2 makes calls to the Pacman web service in order to reflect the booking and event data set up through Pacman.

## Architecture

The `application` folder contains the PHP application layer which makes calls to the Pacman web service and translates the XML it receives into JSON for use in the DAS2 front end.

The `src` folder contains the [React](https://reactjs.org/) front end. The front end also makes use of the [Redux](https://redux.js.org/) library for managing its state.

## Set Up

### Dependencies

-   php
-   composer
-   redis-server
-   php-redis
-   node
-   npm

### 1. Apache Configuration (Development)

Create a `customer-dashbord.conf` file in the apache config directory (`/etc/apache2/sites-available` on Linux) from the following example:

```conf
# Replace with location of your public directory for your local kbf install
<Directory /home/user/Projects/das2/public>
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule .* index.php/$0 [L]
    Options Indexes FollowSymLinks Multiviews
    AllowOverride None
    Require all granted
</Directory>

<VirtualHost *:80>
    # Set to whatever matches your kbf entry in your hosts file
    ServerName das2.local
    # Replace with location of your public directory for your local kbf install
    DocumentRoot /home/user/Projects/das2/public
</VirtualHost>
```

### 2. Hosts Configuration

Add a DAS2 entry to your hosts file (`/etc/hosts` on Linux) pointing to your local IP address:

```hosts
127.0.0.1   das.local
```

### 3. SSH Configuration

Amend or create your SSH config in `~/.ssh/config` to support hostname aliases for any Git dependencies.

```
Host *-github.com
    HostName github.com
    user git
    IdentityFile YOUR_SSH_KEY
```

### 4. Create a DAS2 Configuration File

-   Make a copy of `application/development.ini.dist` in the same directory and rename it to `development.ini`.

-   Change the `PACMAN_HOST` in this file to wherever your instance of Pacman is hosted.

-   Change the database connection parameters if necessary.

### 5. Install Dependencies

After cloning the repository, `cd` into the root directory and run:

```shell
# Install composer packages
composer install

# Install npm packages
npm install

# Run webpack build script
npm run build
```

### 6. Success

Visit the url set in the host file to confirm installation was successful!

## Optional Setup

### PHP FPM configuration (Development)

DAS2 currently makes a lot of concurrent requests, so if you are using PHP FPM, then you will need to increase the default max_children otherwise you can end up with delayed and failed responses.

In your `/etc/php/7.1/fpm/pool.d/www.conf` config, increase the default values to:

```
pm = dynamic
pm.max_children = 25
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 10
```
