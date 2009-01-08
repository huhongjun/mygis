<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>
<%@ include file="/common/taglibs.jsp"%>
<%
request.setAttribute("pa","editSysuser.html");
%>
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
 function modPass(){
   
    var form = document.forms[0];   
	form.action=getMethod('editSysuser.html', 'modPass');
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
</script>
<link href="/css/style.css" rel="stylesheet" type="text/css">
</head>

<body bgcolor="#EDF2F8" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="MM_preloadImages('../images/common/icons/search_over.gif','../images/common/icons/save_over.gif','../images/common/icons/rewrite_over.gif','../images/common/icons/back_over.gif','../images/common/icons/search_over.gif')">
<table width="102%" height="95%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td  valign="top"> 
      
      <table width="90%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" valign="top">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" valign="top">
				
<html:form action="editSysuser" method="post" styleId="sysuserForm" focus="oldPass"   >
                    <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
                      <tr>
                        <td height="15" colspan="3" align="center"><table width="100%" border="1" cellpadding="1" cellspacing="1" bordercolor="#CCCCCC">                           

 <tr>
        <th>
           <label for="xh">æ…√‹¬Î£∫</label>
        </th>
        <td align="left">
            <input type="password" name="oldPass" value="" id="oldPass" maxlength="15"/>
        </td>
    </tr>
    
 <tr>
    <tr>
        <th>
           <label for="xh">–¬√‹¬Î£∫</label>
        </th>
        <td align="left">
             <input type="password" name="newPass" value="" id="newPass" maxlength="15"/>
        </td>
    </tr>
	
	<tr>
        <th>
           <label for="xh">»∑»œ–¬√‹¬Î£∫</label>
        </th>
        <td align="left">
            <input type="password" name="newPassCon" value="" id="newPassCon" maxlength="15"/>
        </td>
    </tr>


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
				 <a href="javascript:modPass()" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image32','','<c:url value="/images/common/icons/apply_over.gif"/>',1)">
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
