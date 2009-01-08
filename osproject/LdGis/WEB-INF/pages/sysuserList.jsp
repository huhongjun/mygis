<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>
<%@ include file="/common/taglibs.jsp"%>
<title><fmt:message key="sysuserList.title"/></title>
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

function deleteIt(){	
  var form = document.forms[0];   
  var array = form.elements;
  var sum = 0;
  for(var i=0; i<array.length; i++){
    var elem = array[i];
    if(elem.type=='checkbox'&& elem.checked){
      sum++
    }
  }
  if(sum==0){
    alert("请选择记录后删除!");
    return;
  }
  if(confirm("确定需要删除选中的 "+sum+" 条记录吗？")){
    form.action=getMethod('editSysuser.html', 'deleteMore');
	form.submit();
  }
}

function mod(){
   var form = document.forms[0];
   var array = form.elements;
   var sum = 0;
   for(var i = 0;i<array.length;i++){
      var elem = array[i];
      if(elem.type =='checkbox' && elem.checked){
         sum++;
      }
   }
   if(sum==0){
      alert("请选择修改的记录！");
      return;
   }
   else{
      form.action = getMethod('editSysuser.html','gotoMod') + "&from=" + "edit_many";
      form.submit();
   }
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
</script>
<link href="/css/style.css" rel="stylesheet" type="text/css">
</head>

<body bgcolor="#EDF2F8" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="MM_preloadImages('../images/common/icons/search_over.gif','../images/common/icons/save_over.gif','../images/common/icons/rewrite_over.gif','../images/common/icons/back_over.gif','../images/common/icons/search_over.gif')">
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
		  
		  <a href="javascript:mod()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image6','','<c:url value="/images/common/icons/edit_over.gif"/>',1)">
		 <img src="<c:url value="/images/common/icons/edit_on.gif"/>"  name="Image6" width="60" height="20"></a>
		  
		  <a href="javascript:deleteIt()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image8','','<c:url value="/images/common/icons/del_over.gif"/>',1)">
		  <img src="<c:url value="/images/common/icons/del_on.gif"/>" name="Image8" width="60" height="20"></a></td>
        </tr>
        <tr>
          <td width="95%" height="20" colspan="2">&nbsp;</td>
        </tr>
      </table>


<html:form  action="editSysuser.html?method=search" method="post" styleId="privateForm">

<vlh:root id="sysusersid" configName="microsoftLook" value="sysuserslist" url="editSysuser.html?method=search&" includeParameters="*">

<vlh:paging showSummary="true"/>  
    <table width="100%" class="classicLook" cellspacing="0" cellpadding="0">
	<c:if test="${sysuserslist.valueListInfo.totalNumberOfEntries != 0}">
      <vlh:row bean="sysuserslist">
      <vlh:attribute name="align" value="center" />
        <vlh:checkbox name="ids" property="id" />
        <vlh:column titleKey="sysuserForm.username"  property="username" sortable="desc"/>
        <vlh:column titleKey="sysuserForm.name"  property="name" sortable="desc"/>
        <vlh:column titleKey="sysuserForm.password"  property="password" sortable="desc"/>
        <vlh:column titleKey="sysuserForm.sydwmc"  property="sydwmc" sortable="desc"/>
        <vlh:column titleKey="sysuserForm.memo"  property="memo" sortable="desc"/>
        
        <vlh:controls titleKey="vlh.controls.title.browse" >
                <vlh:action url="editSysuser.html?">
                   <vlh:addParam property="id" temp="false"/>
		   <vlh:addParam name="method" value="detail" temp="false" />
		   <vlh:addParam name="from" value="find" temp="false" />
		   <html:img pageKey="view.image" />
           </vlh:action>
	</vlh:controls>
       <vlh:controls titleKey="vlh.controls.title.modify" >
                <vlh:action url="editSysuser.html?">
                   <vlh:addParam property="id" temp="false"/>
		   <vlh:addParam name="method" value="gotoMod" temp="false" />
		   <vlh:addParam name="from" value="find" temp="false" />
		   <html:img pageKey="update.image" />
                </vlh:action>
	</vlh:controls>
	
      </vlh:row>
	</c:if>
    </table>
</vlh:root>

</html:form>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  
   <tr align = "left">
     <td height = "20" colspan = "3">&nbsp;</td>
  </tr>
  
  <tr>
    <td colspan = "3"><div align="center">
    <a href=<c:out value="editSysuser.html" />?method=gotoFind&module=<%=request.getParameter("module")%> onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image171','','<c:url value="/images/common/icons/back_over.gif"/>',1)"><img src="<c:url value="/images/common/icons/back_on.gif"/>" name="Image171" width="60" height="20" border="0" id="Image171"></a>
     </div></td>
</table>
</body>



<script type="text/javascript">
<!--
    highlightTableRows("sysUserList");
//-->
</script>