<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@ include file="/common/taglibs.jsp"%>

<%
	request.setAttribute("ptype","list");
	request.setAttribute("path","editNode.html");
%>

<title><fmt:message key="nodeList.title"/></title>
<content tag="heading"><fmt:message key="nodeList.heading"/></content>
<html:form  action="editNode.html?method=edit" method="post" styleId="privateForm">
<vlh:root id="nodeid" configName="microsoftLook" value="nodelist" url="editNode.html?method=search&" includeParameters="*">
<vlh:paging showSummary="true"/>  
    <table width="450" class="classicLook" cellspacing="0" cellpadding="0">
	<c:if test="${nodelist.valueListInfo.totalNumberOfEntries != 0}">
      <vlh:row bean="Node">
        <vlh:attribute name="id"><%=("player-"+NodeRowNumber)%></vlh:attribute>
        <vlh:attribute name="align" value="center" />
      <vlh:checkbox name="ids" property="id" />


    <vlh:column titleKey="nodeForm.nodecode"  property="nodecode"  sortable="desc"/>

    <vlh:column titleKey="nodeForm.parent_id"  property="parent_id"  sortable="desc"/>

    <vlh:column titleKey="nodeForm.func_node_name"  property="func_node_name"  sortable="desc"/>

    <vlh:column titleKey="nodeForm.czmc"  property="czmc"  sortable="desc"/>

    <vlh:column titleKey="nodeForm.location"  property="location"  sortable="desc"/>

    <vlh:column titleKey="nodeForm.xgr"  property="xgr"  sortable="desc"/>

    <vlh:column titleKey="nodeForm.xgsj"  property="xgsj"  sortable="desc"/>

	<vlh:controls title="修改" >
                <vlh:action url="editNode.html?">
                  <vlh:addParam property="id" temp="false"/>
				  <vlh:addParam name="method" value="edit" temp="false" />
				  <vlh:addParam name="from" value="edit" temp="false" />
				<html:img pageKey="update.image" />
                </vlh:action>
		</vlh:controls>

		<vlh:controls title="查看" >
                <vlh:action url="editNode.html?">
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
  <c:if test="${nodelist.valueListInfo.totalNumberOfEntries != 0}">
  <%@ include file="/common/exportexcel_bm.jsp"%>
  </c:if>
</html:form>
<script>

setIds();  //为选中的id显示勾选的图标

</script>

<!--   注释掉这段代码         
<script type="text/javascript">

    highlightTableRows("nodeList");

</script>
-->

<script>
function CheckInput(){
 return true;
}
</script>
