<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.net.URLEncoder"%>
<%
   
	request.setAttribute("pat","editSysuser.html");

%>
<title><fmt:message key="sysuserQuery.title"/></title>
<html>
<head>
<script language="JavaScript" type="text/JavaScript">
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
 function findSysuser(){
   
    var form = document.forms[0];   
	form.action=getMethod('editSysuser.html', 'find');
    form.submit();
    clear(form);    

}
function clear(form){
  var array = form.elements;
  for(var i=0; i<array.length; i++){
    array[i].value="";
  }
}

function getMethod(af, m){
	return '<c:url value="/"/>' + af + "?method=" + m;
}

function clickTier(c,s){

    var intEnd = sysuserForm.ends[c].value;
    if(sysuserForm.tier[c].checked == true){
        for( var i=s;i<=intEnd;i++ ){
            sysuserForm.Model[i].checked = true;
        }
    }else{
        for( var i=s;i<=intEnd;i++ ){
            sysuserForm.Model[i].checked = false;
        }
    }
}

function passwordChanged(passwordField) {
    var origPassword = "<c:out value="${sysuserForm.password}"/>";
    if (passwordField.value != origPassword) {
        createFormElement("input", "hidden", 
                          "encryptPass", "encryptPass", 
                          "true", passwordField.form);
    }
}

function zoomSzyx(st){   window.open('ShowComZoom.jsp?sFormName='+st+'&nIndex=0&sSQL='+getSydwSql()+'&sNextControl=&sMainNames=sydwmc&sMainFields=dwmc&sMainFields2=id&sTrueName=sydwid&sDisplayNames=编码&sDisplayFields=dwbm&sDisplayNames=名称&sDisplayFields=dwmc', 'SelectAnything', 'toolbar=no,menubar=no,resizable=no,location=no,width=540,height=460,scrollbars=yes', false);
}

function getSydwSql(){
	var sSql = "select id,dwbm,dwmc from t_sydw where 1=1 ";
	 if(document.forms[0].sydwmc.value!=""){
		sSql += " and dwmc like '"+document.sysuserForm.sydwmc.value+"<%=URLEncoder.encode("%")%>'";
	 }
	 sSql += " and dwbm like '"+document.sysuserForm.sydwmc.value+"<%=URLEncoder.encode("%")%>000'";
	 sSql += "order by id,dwbm,dwmc";
	 return sSql;
}

</script>

<link href="/css/style.css" rel="stylesheet" type="text/css">
</head>

<body bgcolor="#EDF2F8" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="MM_preloadImages('../images/common/icons/search_over.gif','../images/common/icons/save_over.gif','../images/common/icons/rewrite_over.gif','../images/common/icons/back_over.gif','../images/common/icons/search_over.gif')">
<table width="102%" height="95%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td  valign="top"> 
      <table width="100%" height="25" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="20" colspan="2">&nbsp; </td>
        </tr>
        <tr>
          <td width="5%" height="20">&nbsp;</td>
          <td height="20">
		  <a href="editSysuser.html?method=edit" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image3','','<c:url value="/images/common/icons/new_over.gif"/>',1)">
		  <img src="<c:url value="/images/common/icons/new_on.gif"/>" name="Image3" width="60" height="20"></a>
		  
		  <img src="<c:url value="/images/common/icons/search_off.gif"/>" width="60" height="20">
		  
		  <img src="<c:url value="/images/common/icons/edit_off.gif"/>" width="60" height="20">
		  
		  <img src="<c:url value="/images/common/icons/del_off.gif"/>" width="60" height="20"></td>
        </tr>
        <tr>
          <td width="95%" height="20" colspan="2">&nbsp;</td>
        </tr>
      </table>
      
      
      <table width="90%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" valign="top">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top">
				
<html:form action="editSysuser" method="post" styleId="sysuserForm" focus="username"   >
                    <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
                      <tr>
                        <td height="15" colspan="3" align="center"><table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">                           

 <tr>
        <th>
            <fmt:message key="sysuserForm.username"/>
        </th>
        <td align="left">
            <html:text property="username" styleId="username"/>
            <html:errors property="username"/>
        </td>
    </tr>
    
 <tr>
    <tr>
        <th>
            <fmt:message key="sysuserForm.name"/>
        </th>
        <td align="left">
            <html:text property="name" styleId="name"/>
            <html:errors property="name"/>
        </td>
    </tr>

<%-- added by caoruixin 2006-11-07 yhfl--%>
<c:choose>
  <c:when test="${yhflflag == '0'}">
	<tr>
        <th>
            <fmt:message key="sysuserForm.yhfl"/>
        </th>
        <td align="left">
        	<html:select property="yhfl" size="1">
        		<html:option value="2">教育部用户</html:option>
        		<html:option value="3">教委用户</html:option>
        		<html:option value="1">系统管理员</html:option>
        	</html:select>
            <html:errors property="yhfl"/>
        </td>
    </tr>
    <tr>
    	<th>
        <fmt:message key="sysuserForm.sydwmc"/>
        </th>
        <td align="left">
            <html:hidden property="sydwid" styleId="sydwid"/>
            <html:text property="sydwmc" styleId="sydwmc" onkeydown="if(event.keyCode==13) JavaScript:zoomSzyx('sysuserForm')"/>
			<a href="javascript:zoomSzyx('sysuserForm')" >
			<img src="<c:url value="/images/common/icons/zoom.gif"/>"  />
     	</td>
	</tr>
  </c:when>
  <c:otherwise>
	<html:hidden property="yhfl" styleId="yhfl"/>
  </c:otherwise>
</c:choose>
<%-- added by caoruixin 2006-11-07 yhfl>
	
<%if (request.getSession().getAttribute("dwid")!=null) { %>
<tr id="szyxspan"  style="display:none"> 
<%}else{ %>
<tr id="szyxspan"  style="display:block"> 
<% }%>      
 		<th>
        <fmt:message key="sysuserForm.sydwmc"/>
        </th>
        <td align="left">
            <html:hidden property="sydwid" styleId="sydwid"/>
            <html:text property="sydwmc" styleId="sydwmc" onkeydown="if(event.keyCode==13) JavaScript:zoomSzyx('sysuserForm')"/>
			<a href="javascript:zoomSzyx('sysuserForm')" >
		      <img src="<c:url value="/images/common/icons/zoom.gif"/>"  />
     </td>
 </tr>
<html:hidden property="yhfl" styleId="yhfl" write="true"/--%>
 
                          </table></td>
                      </tr>
                      <tr align="left">
                        <td height="20" align="left" valign="middle">&nbsp;</td>
                        <td height="20" align="left" valign="middle">&nbsp;</td>
                        <td width="50%" height="20" align="left" valign="middle">&nbsp;</td>
                      </tr>
				

                      <tr align="left">
                        <td height="20" colspan="3">&nbsp;</td>
                      </tr>
                      <tr align="left">
                        <td colspan="3"><div align="center">
				 <a href="javascript:findSysuser()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image32','','<c:url value="/images/common/icons/apply_over.gif"/>',1)">
		<img src="<c:url value="/images/common/icons/apply_on.gif"/>" name="Image32" width="60" height="20" border="0" /></a>

       <a href="javascript:sysuserForm.reset()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image9','','<c:url value="/images/common/icons/rewrite_over.gif"/>',1)"><img src="<c:url value="/images/common/icons/rewrite_on.gif"/>" name="Image9" width="60" height="20" border="0"></a>
                             </div></td>
                      </tr>
                    </table>
                    <p>&nbsp;</p>
                    <p>&nbsp; </p>
                    <p>&nbsp; </p>
                  </html:form></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table width="90%" height="25" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="25">
            <div align="right"><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image6','','/images/common/icons/save_over.gif',1)">
              </a></div></td>
        </tr>
      </table>
      <table width="100%" height="25" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td>&nbsp;</td>
        </tr>
      </table></td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td><div align="center"> </div></td>
  </tr>
</table>
</body>

</html>

