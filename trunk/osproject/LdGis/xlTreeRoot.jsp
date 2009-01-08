<%@ page 
language="java" 
contentType="text/xml; charset=UTF-8" 
pageEncoding="UTF-8" 
%> 
<%@ page import="java.util.Map" %>
<% 
    response.setContentType("text/xml"); 
	//List lstDwmc=(List)request.getAttribute("Listdwmc");
	Map bjxzqURI =(Map) request.getAttribute("bjxzqURI");
	if (bjxzqURI!=null){
        out.println("<tree>"); 
		String dwmc="";
		String dwURI="";
		
		for (int i=0; i<bjxzqURI.size();i++){
			String key =(String) bjxzqURI.entrySet().toArray()[i].toString();
			dwmc = key.substring(0,key.indexOf("="));
			dwURI = key.substring(key.indexOf("=")+1);
		    out.println("<tree text=\"" + dwmc 
		    		+ "\" src=\"xlTree.do?method=getTreeDydj&amp;dwmc=" + dwmc 
		    		+ "\" action=\"javascript:getXzqImg('" + dwURI + "','" 
		    		+ dwmc + "')\" />"); 
		}
        out.println("</tree>"); 
	}
%>