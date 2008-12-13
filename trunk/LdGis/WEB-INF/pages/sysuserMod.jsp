<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK"
	contentType="text/html;charset=gbk"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ page import="java.util.*"%>
<%@ page import="org.appfuse.model.*"%>
<%@ page import="org.appfuse.webapp.form.*"%>
<%@ page import="org.appfuse.webapp.util.*"%>
<%@ page import="java.net.URLEncoder"%>
<%
	List ModelList = (List) request.getAttribute("NodeList");
	List ModelInfoList = (List) request.getAttribute("allNodeList");
	List SysNode = (List) request.getAttribute("SYSADMIN_NODELIST");
	List JybNode = (List) request.getAttribute("YHFL_JYB_NODELIST");
	List JwNode = (List) request.getAttribute("YHFL_JW_NODELIST");
	Long dwid = (Long) session.getAttribute("dwid");
	String yhflflag = (String) session.getAttribute("yhflflag");
	//	out.println("loginuser's yhfl = "+yhfl);
%>

<%--from = <%=request.getParameter("from")%>--%>
<title><fmt:message key="sysuserEdit.title" /></title>
<html>
<head>
<html:javascript formName="sysuserForm" cdata="false" dynamicJavascript="true" staticJavascript="false" />
<script type="text/javascript" src="<html:rewrite page="/scripts/validator.jsp"/>">
</script>

<script language="JavaScript" type="text/JavaScript">

window.onload=function()
{
  initList();
}

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
function CheckAllLength(){
    if (CheckLength("username","<用户名>","20")
  		&&CheckLength("name","<用户姓名>","20")
  		&&CheckLength("password","<密码>","20")
  		&&CheckLength("role_name","<岗位名称>","20")
  		&&CheckLength("memo","<备注>","255"))
      return true;
    else
      return false;
  }
function CheckInput(){	
  if (CheckAllLength()&&CheckInvalidData('name','<用户姓名>')&&CheckInvalidData('password','<密码>')&&CheckInvalidData('username','<用户名>')&&CheckInvalidData('confirmpw','<确认密码>')&&CheckNull('confirmpw','<确认密码>')&&CheckPassword())
		return true;
}
 function addSysuser()
{  
    var form = document.forms[0];     
    
    if(validateSysuserForm(form))
    { 
      form.action=getMethod('editSysuser.html', 'mod') + "&from=" + "mod";
      if(CheckInput())
	  {	
	     form.submit();
         clear(form);  
      }        
   }
}

function saveSysuser()
{
    var form = document.forms[0];  
     
    if(validateSysuserForm(form))
    {  
      form.action=getMethod('editSysuser.html', 'mod') + "&from=" + "edit_many";
      if(CheckInput())
      {	
         form.submit();
         clear(form);  
      }       
   }
}

//对输入密码进行确认   add by cym
function CheckPassword()
{
   var form = document.forms[0];
   var pw = form.password.value;
   var retypepw = document.getElementsByName('confirmpw')[0].value;
   if( retypepw != pw)
   {
      alert('所输入密码不一致');
      return false;
   }
   return true;
}

//根据用户身份对权限List进行初始化  add by cym
function initList()
{  
   var form = document.forms[0];
   
   if(<%=yhflflag%> == '0')
   {
      if(form.yhfl.value == '2')  
      {
        JybTable.style.display = "block";
        JybTable.disabled = false ;
      
        JwTable.style.display = "none";
        JwTable.disabled = true ;
     
        SysTable.style.display = "none";
        SysTable.disabled = true ;
      }
      if(form.yhfl.value == '3')
      {
        JybTable.style.display = "none";
        JybTable.disabled = true ;
     
        JwTable.style.display = "block";
        JwTable.disabled = false ;
     
        SysTable.style.display = "none";
        SysTable.disabled = true ;
      }
      if(form.yhfl.value == '1')
      {
        JybTable.style.display = "none";
        JybTable.disabled = true ;
     
        JwTable.style.display = "none";
        JwTable.disabled = true ;
     
        SysTable.style.display = "block";
        SysTable.disabled = false ;
      }
   }
}

//根据所选用户显示相应权限列表   add by cym
function changeList(menu)
{
   var arr = menu.options;
     
   if(document.forms[0].userId.value == "null")
   { 
      if(arr[0].selected)
      {
        JybTable.style.display = "block";
        JybTable.disabled = false ;
      
        JwTable.style.display = "none";
        JwTable.disabled = true ;
     
        SysTable.style.display = "none";
        SysTable.disabled = true ;
      }
   
      if(arr[1].selected)
      {
        JybTable.style.display = "none";
        JybTable.disabled = true ;
     
        JwTable.style.display = "block";
        JwTable.disabled = false ;
     
        SysTable.style.display = "none";
        SysTable.disabled = true ;
      }
   
      if(arr[2].selected)
      {
        JybTable.style.display = "none";
        JybTable.disabled = true ;
     
        JwTable.style.display = "none";
        JwTable.disabled = true ;
     
        SysTable.style.display = "block";
        SysTable.disabled = false ;
      }
   } 
}

function clear(form){
  var array = form.elements;
  for(var i=0; i<array.length; i++){
    array[i].value="";
  }
}

//modified by cym
function change(){
    var form = document.forms[0];    
	var id=form.userId.value;
	
	if(<%=yhflflag%> == '0')
	{
	  if(id != "null")
	  {
	    addTable.style.display = "none";
	    JybTable.style.display = "none";
        JwTable.style.display = "none";
        SysTable.style.display = "none";
      }else{
        addTable.style.display = "block";
        if(form.yhfl.value == '2')
        {
          JybTable.style.display = "block";
          JybTable.disabled = false ;
          
          JwTable.style.display = "none";
          JwTable.disabled = true ;
          
          SysTable.style.display = "none";
          SysTable.disabled = true ;       
        }
        if(form.yhfl.value == '3')
        {
          JybTable.style.display = "none";
          JybTable.disabled = true ;
          
          JwTable.style.display = "block";
          JwTable.disabled = false ;
          
          SysTable.style.display = "none";
          SysTable.disabled = true ;       
        }
        if(form.yhfl.value == '1')
        {
          JybTable.style.display = "none";
          JybTable.disabled = true ;
          
          JwTable.style.display = "none";
          JwTable.disabled = true ;
          
          SysTable.style.display = "block";
          SysTable.disabled = false ;      
        }
      }        
	}else{
	    if(id != "null")
	    {
	      addTable.style.display = "none";
	      delTable.style.display = "none";
	    }else{
	      addTable.style.display = "block";
	      delTable.style.display = "block";
	    }    	    
	}
}

function deleteIt(){	
  var form = document.forms[0];
  if(confirm("确定要删除这项记录吗？")){
    form.action=getMethod('editSysuser.html', 'delete');
	form.submit();
  }
}
function getMethod(af, m){
	return '<c:url value="/"/>' + af + "?method=" + m;
}

function actionStr(m,parameter){
	form=document.forms[0];
	form.action=getMethod('editSysuser.html', m) +  "&from=" + parameter;
	form.submit();
}

//modified by cym
function clickTier(c,s)
{   
    var intEnd = sysuserForm.ends[c].value;
    
    if(<%=yhflflag%> == '0')                        //教委和系统管理员两用户需特别处理
	{
	   if(JwTable.style.display == "block")
	   {
	      c += 6 ;
	      s += 20 ;
	      
	      intEnd = sysuserForm.ends[c].value - '0';	      	      
	      intEnd += 20 ;
	   }  
	   
	   if(SysTable.style.display == "block")
	   {
	      c += 11 ;
	      s += 35 ;
	      
	      intEnd = sysuserForm.ends[c].value - '0';	      	     
	      intEnd += 35 ;	      
	   } 	   
	} 
	     
       if(sysuserForm.tier[c].checked == true)
       {
           for( var i=s;i<=intEnd;i++ )
           {
            sysuserForm.Model[i].checked = true;
           }
       }else{
           for( var i=s;i<=intEnd;i++ )
           {
            sysuserForm.Model[i].checked = false;
           }
       }
}

//modified by cym
function chooseAll(){
    var i,tEnd,mEnd,form;
    
    form=sysuserForm;
    tEnd=form.tier.length;
    mEnd=form.Model.length;
    
    if(<%=yhflflag%> == '0')
	{
       if(JybTable.style.display == "block")   //教育部List显示
       {     
          for(i=0; i<=5; i++)                  //教育部 tier 的下标范围(0,5)
          {
    	    form.tier[i].checked=true;
          }       
          for(i=0; i<=19; i++)                 //教育部 Model 的下标范围(0,19)
          {
    	    form.Model[i].checked=true;
          }
       }
       if(JwTable.style.display == "block")    //教务List显示
       {
          for(i=6; i<=10; i++)                  //教委 tier 的下标范围(6,10)
          {
            form.tier[i].checked=true;
          }
          for(i=20; i<=34; i++)                //教务 Model 的下标范围(20,34)
          {
            form.Model[i].checked=true;
          }
       }
       if(SysTable.style.display == "block")   //系统管理员List显示
       {
          for(i=11; i<tEnd; i++)                //系统管理员 tier 的下标范围(11,tEnd)
          {
            form.tier[i].checked=true;
          }
          for(i=35; i<mEnd; i++)                //系统管理员 Model 的下标范围(35,mEnd)
          {
            form.Model[i].checked=true;
          }
       }
    }else{         
          for(i=0; i<tEnd; i++)
          {
    	    form.tier[i].checked=true;
          }
          
          for(i=0; i<mEnd; i++)
          {
    	    form.Model[i].checked=true;
          }
    }
}

//modified by cym
function reverseChoose(){
    var i,tEnd,mEnd,form;
    
    form=sysuserForm;
    tEnd=form.tier.length;
    mEnd=form.Model.length;
    
    if(<%=yhflflag%> == '0')
	{
       if(JybTable.style.display == "block")   //教育部List显示
       {     
          for(i=0; i<=5; i++)                  //教育部 tier 的下标范围(0,5)
          {
    	    form.tier[i].checked=!form.tier[i].checked
          }       
          for(i=0; i<=19; i++)                 //教育部 Model 的下标范围(0,19)
          {
    	    form.Model[i].checked=!form.Model[i].checked;
          }
       }
       if(JwTable.style.display == "block")    //教务List显示
       {
          for(i=6; i<=10; i++)                  //教委 tier 的下标范围(6,10)
          {
            form.tier[i].checked=!form.tier[i].checked
          }
          for(i=20; i<=34; i++)                //教务 Model 的下标范围(20,34)
          {
            form.Model[i].checked=!form.Model[i].checked;
          }
       }
       if(SysTable.style.display == "block")   //系统管理员List显示
       {
          for(i=11; i<tEnd; i++)                //系统管理员 tier 的下标范围(11,tEnd)
          {
            form.tier[i].checked=!form.tier[i].checked
          }
          for(i=35; i<mEnd; i++)                //系统管理员 Model 的下标范围(35,mEnd)
          {
            form.Model[i].checked=!form.Model[i].checked;
          }
       }
    }else{
          for(i=0; i<tEnd; i++)
          {
    	    form.tier[i].checked=!form.tier[i].checked
          }

          for(i=0; i<mEnd; i++)
          {
    	    form.Model[i].checked=!form.Model[i].checked;
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

function back(){	 
var form = document.forms[0];
    form.reset();
    form.action=getMethod('editSysuser.html', 'detail');
	form.submit();
  
}
</script>
<link href="/css/style.css" rel="stylesheet" type="text/css">
</head>

<body bgcolor="#EDF2F8" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="MM_preloadImages('../images/common/icons/search_over.gif','../images/common/icons/save_over.gif','../images/common/icons/rewrite_over.gif','../images/common/icons/back_over.gif','../images/common/icons/search_over.gif')">
<table width="102%" height="95%" border="0" cellpadding="0" cellspacing="0">
	 <tr>
		<td valign="top">
		<table width="100%" height="25" border="0" cellpadding="0" cellspacing="0">
			 <tr>
				<td height="20" colspan="2">&nbsp;</td>
			 </tr>
			 <tr>
				<td width="5%" height="20">&nbsp;</td>
				<td height="20">
				   <a href="editSysuser.html?method=edit" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image3','','<c:url value="/images/common/icons/new_over.gif"/>',1)">
				      <img src="<c:url value="/images/common/icons/new_on.gif"/>"name="Image3" width="60" height="20">
				   </a> 
				   <a href="editSysuser.html?method=gotoFind" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image51','','<c:url value="/images/common/icons/search_over.gif"/>',1)">
				      <img src="<c:url value="/images/common/icons/search_on.gif"/>"name="Image51" width="60" height="20" border="0" id="Image51">
				   </a>
				   <img src="<c:url value="/images/common/icons/edit_off.gif"/>" width="60" height="20"> 
				   <a href="javascript:deleteIt()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image8','','<c:url value="/images/common/icons/del_over.gif"/>',1)">
				      <img src="<c:url value="/images/common/icons/del_on.gif"/>"name="Image8" width="60" height="20">
			       </a>
			    </td>
			 </tr>
			 <tr>
				<td width="95%" height="20" colspan="2">&nbsp;</td>
			 </tr>
		</table>
		<table width="100%" height="20" border="0" cellpadding="0" cellspacing="0">
			 <tr>
				<td height="20">
		  <table width="100%" height="21" border="0" cellpadding="0" cellspacing="0" bgcolor="#E2D2B0">
					 <tr>
						<td width="5%" height="21" align="center" bgcolor="#FFFFFF">
			 <table width="100%" height="20" border="0" cellpadding="0"cellspacing="0" class="cgcolor7">
							<tr>
								<td>&nbsp;</td>
							</tr>
			 </table>
						</td>
						<td width="30%" align="left" bgcolor="#FFFFFF">&nbsp;</td>
						<td align="center" bgcolor="#FFFFFF">
				<table width="100%" height="20" border="0" cellpadding="0" cellspacing="0" class="cgcolor7">
							<tr>
								<td>&nbsp;</td>
							</tr>
				</table>
						</td>
					</tr>
		  </table>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<th height="20" scope="row">&nbsp;</th>
			</tr>
		</table>
		<table width="90%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td align="center" valign="top">
		  <table width="100%" height="100%" border="0" cellpadding="0"cellspacing="0">
					<tr>
						<td align="left" valign="top">
						   <html:form action="editSysuser" method="post" styleId="sysuserForm" focus="name" onsubmit="return validateSysuserForm(this)">
			 <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
								<tr>
									<td height="15" colspan="3" align="center">
				<table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
										<html:hidden property="id" />
										<tr>
											<th>
											   <LdGis:label key="sysuserForm.name" />
											</th>
											<td align="left">
											   <html:text property="name" styleId="name" maxlength="50" /> 
											   <html:errors property="name" />
											</td>
										</tr>
										<tr>
											<th>
											   <LdGis:label key="sysuserForm.username" />
											</th>
					               <% if (request.getAttribute("editSysuser") != null && request.getAttribute("editSysuser").equals("true")) 
					               {%>
											<td align="left">
											  <html:hidden property="username" styleId="username" write="true" /> 
											  <html:errors property="username" />
											</td>
                                   <%} else {%>
											<td align="left">
											  <html:text property="username" styleId="username" maxlength="20" /> 
											  <html:errors property="username" />
											</td>
								   <%}%>
										</tr>
                                        <tr>
											<th>
											   <LdGis:label key="sysuserForm.password" />
											</th>
											<td align="left">
											   <html:password property="password" size="20" onchange="passwordChanged(this)"
												              styleId="password" redisplay="true" maxlength="20" /> 
											   <html:errors property="password" />
											</td>
										</tr>
										<tr>
											<th><font color="red">*</font><strong>确认密码:</strong></th>
											<td align="left">
											   <Input type=password name=confirmpw size="20" styleId="confirmpw" 
											          redisplay="true" maxlength="20" />
											</td>
										</tr>
                                   <% if (request.getAttribute("szyxpro") != null && request.getAttribute("szyxpro").equals("yes")) 
                                      {%>
										<tr>
											<th>
											   <LdGis:label key="sysuserForm.sydwmc" />
											</th>
											<td align="left">
											   <html:hidden property="sydwid" styleId="sydwid" /> 
											   <html:hidden property="sydwmc" styleId="sydwmc" write="true" />
											</td>
										</tr>
									<%} else {%>
										<tr>
											<th>
											   <LdGis:label key="sysuserForm.sydwmc" />
											</th>
											<td align="left">
											   <html:hidden property="sydwid" styleId="sydwid" /> 
											   <html:text property="sydwmc" styleId="sydwmc" onkeydown="if(event.keyCode==13) JavaScript:zoomSzyx('sysuserForm')" />
											   <a href="javascript:zoomSzyx('sysuserForm')"> 
											   <img src="<c:url value="/images/common/icons/zoom.gif"/>" />
											</td>
										</tr>
								    <%}%>
<%-- added by caoruixin 2006-11-07 yhfl--%>
										<c:choose>
											<c:when test="${yhflflag == '0'}">
												<tr>
													<th>
													   <LdGis:label key="sysuserForm.yhfl" />
													</th>
													<td align="left">
													   <html:select property="yhfl" size="1" onchange="changeList(this)">
														  <html:option value="2">教育部用户</html:option>
														  <html:option value="3">教委用户</html:option>
														  <html:option value="1">系统管理员</html:option>
													   </html:select> 
													   <html:errors property="yhfl" />
													</td>
												</tr>
											</c:when>
											<c:otherwise>
												<html:hidden property="yhfl" styleId="yhfl" />
											</c:otherwise>
										</c:choose>
<%-- added by caoruixin 2006-11-07 yhfl--%>
										<tr>
											<th>
											   <LdGis:label key="sysuserForm.memo" />
											</th>
											<td align="left">
											   <html:text property="memo" styleId="memo" maxlength="110" /> 
											   <html:errors property="memo" />
											</td>
										</tr>
				</table>
							        </td>
							    </tr>
<%--选择用户--%>
								<tr align="left">
									<td height="20" align="left" valign="middle">&nbsp;</td>
									<td height="20" align="left" valign="middle">&nbsp;</td>
									<td width="50%" height="20" align="left" valign="middle">&nbsp;</td>
								</tr>
								<tr align="left">
									<td height="14" colspan="3">
					<table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
										<tr align="left">
											<td width="26%" height="20" align="left" valign="middle">
											<div align="center"><fmt:message key="choose.user" /></div>
											</td>
											<td width="24%" height="20" align="left" valign="middle">
											    <html:select property="userId" size="1" onchange="change()">
												<html:optionsCollection property="sysuserList" label="label" value="value" />
											    </html:select>
											</td>
											<td height="20" align="left" valign="middle">
											    <fmt:message key="p.s" />
											</td>
										</tr>
					</table>
									</td>
								</tr>
<%--权限列表--%>
								<tr align="left" id="addTable" style="display:block">
									<td height="20" colspan="3" align="left" valign="middle">
									<p><fmt:message key="func.list" /></p>
									</td>
								</tr>
<%--以非admin登陆显示List  add by cym --%>
                 <%if(!session.getAttribute("yhflflag").equals("0")) 
                   {%>
							<tr align="left" id="delTable" style="display:block">
								<td height="14" colspan="3">
					            <table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
										<tr>
											<input name="SelectAll" type="button" value="全选" onclick="javascript:chooseAll()">
											<input name="reverseSelect" type="button" value="反选" onclick="javascript:reverseChoose()">
										</tr>
										<tr bgcolor="#598ECC">
											<td width="30%" height="20" align="center">
											   <fmt:message key="choose.alloc" />
											</td>
											<td width="83%" align="center">
											   <fmt:message key="func.list" />
											</td>
										</tr>
										<%
												int k = 0;
												String temp = "";
												boolean start = true;
												if (ModelInfoList == null || ModelInfoList.size() == 0) {
										%>
										<tr>
											<center>没有任何权限!</center>
										</tr>
										<%} else {
												for (int i = 0; i < ModelInfoList.size(); i++) 
												{
												   Node mInfo = (Node) ModelInfoList.get(i);
												   if (!mInfo.getFunc_node_name().equals(temp)) 
												   {
                                                      temp = mInfo.getFunc_node_name();
													  if (!start) {
										%>
										<tr>
											<td>
											   <input type="hidden" name="ends" value="<%=i-1%>">
											</td>
										</tr>
										<%} else {
												 start = false;
										  }%>
										<tr bgcolor="#EDF2F8">
											<td>
											   <input type="checkbox" name="tier" onclick="javascript:clickTier(<%=k%>,<%=i%>)"><%=mInfo.getFunc_node_name()%>
                                            </td>
											<td>&nbsp;</td>
											<td>
										<%
										   k++;
										}%>	
										<tr>
											<td width="16%" align="center">
											   <input type="checkbox" name="Model" value="<%=mInfo.getId()%>"
										<%for(int j=0; j<ModelList.size(); j++)
										  {
								            Node fn = (Node) ModelList.get(j);
											if(fn.getId().equals(mInfo.getId()))
											{
											  out.print("checked");
										    }
						                  }
									    %>>
											</td>
											<td>
											   <div align="left"></div>
											   <%=mInfo.getCzmc()%>
											</td>
										</tr>
										<%
											}
											}
										%>
										<input type="hidden" name="ends" value="<%=ModelInfoList.size()-1%>">
				                </table>
							    </td>
						     </tr>
<%--以非admin登陆显示List End--%>
                 <%} else {%>
<%--JybList  add by cym--%>
                             <tr align="left" id="JybTable" style="display:none">
							    <td height="14" colspan="3">
					            <table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
								      <tr>
									     <input name="SelectAll" type="button" value="全选" onclick="javascript:chooseAll()">
									     <input name="reverseSelect" type="button" value="反选" onclick="javascript:reverseChoose()">
								      </tr>
								      <tr bgcolor="#598ECC">
									     <td width="30%" height="20" align="center">
									        <fmt:message key="choose.alloc" />
									     </td>
									     <td width="83%" align="center">
									        <fmt:message key="func.list" />
									     </td>
								      </tr>
								      <%
										     int kJYB = 0;
										     String tempJYB = "";
										     boolean startJYB = true;
										     if (JybNode == null || JybNode.size() == 0) 
										     {
								      %>
								                <tr>
									               <center>没有任何权限!</center>
								                </tr>
								      <%} else {
								    	     for (int i = 0; i < JybNode.size(); i++) 
										     {
											     Node mInfo = (Node) JybNode.get(i);
											     if (!mInfo.getFunc_node_name().equals(tempJYB)) 
											     {
												    tempJYB = mInfo.getFunc_node_name();
												    if (!startJYB) 
												    {
									  %>
									                  <tr>
										                 <td>
										                    <input type="hidden" name="ends" value="<%=i-1%>">
										                 </td>
									                  </tr>
									  <%            } else {
											        startJYB = false;
											        }
									  %>
									  <tr bgcolor="#EDF2F8">
									    <td>
									       <input type="checkbox" name="tier" onclick="javascript:clickTier(<%=kJYB%>,<%=i%>)"><%=mInfo.getFunc_node_name()%>
									    </td>
									    <td>&nbsp;</td>
								      </tr>
								      <%
								         kJYB++;
								      }%>
								      <tr>
											<td width="16%" align="center">
											   <input type="checkbox" name="Model" value="<%=mInfo.getId()%>"
										<%for(int j=0; j<ModelList.size(); j++)
										  {
								            Node fn = (Node) ModelList.get(j);
											if(fn.getId().equals(mInfo.getId()))
											{
											  out.print("checked");
										    }
						                  }
									    %>>
											</td>
											<td>
											   <div align="left"></div>
											   <%=mInfo.getCzmc()%>
											</td>
										</tr>
										<%
											}
											}
										%>
										<input type="hidden" name="ends" value="<%=JybNode.size()-1%>">
							</table>
							</td>
						</tr>
<%--JybList End--%>

<%--JwList add by cym--%>
                        <tr align="left" id="JwTable" style="display:none">
							<td height="14" colspan="3">
							<table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
								<tr>
									<input name="SelectAll" type="button" value="全选" onclick="javascript:chooseAll()">
									<input name="reverseSelect" type="button" value="反选" onclick="javascript:reverseChoose()">
								</tr>
								<tr bgcolor="#598ECC">
									<td width="30%" height="20" align="center">
									  <fmt:message key="choose.alloc" />
									</td>
									<td width="83%" align="center">
									  <fmt:message key="func.list" />
									</td>
								</tr>
								<%
										int kJW = 0;
										String tempJW = "";
										boolean startJW = true;
										if (JwNode == null || JwNode.size() == 0) 
										{
								%>
								          <tr>
									         <center>没有任何权限!</center>
								          </tr>
								<%} else {
									    for (int i = 0; i < JwNode.size(); i++) 
									    {
										   Node mInfo = (Node) JwNode.get(i);
										   if (!mInfo.getFunc_node_name().equals(tempJW)) 
										   {
											 tempJW = mInfo.getFunc_node_name();
											 if (!startJW) 
											 {
								%>
								               <tr>
									              <td>
									                 <input type="hidden" name="ends" value="<%=i-1%>">
									              </td>
								               </tr>
								<%           } else {
										     startJW = false;
										     }
								%>
								<tr bgcolor="#EDF2F8">
									<td>
									   <input type="checkbox" name="tier" onclick="javascript:clickTier(<%=kJW%>,<%=i%>)"><%=mInfo.getFunc_node_name()%>
									</td>
									<td>&nbsp;</td>
								</tr>
								<%
								   kJW++;
								}%>
								<tr>
											<td width="16%" align="center">
											   <input type="checkbox" name="Model" value="<%=mInfo.getId()%>"
										<%for(int j=0; j<ModelList.size(); j++)
										  {
								            Node fn = (Node) ModelList.get(j);
											if(fn.getId().equals(mInfo.getId()))
											{
											  out.print("checked");
										    }
						                  }
									    %>>
											</td>
											<td>
											   <div align="left"></div>
											   <%=mInfo.getCzmc()%>
											</td>
										</tr>
										<%
											}
											}
										%>
								<input type="hidden" name="ends" value="<%=JwNode.size()-1%>">
							</table>
							</td>
						</tr>
<%--JwList End--%>

<%--SysList  add by cym--%>
						<tr align="left" id="SysTable" style="display:none">
							<td height="14" colspan="3">
							<table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">
								<tr>
									<input name="SelectAll" type="button" value="全选" onclick="javascript:chooseAll()">
									<input name="reverseSelect" type="button" value="反选" onclick="javascript:reverseChoose()">
								</tr>
								<tr bgcolor="#598ECC">
									<td width="30%" height="20" align="center">
									  <fmt:message key="choose.alloc" />
									</td>
									<td width="83%" align="center">
									  <fmt:message key="func.list" />
									</td>
								</tr>
								<%
										int kSYS = 0;
										String tempSYS = "";
										boolean startSYS = true;
										if (SysNode == null || SysNode.size() == 0) 
										{
								%>
								          <tr>
									         <center>没有任何权限!</center>
								          </tr>
								<%} else {
									    for (int i = 0; i < SysNode.size(); i++) 
									    {
										   Node mInfo = (Node) SysNode.get(i);
										   if (!mInfo.getFunc_node_name().equals(tempSYS)) 
										   {
											 tempSYS = mInfo.getFunc_node_name();
											 if (!startSYS) 
											 {
								%>
								               <tr>
									              <td>
									                 <input type="hidden" name="ends" value="<%=i-1%>">
									              </td>
								               </tr>
								<%           } else {
										     startSYS = false;
										     }
								%>
								<tr bgcolor="#EDF2F8">
									<td>
									   <input type="checkbox" name="tier" onclick="javascript:clickTier(<%=kSYS%>,<%=i%>)"><%=mInfo.getFunc_node_name()%>
									</td>
									<td>&nbsp;</td>
								</tr>
								<%
								   kSYS++;
								}%>
								<tr>
											<td width="16%" align="center">
											   <input type="checkbox" name="Model" value="<%=mInfo.getId()%>"
										<%for(int j=0; j<ModelList.size(); j++)
										  {
								            Node fn = (Node) ModelList.get(j);
											if(fn.getId().equals(mInfo.getId()))
											{
											  out.print("checked");
										    }
						                  }
									    %>>
											</td>
											<td>
											   <div align="left"></div>
											   <%=mInfo.getCzmc()%>
											</td>
										</tr>
										<%
											}
											}
										%>
								<input type="hidden" name="ends" value="<%=SysNode.size()-1%>">
							</table>
							</td>
						</tr>
<%--SysList End--%>							                     
                 <%}%>
								<tr align="left">
									<td height="20" colspan="3">&nbsp;</td>
								</tr>
								<tr align="left">
									<td colspan="3">
									   <div align="center">
								<% if (request.getParameter("from") != null && request.getParameter("from").equals("edit_many")) 
								{%>
									<a href="javascript:saveSysuser()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image32','','<c:url value="/images/common/icons/save_over.gif"/>',1)">
									<img src="<c:url value="/images/common/icons/save_on.gif"/>" name="Image32" width="60" height="20" border="0" />
									</a> 
							    <%} else {%>
									<a href="javascript:addSysuser()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image32','','<c:url value="/images/common/icons/save_over.gif"/>',1)">
									<img src="<c:url value="/images/common/icons/save_on.gif"/>" name="Image32" width="60" height="20" border="0" />
									</a> 
								<%}%> 
								    <a href="javascript:sysuserForm.reset()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image9','','<c:url value="/images/common/icons/rewrite_over.gif"/>',1)">
								       <img src="<c:url value="/images/common/icons/rewrite_on.gif"/>" name="Image9" width="60" height="20" border="0">
								    </a> 
								    <a href="javascript:back()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image71','','<c:url value="/images/common/icons/back_over.gif"/>',1)">
								       <img src="<c:url value="/images/common/icons/back_on.gif"/>" name="Image71" width="60" height="20" border="0" id="Image71">
								    </a>
                                    <c:choose>
										<c:when test="${img_state=='next'}">
											<html:img style="cursor:pointer" pageKey="prior_off.image" />
											<html:img style="cursor:pointer" pageKey="next.image" onclick="actionStr('next', 'edit_many')" />
										</c:when>
										<c:when test="${img_state=='prior'}">
											<html:img style="cursor:pointer" pageKey="prior.image" onclick="actionStr('prior', 'edit_many')" />
											<html:img style="cursor:pointer" pageKey="next_off.image" />
										</c:when>
										<c:when test="${img_state=='both'}">
											<html:img style="cursor:pointer" pageKey="prior.image" onclick="actionStr('prior', 'edit_many')" />
											<html:img style="cursor:pointer" pageKey="next.image" onclick="actionStr('next', 'edit_many')" />
										</c:when>
									</c:choose>
									    </div>
									</td>
									<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
								</tr>
			 </table>
							<p>&nbsp;</p>
							<p>&nbsp;</p>
							<p>&nbsp;</p>
						</html:form>
					  </td>
					</tr>
		</table>
				</td>
			</tr>
	  </table>
	  <table width="90%" height="25" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="25">
				   <div align="right">
				     <a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image6','','/images/common/icons/save_over.gif',1)"></a>
				   </div>
				</td>
			</tr>
	   </table>
	   <table width="100%" height="25" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td>&nbsp;</td>
			</tr>
	   </table>
	 </td>
   </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td>
		  <div align="center"></div>
		</td>
	</tr>
</table>
</body>

</html>
<script>

</script>