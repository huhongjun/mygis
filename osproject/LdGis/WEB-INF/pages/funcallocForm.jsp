<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	request.setAttribute("ptype","form");
	request.setAttribute("path","editFuncalloc.html");
%>
<title><fmt:message key="funcallocDetail.title"/></title>
<content tag="heading"><fmt:message key="funcallocDetail.heading"/></content>

<html:form action="editFuncalloc" method="post" styleId="funcallocForm"
    focus="" onsubmit="return validateFuncallocForm(this)">
<input type="hidden" name="from"value="<%=request.getParameter("from")%>" />
<table class="detail">

<html:hidden property="id"/>

    <tr>
        <th>
            <LdGis3:label key="funcallocForm.username"/>
        </th>
        <td>
            <html:text property="username" styleId="username"/>
            <html:errors property="username"/>
        </td>
    </tr>

    <tr>
        <th>
            <LdGis3:label key="funcallocForm.nodecode"/>
        </th>
        <td>
            <html:text property="nodecode" styleId="nodecode"/>
            <html:errors property="nodecode"/>
        </td>
    </tr>

</table>
</html:form>

<!--html:javascript formName="funcallocForm" cdata="false"
    dynamicJavascript="true" staticJavascript="false"/>
<script type="text/javascript" 
    src="<html:rewrite page="/scripts/validator.jsp"/>"></script-->

<script type="text/javascript">
  function CheckAllLength(){
    if (CheckLength("username","<用户名>","60")
  		&&CheckLength("location","<链接>","255"))
      return true;
    else
      return false;
  }
</script>
