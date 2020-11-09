<?php

/**
 * Web services router
 *
 * @copyright (c) 2018 Kaboodle Solutions Ltd
 * @package   KBF
 * @author    Jack Wilsdon <jack.wilsdon@kaboodle.co.uk>
 * @author    Sunny Lum <sunny.lum@kaboodle.co.uk>
 * @author    Andy Hartley <andy.hartley@kaboodle.co.uk>
 * @author    Alan Horrocks <alan.horrocks@outgoing.co.uk>
 */

$f3->route(
    'GET /minion/@task', function ($f3, $params) {
        if (php_sapi_name() == "cli") {
            $classname = "\\Task\\" . ltrim($params['task'], "\\");
            if (class_exists($classname)) {
                $task = new $classname;
                $task->execute();
            } else {
                echo "${classname} not found\n";
                exit;
            }
        }
    }
);






// Basket Routes
// $f3->route('GET /api/basket', 'Controller\APIAjax\Basket->get');
// $f3->route('POST /api/basket', 'Controller\APIAjax\Basket->create');
// $f3->route('POST /api/basket/pax', 'Controller\APIAjax\Basket->add_pax');
// $f3->route('PUT /api/basket/pax', 'Controller\APIAjax\Basket->update_pax');
// $f3->route('POST /api/basket/accommodation', 'Controller\APIAjax\Basket->add_accommodation');
// $f3->route('PUT /api/basket/accommodation', 'Controller\APIAjax\Basket->update_accommodation');
// $f3->route('POST /api/basket/accommodation/@accommodation_id/extra', 'Controller\APIAjax\Basket->add_accommodationextra');
// $f3->route('POST /api/basket/tickets', 'Controller\APIAjax\Basket->add_tickets');
// $f3->route('POST /api/basket/insurance', 'Controller\APIAjax\Basket->add_insurance');
// $f3->route('POST /api/basket/extras', 'Controller\APIAjax\Basket->add_extras');
// $f3->route('POST /api/basket/discountcode', 'Controller\APIAjax\Basket->add_discount');
// $f3->route('POST /api/basket/transport', 'Controller\APIAjax\Basket->add_transport');
// $f3->route('POST /api/basket/consent', 'Controller\APIAjax\Basket->add_consent');
// $f3->route('PUT /api/basket/consent', 'Controller\APIAjax\Basket->update_consent');
// $f3->route('POST /api/basket/delivery', 'Controller\APIAjax\Basket->add_delivery');
// $f3->route('PUT /api/basket/delivery/@delivery_id', 'Controller\APIAjax\Basket->update_delivery');
// $f3->route('POST /api/basket/complete', 'Controller\APIAjax\Basket->complete');

// $f3->route('DELETE /api/basket/@engine/@id', 'Controller\APIAjax\Basket->delete');
// $f3->route('DELETE /api/basket/@engine', 'Controller\APIAjax\Basket->delete');
// $f3->route('DELETE /api/basket', 'Controller\APIAjax\Basket->destroy');

// Package Routes
// $f3->route('GET /api/package/accommodation/@accommodation_id', 'Controller\APIAjax\Package->get_accommodation');
// $f3->route('GET /api/package/accommodation', 'Controller\APIAjax\Package->get_accommodation');
// $f3->route('GET /api/package/accommodation/@accommodation_id/availability/@room_id', 'Controller\APIAjax\Package->get_accommodationavailability');
// $f3->route('GET /api/package/accommodation/@accommodation_id/availability', 'Controller\APIAjax\Package->get_accommodationavailability');
// $f3->route('GET /api/package/accommodationavailability', 'Controller\APIAjax\Package->get_accommodationavailability');
// $f3->route('GET /api/package/extras', 'Controller\APIAjax\Package->get_extras');
// $f3->route('GET /api/package/extrasavailability', 'Controller\APIAjax\Package->get_extrasavailability');
// $f3->route('GET /api/package/extra/@extra_id/availability', 'Controller\APIAjax\Package->get_extraavailability');
// $f3->route('GET /api/package/extra/@extra_id', 'Controller\APIAjax\Package->get_extra');
// $f3->route('GET /api/package/tickets', 'Controller\APIAjax\Package->get_tickets');
// $f3->route('GET /api/package/ticketavailability/@event_id/@ticket_id', 'Controller\APIAjax\Package->get_ticketsavailability');
// $f3->route('GET /api/package/ticketavailability/@event_id', 'Controller\APIAjax\Package->get_ticketsavailability');
// $f3->route('GET /api/package/ticketavailability', 'Controller\APIAjax\Package->get_ticketsavailability');
// $f3->route('GET /api/package/transport', 'Controller\APIAjax\Package->get_transport');
// $f3->route('GET /api/package/transportavailability', 'Controller\APIAjax\Package->get_transportavailability');
// $f3->route('GET /api/package/insurance', 'Controller\APIAjax\Package->get_insurance');
// $f3->route('GET /api/package/delivery/@delivery_id', 'Controller\APIAjax\Package->get_delivery');
// $f3->route('GET /api/package/delivery', 'Controller\APIAjax\Package->get_delivery');
// $f3->route('GET /api/package', 'Controller\APIAjax\Package->get');

// Bookings Routes
$f3->route('GET /api/bookings', 'Controller\APIAjax\Bookings->get');
$f3->route('PUT /api/booking/@booking_id/delivery/@allocation_id', 'Controller\APIAjax\Bookings->update_delivery');
$f3->route('GET /api/booking/@booking_id', 'Controller\APIAjax\Bookings->get_booking');
$f3->route('PUT /api/booking/@booking_id/paymentplan', 'Controller\APIAjax\Bookings->update_payment_plan');
$f3->route('GET /api/booking/download/@hash', 'Controller\APIAjax\Bookings->download');
$f3->route('GET /api/booking/@booking_id/paymentplan/projection', 'Controller\APIAjax\Bookings->get_payment_plan_projection');
$f3->route('POST /api/booking/@booking_id/resale', 'Controller\APIAjax\Bookings->add_resale');
$f3->route('DELETE /api/booking/@booking_id/resale', 'Controller\APIAjax\Bookings->remove_resale');
$f3->route('DELETE /api/booking/@booking_id/resale/@allocation_id', 'Controller\APIAjax\Bookings->remove_resale');

// Customer Routes
$f3->route('POST /api/customer/create', 'Controller\APIAjax\Customer->create');
$f3->route('PUT /api/customer/update', 'Controller\APIAjax\Customer->update');
$f3->route('POST /api/customer/login', 'Controller\APIAjax\Customer->login');
$f3->route('GET /api/customer/logout', 'Controller\APIAjax\Customer->logout');
$f3->route('POST /api/customer/password/reset', 'Controller\APIAjax\Customer->reset_password');
$f3->route('POST /api/customer/password/change', 'Controller\APIAjax\Customer->change_password');
$f3->route('GET /api/customer/email/check', 'Controller\APIAjax\Customer->check_email');
$f3->route('GET /api/customer/check', 'Controller\APIAjax\Customer->check');
$f3->route('GET /api/customer/addresses', 'Controller\APIAjax\Customer->get_addresses');
$f3->route('GET /api/customer', 'Controller\APIAjax\Customer->get');

// Payment Routes
$f3->route('POST /api/payment', 'Controller\APIAjax\Payment->create');
// $f3->route('PUT /api/payment/@reference', 'Controller\APIAjax\Payment->complete');
// $f3->route('GET /api/payment/trace_number', 'Controller\APIAjax\Payment->trace_number');
// $f3->route('GET /api/payment/card_charge', 'Controller\APIAjax\Payment->card_charge');

// Client Routes
$f3->route('GET /api/client/card_types', 'Controller\APIAjax\Client->card_types');
$f3->route('GET /api/client/card_charge', 'Controller\APIAjax\Client->card_charge');
$f3->route('GET /api/client/countries', 'Controller\APIAjax\Client->countries');
$f3->route('GET /api/client/genders', 'Controller\APIAjax\Client->genders');
$f3->route('GET /api/client/ssrs', 'Controller\APIAjax\Client->ssrs');
$f3->route('GET /api/client/config', 'Controller\APIAjax\Client->config');

$f3->route('GET /*', 'Controller\Welcome->Index');
