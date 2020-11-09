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

    <xsl:template match="insurance_policies_list">
        "insurance_policies": [
            <xsl:for-each select="./policy">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "policy_number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@number"/></xsl:call-template>,
                    "customer_reference": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./customer_reference"/></xsl:call-template>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                    "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
                    "contact_details": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./contact_details"/></xsl:call-template>,
                    <xsl:if test="./start_date/@iso_value or ./start_date/@isotz_value">
                        "start_date": <xsl:apply-templates select="./start_date"/>,
                    </xsl:if>
                    <xsl:if test="./end_date/@iso_value or ./end_date/@isotz_value">
                        "end_date": <xsl:apply-templates select="./end_date"/>,
                    </xsl:if>
                    "duration": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@duration"/></xsl:call-template>,
                    <xsl:if test="string-length(./age_restrictions/@min) &gt; 0 or string-length(./age_restrictions/@max) &gt; 0">
                        "age_restrictions": <xsl:apply-templates select="./age_restrictions"/>,
                    </xsl:if>
                    "prices": <xsl:apply-templates select="./prices_list"/>,
                    "sort_order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@sort_order"/></xsl:call-template>
                }
                <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

   <xsl:template match="age_restrictions">
        {
            <xsl:if test="string-length(./@min) &gt; 0">
                "min": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min"/></xsl:call-template>
            </xsl:if>
            <xsl:if test="string-length(./@min) &gt; 0 and string-length(./@max) &gt; 0">,</xsl:if>
            <xsl:if test="string-length(./@max) &gt; 0">
                "max": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max"/></xsl:call-template>
            </xsl:if>
        }
    </xsl:template>

    <xsl:template match="prices_list|prices">
            [
                <xsl:for-each select="./price">
                    {
                        "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                        "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
                        "currency_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_id"/></xsl:call-template>,
                        "currency_iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@currency_iso_code"/></xsl:call-template>,
                        "currency_exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_exponent"/></xsl:call-template>,
                        "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]
            <xsl:if test="position() &lt; last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
        {
            <xsl:if test="./@iso_value">
                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>
            </xsl:if>
            <xsl:if test="./@iso_value and ./@isotz_value">,</xsl:if>
            <xsl:if test="./@isotz_value">
                "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@isotz_value"/></xsl:call-template>,
            </xsl:if>
        }
    </xsl:template>
</xsl:stylesheet>
