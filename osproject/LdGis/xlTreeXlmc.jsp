<%@ page 
language="java" 
contentType="text/xml; charset=UTF-8" 
pageEncoding="UTF-8" 
%> 
<%@ page import="java.util.List" %>
<% 
    response.setContentType("text/xml"); 
	List lstXlmc=(List)request.getAttribute("lstXlmc");
	List lstXlID=(List)request.getAttribute("lstXlID");
	
	if (lstXlmc!=null){
        out.println("<tree>"); 
		String xlmc="";
		String xlID="";
		for (int i=0; i<lstXlmc.size();i++){
			xlmc = (String)lstXlmc.get(i);
			xlID = (String)lstXlID.get(i);
		    out.println("<tree text=\"" + xlmc + "\" action=\"javascript:getXlImg('"+ xlID 
		    		+ "','" + xlmc + "')\" />"); 
		}
        out.println("</tree>"); 
	}
%>