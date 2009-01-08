<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	request.setAttribute("ptype","form");
	request.setAttribute("path","editFj.html");
%>
<%--caoruixin:<%= request.getAttribute("nextPath")%>--%>
<%--next:<%= request.getParameter("comnext")%>--%>
<%if( request.getAttribute("bm").equals("PIC")){%>
<title><fmt:message key="picDetail.title"/></title>
<%} else if( request.getAttribute("nextPath").equals("editJbxx.html")){%>
<title><fmt:message key="jbxxfjDetail.title"/></title>
<%}else if(request.getAttribute("nextPath").equals("editTfsj.html")){%>
<title><fmt:message key="tfsjfjDetail.title"/></title>
<%}else  if(request.getAttribute("nextPath").equals("editYdjl.html")){%>
<title><fmt:message key="ydjlfjDetail.title"/></title>
<%}else if( request.getAttribute("nextPath").equals("editJs.html")){%>
<title><fmt:message key="jsfjDetail.title"/></title>
<%}else {%>
<title><fmt:message key="fjDetail.title"/></title>
<%}%>

<content tag="heading"><fmt:message key="fjDetail.heading"/></content>

<meta name="decorator" content="fj"/>

<html:form action="editFj" method="post" styleId="fjFormCommon"
    focus="bm" enctype="multipart/form-data"  onsubmit="return validateFjForm(this)">
<input type="hidden" name="from" value="<%=request.getParameter("from")%>" />
<input type="hidden" name="nextPath" value="<%= request.getAttribute("nextPath")%>" />
<input type="hidden" name="module" value="<%= request.getParameter("module")%>" />
<input type="hidden" name="next" value="<%= request.getParameter("next")%>"/>

<table class="detail">
<script type="text/javascript">
var gpath='';
function Check_FileType(str)
{	
 var imgobj = new Image();
 imgobj.src = gpath;
 
 var pos = str.lastIndexOf(".");

 var lastname = str.substring(pos,str.length)  //此处文件后缀名也可用数组方式获得str.split(".") 


 
 if (lastname.toLowerCase()!=".jpg" && lastname.toLowerCase()!=".png")
 {
     alert("您上传的文件类型为"+lastname+"，图片必须为.jpg,.png类型");
     document.getElementById('fjmc').value = ''
   return false;
 }
 else  if (imgobj.width > 130 || imgobj.height > 177 )
 {
	alert("您上传的图片大小为" + imgobj.width + "X" + imgobj.height +",请将图片尺寸减小到133X170以内" ) 
	document.getElementById('fjmc').value='';
	return false;    
 }
 else 
 {
  var pos1 = gpath.lastIndexOf("\\");

 var mc = gpath.substring(pos1+1,gpath.length)  
 
 document.getElementById('fjmc').value = mc
 
 
  return true;
 }
}

</script>

<html:hidden property="id" />
<html-el:hidden property="bm" value="${bm}"/>
<html-el:hidden property="pid" value="${fjpid}" styleId="pid"/>

	<%--tr>
		<th>
			附件pid:
		</th>
		<td>
			<html-el:text property="pid" value="${fjpid}" styleId="pid"/>
		</td>
	</tr>
    
    <tr>
        <th>
           表名:
        </th>
        <td>
            <html:text property="bm" styleId="bm"/>
            <html:errors property="bm"/>
        </td>
    </tr--%>
<%if(request.getAttribute("bm").equals("PIC")){%>
 <tr>
        <th>
        相片名称:
        </th>
        <td>
            <input type="text" name="fjmc" id="fjmc" />
            <html:errors property="fjmc"/>
        </td>
    </tr>

	<tr>
		<th>
		相片路径:
		</th>
		<td>
		<html:file property="file" styleId="file" onchange="gpath=this.value;Check_FileType(this.value)" />
		</td>
	</tr>
<%}else{%>
    <tr>
        <th>
        附件名称:
        </th>
        <td>
            <input type="text" name="fjmc" id="fjmc" readonly />
            <html:errors property="fjmc"/>
        </td>
    </tr>

	<tr>
		<th>
		附件路径:
		</th>
		<td>
		<html:file property="file" styleId="file" onchange="getNameFromPath(this.value,fjFormCommon.fjmc)" />
		</td>
	</tr>
<%}%>
    <%--tr>
        <th>
            附件路径:
        </th>
        <td>
            <html:text property="fjlj" styleId="fjlj"/>
            <html:errors property="fjlj"/>
        </td>
    </tr>
    <tr>
        <th>
           相关类型: 
        </th>
        <td>
            <html:text property="xglx" styleId="xglx"/>
            <html:errors property="xglx"/>
        </td>
    </tr>

    <tr>
        <th>
           备注: 
        </th>
        <td>
            <html:text property="bz" styleId="bz"/>
            <html:errors property="bz"/>
        </td>
    </tr--%>
	<tr>
        <th>
            备注: <br>
        </th>
        <td>
           <html:textarea cols="85" rows="5" property="bz" ></html:textarea>
        </td>
    </tr> 
</table>
</html:form>

<html:javascript formName="fjFormCommon" cdata="false"
    dynamicJavascript="true" staticJavascript="false"/>
<script type="text/javascript" 
    src="<html:rewrite page="/scripts/validator.jsp"/>"></script>
<%if(request.getAttribute("bm").equals("PIC")){%>

<script>
function CheckInput(){
	if(validateFjFormCommon(document.forms[0])&&CheckAllPicLength())
		return true;
	else
		return false;
}
</script>
<%}else{%>
<script>
function CheckInput(){
	if(validateFjFormCommon(document.forms[0])&&CheckAllLength())
		return true;
	else
		return false;
}
</script>
<%}%>
<script type="text/javascript">

//检查是否为空
function CheckNull(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if(temp=="")
	{
		alert( txtLab + "不能为空！");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}


  function CheckAllLength(){
    if (CheckLength("bm","<表名>","255")
  		&&CheckLength("fjmc","<附件名称>","255")
		&&CheckNull("fjmc","<附件名称>")
		&&CheckLength("fjlj","<附件路径>","255")
  		&&CheckLength("xglx","<相关类型>","1")
  		&&CheckLength("bz","<备注>","255"))
      return true;
    else
      return false;
  }

  function CheckAllPicLength(){
    if (CheckLength("bm","<表名>","255")
  		&&CheckLength("fjmc","<相片名称>","255")
		&&CheckNull("fjmc","<相片名称>")
		&&Check_FileType(gpath)
  		&&CheckLength("fjlj","<相片路径>","255")
  		&&CheckLength("xglx","<相关类型>","1")
  		&&CheckLength("bz","<备注>","255"))
      return true;
    else
      return false;
  }
    
</script>
