<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@page import=" java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<%@ include file="/common/taglibs.jsp"%>
  <%SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String systime = sdf.format(new Date())	; %>
	<title><fmt:message key="visitDetail.title"/></title>
<content tag="heading"><fmt:message key="visitDetail.heading"/></content>
 
  <head>   
 
 <meta http-equiv="refresh" content="10">
  
  <style   type="text/css">   
  v\:*   {behavior:url(#default#VML);}   
  </style>   
   
  
  
  
  </head>   
  <body>  
  <p align="center">
  服务器时间：<%=systime%>
  数据库无法访问！
  </p>
  <p>
  
<!--纵坐标-->
 <v:line   style="position:absolute"   from="100,400"   to="100,40"   >
<v:stroke EndArrow="Classic"/>
<v:stroke color="blue"/>
<v:stroke StrokeWeight="4"/>
</v:line> 
 

<!--横坐标-->
 <v:line   style="position:absolute"   from="100,400"   to="720,400" title ="时间轴"  >
<v:stroke EndArrow="Classic"/>
<v:stroke color="blue"/>
</v:line>


	<script>
 
	//makeLineChart(dataList,'18:25');
 	
	</script>
 </p>
<div align="center">  <embed   src="images/ringin.wav"   autostart="true" loop="true"></embed>
 </div>
  </body>   
 
  
 
