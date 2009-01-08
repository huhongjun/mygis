<%@ page 
language="java" 
contentType="text/xml; charset=UTF-8" 

%> 
<%@ page import="java.util.List" %>
<% 
    response.setContentType("text/xml"); 
	List listDydj=(List)request.getAttribute("listDydj");
	String xzq=(String)request.getAttribute("xzq");
	
	if (listDydj!=null){
        out.println("<tree>"); 
		String dydj="";
		
		for (int i=0; i<listDydj.size();i++){
			dydj=(String)listDydj.get(i);

		    out.println("<tree text=\"" + dydj + "kV\" src=\"xlTree.do?method=getTreeXlmc&amp;xzq=" + xzq + "&amp;dydj=" + dydj + "\" />"); 
		}
        out.println("</tree>"); 

	}
%>