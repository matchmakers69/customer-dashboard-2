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

    <xsl:template match="gender_list">
    "genders": [
        <xsl:for-each select="./gender">
        <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template><xsl:if test="position() &lt; last()">,
        </xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>
</xsl:stylesheet>
