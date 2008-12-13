<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>
<%@ include file="/common/taglibs.jsp"%>
<html>
<head>

<title></title>
</head>
<link rel="stylesheet" type="text/css" media="all" href="styles/default.css" /> 
<link rel="stylesheet" type="text/css" media="all" href="<c:url value='/css/default.css'/>" /> 
<body onload="window.resizeTo (window.screen.width - 4,window.screen.height-50);window.moveTo(-4,-4)"> 

<html:form  action="editThunder.do?method=search" method="post" styleId="privateForm">
<vlh:root id="objectid" configName="microsoftLook" value="ldDataList" url="editThunder.do?method=search&" includeParameters="*">

<vlh:paging showSummary="true"/>   
 <table width="1000" class="classicLook" cellspacing="0" cellpadding="0">
    	<c:if test="${ldDataList.valueListInfo.totalNumberOfEntries != 0}">
	    <vlh:row bean="Thunder">
 <vlh:attribute name="id"><%=("player-"+ThunderRowNumber)%></vlh:attribute> 
        <vlh:attribute name="align" value="center" />
        
        <vlh:column titleKey="thunderForm.OBJECTID"  property="objectid"  sortable="desc"/>
        
        <vlh:column titleKey="thunderForm.FLASHTIME"  property="flashtime"  sortable="desc"/>
        
        <vlh:column titleKey="thunderForm.LONGITUDE"  property="longitude"  sortable="desc"/>
        
        <vlh:column titleKey="thunderForm.LATITUDE"  property="latitude"  sortable="desc"/>
        
        <vlh:column titleKey="thunderForm.X"  property="x"  sortable="desc"/>
        
        <vlh:column titleKey="thunderForm.Y"  property="y"  sortable="desc"/>
        <vlh:column titleKey="thunderForm.XIAN"  property="xianmc"  sortable="desc"/>
        
        <vlh:column titleKey="thunderForm.INTENSION"  property="intension"  sortable="desc"/>
        
         <vlh:column titleKey="thunderForm.DETECTORDT"  property="detectordt"  sortable="desc"/>
              
        </vlh:row>
	 </c:if>
    </table>
  </vlh:root>
 <c:if test="${ldDataList.valueListInfo.totalNumberOfEntries != 0}">
  <%@ include file="/common/exportexcel.jsp"%>
  </c:if> 

</html:form>

</body>
</html>