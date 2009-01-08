<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>

<%@page import=" java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<%@ include file="/common/taglibs.jsp"%>
<script>
 var dataList = new Array();

 <% String[] dataList  =(String[])request.getAttribute("dataList");
 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String systime = sdf.format(new Date())	; 
 for(int i=0;i<dataList.length;i++) {%>
 
   dataList[<%=i%>]="<%=dataList[i]%>";   
   
 
 <%}%>
 </script>
<title><fmt:message key="visitDetail.title"/></title>
<content tag="heading"><fmt:message key="visitDetail.heading"/></content>
 
  <head>   
  
 <meta http-equiv="refresh" content="300">
  
  <style   type="text/css">   
  v\:*   {behavior:url(#default#VML);}   
  </style>   
  
    <script>
  function makeLineChart(data,endTime){
  //计算每个栏的宽度
 
	var height=340; //400-40
  	var width = 600; //700-100
  	var startX = 100;
  	var startY = 400;
	var barwidth= Math.floor(width/data.length);//获得该数的整数部分,而不是四舍五入.
	var maxdata = Math.max.apply(this,data);
	//图表的缩放因子，scale*data[i]设置条形高度。
	var scale = height/maxdata;
	var j= data.length;
	var outstr,outstrend;
	outstr='<v:PolyLine filled="false" Points="';
	for(var i=0;i<j;i++){
		var x = barwidth*i + startX;
		var y = startY - data[i]*scale;
	 	outstr = outstr + x + ','+ y + ' ';
	 	var outstrtmp='<v:line style="position:absolute" from="'+x +',400" to="'+x+','+ y +'" title="'
	 	+ data[i] +'">'+ '<v:stroke dashstyle="Dot"/>' + '<v:stroke color="green"/>' + ' </v:line>';
	 	
	 	document.write(outstrtmp); 
	 	
	 	if (i==j-1)
	 		outstrend='<label style="position:absolute;left:'+ (x-startX) +';top:660">'+ endTime +'</>';
	} 
	outstr = outstr +  '" style="position:absolute">';
	outstr = outstr +  '<v:stroke color="red"/>';
	outstr = outstr +  '</v:PloyLine>';
	//alert(outstr);
	document.write(outstr); 
//	document.write(outstrend); 
	return true;
  }
  </script>
  
  
  
  </head>   
  <body>  
  <p align="center">
  服务器时间：<%=systime%>
  </p>
  <p>
<!--纵坐标-->
 <v:line   style="position:absolute"   from="100,400"   to="100,40"   title="访问频率">
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
 
	makeLineChart(dataList,'18:25');
 	
	</script>
 </p>
  </body>   
 
  
 
