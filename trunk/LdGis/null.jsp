<meta name="decorator" content="nomsg"/>

<%if(request.getParameter("noMenu").equals("true")){%>
<script>
window.close();
</script>
	<%}else{%>
<p style="text-align: center; margin-top: 20px">
    <a href="frameset.jsp" target="_top">
    <img style="border: 0" src="<c:url value="/images/null.jpg"/>"/></a>
</p>
<%}%>