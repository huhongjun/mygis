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
<title>�׵�GIS</title>
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

var myMenuJK = new WebFXMenu;			//��ز˵�
myMenuJK.add(new WebFXMenuItem("1 ʵʱ��� ", "javascript:displayRealJK()", "����ʵʱ���ҳ��"));
myMenuJK.add(new WebFXMenuItem("2 ��ʷ�ط� ", "javascript:displayLSHF()", "��ʷ�ط�"));


var myMenuCX = new WebFXMenu;			//��ѯ�˵�
//myMenu.add(new WebFXMenuSeparator());		//��ӷָ���
//myMenuCX.add(new WebFXMenuItem("1 ��ʷ�ط� ", "javascript:alert(\"��ʷ�ط�\")", "��ʷ���ݲ�ѯ"));
myMenuCX.add(new WebFXMenuItem("1 �Զ����ѯ ", "javascript:displayXlTree()", "�׵���ϲ�ѯ"));
//myMenuCX.add(new WebFXMenuItem("3 ��·�׻���ѯ ", "javascript:alert(\"��·��ѯ\")", "��·��ѯ"));

myMenuCX.add(new WebFXMenuItem("2 �׵��ܶȲ�ѯ ", "javascript:displayMD()", "�׵��ܶȲ�ѯ"));
myMenuCX.add(new WebFXMenuSeparator());		//��ӷָ���

myMenuCX.add(new WebFXMenuItem("3 ��ѯ��ѯ��� ", "javascript:displayResult()", "��ѯ��ѯ���"));
//myMenuCX.add(new WebFXMenuItem("2 �����ܶ�ͳ�� ", "javascript:alert(\"�����ܶ�ͳ��\")", "�����ܶ�ͳ��"));
//myMenuCX.add(new WebFXMenuItem("3 �������ͳ�� ", "javascript:alert(\"�������ͳ��\")", "�������ͳ��"));


var myMenuLDSG = new WebFXMenu;		//�׻��¹ʲ˵�
myMenuLDSG.add(new WebFXMenuItem("1 ��ʾ����", "javascript:displayXLXSSZ()", "��·�׻���ѯ"));
myMenuLDSG.add(new WebFXMenuItem("2 ��·�׻���ѯ", "javascript:displayXLLJCX()", "��·�׻���ѯ"));
/*myMenuLDSG.add(new WebFXMenuItem("1 ��  �� ", "javascript:alert(\"�׻��¹ʵǼ�\")", "�׻��¹ʵǼ�"));
myMenuLDSG.add(new WebFXMenuItem("2 ��  ѯ ", "javascript:alert(\"�׻��¹ʲ�ѯ\")", "�׻��¹ʲ�ѯ"));
myMenuLDSG.add(new WebFXMenuItem("3 ��  �� ", "javascript:alert(\"�׻��¹��޸�\")", "�׻��¹��޸�"));
*/
/*
var myMenuTool = new WebFXMenu;		//�������˵�displayXlTree
myMenuTool.add(new WebFXMenuItem("1 ��·�� ", "javascript:displayXlTree()", "��·������"));
myMenuTool.add(new WebFXMenuItem("2 ʵʱ���ʱ������ ", "javascript:displayRealJK()", "ʵʱ���ʱ������"));
*/

var myMenuHelp = new WebFXMenu;		//help�˵�
//myMenuHelp.add(new WebFXMenuItem("1 About", "javascript:void window.open(\"About.html\")", "�� ��"));
//myMenuHelp.add(new WebFXMenuItem("2 Help ", "javascript:void window.open(\"help.html\")", "�� ��"));


/*�Ӳ˵�����ӷ�
var mySubMenu = new WebFXMenu;
mySubMenu.add(new WebFXMenuItem("Menu Item 3", "http://www.domain.com", "Tool tip to show"));
myMenu.add(new WebFXMenuItem("Menu Item 4 with sub menu", null, "Tool tip to show", mySubMenu));
*/

//���˵���λ��
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
myBar.add(new WebFXMenuButton("��   ��", null, "���ݼ��",myMenuJK));
myBar.add(new WebFXMenuButton("��ѯͳ��", null, "���ݲ�ѯͳ��", myMenuCX));
myBar.add(new WebFXMenuButton("��   ·", null, "��·�׻���ѯ", myMenuLDSG));
//myBar.add(new WebFXMenuButton("��   ��", null, "������", myMenuTool));
//myBar.add(new WebFXMenuButton("�� ��", null, "�� ��", myMenuHelp));

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
	<td class="coolButton" tabIndex="1"> <img src="images/home.gif" align="absmiddle"> ȫͼ</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/zoomout.gif" align="absmiddle"> �Ŵ�</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/zoomin.gif" align="absmiddle"> ��С</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/move.gif" align="absmiddle"> �ƶ�</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/ployline.gif" align="absmiddle"> ����</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/ceju.gif" align="absmiddle"> ���</td>
 	<td class="coolButton" tabIndex="1"> <img src="images/maperr.gif" align="absmiddle"> ����</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/cleanLd.gif" align="absmiddle"> ���</td>
  	<td class="coolButton" tabIndex="1"> <img src="images/clean.gif" align="absmiddle"> ���������</td>
 	<td class="coolButton" tabIndex="1"> <img src="images/select.gif" align="absmiddle"> �׵�ѡ��</td>
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
