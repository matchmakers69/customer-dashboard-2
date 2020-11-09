<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="text" encoding="UTF-8" media-type="text/plain"/>

    <!-- disable built-in output of all text nodes -->
    <xsl:template match="text()|@*"/>

    <xsl:template match="/">
{
        <xsl:apply-templates/>
}
    </xsl:template>

    <xsl:template match="card_charge">
    "card_charge": {
        "price": <xsl:apply-templates select="./price"/>
    }
    </xsl:template>

    <xsl:template match="price">
        {
            "value": "<xsl:value-of select="./@value"/>",
            "price": "<xsl:value-of select="." />"
        }</xsl:template>

</xsl:stylesheet>
