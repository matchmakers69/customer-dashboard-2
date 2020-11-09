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

    <xsl:template match="package">
    "package": {
        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
        "client_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@client_id"/></xsl:call-template>,
        "meta_package_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@meta_package_id"/></xsl:call-template>,
        "client_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@client_code"/></xsl:call-template>,
        "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
        "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
        "group_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./group_code"/></xsl:call-template>,
        "location": <xsl:apply-templates select="./location"/>,
        "dates": <xsl:apply-templates select="./dates"/><xsl:if test="prices">,
        "prices": <xsl:apply-templates select="./prices"/></xsl:if><xsl:if test="deposit_rule">,
        "deposit_rule": <xsl:apply-templates select="./deposit_rule"/></xsl:if>,
        "engines": <xsl:apply-templates select="./engine_list" /><xsl:if test="delivery_options_list">,
        "delivery_options": <xsl:apply-templates select="./delivery_options_list" /></xsl:if><xsl:if test="tiers_list">,
        "tiers": <xsl:apply-templates select="./tiers_list" /></xsl:if><xsl:if test="options">,
        "options": <xsl:apply-templates select="./options" /></xsl:if>
    }
    </xsl:template>

    <xsl:template match="country|resort|type">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
            }</xsl:template>

    <xsl:template match="options">
        [
            <xsl:for-each select="./option">
            {
                "handle": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@handle"/></xsl:call-template>,
                "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="delivery_options_list">
        [
            <xsl:for-each select="./delivery">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "freesale": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@freesale"/></xsl:call-template>,
                "per_person": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@per_person"/></xsl:call-template>,
                "require_address": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@require_address"/></xsl:call-template>,
                "enabled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@enabled"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template><xsl:if test="purchase_start_date">,
                "purchase_start_date": <xsl:apply-templates select="./purchase_start_date"/></xsl:if><xsl:if test="purchase_end_date">,
                "purchase_end_date": <xsl:apply-templates select="./purchase_end_date"/></xsl:if><xsl:if test="prices_list">,
                "prices": <xsl:apply-templates select="./prices_list" /></xsl:if>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="engine_list">
        [
            <xsl:for-each select="./engine">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template><xsl:if test="./@name">,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@name"/></xsl:call-template></xsl:if>,
                "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
                "enabled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@enabled"/></xsl:call-template>,
                "sort_order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@sort_order"/></xsl:call-template>,
                "bookingflow": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@bookingflow"/></xsl:call-template><xsl:if test="./@simple">,
                "simple": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@simple"/></xsl:call-template></xsl:if>,
                "messages": [
                    <xsl:for-each select="./message_list/message">
                    {
                        "category_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@category_id"/></xsl:call-template>,
                        "message": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="deposit_rule">
        {
            "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template>,
            "percentage": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@percentage"/></xsl:call-template>,
            "enabled": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@enabled"/></xsl:call-template>,
            "start_date": <xsl:apply-templates select="./start_date"/>,
            "end_date": <xsl:apply-templates select="./end_date"/><xsl:if test="prices">,
            "prices": <xsl:apply-templates select="./prices" /></xsl:if>
        }</xsl:template>

    <xsl:template match="location">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "resort": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./resort"/></xsl:call-template>,
            "country": <xsl:apply-templates select="./country" />,
            "lat": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./location_lat"/></xsl:call-template>,
            "long": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./location_long"/></xsl:call-template>
        }</xsl:template>

    <xsl:template match="dates">
        {
            "package_start_date": <xsl:apply-templates select="./package_start_date" />,
            "package_end_date": <xsl:apply-templates select="./package_end_date" /><xsl:if test="extend_package_start_date">,
            "extend_package_start_date": <xsl:apply-templates select="./extend_package_start_date" /></xsl:if><xsl:if test="extend_package_end_date">,
            "extend_package_end_date": <xsl:apply-templates select="./extend_package_end_date" /></xsl:if><xsl:if test="booking_start_date">,
            "booking_start_date": <xsl:apply-templates select="./booking_start_date" /></xsl:if><xsl:if test="booking_end_date">,
            "booking_end_date": <xsl:apply-templates select="./booking_end_date" /></xsl:if><xsl:if test="final_payment_deadline_date">,
            "final_payment_deadline_date": <xsl:apply-templates select="./final_payment_deadline_date" /></xsl:if>
        }</xsl:template>

    <xsl:template match="outbound|inbound">
                {
                    "start_date": <xsl:apply-templates select="./transport_end_date" />,
                    "end_date": <xsl:apply-templates select="./transport_end_date" />
                }</xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']|*[substring(name(), string-length(name()) - 8)='_datetime']">
                    {
                        "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>,
                        "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@isotz_value"/></xsl:call-template>,
                        "date": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                    }</xsl:template>

    <xsl:template match="prices_list|prices">
                [
                    <xsl:for-each select="./price">
                    {
                        "value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                        "type": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@type"/></xsl:call-template><xsl:if test="@currency_id">,
                        "currency_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_id"/></xsl:call-template></xsl:if><xsl:if test="@currency_iso_code">,
                        "currency_iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@currency_iso_code"/></xsl:call-template></xsl:if><xsl:if test="@currency_exponent">,
                        "currency_exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_exponent"/></xsl:call-template>,</xsl:if>
                        "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]
                <xsl:if test="position() &lt; last()">,</xsl:if>
    </xsl:template>

    <xsl:template match="tiers_list">
                [
                    <xsl:for-each select="./tier">
                    {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                        "sort_order": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@sort_order"/></xsl:call-template>,
                        "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                    }<xsl:if test="position() &lt; last()">,</xsl:if>
                    </xsl:for-each>
                ]<xsl:if test="position() &lt; last()">,</xsl:if>
    </xsl:template>

</xsl:stylesheet>
