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

    <xsl:template match="card_types_list">
    "card_types": [
        <xsl:for-each select="./card_type">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@code"/></xsl:call-template>,
            "debit_card": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@debit_card"/></xsl:call-template>,
            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "surcharge": {
                <xsl:if test="surcharge/price">"price": <xsl:apply-templates select="./surcharge/price"/></xsl:if>
                <xsl:if test="surcharge/@percentage">"percentage": <xsl:value-of select="./surcharge/@percentage"/></xsl:if>
            }
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="price">
                                {
                                    "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                                    "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                                }</xsl:template>

</xsl:stylesheet>
