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

    <xsl:template match="address_list">
    "addresses": [
        <xsl:for-each select="./address">
        {
            "id": <xsl:value-of select="./@id"/>,
            "default_address": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@default_address"/></xsl:call-template>,
            "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./type"/></xsl:call-template>,
            "address_1": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_1"/></xsl:call-template>,
            "address_2": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_2"/></xsl:call-template>,
            "address_3": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_3"/></xsl:call-template>,
            "city": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./city"/></xsl:call-template>,
            "county": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./county"/></xsl:call-template>,
            "postcode": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./postcode"/></xsl:call-template>,
            "country": <xsl:apply-templates select="./country"/>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="country|issue_country">{
                "id": <xsl:value-of select="./@id"/>,
                "code": "<xsl:call-template name="encode-string"><xsl:with-param name="s" select="./@code"/></xsl:call-template>",
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
            }
    </xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
                        {
                            "iso_value": "<xsl:value-of select="./@iso_value"/>",
                            "isotz_value": "<xsl:value-of select="./@isotz_value"/>"
                        }</xsl:template>

</xsl:stylesheet>
