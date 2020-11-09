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

    <xsl:template match="upcoming_list">
    "bookings": [
        <xsl:for-each select="./booking">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./reference"/></xsl:call-template>,
            "package_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./package_name"/></xsl:call-template>,
            "booked_date": {
                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./booked_date/@iso_value"/></xsl:call-template>,
                "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./booked_date/@isotz_value"/></xsl:call-template>
            },
            "departure_date": {
                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./departure_date/@iso_value"/></xsl:call-template>
            },
            "return_date": {
                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./return_date/@iso_value"/></xsl:call-template>
            },
            "payment_deadline_date": {
                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./payment_deadline_date/@iso_value"/></xsl:call-template>
            },
            "booking_price": <xsl:value-of select="./booking_price/@value"/>,
            "currency": {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./currency/@id"/></xsl:call-template>,
                "iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./currency/@iso_code"/></xsl:call-template>,
                "exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./currency/@exponent"/></xsl:call-template>,
                "symbol": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./currency"/></xsl:call-template>
            },
            "booking_status": {
                "code": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./booking_status/@code"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./booking_status"/></xsl:call-template>
            },
            "payment_status": {
                "code": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./payment_status/@code"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./payment_status"/></xsl:call-template>
            },
            "room_allocation_enabled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@room_allocation_enabled"/></xsl:call-template>,
            "coach_allocation_enabled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@room_allocation_enabled"/></xsl:call-template>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

</xsl:stylesheet>
