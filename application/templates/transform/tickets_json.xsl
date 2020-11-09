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

    <xsl:template match="tickets/ticketed_events_list">
    "events": [
        <xsl:for-each select="./event">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "sort_order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@sort_order"/></xsl:call-template>,
            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "valid_start_date": <xsl:apply-templates select="./valid_start_date"/>,
            "valid_end_date": <xsl:apply-templates select="./valid_end_date"/>,
            "status": <xsl:apply-templates select="./status"/><xsl:if test="image_list">,
            "image_list": <xsl:apply-templates select="./image_list"/></xsl:if>,
            "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
            "tickets": <xsl:apply-templates select="./ticket_types_list"/>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="type|class|status">
                            {
                                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                            }</xsl:template>

    <xsl:template match="ticket_types_list">
            [
                <xsl:for-each select="./ticket_type">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "sort_order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@sort_order"/></xsl:call-template>,
                    "offline": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@offline"/></xsl:call-template>,
                    "class_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@class_id"/></xsl:call-template>,
                    "class": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@class"/></xsl:call-template>,
                    "client_class": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@client_class"/></xsl:call-template>,
                    "min": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min"/></xsl:call-template>,
                    "max": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max"/></xsl:call-template>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                    "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
                    "valid_start_date": <xsl:apply-templates select="./valid_start_date"/>,
                    "valid_end_date": <xsl:apply-templates select="./valid_end_date"/>,
                    "purchase_start_date": <xsl:apply-templates select="./purchase_start_date"/>,
                    "purchase_end_date": <xsl:apply-templates select="./purchase_end_date"/>,
                    "prices": <xsl:apply-templates select="./prices_list"/><xsl:if test="booking_fees_list">,
                    "booking_fees":  <xsl:apply-templates select="./booking_fees_list"/></xsl:if>
                }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]
    </xsl:template>

    <xsl:template match="price">
                                {
                                    "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                                    "currency_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_id"/></xsl:call-template>,
                                    "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                                }</xsl:template>

    <xsl:template match="prices_list|booking_fees_list">
                            [
                                <xsl:for-each select="./price">
                                    <xsl:apply-templates select="."/>
                                <xsl:if test="position() &lt; last()">,</xsl:if>
                                </xsl:for-each>
                            ]</xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
                            {
                                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>,
                                "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@isotz_value"/></xsl:call-template>
                            }</xsl:template>

        <xsl:template match="image_list">
            [
                <xsl:for-each select="./image">
                    {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                        "url": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@url"/></xsl:call-template>
                    }
                <xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]
        </xsl:template>

</xsl:stylesheet>
