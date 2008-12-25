
//----------------------------------------------------------------
var svgDoc,Map,svgMain;
var svgW,svgH,vbMaxW,vbMaxH;
var vbCX,vbCY,vbCW,vbCH,WAmp,HAmp,currentAmp;
var minAmp,maxAmp=100;
var CMD=null;
var isBusy=false;
var panX,panY;
var zoomRect,rulerBck,rulerLine,inforect,infotext,HlSymbol;
var isMessuring=false;
var lonMin,latMin,lonMax,latMax,xTimes,yTimes,Scaler;
var zoomVal=0;
var moveStep=20;

//---- SVG onload 调用----------------------------------------------------------
function Init(evt,lon1,lat1,lon2,lat2,zoom,layers)
{

	//获得第一层的SVG文档对象
	svgDoc = evt.target.ownerDocument;
	svgMain = svgDoc.getDocumentElement();

	//获得第二层的SVG文档元素，即地图数据部分
	Map = svgDoc.getElementById("map");
	//初始化基本参数
	initBasicParam();

	//初始化经纬度参数
	initGrid(lon1,lat1,lon2,lat2,zoom);

	//注册鼠标事件
	addEventHanle();

    //初始化图形部件
	addGraphicUnit();

	//获得标注数据
	initData(evt);	
}

function mapMouseDown(evt)
{
    if(evt.target.tagName!="rect") return;
	switch(CMD)
	{
		case null:
			break;
		case "PAN"://漫游
		    if(minAmp==currentAmp) {alert("请先放大地图...");break;}
		    panX=evt.clientX;
	            panY=evt.clientY;
	            isBusy=true;
		    break;
		case"RECTZOOM"://拉框放大
    		    	if(!checkAmp()) return;
		   	getCurrentVB();
			var x=evt.clientX*WAmp+vbCX;
			var y=evt.clientY*HAmp+vbCY;
			zoomRect.setAttributeNS(null,"x",x);
			zoomRect.setAttributeNS(null,"y",y);
			zoomRect.setAttributeNS(null,"width",0);
			zoomRect.setAttributeNS(null,"height",0);
			isBusy=true;
			zoomRect.setAttributeNS(null,"visibility","visible");
			break;
	}
}
function mapMouseMove(evt)
{
    if(!isBusy) return;
	switch(CMD)
	{
		case null:
			break;
		case "PAN"://漫游
		        getCurrentVB();
			var x=-(evt.clientX-panX)*WAmp+vbCX;
			var y=-(evt.clientY-panY)*HAmp+vbCY;
			x=Math.min(Math.max(x,0),vbMaxW-vbCW);
			y=Math.min(Math.max(y,0),vbMaxH-vbCH);
			panX=evt.clientX; panY=evt.clientY;
			Map.setAttributeNS(null,"viewBox",x+" "+y+" "+vbCW+" "+vbCH);
			parent.MiniRect_Refresh(x/vbMaxW,y/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);
			break;
		case"RECTZOOM"://拉框放大
			var x=parseFloat(zoomRect.getAttributeNS(null,"x"));
			var y=parseFloat(zoomRect.getAttributeNS(null,"y"));
			var w=evt.clientX*WAmp+vbCX-x;
			var h=evt.clientY*HAmp+vbCY-y;
			if(w<0)	w=0;
			if(h<0)	h=0;
			zoomRect.setAttributeNS(null,"width",w);
			zoomRect.setAttributeNS(null,"height",h);
			break;
	}
}
function mapMouseUp(evt)
{
    if(!isBusy) return;
	switch(CMD)
	{
		case null:
			break;
		case "PAN"://漫游
			isBusy=false;
			getCurrentVB();
		        break;
		case"RECTZOOM"://拉框放大
		    	isBusy=false;
			var x=parseFloat(zoomRect.getAttributeNS(null,"x"));
			var y=parseFloat(zoomRect.getAttributeNS(null,"y"));
			var w=evt.clientX*WAmp+vbCX-x;
			var h=evt.clientY*HAmp+vbCY-y;
			var cx=x+w/2;
			var cy=y+h/2;
			if(w > 0 && h > 0)
			{
				currentAmp=Math.min(svgW/w,svgH/h,maxAmp);
			
				w=svgW/currentAmp; h=svgH/currentAmp; x=cx-w/2; y=cy-h/2;
				x=Math.min(Math.max(x,0),vbMaxW-w);
		    		y=Math.min(Math.max(y,0),vbMaxH-h);
				Map.setAttributeNS(null,"viewBox",x+" "+y+" "+w+" "+h);
				zoomRect.setAttributeNS(null,"visibility","hidden");
				endZoom();
				break;
			}
	}
}
/*测距尺功能开始*/
function rulerStart(evt)
{
	switch(evt.detail)
	{
		case 1:  //单击
			getCurrentVB();
			var xx=vbCX+evt.clientX*WAmp;
			var yy=vbCY+evt.clientY*HAmp;
			if(!isMessuring)
			{
				isMessuring=true;
				linepts="M"+xx+" "+yy;
			}
			else
			{
				linepts+=" L"+xx+" "+yy;
			}
			break;
		default://双击
			isMessuring=false;
			rulerBck.setAttributeNS(null,"pointer-events","none");
			rulerLine.setAttributeNS(null,'d','');
			hideinfotip(evt);
			break;
	}
}
function rulerMessuring(evt)
{
	if(isMessuring)
	{
		getCurrentVB();
		var xx=vbCX+evt.clientX*WAmp;
		var yy=vbCY+evt.clientY*HAmp;
		rulerLine.setAttributeNS(null,'d',linepts+" L"+xx+" "+yy);
		showinfotip(evt,parseFloat(parseInt(rulerLine.getTotalLength()*Scaler)/1000)+" KM");
	}
}
/*测距尺功能结束*/

function mapPan()
{
    setCMD("PAN");
}
parent.mapPan = mapPan;

function mapRectZoom()
{
//alert("dddd");
    setCMD("RECTZOOM");
}
parent.mapRectZoom = mapRectZoom;

/*测距尺功能*/
function mapRuler()
{
    setCMD(null);
    rulerBck.setAttributeNS(null,"pointer-events","visiblePainted");
}
parent.mapRuler = mapRuler;

/*图层管理*/
function mapLayerMgt(layername)
{
    var cmdstr= Map.getElementById(layername).getStyle().getPropertyValue("visibility");
    cmdstr=(cmdstr=="visible")?"hidden":"visible";
    Map.getElementById(layername).getStyle().setProperty ('visibility', cmdstr);
}
parent.mapLayerMgt = mapLayerMgt;


function zoomIn()
{
	zoomVal += 20;
	zoomTo(zoomVal);
}
parent.zoomIn = zoomIn;
function zoomOut()
{
	zoomVal -= 20;
	zoomVal = (zoomVal<=0)?0:zoomVal;
	zoomTo(zoomVal);
}
parent.zoomOut = zoomOut;
function searchCity(cityName)
{
	//getURL("map.aspx?type=2&cname="+cityName,searchCallback);
}
parent.searchCity = searchCity;
function setCurrentVB(x,y,w,h)
{
	vbCX=vbMaxW*x;
	vbCY=vbMaxH*y;
	vbCW=vbMaxW*w;
	vbCH=vbMaxH*h;
	Map.setAttributeNS(null,"viewBox",vbCX+" "+vbCY+" "+vbCW+" "+vbCH);
}
parent.setCurrentVB = setCurrentVB;
function resetMap()
{
	HlSymbol.getStyle().setProperty ("visibility", "hidden");
	Map.setAttributeNS(null,"viewBox","0 0 "+vbMaxW+" "+vbMaxH);
	endZoom();
	parent.document.all.MiniRect.style.visibility="hidden";
}
parent.resetMap = resetMap;
//------Private--------------------------------------------------------------------------------------------------------
function checkAmp()
{
	if(currentAmp>=maxAmp)
        {
	    alert("已经放大到最大！");
	    return false;
        }
	return true;
}
function getData()
{
	//getURL("map.aspx?type=1",displayCallback);
}
function displayCallback(data)
{
    	if(data.success)
	{
		var points = data.content.split(';');
	 	for(var i=0; i < points.length-1; i++)
	    	{  
           		var strdata=points[i].split(",");
      			drawPoint(strdata[0], strdata[1], strdata[2], strdata[3]);
    	 	}
		antiZoom();

	}
}
function searchCallback(data)
{
    	if(data.success)
	{
		var lonlat = data.content.split(',');
	 	var x = Math.round(lon2x(lonlat[0]));
		var y = Math.round(lat2y(lonlat[1]));
		if(isNaN(x) || isNaN(y)) {alert("对不起，没有查询到相关结果！");return;}
		HlSymbol.setAttributeNS(null,"cx", x);
		HlSymbol.setAttributeNS(null,"cy", y);
		HlSymbol.getStyle().setProperty ("visibility","visible");
		centerTo(x,y);
	}
}
function drawPoint(name,lat,lon,w)
{
	var x = Math.round(lon2x(lon));
	var y = Math.round(lat2y(lat));

	var city = "<a xlink:href='city.aspx?city="+name+"' target='_blank'  onmousemove='showinfotip(evt,\"明日天气:"+w+"\")' onmouseout='hideinfotip()'>"+
          "<circle cx='"+x+"' cy='"+y+"' fill='black' r='1.5'/>"+
          "<text x='"+(x+4)+"' y='"+y+"' fill='black' font-size='10pt' font-family='Simhei'>"+name+"</text></a>";
	CitysLayer.appendChild(parseXML(city,svgDoc)); 
}
function lon2x(lon)
{
	return (lon-lonMin)*xTimes;
}
function lat2y(lat)
{
	return (latMax-lat)*yTimes;
}
function addEventHanle()
{
	Map.addEventListener("mousedown",mapMouseDown,false);
	Map.addEventListener("mousemove",mapMouseMove,false);
	Map.addEventListener("mouseup",mapMouseUp,false);
}
function addGraphicUnit()
{
    	//随ViewBox一起变化覆盖在地图上供产生鼠标事件的矩形
	var node="<rect width='"+vbMaxW+"' height='"+vbMaxH+"' fill-opacity='0'/>";
	parseSVG(Map,node,null);
	
	//拉框放大所需的矩形框
	node="<rect id='zoomrect' visibility='hidden' pointer-events='none' width='0' height='0' fill='lightgray' fill-opacity='0.7' stroke='none'/>";
	zoomRect=parseSVG(Map,node,null);

	//测距尺所需的矩形事件层及直线	
	node="<rect id='rulerBck' width='"+vbMaxW+"' height='"+vbMaxH+"' fill-opacity='0' pointer-events='none' onclick='rulerStart(evt)' onmousemove='rulerMessuring(evt)'/>";
	rulerBck=parseSVG(Map,node,null);
	node="<path id='rulerLine' fill='none' stroke='#A52A2A' pointer-events='none' stroke-width='3'/>";
	rulerLine=parseSVG(Map,node,null);
	
	//鼠标跟随信息提示框图形
	node="<rect id=\"infotipRect\" x=\"20\" y=\"0\" width=\"100\" height=\"17\" rx=\"3\" ry=\"3\" "+"style=\"visibility:hidden;fill:rgb(165,206,239);stroke-width:1; stroke:rgb(0,0,0);opacity:0.8;pointer-events:none\"/>";
	inforect=parseSVG(svgMain,node,null);

        node="<text id=\"infotip\" style=\"fill:rgb(0,0,0);visibility:hidden;font-weight:normal;"+
             " font-size:12;pointer-events:none\">!</text>";
        infotext=parseSVG(svgMain,node,null);


	//城市名字标注层
	CitysLayer=parseSVG(Map,"<g id='cities' style='visibility:visible'/>");

	//查询地物高亮显示动画
	node="<circle fill='none' stroke='blue' stroke-width='5' stroke-opacity='0.9' visibility='hidden'>"+
	     "<animate attributeName='r' from='1' to='50' dur='1' repeatCount='indefinite'/></circle>"
	HlSymbol = parseSVG(Map,node,null);
}

/*初始化经纬度*/
function initGrid(lon1,lat1,lon2,lat2,zoom)
{
	lonMin=lon1; latMin=lat1; lonMax=lon2; latMax=lat2;
	xTimes=vbMaxW/(lonMax-lonMin); yTimes=vbMaxH/(latMax-latMin);
	Scaler=1000.0/zoom;
}

/*初始化基本变量*/
function initBasicParam()
{
	svgW   = parseInt(Map.getAttributeNS(null,"width"));
	svgH   = parseInt(Map.getAttributeNS(null,"height"));
	getCurrentVB();
	vbMaxW = vbCW; 
	vbMaxH = vbCH;  
	minAmp = currentAmp;
}

/*中心放大*/
function zoomTo(value)
{
	    getCurrentVB();
	    var cx=vbCX+vbCW/2;
	    var cy=vbCY+vbCH/2;
	    currentAmp=value*(maxAmp-minAmp)/100 + minAmp;
	    w=svgW/currentAmp; h=svgH/currentAmp; x=cx-w/2; y=cy-h/2;
	    x=Math.min(Math.max(x,0),vbMaxW-w);
	    y=Math.min(Math.max(y,0),vbMaxH-h);
	    Map.setAttributeNS(null,"viewBox",x+" "+y+" "+w+" "+h);
	    endZoom();
}

/*防止标注随缩放而缩放*/
function antiZoom()
{
	var nodes=CitysLayer.getElementsByTagName("text");
	var scale=1.0/currentAmp;
	var fontsize = 11*scale+"pt";
	var r = Math.round(1.5*scale);
	for(var i=0;i<nodes.length;i++)
	{
		nodes.item(i).setAttributeNS(null,"font-size",fontsize);
	}
	nodes=CitysLayer.getElementsByTagName("circle");
	for(var i=0;i<nodes.length;i++)
	{
		nodes.item(i).setAttributeNS(null,"r",r);
	}
}

/*获得当前ViewBox的参数*/
function getCurrentVB()
{
	var vb = Map.getAttributeNS(null,"viewBox").split(" ");
	vbCX=parseFloat(vb[0]);	vbCY=parseFloat(vb[1]);
	vbCW=parseFloat(vb[2]);	vbCH=parseFloat(vb[3]);
	WAmp= vbCW/svgW;	  HAmp= vbCH/svgH;
	currentAmp = 1/WAmp;
}

function setCMD(cmd)
{

    CMD=cmd;

}

function parseSVG(obj,element,refobj)
{
	return obj.insertBefore(parseXML(element,svgDoc),refobj);
}

function endZoom()
{
    getCurrentVB();
    //antiZoom();
    zoomVal = (currentAmp - minAmp)*100/(maxAmp-minAmp);
    MiniRect_Refresh(vbCX/vbMaxW,vbCY/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);	
}

/*鼠标提示框*/
function showinfotip(evt,info)
{
	var cx = evt.clientX;
	var cy = evt.clientY;

	var rectObj = inforect;
	var textObj = infotext;
	textObj.setAttributeNS(null,"x", cx+5);
	textObj.setAttributeNS(null,"y", cy-8);
	rectObj.setAttributeNS(null,"x", cx);
	rectObj.setAttributeNS(null,"y", cy-20);

	var txtlen=textObj.getComputedTextLength() + 10;
	textObj.getFirstChild().setData(info);

	rectObj.setAttribute("width", txtlen);
	rectObj.getStyle().setProperty ("visibility", "visible");
  	textObj.getStyle().setProperty ("visibility", "visible");
}
function hideinfotip()
{
	inforect.getStyle().setProperty ("visibility", "hidden");
	infotext.getStyle().setProperty ("visibility", "hidden");
}

/*把地物显示在正中间*/
function centerTo(x,y)
{
	if (zoomVal == 0) return;
	var vb=Map.getAttributeNS(null,"viewBox").split(" ");
	var vbx=parseFloat(vb[0]),vby=parseFloat(vb[1]),vbw=parseFloat(vb[2]),vbh=parseFloat(vb[3]);
	var nx=parseInt(Math.min(Math.max(x-vbw/2,0),vbMaxW-vbw));
	var ny=parseInt(Math.min(Math.max(y-vbh/2,0),vbMaxH-vbh));
	Map.setAttributeNS(null,"viewBox",nx+" "+ny+" "+parseInt(vbw)+" "+parseInt(vbh));
	getCurrentVB();
	parent.MiniRect_Refresh(vbCX/vbMaxW,vbCY/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);
}
//********************************************
function goEast()
{
	getCurrentVB();
	x=Math.min(Math.max(vbCX+moveStep,0),vbMaxW-vbCW);
	Map.setAttributeNS(null,"viewBox",x+" "+vbCY+" "+vbCW+" "+vbCH);
	parent.MiniRect_Refresh(x/vbMaxW,vbCY/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);
}
parent.goEast=goEast;

function goWest()
{
	getCurrentVB();
	x=Math.min(Math.max(vbCX-moveStep,0),vbMaxW-vbCW);
	Map.setAttributeNS(null,"viewBox",x+" "+vbCY+" "+vbCW+" "+vbCH);
	parent.MiniRect_Refresh(x/vbMaxW,vbCY/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);
}
parent.goWest=goWest;

function goNorth()
{
	getCurrentVB();
	y=Math.min(Math.max(vbCY-moveStep,0),vbMaxH-vbCH);
	Map.setAttributeNS(null,"viewBox",vbCX+" "+y+" "+vbCW+" "+vbCH);
	parent.MiniRect_Refresh(vbCX/vbMaxW,y/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);
}
parent.goNorth=goNorth;

function goSouth()
{
	getCurrentVB();
	y=Math.min(Math.max(vbCY+moveStep,0),vbMaxH-vbCH);
	Map.setAttributeNS(null,"viewBox",vbCX+" "+y+" "+vbCW+" "+vbCH);
	parent.MiniRect_Refresh(vbCX/vbMaxW,y/vbMaxH,vbCW/vbMaxW,vbCH/vbMaxH);
}
parent.goSouth=goSouth;
//********************************************




//------------------------------------------------------------------------------------------------
