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

    <xsl:template match="accommodations_list">
    "accommodations": [
        <xsl:for-each select="./accommodation">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "sort_order": <xsl:value-of select="./@sort_order"/>,
            "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
            "type": <xsl:apply-templates select="./type"/>,
            "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
            "address_1": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_1"/></xsl:call-template>,
            "address_2": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_2"/></xsl:call-template>,
            "address_3": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./address_3"/></xsl:call-template>,
            "postcode": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./postcode"/></xsl:call-template>,
            "country": <xsl:apply-templates select="./country"/>,
            "resort": <xsl:apply-templates select="./resort"/><xsl:if test="./location">,
            "location": <xsl:apply-templates select="./location"/></xsl:if>,
            "images": <xsl:apply-templates select="./images_list"/>,
            "rating": <xsl:apply-templates select="./rating"/>,
            "facilities": <xsl:apply-templates select="./facilities"/><xsl:if test="./accommodation_room_prices">,
            "accommodation_room_prices": <xsl:apply-templates select="./accommodation_room_prices" /></xsl:if>,
            "rooms": <xsl:apply-templates select="./rooms_list"/>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="accommodation_room_prices">
            {
                "min": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min"/></xsl:call-template>,
                "max": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max"/></xsl:call-template>,
                "min_per_night": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min_per_night"/></xsl:call-template>,
                "max_per_night": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max_per_night"/></xsl:call-template>,
                "min_total": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min_total"/></xsl:call-template>,
                "max_total": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max_total"/></xsl:call-template>
            }</xsl:template>

    <xsl:template match="country|resort|type">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "name": "<xsl:value-of select="."/>"
            }</xsl:template>

    <xsl:template match="location">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "location_long": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@location_long"/></xsl:call-template>,
                "location_lat": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@location_lat"/></xsl:call-template>,
                "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
            }</xsl:template>

    <xsl:template match="facility|rating">
            {
                "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                "label": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
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
            ]</xsl:template>

    <xsl:template match="facilities">
            [
                <xsl:for-each select="./facility">
                    <xsl:apply-templates select="." />
                    <xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]</xsl:template>

    <xsl:template match="rooms_list">
            [
                <xsl:for-each select="./room">
                {
                    "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
                    "sort_order": <xsl:value-of select="./@sort_order"/>,
                    "type_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@type_id"/></xsl:call-template>,
                    "occupancy": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@occupancy"/></xsl:call-template>,
                    "min_occupancy": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min_occupancy"/></xsl:call-template>,
                    "number_of_core_nights": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@number_of_core_nights"/></xsl:call-template>,
                    "min_price": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min"/></xsl:call-template>,
                    "max_price": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max"/></xsl:call-template>,
                    "room_type_description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./room_type_description"/></xsl:call-template>,
                    "name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./name"/></xsl:call-template>,
                    "upsell": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./upsell"/></xsl:call-template>,
                    "type": {
                        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./type/@id"/></xsl:call-template>,
                        "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./type/description"/></xsl:call-template>,
                        "basis": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./type/basis"/></xsl:call-template>
                    },
                    "description": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./description"/></xsl:call-template>,
                    "website_url": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./website_url"/></xsl:call-template><xsl:if test="./rules">,
                    "facilities": <xsl:apply-templates select="./facilities"/><xsl:if test="./extras_list">,
                    "extras": <xsl:apply-templates select="./extras_list"/></xsl:if>,
                    "rules": <xsl:apply-templates select="./rules" /></xsl:if><xsl:if test="./supplement_price/price">,
                    "supplement_price": {
                        "price": <xsl:apply-templates select="./supplement_price/price" />
                    }</xsl:if><xsl:if test="./per_core_night_price/price">,
                    "per_core_night_price": {
                        "price": <xsl:apply-templates select="./per_core_night_price/price" />
                    }</xsl:if>,
                    "per_night_prices": <xsl:apply-templates select="./per_night_price_list"/>,
                    "min": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@max"/></xsl:call-template>,
                    "max": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@min"/></xsl:call-template>
                }<xsl:if test="position() &lt; last()">,</xsl:if>
                </xsl:for-each>
            ]</xsl:template>

    <xsl:template match="extras_list">
        <xsl:text>[</xsl:text>
            <xsl:for-each select="./extra">
                <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="."/></xsl:call-template>
                <xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        <xsl:text>]</xsl:text>
    </xsl:template>

    <xsl:template match="per_night_price_list">
                    [
                        <xsl:for-each select="./date">
                        {
                            "iso_value": "<xsl:value-of select="./@iso_value"/>"<xsl:if test="./price">,
                            "price": <xsl:apply-templates select="./price" /></xsl:if>
                        }<xsl:if test="position() &lt; last()">,</xsl:if>
                        </xsl:for-each>
                    ]</xsl:template>

    <xsl:template match="price">
                            {
                                "value": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@value"/></xsl:call-template>,
                                <!-- Currency returned should be the same as the booking -->
                                "currency_id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_id"/></xsl:call-template>,
                                "currency_iso_code": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@currency_iso_code"/></xsl:call-template>,
                                "currency_exponent": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@currency_exponent"/></xsl:call-template>,
                                "price": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
                            }</xsl:template>

    <xsl:template match="rules">
                    {
                        "mandatory": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@mandatory"/></xsl:call-template>,
                        "per_person": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@per_person"/></xsl:call-template>,
                        "purchase_bookingflow": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@purchase_bookingflow"/></xsl:call-template>,
                        "purchase_dashboard": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@purchase_dashboard"/></xsl:call-template>,
                        "minimum_nights": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@minimum_nights"/></xsl:call-template>,
                        "maximum_nights": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@maximum_nights"/></xsl:call-template>,
                        "promoted": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@promoted"/></xsl:call-template>,
                        "purchase_start_date": <xsl:apply-templates select="./purchase_start_date" />,
                        "purchase_end_date": <xsl:apply-templates select="./purchase_end_date" />,
                        "available_start_date": <xsl:apply-templates select="./available_start_date" />,
                        "available_end_date": <xsl:apply-templates select="./available_end_date" /><xsl:if test="./extended_start_date">,
                        "extended_start_date": <xsl:apply-templates select="./extended_start_date" /></xsl:if><xsl:if test="./extended_end_date">,
                        "extended_end_date": <xsl:apply-templates select="./extended_end_date" /></xsl:if>
                    }</xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
                            {
                                "iso_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@iso_value"/></xsl:call-template>,
                                "isotz_value": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./@isotz_value"/></xsl:call-template>
                            }</xsl:template>


</xsl:stylesheet>
