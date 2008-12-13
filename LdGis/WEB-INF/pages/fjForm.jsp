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

 var lastname = str.substring(pos,str.length)  //�˴��ļ���׺��Ҳ�������鷽ʽ���str.split(".") 


 
 if (lastname.toLowerCase()!=".jpg" && lastname.toLowerCase()!=".png")
 {
     alert("���ϴ����ļ�����Ϊ"+lastname+"��ͼƬ����Ϊ.jpg,.png����");
     document.getElementById('fjmc').value = ''
   return false;
 }
 else  if (imgobj.width > 130 || imgobj.height > 177 )
 {
	alert("���ϴ���ͼƬ��СΪ" + imgobj.width + "X" + imgobj.height +",�뽫ͼƬ�ߴ��С��133X170����" ) 
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
			����pid:
		</th>
		<td>
			<html-el:text property="pid" value="${fjpid}" styleId="pid"/>
		</td>
	</tr>
    
    <tr>
        <th>
           ����:
        </th>
        <td>
            <html:text property="bm" styleId="bm"/>
            <html:errors property="bm"/>
        </td>
    </tr--%>
<%if(request.getAttribute("bm").equals("PIC")){%>
 <tr>
        <th>
        ��Ƭ����:
        </th>
        <td>
            <input type="text" name="fjmc" id="fjmc" />
            <html:errors property="fjmc"/>
        </td>
    </tr>

	<tr>
		<th>
		��Ƭ·��:
		</th>
		<td>
		<html:file property="file" styleId="file" onchange="gpath=this.value;Check_FileType(this.value)" />
		</td>
	</tr>
<%}else{%>
    <tr>
        <th>
        ��������:
        </th>
        <td>
            <input type="text" name="fjmc" id="fjmc" readonly />
            <html:errors property="fjmc"/>
        </td>
    </tr>

	<tr>
		<th>
		����·��:
		</th>
		<td>
		<html:file property="file" styleId="file" onchange="getNameFromPath(this.value,fjFormCommon.fjmc)" />
		</td>
	</tr>
<%}%>
    <%--tr>
        <th>
            ����·��:
        </th>
        <td>
            <html:text property="fjlj" styleId="fjlj"/>
            <html:errors property="fjlj"/>
        </td>
    </tr>
    <tr>
        <th>
           �������: 
        </th>
        <td>
            <html:text property="xglx" styleId="xglx"/>
            <html:errors property="xglx"/>
        </td>
    </tr>

    <tr>
        <th>
           ��ע: 
        </th>
        <td>
            <html:text property="bz" styleId="bz"/>
            <html:errors property="bz"/>
        </td>
    </tr--%>
	<tr>
        <th>
            ��ע: <br>
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

//����Ƿ�Ϊ��
function CheckNull(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if(temp=="")
	{
		alert( txtLab + "����Ϊ�գ�");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}


  function CheckAllLength(){
    if (CheckLength("bm","<����>","255")
  		&&CheckLength("fjmc","<��������>","255")
		&&CheckNull("fjmc","<��������>")
		&&CheckLength("fjlj","<����·��>","255")
  		&&CheckLength("xglx","<�������>","1")
  		&&CheckLength("bz","<��ע>","255"))
      return true;
    else
      return false;
  }

  function CheckAllPicLength(){
    if (CheckLength("bm","<����>","255")
  		&&CheckLength("fjmc","<��Ƭ����>","255")
		&&CheckNull("fjmc","<��Ƭ����>")
		&&Check_FileType(gpath)
  		&&CheckLength("fjlj","<��Ƭ·��>","255")
  		&&CheckLength("xglx","<�������>","1")
  		&&CheckLength("bz","<��ע>","255"))
      return true;
    else
      return false;
  }
    
</script>
