<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="text" encoding="UTF-8" media-type="text/plain"/>

    <!-- disable built-in output of all text nodes -->
    <xsl:template match="text()|@*"/>
    <xsl:include href="functions.xsl"/>

    <xsl:template match="/">
        <xsl:text>{</xsl:text>
            <xsl:apply-templates/>
        <xsl:text>}</xsl:text>
    </xsl:template>

    <xsl:template match="rooms_list">
        "rooms": [
            <xsl:for-each select="./room">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "accommodation_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@accommodation_id"/></xsl:call-template>,
                "available": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@available"/></xsl:call-template>,
                "total": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@total"/></xsl:call-template>,
                "current_tier_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@current_tier_id"/></xsl:call-template>,
                "freesale": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@freesale"/></xsl:call-template><xsl:if test="extended_nights_list">,
                <xsl:apply-templates select="extended_nights_list" /></xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="extended_nights_list">
        "extended_nights": [
            <xsl:for-each select="./extended_night">
                {
                    "date": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>,
                    "available": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@available"/></xsl:call-template>,
                    "freesale": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@freesale" /></xsl:call-template>,
                    "total": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@total"/></xsl:call-template>
                }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

</xsl:stylesheet>
