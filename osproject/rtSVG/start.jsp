<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html >
<%@ include file="/common/taglibs.jsp"%>
<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>
<%@ page import="org.appfuse.webapp.form.ZoomForm" %>
<%@ page import="java.util.Map" %>
<%	
	ZoomForm zoomForm = (ZoomForm)request.getAttribute("zoomForm");
%>
<script type="text/javascript" src="scripts/wz_jsgraphics.js"></script> 
<script type="text/javascript" src="scripts/popcalendar.js"></script> 
<script type="text/javascript" src="scripts/popcalendarnew.js"></script> 
<script type="text/javascript" src="scripts/datemake.js"></script>
<head>
<META http-equiv=Content-Type content="text/html; charset="UTF-8">
<META http-equiv=imagetoolbar content=no>
<META content="MSHTML 6.00.2900.2180" name=GENERATOR>
</head>
<script type="text/javascript" src="scripts/globals.js"></script>
<script  type="text/javascript" src="scripts/mapevents.js"></script>
<script  type="text/javascript" src="scripts/map_zoom.js"></script>
<script type="text/javascript" src="xloadtree/xtree.js"></script>
<script type="text/javascript" src="xloadtree/xmlextras.js"></script>
<script type="text/javascript" src="xloadtree/xloadtree.js"></script>

<style type="text/css">
body {
	
	margin: 0px;
}
</style>

<link rel="stylesheet" href="styles/maps.css" type="text/css" />
<link rel="stylesheet" href="styles/fontandcolor.css" type="text/css" />
<link type="text/css" rel="stylesheet" href="xloadtree/xtree.css" />
	
<script>
webFXTreeConfig.rootIcon		= "xloadtree/images/xp/folder.png";
webFXTreeConfig.openRootIcon	= "xloadtree/images/xp/openfolder.png";
webFXTreeConfig.folderIcon		= "xloadtree/images/xp/folder.png";
webFXTreeConfig.openFolderIcon	= "xloadtree/images/xp/openfolder.png";
webFXTreeConfig.fileIcon		= "xloadtree/images/xp/file.png";
webFXTreeConfig.lMinusIcon		= "xloadtree/images/xp/Lminus.png";
webFXTreeConfig.lPlusIcon		= "xloadtree/images/xp/Lplus.png";
webFXTreeConfig.tMinusIcon		= "xloadtree/images/xp/Tminus.png";
webFXTreeConfig.tPlusIcon		= "xloadtree/images/xp/Tplus.png";
webFXTreeConfig.iIcon			= "xloadtree/images/xp/I.png";
webFXTreeConfig.lIcon			= "xloadtree/images/xp/L.png";
webFXTreeConfig.tIcon			= "xloadtree/images/xp/T.png";
webFXTreeConfig.blankIcon	= "xloadtree/images//blank.png";

var tree = new WebFXTree("设备导航");
tree.add(new WebFXLoadTreeItem("北京电力", "xlTree.do?method=getTreeRoot"));
setIsLoadingMapStat();

//setTimeout("setIsLoadingMap()", 5000);
var _panels=['p1','p2','p3','p4','p5','p6','p7'];
var _maxmin=['pm1','pm2','pm3','pm4','pm5','pm6','pm7'];
var _max=true;
var _lp;

function setIsLoadingMapStat(){
		if (timeSetIsLoadingMap!=null)	
			clearInterval(timeSetIsLoadingMap);	//清除原来的监控定时器
		timeSetIsLoadingMap=setInterval("setIsLoadingMap()",3000); 	//设置新的循环定时器

} 

function setIsLoadingMap(){
	drawFlashExplor();
	if (isLoadingMap){
		isLoadingMap = false;
	}
}
function _el(id){
 return document.getElementById(id);
	}
function _panelShow(a,b,c)
{//	map_layer.setDraggable(false); //防止图片移动
	parent.map_tool_op=0;	
	var b=_el(b);
	
	var e=c;
	for (var i=0;i<_panels.length;i++)
	{
		if (_panels[i]!=a)
		{
			_el(_maxmin[i]).innerHTML='□';
			var c=_el(_panels[i]).childNodes;
			for (var k=1;k<c.length;k++)
			{
				c[k].style.display="none";
			}
		}
	}
	if (_lp==a)
	{
		if (_max)
		{
			b.innerHTML='＿';
			d="block";
			_max=false;
		}
		else
		{
			b.innerHTML='□';
			d="none";
			_max=true;
		}
	}
	else
	{
			b.innerHTML='＿';
			d="block";
			_max=false;
	}
	if (!e)
	{
		b.innerHTML='＿';
		d="block";
		_max=false;
	}
	_lp=a;
	_el(a).style.display='block';
	var c=_el(a).childNodes;
	for (var k=1;k<c.length;k++)
	{
		c[k].style.display=d;
	}
}
function disp1(){
	_el('p1').style.display='block';
	if(_max){
		setTimeout("_panelShow('p1','pm1',true)",300)
		_max = false;
	}else{
		_panelShow('p1','pm1',false);
	}
}


function disp2(){
	_el('p2').style.display='block';
	if(_max){
		setTimeout("_panelShow('p2','pm2',true)",200)
		_max = false;
	}else{
		_panelShow('p2','pm2',false)
	}
}

function setJkInterval(jkSelect){
	if (hasJK){
		if (timeJK!=null)	
			clearInterval(timeJK);	//清除原来的监控定时器
		var delaytime = jkSelect.options[jkSelect.selectedIndex].text;
		if (delaytime==""){
		    if (timeJK!=null)	
			  clearInterval(timeJK);	//清除原来的监控定时器			
			//alert("处于实时监控状态，必须选择一个监控时间间隔");
			return;
		}
		delaytime = delaytime * 60000;	//定时器的时间间隔是以毫秒计算的
		//alert(delaytime);
		timeJK=setInterval("doRealControl('" + delaytime + "');",delaytime); 	//设置新的循环定时器
		doRealControl(60000);
	}
} 
function stopJK(){
	if (hasJK){	
		if (timeJK!=null)	
			clearInterval(timeJK);	//清除原来的监控定时器	
	}
}

function disp3(){
	_el('p3').style.display='block';
	if(_max){
		setTimeout("_panelShow('p3','pm3',true)",100)
		_max = false;
	}else{
			_panelShow('p3','pm3',false)
	}
}

function disp4(){
_el('p4').style.display='block';
setTimeout("_panelShow('p4','pm4',true)",100)
}

function disp5(){
_el('p5').style.display='block';
setTimeout("_panelShow('p5','pm5',true)",100)
}
function disp6(){
_el('p6').style.display='block';
setTimeout("_panelShow('p6','pm6',true)",100)
}
function disp7(){
_el('p7').style.display='block';
setTimeout("_panelShow('p7','pm7',true)",100)
}
function setPanel(){
//	alert(_el('chkzdy').checked);
	if (_el('chkzdy').checked){
		_el('wzzdy').style.display='block';
		_el('wzsg').style.display='none';
		//	_el('showonpic').style.display='block';
		

	}else{
		_el('wzsg').style.display='block';
		_el('wzzdy').style.display='none';
	//	_el('showonpic').style.display='none';

	}	
}

var drawMode;
function draw(op){


}


</script>
      
<body ondrag="return false">
<script type="text/javascript" src="scripts/wz_dragdrop.js"></script> 

<html:errors property="error"/>  
	
<embed width="527" height="500" type="image/svg-xml" id="svgmapctrl" pluginspage="http://www.adobe.com/svg/viewer/install/" src="data.svg" wmode="transparent"></embed>

<script type="text/javascript">
//	SET_DHTML(CURSOR_MOVE, "maplayer");   // make image draggable
//	map_layer = dd.elements.maplayer;
//	map_layer.setDraggable(false); 
//	map_hookUpEvents();
	 
//solute the img move
function my_DropFunc()
{
   // var src = "zoom.do?method=onImgMove&x=" + map_layer.x + "&y=" + map_layer.y;
  //  var form = document.getElementById("zoomForm");
  //  doImgMove(src,form);
    //alert("aa");
}
</script>

<div id="panels">

	<div id="p4" class="panel1" >
		<div id="p4t" style="background-color:#123ECC;"class="titlediv" >
			<span style="float:right;">
				<span id="pm4"  onClick="_panelShow('p4','pm4',true);">&#160;&#160;□</span>
				<span onClick="_el('p4').style.display='none'">&#160;×&#160;</span>
			</span>
			<span onClick="_panelShow('p4','pm4',true);">&#160;线路雷击查询</span>
		 </div>
	     <div id="pc3" style="padding:6px;width:100%;height:450px;overflow:auto;overflow-x:hidden;display:none">
		    <form id="1" name="xlljcx" method="post"><table>
	 		    <tr >
					<td colspan="2">请选择线路</td>
				</tr>
				<tr><td colspan="2"><script>document.write(tree);</script></td>
				</tr>
				<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
		   		<tr >
					<td style="display:none">行政区</td><td><input type="text" name="xianmc" style="display:none" size=19></td>
				</tr>
		   		<tr >
					<td>线路名称</td><td><input type="text" name="xlmc" size=19></td>
				</tr>
		   		<tr >
					<td>缓冲区半径</td><td><input type="text" name="hcqbj" value="1000" size=19> 米</td>
				</tr>
				<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
				<tr>
					<td width="70">雷击时间起</td><td>
						<!--<input type="text" name="ljsjq"   onkeydown="JavaScript:stop()" size=19/>-->
			            <input type="text" name="ljsjq"   onclick="JavaScript:setDayHM(this)" size=19/>
		
					<!--	<img src="images/calendar.gif" onclick="javascript:tree.childNodes[0].collapseAll();popUpCalendar(this, _el('ljsjq'))"/>-->
	    			</td>
				</tr>
				<tr>
					<td>雷击时间止</td><td>
						<!--<input type="text" name="ljsjz"   onkeydown="JavaScript:stop()" size=19/>-->
			            <input type="text" name="ljsjz"   onclick="JavaScript:setDayHM(this)" size=19/>						
						<!--<img src="images/calendar.gif" onclick="javascript:tree.childNodes[0].collapseAll();popUpCalendar(this, _el('ljsjz'))"/>-->
	    			</td>
				</tr>
				<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
	 			<tr><td colspan="2">雷击强度</td><tr>	
	 			<tr><td > 最小值</td><td><input type="text" name="minLjqd" size=19>千安</td><tr>
	 			<tr><td > 最大值</td><td><input type="text" name="maxLjqd" size=19>千安</td><tr>
	 			<input  name="xzqURI" type="hidden" />
	 			<input  name="xlmcURI" type="hidden" />
	 			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>

		    </table>
		 	<p align="center"><input type="button" value="图示结果" onclick="javascript:getLdxlData(tree,_el('xlljcx'))">
				<input type="button" value="报表结果" onclick="javascript:getLdDataList('_blank',1,'editThunder.do','find')">
			</p>
		  </form>
	    </div>
	</div>
		
	<div id="p2" class="panel1" style = "display:none" >
		<div id="p2t" style="background-color:#A418CE;" class="titlediv">
			<span style="float:right;">
				<span id="pm2"  onClick="_panelShow('p2','pm2',true)">&#160;&#160;□</span>
				<span onClick="_el('p2').style.display='none'">&#160;×&#160;</span>
			</span>
			<span onClick="_panelShow('p2','pm2',true);">&#160;实时监控</span>
		</div>
		<div id="pc2" style="width:100%;height:80px;overflow:auto;overflow-x:hidden;display:none">
			<table>
				<tr><td>
			请选择实时监控时间间隔：<select name="JKInterval" size="1" onchange="javascript:setJkInterval(this);">
			  <option> </option>
			  <option>1</option>
			  <option>30</option>
			  <option>60</option>
			  <option>120</option>
			  <option>240</option>
			</select> 分钟</td>
				</tr>
			</table>
		    <p align="center"><input type="button" value="停止监控" onclick="javascript:stopJK()">
				<input type="button" value="报表结果" onclick="javascript:getDataList(0)">
			</p>

		</div>
	</div>

	<div id="p3" class="panel1">
		<div id="p3t" style="background-color:#CF1B17; color:#000000;" class="titlediv" >
			<span style="float:right;">
				<span id="pm3"  onClick="_panelShow('p3','pm3',true);">&#160;&#160;□</span>
				<span onClick="_el('p3').style.display='none';_isDragTimer=false;">&#160;×&#160;</span>
			</span>
			<span onClick="_panelShow('p3','pm3',true);"><span>&#160;历史回放</span>
				<span id="all_what" style="color:red"></span>
			</span>
		</div>
		<div id="output" style="width:100%;height:450px;overflow:auto;overflow-x:hidden;display:none">
		<form id="0" method="post"><table>
				<tr >
					<td>回放时间段：</td>
				</tr>
				<tr>
					<td width="80">回放时间起</td><td>
						<input type="text" name="hfsjq" onkeydown="JavaScript:stop()" size=19/>
		
						<img src="images/calendar.gif" onclick="javascript:popUpCalendar(this, _el('hfsjq'))"/>
        			</td>
 				</tr>
 				<tr>
					<td>回放时间止</td><td>
						<input type="text" name="hfsjz" onkeydown="JavaScript:stop()" size=19/>
						<img src="images/calendar.gif" onclick="javascript:popUpCalendar(this, _el('hfsjz'))"/>
        			</td>
 				</tr>
 				<tr>
 			    <td>  </td>
 		<td><select name="hfjg" size="1" style="display:none">
 					  	<option value="day">1 天</option>
			  			<option value="week">1 周</option>
			  			<option value="month">1 月</option>
			  			<option value="season">1 季</option>
			  			<option value="year">1 年</option>
						</select>
 					</td>
 				</tr>
 			</table>
 			<p align="center"><input type="button" onclick="javascript:showHistoryOnMainView()" value="图示结果" >
 				<input type="button" value="报表结果" onclick="javascript:getLdDataList('_blank',0,'editThunder.do','find')">
 			</p>

      <TABLE cellSpacing=1 cellPadding=1 border=0>
        <TBODY>
          <TR>
            <TD 
              id = "scolor0" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; ">  图例颜色      </TD>
             			
          <TR>
            <TD 
              id = "scolor1" size= 12 style="COLOR: #ffffff; BACKGROUND-COLOR: #0000cc; ">      </TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo1" readonly=true  size=18/></TD></TR>
          <TR>
            <TD 
              id = "scolor2" style="COLOR: #ffffff; BACKGROUND-COLOR: #3399cc; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo2" readonly=true  size=18/></TD></TR>
          <TR>
            <TD 
              id = "scolor3" style="COLOR: #ffffff; BACKGROUND-COLOR: #66cc00; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo3" readonly=true  size=18/></TD></TR>
          <TR>
            <TD 
              id = "scolor4" style="COLOR: #ffffff; BACKGROUND-COLOR: #9900cc; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo4" readonly=true  size=18/></TD></TR>
          <TR>
            <TD 
              id = "scolor5" style="COLOR: #ffffff; BACKGROUND-COLOR: #990000; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo5" readonly=true  size=18/></TD></TR>  
          <TR>
            <TD 
              id = "scolor6" style="COLOR: #ffffff; BACKGROUND-COLOR: #999966; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo6" readonly=true  size=18/></TD></TR> 
          <TR>
            <TD 
              id = "scolor7" style="COLOR: #ffffff; BACKGROUND-COLOR: #cc66ff; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo7" readonly=true  size=18/></TD></TR>
          <TR>
            <TD 
              id = "scolor8" style="COLOR: #ffffff; BACKGROUND-COLOR: #cc9933; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo8" readonly=true  size=18/></TD></TR> 
          <TR>
            <TD 
              id = "scolor9" style="COLOR: #ffffff; BACKGROUND-COLOR: #ccff00; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo9" readonly=true  size=18/></TD></TR>  
          <TR>
            <TD 
              id = "scolor10" style="COLOR: #ffffff; BACKGROUND-COLOR: #ff6600; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo10" readonly=true  size=18/></TD></TR>
          <TR>
            <TD 
              id = "scolor11" style="COLOR: #ffffff; BACKGROUND-COLOR: #ffccff; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo11" readonly=true  size=18/></TD></TR> 
          <TR>
            <TD 
              id = "scolor12" style="COLOR: #ffffff; BACKGROUND-COLOR: #ffff00; TEXT-ALIGN: center"></TD>
            <TD  style="COLOR: #ffffff; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
            	<input type="text" name="scmemo12" readonly=true  size=18/></TD></TR>   

             <TR><td width="80">当前雷击：</td></TR>
            <TR>	  	
              	<td width="120">雷击时间</td>
                <td> 
            	     <input type="text" name="currentdotflashtime" readonly=true  size=18/>
                </td>
             </TR>
             <TR>
             <td width="120">雷击强度(千安)</td>
                <td> 
            	     <input type="text" name="currentdotintension" readonly=true  size=18/>
            </TR>   
              </TBODY></TABLE> 	

			</form>
		</div>
	</div>

	<div id="p1" class="panel1" style = "display:none" >
		<div id="p1t" style="background-color:#A418CE;" class="titlediv" >
			<span style="float:right;">
				<span id="pm1" onClick="_panelShow('p1','pm1',true);">&#160;&#160;□</span>
				<span onClick="_el('p1').style.display='none'">&#160;×&#160;</span>
			</span>
			<span  onClick="_panelShow('p1','pm1',true);">&#160;自定义查询
				<label style="width:80px" id="pageTitleText"></label>
			</span>
		</div>
		<div id="pc1" style="width:100%;height:330px;overflow:auto;overflow-x:hidden;display:none">
		<form id="2" name ="zdycx" method="post"><table>
			<tr><td colspan="2">雷击时间</td></tr>
			<tr>
				<td width="80">起始时间</td><td>
					<!--<input type="text" name="ljqssj"  onkeydown="JavaScript:stop()" size=19/>-->
					<input type="text" name="ljqssj"   onclick="JavaScript:setDayHM(this)" size=19/>		
					<!--<img src="images/calendar.gif" onclick="javascript:popUpCalendar(this, _el('ljqssj'))"/>-->
    			</td>
			</tr>
			<tr>
				<td>终止时间</td><td>
					<!--<input type="text" name="ljzzsj"  onkeydown="JavaScript:stop()" size=19/>-->
					<input type="text" name="ljzzsj"   onclick="JavaScript:setDayHM(this)" size=19/>		
					<!--<img src="images/calendar.gif" onclick="javascript:popUpCalendar(this, _el('ljzzsj'))"/>-->
    			</td>
			</tr>
			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>		
			<tr><td colspan="2">雷击强度</td></tr>
			<tr><td >最小强度</td><td><input type="text" name="minLdqd">千安</td></tr>
			<tr><td >最大强度</td><td><input type="text" name="maxLdqd">千安</td></tr>
			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
			<tr><td colspan="2"><input type="checkbox" onclick="javascript:setPanel()" checked=true name="chkzdy">位置自定义</td></tr>
			</table><table id="wzsg" style="display:none">
		<!--	<tr><td colspan="2">纬度</td></tr>
			<tr><td >最小值</td><td><input type="text" name="minLatitude"></td></tr>
			<tr><td >最大值</td><td><input type="text" name="maxLatitude"></td></tr>
			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
			<tr><td colspan="2">经度</td></tr>
			<tr><td >最小值</td><td><input type="text" name="minLongitude"></td></tr>
			<tr><td >最大值</td><td><input type="text" name="maxLongitude"></td></tr>
			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>  -->
			<tr><td >区县</td><td><select name="xianmc"  ><%
			Map bjxzqURI =(Map) request.getAttribute("bjxzqURI");
			out.println("<option />");
			if (bjxzqURI!=null){
		        out.println("<tree>"); 
				String dwmc="";
				String dwURI="";
				
				for (int i=0; i<bjxzqURI.size();i++){
					String key =(String) bjxzqURI.entrySet().toArray()[i].toString();
					dwmc = key.substring(0,key.indexOf("="));
					dwURI = key.substring(key.indexOf("=")+1);
				    out.println("<option value=\"" + dwmc +"\" >" + dwmc + "</option>"); 
				}
			}		
			%>
			</select></td></tr>
			</table><table id="wzzdy" style="display:block">
			<tr ><td >缓冲区半径</td><td><input type="text" name="hcqbj" value="1000"> 米</td></tr>
			<tr><td colspan="2" align="center">
				<input type="radio" name="radio"  onclick="javascript:draw(6)">点
	  			<input type="radio" name="radio"  onclick="javascript:draw(4)">线
			</td></tr>
			</table>
		</table>
		<p align="center"><input name="showonpic" type="button" value="图示结果" onclick="javascript:playZdyLdDataList(2)">
				<input type="button" value="报表结果"  onclick="javascript:getLdDataList('_blank',2,'editThunder.do','find')">
		</p>
		</form>
		</div>
	</div>

	<div id="p5" class="panel1" style = "display:none" >
		<div id="p5t" style="background-color:#42AECC;"class="titlediv" >
			<span style="float:right;">
				<span id="pm5"  onClick="_panelShow('p5','pm5',true);">&#160;&#160;□</span>
				<span onClick="_el('p5').style.display='none'">&#160;×&#160;</span>
			</span>
			<span onClick="_panelShow('p5','pm5',true);">&#160;显示设置</span>
		 </div>
	     <div id="pc5" style="padding:6px;width:100%;height:150px;overflow:auto;overflow-x:hidden;display:none">
		    <form id="1" name="xlxzsz" method="post"><table>
		   		<tr >
					<td ><input type=checkbox name="xl500"></td><td style="BACKGROUND-COLOR: #00ff00; TEXT-ALIGN: center">500kV</td>
					<td ><input type=checkbox name="xl220"></td><td style="BACKGROUND-COLOR: #00ffff; TEXT-ALIGN: center">220kV</td>
					<td ><input type=checkbox name="xl110"></td><td style="BACKGROUND-COLOR: #c80000; TEXT-ALIGN: center">110kV</td>
					<td ><input type=checkbox name="xl35"></td><td style="BACKGROUND-COLOR: #004bff; TEXT-ALIGN: center">35kV</td>
				</tr>
		   		<tr >
					<td ><input type=checkbox name="xl10"></td><td style="BACKGROUND-COLOR: #ff7f00; TEXT-ALIGN: center">10kV</td>
				</tr>
				<tr><TD colspan="8"><input type=checkbox name="yxt">影像图</TD></tr>
	 			<tr><td colspan="8"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
		    </table>
		 	<p align="center"><input type="button" value="确定" onclick="javascript:setXlDisp(_el('xlxzsz'))">
				<input type="button" value="重设" onclick="javascript:_el('xlxzsz').reset()">
			</p>
		  </form>
	    </div>
	</div>
		
	<div id="p6" class="panel1" style = "display:none" >
		<div id="p6t" style="background-color:#A418CE;" class="titlediv" >
			<span style="float:right;">
				<span id="pm6" onClick="_panelShow('p6','pm6',true);">&#160;&#160;□</span>
				<span onClick="_el('p6').style.display='none'">&#160;×&#160;</span>
			</span>
			<span  onClick="_panelShow('p6','pm6',true);">&#160;雷电密度查询
				<label style="width:80px" id="pageTitleText"></label>
			</span>
		</div>
		<div id="pc6" style="width:100%;height:330px;overflow:auto;overflow-x:hidden;display:none">
		<form id="3" name ="zdycx" method="post"><table>
			<tr><td colspan="2">雷击时间</td></tr>
			<tr>
				<td width="80">起始时间</td><td>
					<!--<input type="text" name="ljqssj"  onkeydown="JavaScript:stop()" size=19/>-->
					<input type="text" name="mdqssj"   onclick="JavaScript:setDayHM(this)" size=19/>		
					<!--<img src="images/calendar.gif" onclick="javascript:popUpCalendar(this, _el('ljqssj'))"/>-->
    			</td>
			</tr>
			<tr>
				<td>终止时间</td><td>
					<!--<input type="text" name="ljzzsj"  onkeydown="JavaScript:stop()" size=19/>-->
					<input type="text" name="mdzzsj"   onclick="JavaScript:setDayHM(this)" size=19/>		
					<!--<img src="images/calendar.gif" onclick="javascript:popUpCalendar(this, _el('ljzzsj'))"/>-->
    			</td>
			</tr>
			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>		
			<tr><td colspan="2">雷击强度</td></tr>
			<tr><td >最小强度</td><td><input type="text" name="mdminLdqd" size=15>千安</td></tr>
			<tr><td >最大强度</td><td><input type="text" name="mdmaxLdqd" size=15>千安</td></tr>
			<tr><td colspan="2"><hr noshade style="border:1 dotted red" width="100%" size="1"></td></tr>
		</table>
		<p align="center"><input name="showonpicmd" type="button" value="图示结果" onclick="javascript:playLdMdData()">
		</p>

      <TABLE cellSpacing=1 cellPadding=1 border=0>
        <TBODY>
          <TR>

          <TR>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; ">  图例颜色  </TD>
             			
          <TR>
            <TD 
              id = "scolor20" style="COLOR: #ffffff; BACKGROUND-COLOR: #66ffff; TEXT-ALIGN: center"></TD>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; ">  0- 5个/4平方公里</TD>
	  </TR>
          <TR>
            <TD 
              id = "scolor30" style="COLOR: #ffffff; BACKGROUND-COLOR: #66ccff; TEXT-ALIGN: center"></TD>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; ">  6-10个/4平方公里</TD>
	  </TR>
          <TR>
            <TD 
              id = "scolor40" style="COLOR: #ffffff; BACKGROUND-COLOR: #6699ff; TEXT-ALIGN: center"></TD>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; "> 11-15个/4平方公里</TD>
	  </TR>
          <TR>
            <TD 
              id = "scolor50" style="COLOR: #ffffff; BACKGROUND-COLOR: #6666ff; TEXT-ALIGN: center"></TD>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; "> 16-20个/4平方公里</TD>
	  </TR>
          <TR>
            <TD 
              id = "scolor60" style="COLOR: #ffffff; BACKGROUND-COLOR: #6633ff; TEXT-ALIGN: center"></TD>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; "> 21-25个/4平方公里</TD>
	  </TR>

          <TR>
            <TD 
              id = "scolor60" style="COLOR: #ffffff; BACKGROUND-COLOR: #6600ff; TEXT-ALIGN: center"></TD>
            <TD 
              id = "scolor00" size= 12 style="COLOR: #000000; BACKGROUND-COLOR: #ffffff; ">26个以上/4平方公里</TD>
	  </TR>          
            
              </TBODY></TABLE> 	
		</form>
		</div>
	</div>
	<div id="p7" class="panel1"  >
		<div id="p7t" style="background-color:#A418CE;" class="titlediv">
			<span style="float:right;">
				<span id="pm7"  onClick="_panelShow('p7','pm7',true)">&#160;&#160;□</span>
				<span onClick="_el('p7').style.display='none'">&#160;×&#160;</span>
			</span>
			<span onClick="_panelShow('p7','pm7',true);">&#160;查询结果</span>
		</div>
		<div id="pc7" style="width:100%;height:440px;overflow:auto;overflow-x:hidden;display:none">
<table width="289" border="0" bordercolor="#33FF66">
  <tr bgcolor="#66FFFF">
    <td><div align="center">序号</div></td>
    <td><div align="center">雷击时间</div></td>
    <td><div align="center">强度</div></td>
    <td><div align="center">定位</div></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code1" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime1" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension1" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(1)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code2" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime2" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension2" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(2)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code3" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime3" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension3" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(3)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code4" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime4" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension4" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(4)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code5" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime5" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension5" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(5)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code6" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime6" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension6" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(6)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code7" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime7" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension7" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(7)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code8" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime8" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension8" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(8)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code9" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime9" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension9" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(9)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code10" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime10" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension10" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(10)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code11" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime11" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension11" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(11)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code12" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime12" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension12" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(12)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code13" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime13" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension13" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(13)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code14" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime14" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension14" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(14)">定位</a></td>
  </tr>
  <tr bgcolor="#FFFF99">
    <td width="26" height="23" bgcolor="#FFFF99"><input name="code15" type="text" style="border:0;" value=""   size=3 readonly=true/></td>
    <td width="116"><input name="flashtime15" type="text" style="border:0;" value=""   size=21 readonly=true/></td>
    <td width="38"><input name="intension15" type="text" style="border:0;" value=""   size=5 readonly=true/></td>
    <td width="50"> <a href="javascript:FindCurrentFlash(15)">定位</a></td>
  </tr>
</table>
		    <p align="center">	<a href="javascript:prevpage()">上一页</a> <a href="javascript:nextpage()">下一页</a>
  <input name="totalpages" type="text" style="border:0;" value="共页"   size=10 readonly=true/>
 第 
 <input name="currentpage" type="text" style="border:0;" value="1"   size=2 onkeypress="javascript:if(event.keyCode==13){   event.returnValue   =   false;GotoPage();}"/> 
页</p>

		</div>
	</div>	
</div>

<form action="zoom.do?method=zoom" method="post" styleId="zoomForm" id="zoomForm"> 
			<input value="<%=zoomForm.getCenterx()%>" name="centerx" type="hidden" />
			<input value="<%=zoomForm.getCentery()%>" name="centery" type="hidden" />
			<input value="<%=zoomForm.getZoomScale()%>" name="zoomScale" type="hidden" />
			<input value="<%=zoomForm.getPictureWidth()%>" name="pictureWidth" type="hidden" />
			<input value="<%=zoomForm.getPictureHeight()%>" name="pictureHeight" type="hidden" />
			<input value="<%=zoomForm.getPictureTopX()%>" name="pictureTopX" type="hidden" />
			<input value="<%=zoomForm.getPictureTopY()%>" name="pictureTopY" type="hidden" />
			<input value="<%=zoomForm.getPictureBottomX()%>" name="pictureBottomX" type="hidden" />
			<input value="<%=zoomForm.getPictureBottomY()%>" name="pictureBottomY" type="hidden" />
			<input value="<%=zoomForm.getPictureUrl()%>" name="pictureUrl" type="hidden" />
		
</form>


</body>

</html>

