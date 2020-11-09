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

    <xsl:template match="delivery_options_list">
    "delivery_options": [
        <xsl:for-each select="./delivery">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "freesale": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@freesale"/></xsl:call-template>,
            "per_person": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@per_person"/></xsl:call-template>,
            "require_address": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@require_address"/></xsl:call-template>,
            "enabled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@enabled"/></xsl:call-template>,
            "name": "<xsl:value-of select="./name"/>",
            "purchase_start_date": <xsl:apply-templates select="./purchase_start_date" />,
            "purchase_end_date": <xsl:apply-templates select="./purchase_end_date" />,
            "prices": <xsl:apply-templates select="./prices_list" />
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
            {
                "iso_value": "<xsl:value-of select="./@iso_value"/>",
                "isotz_value": "<xsl:value-of select="./@isotz_value"/>"
            }</xsl:template>

    <xsl:template match="prices_list|prices">
            [
                <xsl:for-each select="./price">
                {
                    "value": "<xsl:value-of select="./@value"/>",
                    "type": "<xsl:value-of select="./@type"/>",
                    "currency_id": <xsl:value-of select="./@currency_id"/>,
                    "currency_iso_code": "<xsl:value-of select="./@currency_iso_code"/>",
                    "currency_exponent": <xsl:value-of select="./@currency_exponent"/>,
                    "price": "<xsl:value-of select="." />"
                }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]</xsl:template>

</xsl:stylesheet>
