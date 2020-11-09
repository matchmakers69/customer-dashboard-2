<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="text" encoding="UTF-8" media-type="text/plain"/>

    <!-- disable built-in output of all text nodes -->
    <xsl:template match="text()|@*"/>

    <xsl:template name="escape_quote">
      <xsl:param name="pText" select="."/>
      <xsl:if test="string-length($pText) >0"><xsl:value-of select="substring-before(concat($pText, '&quot;'), '&quot;')"/>
       <xsl:if test="contains($pText, '&quot;')"><xsl:text>\"</xsl:text>
       <xsl:call-template name="escape_quote">
        <xsl:with-param name="pText" select="substring-after($pText, '&quot;')"/>
       </xsl:call-template></xsl:if>
      </xsl:if>
    </xsl:template>


    <!-- Main template for escaping strings; used by above template and for object-properties
           Responsibilities: placed quotes around string, and chain up to next filter, escape-bs-string -->
    <xsl:template name="escape-string">
        <xsl:param name="s"/>
        <xsl:text>"</xsl:text>
        <xsl:call-template name="escape-bs-string">
            <xsl:with-param name="s" select="$s"/>
        </xsl:call-template>
        <xsl:text>"</xsl:text>
    </xsl:template>


    <!-- Escape the backslash (\) before everything else. -->
    <xsl:template name="escape-bs-string">
        <xsl:param name="s"/>
        <xsl:choose>
            <xsl:when test="contains($s,'\')">
                <xsl:call-template name="escape-quot-string">
                    <xsl:with-param name="s" select="concat(substring-before($s,'\'),'\\')"/>
                </xsl:call-template>
                <xsl:call-template name="escape-bs-string">
                    <xsl:with-param name="s" select="substring-after($s,'\')"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="escape-quot-string">
                    <xsl:with-param name="s" select="$s"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- Escape the double quote ("). -->
    <xsl:template name="escape-quot-string">
        <xsl:param name="s"/>
        <xsl:choose>
            <xsl:when test="contains($s,'&quot;')">
                <xsl:call-template name="encode-string">
                    <xsl:with-param name="s" select="concat(substring-before($s,'&quot;'),'\&quot;')"/>
                </xsl:call-template>
                <xsl:call-template name="escape-quot-string">
                    <xsl:with-param name="s" select="substring-after($s,'&quot;')"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="encode-string">
                    <xsl:with-param name="s" select="$s"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- Replace tab, line feed and/or carriage return by its matching escape code. Can't escape backslash
           or double quote here, because they don't replace characters (&#x0; becomes \t), but they prefix
           characters (\ becomes \\). Besides, backslash should be seperate anyway, because it should be
           processed first. This function can't do that. -->
    <xsl:template name="encode-string">
        <xsl:param name="s"/>
        <xsl:choose>
            <!-- tab -->
            <xsl:when test="contains($s,'&#x9;')">
                <xsl:call-template name="encode-string">
                    <xsl:with-param name="s" select="concat(substring-before($s,'&#x9;'),'\t',substring-after($s,'&#x9;'))"/>
                </xsl:call-template>
            </xsl:when>
            <!-- line feed -->
            <xsl:when test="contains($s,'&#xA;')">
                <xsl:call-template name="encode-string">
                    <xsl:with-param name="s" select="concat(substring-before($s,'&#xA;'),'\n',substring-after($s,'&#xA;'))"/>
                </xsl:call-template>
            </xsl:when>
            <!-- carriage return -->
            <xsl:when test="contains($s,'&#xD;')">
                <xsl:call-template name="encode-string">
                    <xsl:with-param name="s" select="concat(substring-before($s,'&#xD;'),'\r',substring-after($s,'&#xD;'))"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise><xsl:value-of select="$s"/></xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- Encode integers and catch unset and return them as null -->
    <xsl:template name="encode-integer">
        <xsl:param name="s"/>
        <xsl:choose>
            <!-- has value -->
            <xsl:when test="number($s)=$s and string-length($s)>0">
                <xsl:call-template name="encode-string">
                    <xsl:with-param name="s" select="$s"/>
                </xsl:call-template>
            </xsl:when>
            <!-- empty -->
            <xsl:otherwise>null</xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- Encode booleans and catch unset and return as false -->
    <xsl:template name="encode-boolean">
        <xsl:param name="s"/>
        <xsl:choose>
            <!-- true -->
            <xsl:when test="string($s) = 'true'">true</xsl:when>
            <!-- false -->
            <xsl:otherwise>false</xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- XSLT version 2 function for encoding strings for json
        SL says: Can't use this because we're using XSLT version 1, no PHP XSLT processor
    <xsl:function name="json:encode-string" as="xs:string">
        <xsl:param name="string" as="xs:string"/>
        <xsl:sequence select="replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace($string,
            '\\','\\\\'),
            '/', '\\/'),
            '&quot;', '\\&quot;'),
            '&#xA;','\\n'),
            '&#xD;','\\r'),
            '&#x9;','\\t'),
            '\n','\\n'),
            '\r','\\r'),
            '\t','\\t')"/>
    </xsl:function>
    -->

</xsl:stylesheet>
