<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@ include file="/common/taglibs.jsp"%>
<%@ page import= "java.util.*" %>
<%@ page import= "org.appfuse.model.*" %>
<%    
    List ModelList = (List)request.getAttribute("NodeList"); 
%>
<title><fmt:message key="sysuserDetail.title"/></title>
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
 function add(){
   
    var form = document.forms[0];   
	form.action=getMethod('saveSysuser.html', 'save');
    form.submit();
    clear(form);    

}
function clear(form){
  var array = form.elements;
  for(var i=0; i<array.length; i++){
    array[i].value="";
  }
}

function deleteIt(){	
  var form = document.forms[0];
  if(confirm("确定要删除这项记录吗？")){
    form.action=getMethod('editSysuser.html', 'delete');
	form.submit();
  }
}
function back(){	 
var form = document.forms[0];
    form.action=getMethod('editSysuser.html', 'findBack');
	form.submit();
  
}
function mod()
{
    var form = document.forms[0];
    form.action=getMethod('editSysuser.html', 'gotoMod');
	form.submit();
}

function getMethod(af, m){
	return '<c:url value="/"/>' + af + "?method=" + m;
}

function actionStr(m,parameter){
  form = document.forms[0];
  form.action = getMethod('editSysuser.html',m) + "&from=" + parameter;
  form.submit();
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

		  <a href="editSysuser.html?method=gotoFind" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image51','','<c:url value="/images/common/icons/search_over.gif"/>',1)"><img src="<c:url value="/images/common/icons/search_on.gif"/>" name="Image51" width="60" height="20" border="0" id="Image51"></a>
		  
		  <a href="javascript:mod()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image6','','<c:url value="/images/common/icons/edit_over.gif"/>',1)"><img src="<c:url value="/images/common/icons/edit_on.gif"/>"  name="Image6" width="60" height="20"></a>

		  <a href="javascript:deleteIt()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image8','','<c:url value="/images/common/icons/del_over.gif"/>',1)">
		  <img src="<c:url value="/images/common/icons/del_on.gif"/>" name="Image8" width="60" height="20"></td>
        </tr>
        <tr>
          <td width="95%" height="20" colspan="2">&nbsp;</td>
        </tr>
      </table>
      <table width="100%" height="20" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="20"><table width="100%" height="21" border="0" cellpadding="0" cellspacing="0" bgcolor="#E2D2B0">
              <tr>
                <td width="5%" height="21" align="center" bgcolor="#FFFFFF">
                  <table width="100%" height="20" border="0" cellpadding="0" cellspacing="0" class="cgcolor7">
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                </table></td>
                <td width="30%" align="left" bgcolor="#FFFFFF">&nbsp;                </td>
                <td align="center" bgcolor="#FFFFFF"><table width="100%" height="20" border="0" cellpadding="0" cellspacing="0" class="cgcolor7">
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                </table></td>
              </tr>
          </table></td>
        </tr>
      </table>
      <table width="100%"  border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th height="20" scope="row">&nbsp;</th>
        </tr>
      </table>
      <table width="90%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" valign="top">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top">
                 <html:form action="editSysuser" method="post" styleId="sysuserForm" focus="name" >
                    <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
                      <tr>
                        <td height="15" colspan="3" align="center"><table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
                            <html:hidden property="id"/>   
<%-- added by caoruixin 2006-11-07 yhfl--%>
<html:hidden property="yhfl" styleId="yhfl" />
    <tr>
        <th>
            <LdGis:label key="sysuserForm.name"/>
        </th>
        <td align="left">
            <html:text property="name" styleId="name" disabled="true"/>
            <html:errors property="name"/>
        </td>
    </tr>
 <tr>
        <th>
            <LdGis:label key="sysuserForm.username"/>
        </th>
        <td align="left">
            <html:text property="username" styleId="username" disabled="true"/>
            <html:errors property="username"/>
        </td>
    </tr>
    <tr>
        <th>
            <LdGis:label key="sysuserForm.password"/>
        </th>
        <td align="left">
           <html:password property="password" size="20"
                onchange="passwordChanged(this)"
                styleId="password" redisplay="true" disabled="true"/>
            <html:errors property="password"/>
        </td>
    </tr>
    
    <tr>
        <th>
            <LdGis:label key="sysuserForm.sydwmc"/>
        </th>
        <td align="left">
            <html:text property="sydwmc" styleId="sydwmc" disabled="true"/>
            <html:errors property="sydwmc"/>
        </td>
    </tr>

	 <tr>
        <th>
            <LdGis:label key="sysuserForm.memo"/>
        </th>
        <td align="left">
            <html:text property="memo" styleId="memo" disabled="true"/>
            <html:errors property="memo"/>
        </td>
    </tr>
    
  </td>
 </tr>
</table>
                      <tr align="left">
                        <td height="20" align="left" valign="middle">&nbsp;</td>
                        <td height="20" align="left" valign="middle">&nbsp;</td>
                        <td width="50%" height="20" align="left" valign="middle">&nbsp;</td>
                      </tr>
				 
                      <tr align="left">
                        <td height="20" colspan="3" align="left" valign="middle">
                          <p> <fmt:message key="func.list"/>
        </p></td>
                      </tr>
                      <tr align="left">
                        <td height="14" colspan="3"> <table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
                            <tr bgcolor="#598ECC">
                              <td width="30%" height="20" align="center"><fmt:message key="choose.alloc"/></td>
                              <td width="83%" align="center"><fmt:message key="func.list"/></td>
                            </tr>

<%
if( ModelList != null && ModelList.size() != 0 )
{

    Node mInfo = new Node();
    for(int i=0; i<ModelList.size();i++){
        mInfo = (Node)ModelList.get(i);
%>
                            <tr>
                              <td width="30%" align="center"> <input type="checkbox" name="checkbox3" value="checkbox" checked disabled>                              </td>
                              <td width="83%" align="left"><%=mInfo.getCzmc()%></td>
                            </tr>
                            <%   } }else{%>
                            <tr>
                              <td colspan="7"> <div align="center">
                              没有任何权限!</div></td>
                            </tr>
                            <%
}
%>
                          </table></td>
                      </tr>

                      <tr align="left">
                        <td height="20" colspan="3">&nbsp;</td>
                      </tr>
                      <tr align="left">
                        <td colspan="3"><div align="center">
                          <a href="JavaScript:back()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image71','','<c:url value="/images/common/icons/back_over.gif"/>',1)"><img src="<c:url value="/images/common/icons/back_on.gif"/>" name="Image71" width="60" height="20" border="0" id="Image71"></a>
                              
                              
                             <c:choose>
				                          <c:when test="${img_state=='next'}">
					                          <html:img style="cursor:pointer"pageKey="prior_off.image" />
					                          <html:img style="cursor:pointer"pageKey="next.image" onclick="actionStr('next', 'edit_many')"/>
				                          </c:when>
			                     	      <c:when test="${img_state=='prior'}">
					                          <html:img style="cursor:pointer"pageKey="prior.image" onclick="actionStr('prior', 'edit_many')"/>
					                          <html:img style="cursor:pointer"pageKey="next_off.image" />
				                          </c:when>
				                          <c:when test="${img_state=='both'}">
					                          <html:img style="cursor:pointer" pageKey="prior.image" onclick="actionStr('prior', 'edit_many')"/>
					                          <html:img style="cursor:pointer"pageKey="next.image" onclick="actionStr('next', 'edit_many')"/>
				                          </c:when>
			                       </c:choose>
                              
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
    <td><div align="center"></div></td>
  </tr>
</table>
</body>

</html>
