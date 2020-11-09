<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="text" encoding="UTF-8" media-type="text/plain"/>

    <!-- disable built-in output of all text nodes -->
    <xsl:template match="text()|@*"/>
    <xsl:include href="functions.xsl"/>

    <xsl:template match="/">
{
        <xsl:apply-templates/>
}
    </xsl:template>

    <xsl:template match="booking">
    "booking": {
        "reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./reference"/></xsl:call-template>,
        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
        "group_size": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@group_size"/></xsl:call-template>,
        "booking_printed":  <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@booking_printed"/></xsl:call-template>,
        "family_booking":  <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@family_booking"/></xsl:call-template>,
        "created_date":  <xsl:apply-templates select="./created_date"/>,
        "completed_date": <xsl:apply-templates select="./completed_date"/>,
        "departure_date": <xsl:apply-templates select="./departure_date"/>,
        "return_date": <xsl:apply-templates select="./return_date"/>,
        "payment_due_date": <xsl:apply-templates select="./payment_due_date"/>,
        "status": {
            "code": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./status/@code"/></xsl:call-template>,
            "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./status"/></xsl:call-template>
        },
        "client": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./client"/></xsl:call-template>,
        "currency": {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./currency/@id"/></xsl:call-template>,
            "iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./currency/@iso_code"/></xsl:call-template>,
            "exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./currency/@exponent"/></xsl:call-template>,
            "symbol":  <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./currency"/></xsl:call-template>
        },
        "payment_status": {
            "code": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./payment_status/@code"/></xsl:call-template>,
            "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./payment_status"/></xsl:call-template>
        },
        <xsl:if test="downloads_list">
            "downloads": <xsl:apply-templates select="./downloads_list"/>,
        </xsl:if>
        <xsl:if test="extras_list">
            "extras": <xsl:apply-templates select="./extras_list"/>,
        </xsl:if>
        <xsl:if test="insurance_policies_list">
            "insurance": <xsl:apply-templates select="./insurance_policies_list"/>,
        </xsl:if>
        <xsl:if test="tickets_list">
            "tickets": <xsl:apply-templates select="./tickets_list"/>,
        </xsl:if>
        <xsl:if test="accommodations_list">
            "accommodation": <xsl:apply-templates select="./accommodations_list"/>,
        </xsl:if>
        <xsl:if test="transports_list">
            "transport": <xsl:apply-templates select="./transports_list"/>,
        </xsl:if>
        <xsl:if test="payments_list">
            "payments": <xsl:apply-templates select="./payments_list"/>,
        </xsl:if>
        <xsl:if test="apportionments_list">
            "apportionments": <xsl:apply-templates select="./apportionments_list"/>,
        </xsl:if>
        <xsl:if test="package">
            "package": <xsl:apply-templates select="./package"/>,
        </xsl:if>
        <xsl:if test="prices">
            "prices": <xsl:apply-templates select="./prices"/>,
        </xsl:if>
        <xsl:if test="engines_list">
            "engines": [
                <xsl:for-each select="./engines_list/engine">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
                    "booking_flow": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@booking_flow"/></xsl:call-template>,
                    "sort_order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@sort_order"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                }
                <xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ],
        </xsl:if>
        <xsl:if test="pax_list">
            "pax": <xsl:apply-templates select="./pax_list"/>,
        </xsl:if>
        "payment_plans_list": ""
    }
    </xsl:template>

    <xsl:template match="prices">
        {
            "booking_price": <xsl:apply-templates select="./booking_price"/>,
            "booking_fee": <xsl:apply-templates select="./booking_fee"/>,
            "tickets_booking_fee": <xsl:apply-templates select="./tickets_booking_fee"/>,
            "discounts": <xsl:apply-templates select="./discounts"/>,
            "referrals": <xsl:apply-templates select="./referrals"/>,
            "charges": <xsl:apply-templates select="./charges"/>,
            "total_booking_price": <xsl:apply-templates select="./total_booking_price"/>,
            "paid": <xsl:apply-templates select="./paid"/>,
            "deposit": <xsl:apply-templates select="./deposit"/>,
            "package_price": <xsl:apply-templates select="./package_price"/>,
            "damage_deposit": <xsl:apply-templates select="./damage_deposit"/>,
            "accommodation_price": <xsl:apply-templates select="./accommodation_price"/>,
            "transport_price": <xsl:apply-templates select="./transport_price"/>,
            "extras_price": <xsl:apply-templates select="./extras_price"/>,
            "tickets_price": <xsl:apply-templates select="./tickets_price"/>,
            "insurance_price": <xsl:apply-templates select="./insurance_price"/>,
            "delivery_price": <xsl:apply-templates select="./delivery_price"/>
        }
    </xsl:template>

    <xsl:template match="package">
        {
            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "meta_package_name":  <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./meta_package_name"/></xsl:call-template>,
            "destination":  <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./destination"/></xsl:call-template>,
            "status": {
                "code": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./status/@code"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./status"/></xsl:call-template>
            },
            "price": <xsl:apply-templates select="./prices/price"/>,
            "booking_fee": <xsl:apply-templates select="./prices/booking_fee"/>,
            "deposit": <xsl:apply-templates select="./prices/deposit"/>,
            "room_allocation": {
                "pax": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./room_allocation/@pax"/></xsl:call-template>,
                "group_leader": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./room_allocation/@group_leader"/></xsl:call-template>
            },
            "coach_allocation": {
                "pax": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./coach_allocation/@pax"/></xsl:call-template>,
                "group_leader": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./coach_allocation/@group_leader"/></xsl:call-template>
            },
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>
        }
    </xsl:template>

    <xsl:template match="transports_list">
        [
            <xsl:for-each select="./transport">
            {
                "journey_leg": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./journey_leg/@id"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./journey_leg"/></xsl:call-template>
                },
                "departure_location": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./departure_location/@id"/></xsl:call-template>,
                    "airport_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./departure_location/@airport_code"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./departure_location"/></xsl:call-template>
                },
                "departure_date": <xsl:apply-templates select="./departure_date"/>,
                "departure_location_notes": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./departure_location_notes"/></xsl:call-template>,
                "arrival_location": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./arrival_location/@id"/></xsl:call-template>,
                    "airport_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./arrival_location/@airport_code"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./arrival_location"/></xsl:call-template>
                },
                "arrival_date": <xsl:apply-templates select="./arrival_date"/>,
                "arrival_location_notes": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./arrival_location_notes"/></xsl:call-template>,
                "flight_number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./flight_number"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price"/>,
                "route_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@route_id"/></xsl:call-template>,
                "stop_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@stop_id"/></xsl:call-template>
            }
            <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="payments_list">
        [
        <xsl:for-each select="./payment">
            {
                "payment_date": <xsl:apply-templates select="./payment_date"/>,
                "pax": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./pax/@id"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./pax"/></xsl:call-template>
                },
                "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./type"/></xsl:call-template>,
                "card": {
                    "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./card/type"/></xsl:call-template>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./card/name"/></xsl:call-template>,
                    "four_digits": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./card/@four_digits"/></xsl:call-template>
                },
                "amount": <xsl:apply-templates select="./amount"/>,
                "status": {
                    "paid": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./status/@paid"/></xsl:call-template>,
                    "confirmed": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./status/@confirmed"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./status"/></xsl:call-template>
                },
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@reference"/></xsl:call-template>
            }
            <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="downloads_list">
    [
        <xsl:for-each select="./download">
        {
            "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
            "external": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./external"/></xsl:call-template>,
            "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
            "key": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./key"/></xsl:call-template>
        }
        <xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="extras_list">
    [
        <xsl:for-each select="./extra">
        {
            "name":<xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "option": {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./option/@id"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./option"/></xsl:call-template>
            },
            "group": {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./group/@id"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./group"/></xsl:call-template>
            },
            "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
            <xsl:if test="price">
                "price": <xsl:apply-templates select="./price"/>
            </xsl:if>,
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "quantity": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@quantity"/></xsl:call-template>
        }
        <xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="accommodations_list">
    [
        <xsl:for-each select="./accommodation">
        {
            "start_date": <xsl:apply-templates select="./start_date"/>,
            "end_date":  <xsl:apply-templates select="./end_date"/>,
            "checkout_date": <xsl:apply-templates select="./checkout_date"/>,
            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "visa_letter_alias": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./visa_letter_alias"/></xsl:call-template>,
            "address": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address"/></xsl:call-template>,
            "room_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./room_name"/></xsl:call-template>,
            "room_type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./room_type"/></xsl:call-template>,
            "resort": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./resort"/></xsl:call-template>,
            "prices": {
                "allocations": <xsl:apply-templates select="./prices/allocations"/>,
                "supplement": <xsl:apply-templates select="./prices/supplement"/>,
                "nights": [
                    <xsl:for-each select="./prices/nights_list/night">
                        {
                            "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                            "iso_date_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_date_value"/></xsl:call-template>,
                            "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                        }
                        <xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]
            },
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "room_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@room_id"/></xsl:call-template>,
            "group_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@group_id"/></xsl:call-template>,
            "occupancy": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@occupancy"/></xsl:call-template>
        }
        <xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="tickets_list">
        [
            <xsl:for-each select="./ticket">
            {
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                "prices": {
                    "price": <xsl:apply-templates select="./prices/price"/>,
                    "booking_fee": <xsl:apply-templates select="./prices/booking_fee"/>,
                    "admin_fee": <xsl:apply-templates select="./prices/admin_fee"/>,
                    "delivery_charge": <xsl:apply-templates select="./prices/delivery_charge"/>,
                    "total_ticket_price": <xsl:apply-templates select="./prices/total_ticket_price"/>
                },
                "purchased_date": <xsl:apply-templates select="./purchased_date"/>,
                "delivery_option": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./delivery_option"/></xsl:call-template>,
                "event_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@event_id"/></xsl:call-template>,
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="pax_list">
        [
            <xsl:for-each select="./pax">
            {
                "personal_details": {
                    "title": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/title"/></xsl:call-template>,
                    "first_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/first_name"/></xsl:call-template>,
                    "last_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/last_name"/></xsl:call-template>,
                    "email": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/email"/></xsl:call-template>,
                    "telephone_number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/telephone_number"/></xsl:call-template>,
                    "emergency_contact": {
                        "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/emergency_contact/name"/></xsl:call-template>,
                        "telephone": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/emergency_contact/telephone"/></xsl:call-template>
                    },
                    "club_membership_number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/club_membership_number"/></xsl:call-template>,
                    "sex": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/sex"/></xsl:call-template>,
                    "gender": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/gender"/></xsl:call-template>,
                    "date_of_birth": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./personal_details/date_of_birth"/></xsl:call-template>
                },
                "passport": {
                    "first_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/first_name"/></xsl:call-template>,
                    "middle_names": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/middle_names"/></xsl:call-template>,
                    "last_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/last_name"/></xsl:call-template>,
                    "number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/number"/></xsl:call-template>,
                    "issue_country": {
                        "id": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/issue_country/@id"/></xsl:call-template>,
                        "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/issue_country"/></xsl:call-template>
                    },
                    "nationality": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/nationality"/></xsl:call-template>,
                    "expiry_date": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./passport/expiry_date"/></xsl:call-template>
                },
                "prices": {
                    "package_price": <xsl:apply-templates select="./prices/package_price"/>,
                    "package_booking_fee": <xsl:apply-templates select="./prices/package_booking_fee"/>,
                    "extras_price": <xsl:apply-templates select="./prices/extras_price"/>,
                    "tickets_price": <xsl:apply-templates select="./prices/tickets_price"/>,
                    "tickets_booking_fee": <xsl:apply-templates select="./prices/tickets_booking_fee"/>,
                    "tickets_admin_fee": <xsl:apply-templates select="./prices/tickets_admin_fee"/>,
                    "tickets_delivery_charge": <xsl:apply-templates select="./prices/tickets_delivery_charge"/>,
                    "total_tickets_fee": <xsl:apply-templates select="./prices/total_tickets_fee"/>,
                    "delivery_price": <xsl:apply-templates select="./prices/delivery_price"/>,
                    "discounts": <xsl:apply-templates select="./prices/discounts"/>,
                    "referrals": <xsl:apply-templates select="./prices/referrals"/>,
                    "charges": <xsl:apply-templates select="./prices/charges"/>,
                    "booking_price": <xsl:apply-templates select="./prices/booking_price"/>,
                    "total_booking_price": <xsl:apply-templates select="./prices/total_booking_price"/>,
                    "paid": <xsl:apply-templates select="./prices/paid"/>,
                    "outstanding_balance": <xsl:apply-templates select="./prices/outstanding_balance"/>,
                    "deposit": <xsl:apply-templates select="./prices/deposit"/>,
                    "deposit_outstanding": <xsl:apply-templates select="./prices/deposit_outstanding"/>
                },
                "eticket_barcode": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./eticket_barcode"/></xsl:call-template>,
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "customer_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@customer_id"/></xsl:call-template>,
                "lead_pax": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@lead_pax"/></xsl:call-template>,
                "cancelled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@cancelled"/></xsl:call-template>
            }
            <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="apportionments_list">
        [
            <xsl:for-each select="./apportionment">
            {
                "apportionment_date": <xsl:apply-templates select="./apportionment_date"/>,
                "parent_pax": {
                    "id":  <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./parent_pax/@id"/></xsl:call-template>,
                    "name":  <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./parent_pax"/></xsl:call-template>
                },
                "net_amount": <xsl:apply-templates select="./net_amount"/>,
                "pax_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./pax_name"/></xsl:call-template>,
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "parent_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@parent_id"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@reference"/></xsl:call-template>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="insurance_policies_list">
        [
            <xsl:for-each select="./insurance">
            {
                "policy_reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./policy_reference"/></xsl:call-template>,
                "policy_type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./policy_type"/></xsl:call-template>,
                "customer_reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./customer_reference"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./provider_name"/></xsl:call-template>,
                "purchased_date": <xsl:apply-templates select="./purchased_date"/>,
                "contact_details": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./contact_details"/></xsl:call-template>,
                "age": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./age"/></xsl:call-template>,
                "duration": {
                    "days": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./duration/@days"/></xsl:call-template>
                },
                "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price"/>,
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 5)='_price']|*[substring(name(), string-length(name()) - 7)='_balance']|*[substring(name(), string-length(name()) - 7)='_deposit']|*[substring(name(), string-length(name()) - 6)='_charge']|*[substring(name(), string-length(name()) - 3)='_fee']|price|deposit|allocations|supplement|paid|discounts|amount|net_amount|referrals|charges|prices/deposit_outstanding">
        {
            "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
            <xsl:if test="./iso_date_value">
                "iso_date_value": <xsl:apply-templates select="./iso_date_value"/>,
            </xsl:if>
            "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }
    </xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
        {
            <xsl:if test="./@iso_value">
                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>
            </xsl:if>
            <xsl:if test="./@iso_value and ./@isotz_value">,</xsl:if>
            <xsl:if test="./@isotz_value">
                "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@isotz_value"/></xsl:call-template>
            </xsl:if>
        }
    </xsl:template>

</xsl:stylesheet>