<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@ include file="/common/taglibs.jsp"%>

<%
	request.setAttribute("ptype","view");
	request.setAttribute("path","editNode.html");
%>
<title><fmt:message key="nodeDetail.title"/></title>
<content tag="heading"><fmt:message key="nodeDetail.heading"/></content>

<html:form action="editNode" method="post" styleId="nodeForm"
    focus="bm" onsubmit="return validateNodeForm(this)">
<input type="hidden" name="type" value="<%=request.getParameter("type")%>" />
<table class="detail">

<html:hidden property="id"/>

    <tr>
        <th>
            <fmt:message key="nodeForm.nodecode"/>
        </th>
        <td>
            <html:hidden write="true"  property="nodecode" styleId="nodecode"/>
            <html:errors property="nodecode"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.parent_id"/>
        </th>
        <td>
            <html:hidden write="true"  property="parent_id" styleId="parent_id"/>
            <html:errors property="parent_id"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.func_node_name"/>
        </th>
        <td>
            <html:hidden write="true"  property="func_node_name" styleId="func_node_name"/>
            <html:errors property="func_node_name"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.czmc"/>
        </th>
        <td>
            <html:hidden write="true"  property="czmc" styleId="czmc"/>
            <html:errors property="czmc"/>
        </td>
    </tr>

    <tr>
        <th>
            <fmt:message key="nodeForm.location"/>
        </th>
        <td>
            <html:hidden write="true"  property="location" styleId="location"/>
            <html:errors property="location"/>
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
 return true;
}
</script>