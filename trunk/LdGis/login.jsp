<%@ include file="/common/taglibs.jsp"%>
<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<html>

<title><fmt:message key="login.title"/></title>
<script type="text/javascript" src="scripts/md5.js"></script> 
<body  >
<script language="javascript">
function submitForm(){
	form = document.getElementById("loginForm");
	src = form.action;
	var height=document.body.clientHeight - 46;
	var width = document.body.clientWidth;
	src +="?height=" + height + "&width=" + width;
	var j_password = form.j_password.value;
	var j_username=form.j_username.value;
	
	src +="&j_username=" + j_username + "&j_password=" + hex_md5(j_password);
	form.action = src;
	form.submit();
}

</script>
<%-- If you don't want to encrypt passwords programmatically, or you don't
     care about using SSL for the login, you can change this form's action
     to "j_security_check" --%>
<form method="post" id="loginForm" action="<c:url value="/authorize"/>"   >

<table align="center" class="login" >
<!--table width="100%"--> 
<tr> 
<td>
	<table align="center" width="85%">
    <tr  height="230">

        <td colspan="2">
            <c:if test="${param.error != null}">
            <div class="error" 
                style="margin-right: 0; margin-bottom: 3px; margin-top: 3px">
                    <img src="<c:url value="/images/iconWarning.gif"/>"
                        alt="<fmt:message key="icon.warning"/>" class="icon" />
                    <fmt:message key="errors.password.mismatch"/>
                </div>
            </c:if>
        </td>
    </tr>
    
    <br>
    <tr>
    	<td width="120">用户名</td>
        <td> 
            <input type="text" name="j_username" id="j_username" size="15" tabindex="1" />
        </td>
		<td width="80">密码</td>
        <td>
            <input type="password" name="j_password" id="j_password" size="15" tabindex="2" />
      	</td> 
       <td>
           <input type="hidden" name="j_uri" value="" />
       </td> 
	   <td><input name="提交" type="button" value="提交" onclick="javascript:submitForm()"></td>   
    </tr>  
  </table> 

   </td>
</tr>
</table>
</form>
</body>
<html>