<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	request.setAttribute("ptype","find");
	request.setAttribute("path","editNode.html");
%>
<title><fmt:message key="nodeDetail.title"/></title>
<content tag="heading"><fmt:message key="nodeDetail.heading"/></content>

<html:form action="editNode" method="post" styleId="nodeForm"
    focus="bm" onsubmit="return validateNodeForm(this)">
<table class="detail">

<html:hidden property="id"/>

    <tr>
        <th>
            <fmt:message key="nodeForm.nodecode"/>
        </th>
        <td>
            <html:text property="nodecode" styleId="nodecode"/>
            <html:errors property="nodecode"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.parent_id"/>
        </th>
        <td>
            <html:text property="parent_id" styleId="parent_id"/>
            <html:errors property="parent_id"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.func_node_name"/>
        </th>
        <td>
            <html:text property="func_node_name" styleId="func_node_name"/>
            <html:errors property="func_node_name"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.czmc"/>
        </th>
        <td>
            <html:text property="czmc" styleId="czmc"/>
            <html:errors property="czmc"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.location"/>
        </th>
        <td>
            <html:text property="location" styleId="location"/>
            <html:errors property="location"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.xgr"/>
        </th>
        <td>
            <html:text property="xgr" styleId="xgr"/>
            <html:errors property="xgr"/>
        </td>
    </tr>

    

    <tr>
        <th>
             <fmt:message key="xgsjks"/>
        </th>
        <td>
            <html:text property="xgsjks"  onkeypress="JavaScript:makeDate('xgsjks')"  onkeydown="JavaScript:stop()"/>
            <html:img pageKey="calendar.image" 
            onclick="javascript:popUpCalendar(this, document.forms[0].xgsjks)"/>
            <html:errors property="xgsjks"/>
        </td>
    </tr>

    <tr>
        <th>
             <fmt:message key="xgsjjs"/>
        </th>
        <td>
            <html:text property="xgsjjs"  onkeypress="JavaScript:makeDate('xgsjjs')"  onkeydown="JavaScript:stop()"/>
            <html:img pageKey="calendar.image" 
            onclick="javascript:popUpCalendar(this, document.forms[0].xgsjjs)"/>
            <html:errors property="xgsjjs"/>
        </td>
    </tr>
</table>
</html:form>

<!--html:javascript formName="nodeForm" cdata="false"
    dynamicJavascript="true" staticJavascript="false"/>
<script type="text/javascript" 
    src="<html:rewrite page="/scripts/validator.jsp"/>"></script-->

<script>
function CheckInput(){
	if(Compare('xgsjks','xgsjjs'))
		return true;
	else
		return false;
}
</script>

