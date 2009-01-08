<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" encoding="UTF-8" standalone="yes"/>
	<xsl:template match="/">
		<Result>
			<xsl:apply-templates select="Result/rows"/>
		</Result>
	</xsl:template>
	<xsl:template match="rows">
		<rows>
			<xsl:apply-templates select="row">
				<xsl:sort select="XLMC"/>
			</xsl:apply-templates>
		</rows>	
	</xsl:template>
	<xsl:template match="row">
		<xsl:copy-of select="."/>
	</xsl:template>
</xsl:stylesheet>
