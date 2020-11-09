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

    <xsl:template match="payment">
    "payment": {
        "reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@reference"/></xsl:call-template>,
        "paid": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@paid"/></xsl:call-template><xsl:if test="@trace_number">,
        "trace_number": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@trace_number"/></xsl:call-template></xsl:if><xsl:if test="@auth_required">,
        "auth_required": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@auth_required"/></xsl:call-template></xsl:if><xsl:if test="redirect_url">,
        "redirect_url": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./redirect_url"/></xsl:call-template></xsl:if><xsl:if test="pareq">,
        "pareq": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./pareq"/></xsl:call-template></xsl:if><xsl:if test="md">,
        "md": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./md"/></xsl:call-template></xsl:if><xsl:if test="@requires_action">,
        "requires_action": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@requires_action"/></xsl:call-template></xsl:if><xsl:if test="@payment_intent_client_secret">,
        "payment_intent_client_secret": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@payment_intent_client_secret"/></xsl:call-template></xsl:if>
    }<xsl:if test="following-sibling::*">,</xsl:if>
    </xsl:template>

    <xsl:template match="errors_list">
    "errors": [
        <xsl:for-each select="./error">
        {
            "code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@code"/></xsl:call-template>,
            "message": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

</xsl:stylesheet>
