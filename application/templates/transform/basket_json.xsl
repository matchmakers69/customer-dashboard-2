<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="text" encoding="UTF-8" media-type="text/plain"/>

    <!-- disable built-in output of all text nodes -->
    <xsl:template match="text()|@*" />
    <xsl:include href="functions.xsl"/>

    <xsl:template match="/">
{
        <xsl:apply-templates/>
}
    </xsl:template>

    <xsl:template match="basket">
    "basket": {
        <xsl:if test="@id">"id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,</xsl:if>
        "language": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@language"/></xsl:call-template><xsl:if test="@created">,
        "created": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@created"/></xsl:call-template></xsl:if><xsl:if test="@expires">,
        "expires": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@expires"/></xsl:call-template></xsl:if><xsl:if test="@package_id">,
        "package_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@package_id"/></xsl:call-template></xsl:if><xsl:if test="@source">,
        "source": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@source"/></xsl:call-template></xsl:if><xsl:if test="status">,
        "status": <xsl:apply-templates select="./status"/></xsl:if><xsl:if test="currency">,
        "currency": <xsl:apply-templates select="./currency"/></xsl:if><xsl:if test="agent">,
        "agent": <xsl:apply-templates select="./agent"/></xsl:if><xsl:if test="pax_list">,
        "pax": <xsl:apply-templates select="./pax_list"/></xsl:if><xsl:if test="accommodation_list">,
        "accommodations": <xsl:apply-templates select="./accommodation_list"/></xsl:if><xsl:if test="ticket_list">,
        "tickets": <xsl:apply-templates select="./ticket_list"/></xsl:if><xsl:if test="transport_list">,
        "transport": <xsl:apply-templates select="./transport_list"/></xsl:if><xsl:if test="extra_list">,
        "extras": <xsl:apply-templates select="./extra_list"/></xsl:if><xsl:if test="insurance_list">,
        "insurance": <xsl:apply-templates select="./insurance_list"/></xsl:if><xsl:if test="delivery_list">,
        "delivery": <xsl:apply-templates select="./delivery_list"/></xsl:if><xsl:if test="discount_code_list">,
        "discount_codes": <xsl:apply-templates select="./discount_code_list"/></xsl:if><xsl:if test="summary">,
        "summary": <xsl:apply-templates select="./summary"/></xsl:if><xsl:if test="booking">,
        "booking_summary": <xsl:apply-templates select="./booking"/></xsl:if><xsl:if test="payment_option_list">,
        "payment_options": <xsl:apply-templates select="./payment_option_list"/></xsl:if><xsl:if test="completed_booking">,
        "completed_booking": <xsl:apply-templates select="./completed_booking"/></xsl:if><xsl:if test="mandatory_status">,
        "mandatory_status": <xsl:apply-templates select="./mandatory_status"/></xsl:if><xsl:if test="consent_list">,
        "consent": <xsl:apply-templates select="./consent_list"/></xsl:if>
    }
    </xsl:template>

    <xsl:template match="summary">
        {
            <xsl:if test="deposit_summary">
            "deposit": <xsl:apply-templates select="./deposit_summary"/>,</xsl:if><xsl:if test="booking_summary">
            "booking": <xsl:apply-templates select="./booking_summary"/>,</xsl:if><xsl:if test="discounts_summary">
            "discounts": <xsl:apply-templates select="./discounts_summary"/>,</xsl:if><xsl:if test="package_summary">
            "package": <xsl:apply-templates select="./package_summary"/>,</xsl:if><xsl:if test="tickets_summary">
            "tickets": <xsl:apply-templates select="./tickets_summary"/>,</xsl:if><xsl:if test="extras_summary">
            "extras": <xsl:apply-templates select="./extras_summary"/>,</xsl:if><xsl:if test="accommodation_summary">
            "accommodation": <xsl:apply-templates select="./accommodation_summary"/>,</xsl:if><xsl:if test="transport_summary">
            "transport": <xsl:apply-templates select="./transport_summary"/>,</xsl:if>
            "null": {}
        }</xsl:template>

    <xsl:template match="payment_option_list">
        [
            <xsl:for-each select="./payment_option">
            {
                "handle": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@handle"/></xsl:call-template>,
                "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template><xsl:if test="price">,
                "price": <xsl:apply-templates select="./price"/></xsl:if><xsl:if test="payment_plan">,
                "plan": <xsl:apply-templates select="./payment_plan"/></xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="payment_plan_list">
        [
            <xsl:for-each select="./payment_plan">
                <xsl:apply-templates select="."/><xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="payment_plan">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "number_of_payments": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@number_of_payments"/></xsl:call-template>,
                "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                "full_amount": <xsl:apply-templates select="./full_amount"/>,
                "surcharge": <xsl:apply-templates select="./surcharge"/>,
                "booking_amount": <xsl:apply-templates select="./booking_amount"/>,
                "payment_schedule": [
                    <xsl:for-each select="./payment_schedule/payment">
                    {
                        "is_final_payment": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@is_final_payment"/></xsl:call-template>,
                        "date": {
                            "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./date/@iso_value"/></xsl:call-template>
                        },
                        "pay_amount": <xsl:apply-templates select="./pay_amount"/>,
                        "surcharge": <xsl:apply-templates select="./surcharge"/>,
                        "booking_amount": <xsl:apply-templates select="./booking_amount"/>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]
            }
    </xsl:template>

    <xsl:template match="booking">
        {
            "null": {}
        }</xsl:template>

    <xsl:template match="completed_booking">
        {
            "reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@reference"/></xsl:call-template>,
            "amount_paid": <xsl:apply-templates select="./amount_paid"/><xsl:if test="surcharge_paid">,
            "surcharge_paid": <xsl:apply-templates select="./surcharge_paid"/></xsl:if><xsl:if test="booking_price">,
            "booking_price": <xsl:apply-templates select="./booking_price"/></xsl:if><xsl:if test="pax_list">,
            "pax": [
                <xsl:for-each select="./pax_list/pax">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template><xsl:if test="amount_paid">,
                    "amount_paid": <xsl:apply-templates select="./amount_paid"/></xsl:if><xsl:if test="amount_outstanding">,
                    "amount_outstanding": <xsl:apply-templates select="./amount_outstanding"/></xsl:if><xsl:if test="booking_price">,
                    "booking_price": <xsl:apply-templates select="./booking_price"/></xsl:if>
                }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]</xsl:if><xsl:if test="payment_plan">,
            "plan": <xsl:apply-templates select="./payment_plan"/></xsl:if>
        }</xsl:template>

    <xsl:template match="status">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "status": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }</xsl:template>

    <xsl:template match="mandatory_status">
        {
            "tickets": {
                "valid": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./tickets/@valid"/></xsl:call-template>
            },
            "extras": {
                "valid": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./extras/@valid"/></xsl:call-template>
            }
        }</xsl:template>

    <xsl:template match="consent_list">
        [<xsl:for-each select="./consent">{
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
            "handle": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@handle"/></xsl:call-template>,
            "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
            "checked": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@checked"/></xsl:call-template>,
            "other_information": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./other_info"/></xsl:call-template>,
            "is_optout": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./is_optout"/></xsl:call-template>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>]
    </xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 7)='_summary']">
            {
                <xsl:if test="price">"price": <xsl:apply-templates select="./price"/></xsl:if><xsl:if test="booking_fee">,
                "booking_fee": {
                    "price": <xsl:apply-templates select="./booking_fee/price"/>
                }</xsl:if><xsl:if test="damage_deposit">,
                "damage_deposit": {
                    "price": <xsl:apply-templates select="./damage_deposit/price"/>
                }</xsl:if>
            }</xsl:template>

    <xsl:template match="currency">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_code"/></xsl:call-template>,
            "exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@exponent"/></xsl:call-template>,
            "currency_symbol": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }</xsl:template>

    <xsl:template match="package">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "client_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@client_id"/></xsl:call-template>
        }</xsl:template>

    <xsl:template match="agent">
        {
            <xsl:if test="@id">"id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template></xsl:if>
        }</xsl:template>

    <xsl:template match="pax_list">
                [
                    <xsl:for-each select="./pax">
                    {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template><xsl:if test="@type">,
                        "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template></xsl:if><xsl:if test="@customer_type">,
                        "customer_type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@customer_type"/></xsl:call-template></xsl:if><xsl:if test="@sex">,
                        "sex": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@sex"/></xsl:call-template></xsl:if><xsl:if test="@gender">,
                        "gender": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@gender"/></xsl:call-template></xsl:if><xsl:if test="@customer_id">,
                        "customer_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@customer_id"/></xsl:call-template></xsl:if><xsl:if test="@leadpax">,
                        "leadpax": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@leadpax"/></xsl:call-template></xsl:if><xsl:if test="title">,
                        "title": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./title"/></xsl:call-template></xsl:if><xsl:if test="first_name">,
                        "first_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./first_name"/></xsl:call-template></xsl:if><xsl:if test="last_name">,
                        "last_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./last_name"/></xsl:call-template></xsl:if><xsl:if test="email">,
                        "email": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./email"/></xsl:call-template></xsl:if><xsl:if test="telephone">,
                        "phone": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./telephone"/></xsl:call-template></xsl:if><xsl:if test="date_of_birth">,
                        "date_of_birth": {
                            "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./date_of_birth/@iso_value"/></xsl:call-template>
                        }</xsl:if><xsl:if test="address">,
                        "address": <xsl:apply-templates select="./address"/></xsl:if><xsl:if test="medical_requirements">,
                        "medical_requirements": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./medical_requirements"/></xsl:call-template></xsl:if><xsl:if test="membership_number">,
                        "membership_number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./membership_number"/></xsl:call-template></xsl:if><xsl:if test="passport">,
                        "passport": <xsl:apply-templates select="./passport"/></xsl:if>,
                        "emergency_contact": {
                            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./emergency_contact/full_name"/></xsl:call-template>,
                            "phone": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./emergency_contact/telephone"/></xsl:call-template>
                        }
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]
    </xsl:template>

    <xsl:template match="address">
                        {
                            <xsl:if test="@id">"id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,</xsl:if>
                            "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
                            "address_1": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_1"/></xsl:call-template>,
                            "address_2": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_2"/></xsl:call-template>,
                            "address_3": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_3"/></xsl:call-template>,
                            "city": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./city"/></xsl:call-template>,
                            "county": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./county"/></xsl:call-template>,
                            "post_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./post_code"/></xsl:call-template>,
                            "country": {
                                "code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./country/@code"/></xsl:call-template>,
                                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./country"/></xsl:call-template>
                            }
                        }</xsl:template>

    <xsl:template match="accommodation_list">
        [
            <xsl:for-each select="./accommodation">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "accommodation_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@accommodation_id"/></xsl:call-template>,
                "room_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@room_id"/></xsl:call-template>,
                "room_type_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@room_type_id"/></xsl:call-template><xsl:if test="price">,
                "tier_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@tier_id"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price" />,</xsl:if>
                "period": <xsl:apply-templates select="./period"/>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "pax": [
                    <xsl:apply-templates select="./pax_list" />
                ]<xsl:if test="extra_list">,
                "extras": [
                    <xsl:apply-templates select="./extra_list" />
                ]</xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="accommodation_list/accommodation/pax_list">
        <xsl:for-each select="./pax">
                    {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template><xsl:if test="price">,
                        "price": <xsl:apply-templates select="./price" /></xsl:if><xsl:if test="supplement">,
                        "supplement_price": <xsl:apply-templates select="./supplement/price" /></xsl:if>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="accommodation_list/accommodation/extra_list">
        <xsl:for-each select="./extra">
                    {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="period">
                {
                    "start_date": "<xsl:value-of select="./@start_date"/>",
                    "end_date": "<xsl:value-of select="./@end_date"/>",
                    "check_out_date": "<xsl:value-of select="./@check_out_date"/>",
                    "nights": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@nights"/></xsl:call-template>,
                    "nights": <xsl:apply-templates select="./night_list"/>
                }</xsl:template>

    <xsl:template match="night_list">
                    [
                        <xsl:for-each select="./date">
                        {
                            "date": "<xsl:value-of select="./@iso_value"/>",
                            "allocation_id": <xsl:value-of select="./@allocation_id"/><xsl:if test="price">,
                            "price": <xsl:apply-templates select="./price"/></xsl:if>
                        }<xsl:if test="position() &lt; last()">,</xsl:if>
                        </xsl:for-each>
                    ]</xsl:template>

    <xsl:template match="ticket_list">
        [
            <xsl:for-each select="./ticket">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "type_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@type_id"/></xsl:call-template>,
                "class_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@class_id"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "allocation_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@allocation_id"/></xsl:call-template>,
                "event_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@event_id"/></xsl:call-template><xsl:if test="price">,
                "price": <xsl:apply-templates select="./price"/></xsl:if><xsl:if test="booking_fee/price">,
                "booking_fee": {
                    "price": <xsl:apply-templates select="./booking_fee/price"/>
                }</xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="transport_list">
        [
            <xsl:for-each select="./transport">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "route_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@route_id"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "type": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./type/@id"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./type"/></xsl:call-template>
                },
                "legs": <xsl:apply-templates select="./leg_list"/>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="leg_list">
                [
                    <xsl:for-each select="./leg">
                    {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                        "leg_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@journey_type_id"/></xsl:call-template>,
                        "stop_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@stop_id"/></xsl:call-template>,
                        "travel_class": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@travel_class"/></xsl:call-template>,
                        "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                        "departure": <xsl:apply-templates select="./departure"/>,
                        "arrival": <xsl:apply-templates select="./arrival"/><xsl:if test="price">,
                        "price": <xsl:apply-templates select="./price"/></xsl:if>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]</xsl:template>

    <xsl:template match="extra_list">
        [
            <xsl:for-each select="./extra">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "type_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@type_id"/></xsl:call-template>,
                "extra_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@extra_id"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                "group": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./group/@id"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./group"/></xsl:call-template>
                },
                "option": {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./option/@id"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./option"/></xsl:call-template>
                }<xsl:if test="price">,
                "other_information": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./other_information"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price"/></xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="insurance_list">
        [
            <xsl:for-each select="./insurance">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "insurance_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@insurance_id"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price"/>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="delivery_list">
        [
            <xsl:for-each select="./delivery">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "delivery_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@delivery_id"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price"/><xsl:if test="address">,
                "address": <xsl:apply-templates select="./address"/></xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="discount_code_list">
        [
            <xsl:for-each select="./discount_code">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@code"/></xsl:call-template>,
                "pax_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@pax_id"/></xsl:call-template>,
                "price": <xsl:apply-templates select="./price"/>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="departure|arrival">
                        {
                            "location": {
                                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./location/@id"/></xsl:call-template>,
                                "location": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./location"/></xsl:call-template>
                            },
                            "date": {
                                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./date/@iso_value"/></xsl:call-template>
                            },
                            "time": {
                                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./time/@iso_value"/></xsl:call-template>
                            }
                        }</xsl:template>


    <xsl:template match="passport">
            {
                "number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@number"/></xsl:call-template>,
                "expiry": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@expiry"/></xsl:call-template>,
                "full_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./full_name"/></xsl:call-template>,
                "first_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./first_name"/></xsl:call-template>,
                "middle_names": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./middle_names"/></xsl:call-template>,
                "last_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./last_name"/></xsl:call-template>,
                "nationality": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./nationality"/></xsl:call-template>,
                "country_of_issue": {
                    "code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./country_of_issue/@code"/></xsl:call-template>,
                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./country_of_issue"/></xsl:call-template>
                }
            }</xsl:template>

    <xsl:template match="price|amount_paid|amount_outstanding|full_amount|surcharge|surcharge_paid|booking_amount|pay_amount|payable_today|booking_price">
                        {
                            "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                            "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                        }</xsl:template>

</xsl:stylesheet>
