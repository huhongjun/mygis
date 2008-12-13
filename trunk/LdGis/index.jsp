<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" errorPage="/error.jsp" pageEncoding="GBK" contentType="text/html;charset=gbk" %>
	
<%
	String height = (String) request.getSession().getAttribute("height");
	String width = (String) request.getSession().getAttribute("width");

    if (height==null || height.equals(""))
    	height = "768";
    if (width==null || width.equals(""))
    	width = "1024";  
%>
<html>
<script type="text/javascript" src="scripts/wz_jsgraphics.js"></script> 
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=23)">
	
<head>
<title>雷电GIS</title>
<META http-equiv=Content-Type content="text/html; charset=gb2312">
<META http-equiv=imagetoolbar content=no>
<META content="MSHTML 6.00.2900.2180" name=GENERATOR>

<script type="text/javascript" src="scripts/xmenu/xmenu.js"></script>
<script type="text/javascript" src="scripts/xmenu/cb2.js"></script>
<script type="text/javascript"  src="scripts/xmenu/ieemu.js"></script>

<script type="text/javascript" src="scripts/globals.js"></script>


<link href="scripts/xmenu/xmenu.windows.css" type="text/css" rel="stylesheet">
<link href="scripts/xmenu/xmenuwebfxlayout.local.css" type="text/css" rel="stylesheet">
<link href="scripts/xmenu/cb2.css" type="text/css" rel="stylesheet">

<style type="text/css">
* {
	box-sizing: border-box;
	-moz-box-sizing: border-box;
}

html {
	border:		0;

}

body {
	border: 0;
	margin: 0px;

}

.menuBottom {
	position:	absolute;
	top:		17px;
	height:		1px;
	background:	buttonshadow;
	width:		100%;
	overflow:	hidden;
}

pre {
	overflow:	auto;
	margin:		0;
	width:		auto;

}

table {
	border: 2px groove ButtonFace;;
	
}

</style>
<script type="text/javascript">
//<!--
	var hcfRoot = this.window;
	//this.window.name="hcfRoot";

WebFXMenu.prototype.borderWidth		= 4;
WebFXMenu.prototype.paddingWidth	= 2;
WebFXMenu.prototype.borderTop		= 2;
WebFXMenu.prototype.paddingTop		= 1;
webfxMenuDefaultImagePath ="scripts/xmenu/";

var myMenuJK = new WebFXMenu;			//监控菜单
myMenuJK.add(new WebFXMenuItem("1 实时监控 ", "javascript:displayRealJK()", "返回实时监控页面"));
myMenuJK.add(new WebFXMenuItem("2 历史回放 ", "javascript:displayLSHF()", "历史回放"));


var myMenuCX = new WebFXMenu;			//查询菜单
//myMenu.add(new WebFXMenuSeparator());		//添加分隔符
//myMenuCX.add(new WebFXMenuItem("1 历史回放 ", "javascript:alert(\"历史回放\")", "历史数据查询"));
myMenuCX.add(new WebFXMenuItem("1 自定义查询 ", "javascript:displayXlTree()", "雷电组合查询"));
//myMenuCX.add(new WebFXMenuItem("3 线路雷击查询 ", "javascript:alert(\"线路查询\")", "线路查询"));

myMenuCX.add(new WebFXMenuItem("2 雷电密度查询 ", "javascript:displayMD()", "雷电密度查询"));
myMenuCX.add(new WebFXMenuSeparator());		//添加分隔符

myMenuCX.add(new WebFXMenuItem("3 查询查询结果 ", "javascript:displayResult()", "查询查询结果"));
//myMenuCX.add(new WebFXMenuItem("2 落雷密度统计 ", "javascript:alert(\"落雷密度统计\")", "落雷密度统计"));
//myMenuCX.add(new WebFXMenuItem("3 落雷情况统计 ", "javascript:alert(\"落雷情况统计\")", "落雷情况统计"));


var myMenuLDSG = new WebFXMenu;		//雷击事故菜单
myMenuLDSG.add(new WebFXMenuItem("1 显示设置", "javascript:displayXLXSSZ()", "线路雷击查询"));
myMenuLDSG.add(new WebFXMenuItem("2 线路雷击查询", "javascript:displayXLLJCX()", "线路雷击查询"));
/*myMenuLDSG.add(new WebFXMenuItem("1 登  记 ", "javascript:alert(\"雷击事故登记\")", "雷击事故登记"));
myMenuLDSG.add(new WebFXMenuItem("2 查  询 ", "javascript:alert(\"雷击事故查询\")", "雷击事故查询"));
myMenuLDSG.add(new WebFXMenuItem("3 修  改 ", "javascript:alert(\"雷击事故修改\")", "雷击事故修改"));
*/
/*
var myMenuTool = new WebFXMenu;		//工具栏菜单displayXlTree
myMenuTool.add(new WebFXMenuItem("1 线路树 ", "javascript:displayXlTree()", "线路树导航"));
myMenuTool.add(new WebFXMenuItem("2 实时监控时间设置 ", "javascript:displayRealJK()", "实时监控时间设置"));
*/

var myMenuHelp = new WebFXMenu;		//help菜单
//myMenuHelp.add(new WebFXMenuItem("1 About", "javascript:void window.open(\"About.html\")", "关 于"));
//myMenuHelp.add(new WebFXMenuItem("2 Help ", "javascript:void window.open(\"help.html\")", "帮 助"));


/*子菜单的添加法
var mySubMenu = new WebFXMenu;
mySubMenu.add(new WebFXMenuItem("Menu Item 3", "http://www.domain.com", "Tool tip to show"));
myMenu.add(new WebFXMenuItem("Menu Item 4 with sub menu", null, "Tool tip to show", mySubMenu));
*/

//各菜单的位置
myMenuJK.left  = 0;
myMenuJK.top   = 17;
myMenuJK.width = 105;

myMenuCX.left  = 56;
myMenuCX.top   = 17;
myMenuCX.width = 105;

myMenuLDSG.left  = 128;
myMenuLDSG.top   = 17;
myMenuLDSG.width = 105;

/*
myMenuTool.left  = 202;
myMenuTool.top   = 17;
myMenuTool.width = 135;
*/

myMenuHelp.left  = 182; //256;
myMenuHelp.top   = 17;
myMenuHelp.width = 135;//105;

var myBar = new WebFXMenuBar;
myBar.add(new WebFXMenuButton("监   控", null, "数据监控",myMenuJK));
myBar.add(new WebFXMenuButton("查询统计", null, "数据查询统计", myMenuCX));
myBar.add(new WebFXMenuButton("线   路", null, "线路雷击查询", myMenuLDSG));
//myBar.add(new WebFXMenuButton("工   具", null, "工具栏", myMenuTool));
//myBar.add(new WebFXMenuButton("帮 助", null, "帮 助", myMenuHelp));

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
//-->
</script>
</head>

<body >

<script>
document.write(myBar);
</script>
<div class="menuBottom" ></div>
  <table style="background: ButtonFace;" cellspacing="1">
  <tr>
	<td class="coolButton" tabIndex="1"> <img src="images/home.gif" align="absmiddle"> 全图</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/zoomout.gif" align="absmiddle"> 放大</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/zoomin.gif" align="absmiddle"> 缩小</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/move.gif" align="absmiddle"> 移动</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/ployline.gif" align="absmiddle"> 折线</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/ceju.gif" align="absmiddle"> 测距</td>
 	<td class="coolButton" tabIndex="1"> <img src="images/maperr.gif" align="absmiddle"> 画点</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/cleanLd.gif" align="absmiddle"> 清除</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/clean.gif" align="absmiddle"> 清除缓冲区</td>
 	<td class="coolButton" tabIndex="1"> <img src="images/select.gif" align="absmiddle"> 雷电选择</td>
 	<td width=100% align="right"></td>
  </tr>
  </table>
  <script>

var cells4 = document.getElementsByTagName("TABLE")[0].rows[0].cells;

function doRadio() {
	// loop over all the buttons in the radio group
	for (var i = 0; i < cells4.length; i++){
		cells4[i].setValue(this == cells4[i]);	// if the clicked button then set value to true
		if (this == cells4[i])
			map_tool_op = i;
	}
	setMapStyle(map_tool_op);
}


for (var i = 0; i < cells4.length; i++) {
	createButton(cells4[i]);
	//cells4[i].setAlwaysUp(true);
	cells4[i].setToggle(true);
	if (i == 0)
		cells4[i].setValue(true);
	cells4[i].onaction = doRadio;
}

</script>
	<table width="100%"  height="100%"  border="0" cellpadding="0" cellspacing="0">
  		<tr>
 			<td id="content_panles" align="center"  valign="top">
			<iframe name="hcf_content"   framespacing="0" frameborder="0" border="0" scrolling="no" width=<%=width %> height=<%=height%>
				 src="zoom.do?method=getInitImg&height=<%=height%>&width=<%=width%>"></iframe>	
			</td>
  		</tr>
	</table>

</body>
</html>
