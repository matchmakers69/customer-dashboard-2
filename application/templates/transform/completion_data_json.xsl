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

    <xsl:template match="completion_data">
    "requires_action": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@requires_action"/></xsl:call-template>,
    "payment_intent_client_secret": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@payment_intent_client_secret"/></xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
