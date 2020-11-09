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

    <xsl:template match="customer">
    "customer": {
        "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template><xsl:if test="@authenticated">,
        "authenticated": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@authenticated"/></xsl:call-template></xsl:if><xsl:if test="@email_verification_required">,
        "email_verification_required": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@email_verification_required"/></xsl:call-template></xsl:if><xsl:if test="personal_details">,
        "personal_details": <xsl:apply-templates select="./personal_details"/></xsl:if><xsl:if test="type">,
        "type": <xsl:apply-templates select="./type"/></xsl:if><xsl:if test="client_group">,
        "client_group": <xsl:apply-templates select="./client_group"/></xsl:if><xsl:if test="passport">,
        "passport": <xsl:apply-templates select="./passport"/></xsl:if><xsl:if test="address">,
        "address": <xsl:apply-templates select="./address"/></xsl:if><xsl:if test="organisation">,
        "organisation": <xsl:apply-templates select="./organisation"/></xsl:if><xsl:if test="bank_account">,
        "bank_account": <xsl:apply-templates select="./bank_account"/></xsl:if><xsl:if test="social_media_account">,
        "social_media_account": <xsl:apply-templates select="./social_media_account"/></xsl:if><xsl:if test="ssr_list">,
        "ssrs": <xsl:apply-templates select="./ssr_list"/></xsl:if>
    }<xsl:if test="following-sibling::*">,</xsl:if>
    </xsl:template>

    <xsl:template match="errors_list">
    "errors": [
        <xsl:for-each select="./error">
        {
            "code": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@code"/></xsl:call-template>,
            "message": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="."/></xsl:call-template>
        }<xsl:if test="position() &lt; last()">,</xsl:if>
        </xsl:for-each>
    ]
    </xsl:template>

    <xsl:template match="type|client_group|organisation">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "value": "<xsl:value-of select="."/>"
        }</xsl:template>

    <xsl:template match="personal_details">
        {
            "sex": "<xsl:value-of select="./@sex"/>",
            "gender": "<xsl:value-of select="./@gender"/>",
            "date_of_birth": "<xsl:value-of select="./@date_of_birth"/>",
            "title": "<xsl:value-of select="./title"/>",
            "first_name": "<xsl:value-of select="./first_name"/>",
            "last_name": "<xsl:value-of select="./last_name"/>",
            "email": "<xsl:value-of select="./email"/>",
            "phone": "<xsl:value-of select="./telephone"/>",
            "emergency_contact": {
                "full_name": "<xsl:value-of select="./emergency_contact/name"/>",
                "telephone": "<xsl:value-of select="./emergency_contact/telephone"/>"
            },
            "club_membership_number": "<xsl:value-of select="./club_membership_number"/>"
        }</xsl:template>

    <xsl:template match="bank_account">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "name": "<xsl:value-of select="./name"/>",
            "number": "<xsl:value-of select="./number"/>",
            "sort_code": "<xsl:value-of select="./sort_code"/>",
            "iban": "<xsl:value-of select="./iban"/>"
        }</xsl:template>

    <xsl:template match="address">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "default_address": <xsl:call-template name="encode-boolean"><xsl:with-param name="s" select="./@default_address"/></xsl:call-template>,
            "type": "<xsl:value-of select="./type"/>",
            "valid_from_date": <xsl:apply-templates select="./valid_from_date"/>,
            "valid_to_date": <xsl:apply-templates select="./valid_to_date"/>,
            "address_1": "<xsl:value-of select="./address_1"/>",
            "address_2": "<xsl:value-of select="./address_2"/>",
            "address_3": "<xsl:value-of select="./address_3"/>",
            "city": "<xsl:value-of select="./city"/>",
            "county": "<xsl:value-of select="./county"/>",
            "postcode": "<xsl:value-of select="./postcode"/>",
            "country": <xsl:apply-templates select="./country"/>
        }</xsl:template>

    <xsl:template match="passport">
        {
            "expiry_date": "<xsl:value-of select="./@expiry_date"/>",
            "full_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./full_name"/></xsl:call-template>,
            "first_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./first_name"/></xsl:call-template>,
            "middle_names": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./middle_names"/></xsl:call-template>,
            "last_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="./last_name"/></xsl:call-template>,
            "number": "<xsl:value-of select="./number"/>",
            "nationality": "<xsl:value-of select="./nationality"/>"<xsl:if test="issue_country">,
            "issue_country": <xsl:apply-templates select="./issue_country"/></xsl:if>
        }</xsl:template>

    <xsl:template match="country|issue_country">
        {
            "code": "<xsl:value-of select="./@code"/>",
            "name": "<xsl:value-of select="."/>"
        }
    </xsl:template>

    <xsl:template match="social_media_account">
        {
            "id": <xsl:call-template name="encode-integer"><xsl:with-param name="s" select="./@id"/></xsl:call-template>,
            "name": "<xsl:value-of select="./name"/>",
            "type_id": "<xsl:value-of select="./type_id"/>",
            "connected_status": "<xsl:value-of select="./connected_status"/>"
        }</xsl:template>

    <xsl:template match="ssr_list">
        [
            <xsl:for-each select="./ssr">
            {
                "group_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="substring-before(., ': ')"/></xsl:call-template>,
                "option_name": <xsl:call-template name="escape-string"><xsl:with-param name="s" select="substring-after(., ': ')"/></xsl:call-template>
            }<xsl:if test="position() &lt; last()">,</xsl:if>
            </xsl:for-each>
        ]</xsl:template>

    <xsl:template match="*[substring(name(), string-length(name()) - 4)='_date']">
            {
                "iso_value": "<xsl:value-of select="./@iso_value"/>",
                "isotz_value": "<xsl:value-of select="./@isotz_value"/>"
            }</xsl:template>

</xsl:stylesheet>
