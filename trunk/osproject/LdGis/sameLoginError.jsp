<%@ include file="/common/taglibs.jsp"%>
<%
	String userName = (String)
		(request.getParameter("userName")==null?
					"":request.getParameter("userName"));
	//System.out.println(userName);
%>
<html>
<head>

<title>lOGIN ERROR</title>
<meta name="decorator" content="none"/>
</head>
<body>  <tr>   
    <span style="font-family:Arial Black;font-size:10pt;color:red">
	                    
	        
	 <fmt:message key="sameLogin.namemessage">
            <fmt:param>  <c:out value ="${username} "/></fmt:param>
        </fmt:message>
	 
		</tr>  
		<tr>
		<fmt:message key="sameLogin.ipmessage">
            <fmt:param>  <c:out value ="${requestIp} "/></fmt:param>
        </fmt:message>
        </tr>
		</span>
		<img hspace ="200" vspace= "100" src="<c:url value="/images/sameUser.gif"/>"/>
		
 
</body>
</html>