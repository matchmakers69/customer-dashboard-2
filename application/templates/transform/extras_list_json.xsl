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

    <xsl:template match="extras_list">
    "extras": [
        <xsl:for-each select="./extra">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@order"/></xsl:call-template>,
            "type": <xsl:apply-templates select="./type" />,
            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
            "rules": <xsl:apply-templates select="./rules" />,
            "images": <xsl:apply-templates select="./images_list"/>,
            "groups": <xsl:apply-templates select="./groups_list"/>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="type">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@order"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
            }</xsl:template>

    <xsl:template match="images_list">
            [
                <xsl:for-each select="./image">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "filename": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./filename"/></xsl:call-template>,
                    "filename_medium": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./filename_medium"/></xsl:call-template>,
                    "filename_thumb": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./filename_thumb"/></xsl:call-template>
                }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]
    </xsl:template>

    <xsl:template match="groups_list">
            [
                <xsl:for-each select="./group">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@order"/></xsl:call-template>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                    "options": <xsl:apply-templates select="./options_list"/>
                }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]</xsl:template>

    <xsl:template match="options_list">
                    [
                        <xsl:for-each select="./option">
                        {
                            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                            "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
                            "freesale": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@freesale"/></xsl:call-template>,
                            "order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@order"/></xsl:call-template>,
                            "placeholder": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./placeholder"/></xsl:call-template>,
                            "text_option": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@text_option"/></xsl:call-template>,
                            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                            "prices": <xsl:apply-templates select="./prices_list"/>
                        }<xsl:if test="position() &lt; last()">,</xsl:if>
                        </xsl:for-each>
                    ]</xsl:template>

    <xsl:template match="prices_list|prices">
                            [
                                <xsl:for-each select="./price">
                                {
                                    "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                                    "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
                                    "currency_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_id"/></xsl:call-template>,
                                    "currency_iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@currency_iso_code"/></xsl:call-template>,
                                    "currency_exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_exponent"/></xsl:call-template>,
                                    "price": "<xsl:value-of select="." />"
                                }<xsl:if test="position() &lt; last()">,</xsl:if>
                                </xsl:for-each>
                            ]</xsl:template>

    <xsl:template match="rules">
            {
                "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
                "per_person": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@per_person"/></xsl:call-template>,
                "purchase_bookingflow": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@purchase_bookingflow"/></xsl:call-template>,
                "purchase_dashboard": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@purchase_dashboard"/></xsl:call-template>,
                "minimum": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@minimum"/></xsl:call-template>,
                "maximum": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@maximum"/></xsl:call-template>,
                "dependent_extra_id": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@dependent_extra_id"/></xsl:call-template>,
                "dependent_accommodation_id": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@dependent_accommodation_id"/></xsl:call-template>,
                "dependent_room_id": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@dependent_room_id"/></xsl:call-template>,
                "purchase_start_date": <xsl:apply-templates select="./purchase_start_date" />,
                "purchase_end_date": <xsl:apply-templates select="./purchase_end_date" /><xsl:if test="available_start_date">,
                "available_start_date": <xsl:apply-templates select="./available_start_date" /></xsl:if><xsl:if test="available_end_date">,
                "available_end_date": <xsl:apply-templates select="./available_end_date" /></xsl:if><xsl:if test="extended_start_date">,
                "extended_start_date": <xsl:apply-templates select="./extended_start_date" /></xsl:if><xsl:if test="extended_end_date">,
                "extended_end_date": <xsl:apply-templates select="./extended_end_date" /></xsl:if>
            }</xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
                        {
                            "iso_value": "<xsl:value-of select="./@iso_value"/>",
                            "isotz_value": "<xsl:value-of select="./@isotz_value"/>"
                        }</xsl:template>


</xsl:stylesheet>
