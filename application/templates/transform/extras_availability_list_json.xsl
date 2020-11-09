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

    <xsl:template match="extras_availability_list">
    "extras": [
        <xsl:for-each select="./extra">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "option_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@option_id"/></xsl:call-template>,
            "available": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@available"/></xsl:call-template>,
            "freesale": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@freesale"/></xsl:call-template>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

</xsl:stylesheet>
