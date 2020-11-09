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

    <xsl:template match="routes_list">
        "routes": [
            <xsl:for-each select="./route">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "type": <xsl:apply-templates select="./type"/>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                    "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
                    "rules": <xsl:apply-templates select="./rules"/>,
                    "prices": <xsl:apply-templates select="./prices"/>,
                    "legs": <xsl:apply-templates select="./legs_list"/>
                }

                <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="type">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@code"/></xsl:call-template>,
            "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }
    </xsl:template>

    <xsl:template match="legs_list">
        [
            <xsl:for-each select="./leg">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                    "type_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@type_id"/></xsl:call-template>,
                    "order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@order"/></xsl:call-template>,
                    "stops": <xsl:apply-templates select="./stops_list"/>
                }

                <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="stops_list">
        [
            <xsl:for-each select="./stop">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@order"/></xsl:call-template>,
                    "capacity": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@capacity"/></xsl:call-template>,
                    "departure_location": <xsl:apply-templates select="./departure_location"/>,
                    "departure_date": <xsl:apply-templates select="./departure_date"/>,
                    "departure_location_notes": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./departure_location_notes"/></xsl:call-template>,
                    "arrival_location": <xsl:apply-templates select="./arrival_location"/>,
                    "arrival_date": <xsl:apply-templates select="./arrival_date"/>,
                    "arrival_location_notes": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./arrival_location_notes"/></xsl:call-template>,
                    "supplier": <xsl:apply-templates select="./supplier"/>,
                    "flight_number": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./flight_number"/></xsl:call-template>,
                    "prices": <xsl:apply-templates select="./prices_list"/>
                }

                <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]
    </xsl:template>

    <xsl:template match="supplier|*[substring(name(), string-length(name()) - 8)='_location']">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }
    </xsl:template>

    <xsl:template match="prices_list|prices">
        [
            <xsl:for-each select="./price">
                {
                    "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
                    "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>,
                    "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                    "currency_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_id"/></xsl:call-template>,
                    "currency_iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@currency_iso_code"/></xsl:call-template>,
                    "currency_exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_exponent"/></xsl:call-template>
                }

                <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]

        <xsl:if test="position() &lt; last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="rules">
        {
            "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
            "per_person": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@per_person"/></xsl:call-template>,
            "purchase_bookingflow": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@purchase_bookingflow"/></xsl:call-template>,
            "purchase_dashboard": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@purchase_dashboard"/></xsl:call-template>,
            "minimum": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@minimum"/></xsl:call-template>,
            "maximum": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@maximum"/></xsl:call-template>,
            "purchase_start_date": <xsl:apply-templates select="./purchase_start_date"/>,
            "purchase_end_date": <xsl:apply-templates select="./purchase_end_date"/>
        }
    </xsl:template>


    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
        <xsl:choose>
            <xsl:when test="./@iso_value or ./@isotz_value">
                {
                    <xsl:if test="./@iso_value">
                        "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>
                    </xsl:if>
                    <xsl:if test="./@iso_value and ./@isotz_value">,</xsl:if>
                    <xsl:if test="./@isotz_value">
                        "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@isotz_value"/></xsl:call-template>
                    </xsl:if>
                }
            </xsl:when>
            <xsl:otherwise>null</xsl:otherwise>
        </xsl:choose>
    </xsl:template>


</xsl:stylesheet>
