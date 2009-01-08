<%@ include file="/common/taglibs.jsp"%>

<%
	request.setAttribute("ptype","list");
	request.setAttribute("path","editFuncalloc.html");
%>

<title><fmt:message key="funcallocList.title"/></title>
<content tag="heading"><fmt:message key="funcallocList.heading"/></content>
<html:form  action="editFuncalloc.html?method=edit" method="post" styleId="privateForm">
<vlh:root id="FuncallocId" configName="classicLook" value="funcallocList" url="editFuncalloc.html?method=search&" includeParameters="*">
<vlh:paging showSummary="true"/>  
    <table width="450" class="classicLook" cellspacing="0" cellpadding="0">
	<c:if test="${funcallocList.valueListInfo.totalNumberOfEntries != 0}">
      <vlh:row bean="Funcalloc">
        <vlh:attribute name="id"><%=("player-"+FuncallocRowNumber)%></vlh:attribute>
        <vlh:attribute name="align" value="center" />
      <vlh:checkbox name="ids" property="id" />


    <vlh:column titleKey="funcallocForm.username"  property="username"  sortable="desc"/>

    <vlh:column titleKey="funcallocForm.nodecode"  property="nodecode"  sortable="desc"/>

    <vlh:column titleKey="funcallocForm.xgr"  property="xgr"  sortable="desc"/>

    <vlh:column titleKey="funcallocForm.xgsj"  property="xgsj"  sortable="desc"/>

		<vlh:controls title="Control" >
                <vlh:action url="editFuncalloc.html?">
                  <vlh:addParam property="id" temp="false"/>
				  <vlh:addParam name="method" value="edit" temp="false" />
				  <vlh:addParam name="from" value="edit" temp="false" />
				<html:img pageKey="focus.image" />
                </vlh:action>|
                <vlh:action url="editFuncalloc.html?">
                  <vlh:addParam property="id" temp="false"/>
				  <vlh:addParam name="method" value="edit" temp="false" />
				  <vlh:addParam name="from" value="view" temp="false" />
				<html:img pageKey="view.image" />
                </vlh:action>
            </vlh:controls>
      </vlh:row>
	  </c:if>
    </table>
  </vlh:root>
  <%@ include file="/common/exportexcel.jsp"%>
</html:form>
<script>

setIds();  //为选中的id显示勾选的图标

</script>

<script type="text/javascript">
<!--
    highlightTableRows("funcallocList");
//-->
</script>
