/*
Scripts for SVG only webmapping application navigation tools
Copyright (C) <2004 - 2007>  <Andreas Neumann>
Version 1.3.1, 2007-05-07
neumann@karto.baug.ethz.ch
http://www.carto.net/
http://www.carto.net/neumann/

Credits: numerous people on svgdevelopers@yahoogroups.com, Bruce Rindahl

This ECMA script library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library (http://www.carto.net/papers/svg/navigationTools/lesser_gpl.txt); if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

----

version history:
1.0 initial version
	=》初始版本
1.01 (2005-02-15) added cleanUp() method to map and dragObj objects, some fixes in the documentation
	=》为map和可拖拽对象增加cleanup()方法
1.02 (2005-02-20) fixed problems with double clicks, the second click of a double click is now ignored, using the evt.detail property
	=》解决双击问题，双击的第二次点击现在是忽略的，使用evt.detail属性
1.03 (2005-02-22) introduced timestamp and nrLayerToLoad array for dynamic loading (getUrl)
	=》为动态加载(getUrl)引入时间戳和 nrLayerToLoad数组
1.04 (2005-09-15) introduced a few changes with coordinate calculation to support MozillaSVG, introduced epsg and unitsFactor property based on a suggestion by Bruce Rindahl
	=》为坐标计算做了一些修改以支持MozillaSVG，引入epsg和unitsFactor属性
1.1 (2005-10-05) 
	introduced button object (see button.js file), 
	=》引入按钮对象（见button.js文件），
	introduced zoom and pan "modes" for repeated actions in the same mode, 
	=》引入zoom和pan模式
	introduced history of map extents with the ability to go back and forth in the list of previous map extents, 
	=》增加地图浏览历史，可以前进或后退到之前的浏览历史
	some internal changes in the code (e.g. less global variables), 
	=》一些内部的代码修改（如，更少的全局变量）
	added experimental support for the batik SVG 1.2 "static" attribute to improve performance while panning the map, 
	=》添加实验性的支持SVG 1.2的"静态"属性以求改进漫游性能，
	added cursors to give better status feedback
	=》添加光标，提供更好的状态反馈
1.2 (2006-05-08) 
	dragObj is now called directly from the map object (please remove it from the initialization function of previous versions), new constructor parameters, added method .pointTestWithin(xcoor,ycoor), added method .highlightPosition(xcoor,ycoor,hlOverview) and method .hideHighlightCross(); 
	drag rectangle and drag symbol are now automatically added (please remove them from previous projects if you defined them in your svg file), event listeners are now automatically added to the reference map (please remove previous event handler attributes from your project, otherwise functions will fire twice); 
	the previous primitive checkbox object is now replaced with the more sophisticated checkbox object available from the carto.net SVG GUI section
1.2.1 (2006-05-13): 
	fixed a bug in the documentation, 
	fixed a severe bug in the helper_functions.js file, functions dd2dms() and dms2dd(); 
	thanks Bruce Rindahl for bug-reporting and providing fixes
1.2.2 (2006-06-08): 
	fixed a bug in the .stopNavModes() function that would prevent entering info mode after pressing the info button
1.2.3 (2006-06-19): 
	changed the behaviour of the highlightCross, the highlightCross is now automatically hidden after each zoom and pan; 
	highlightCross in main map now correctly disappears if coordinate outside of main map; 
	fixed a bug when repeatedly starting the same mode
1.2.4 (2006-08-10): 
	added methods .bboxTestWithin(bbox) and .bboxTestOverlaps(bbox); 
	updated the slider object in index.svg
1.3 (2007-04-19): 
	added evt.preventDefault() in dragObj.prototype.handleEvent to prevent that a potential raster image is dragged in the reference map (applies to Apple Safari); 
	manual zoom rectangle can now be drawn in all directions; 
	the behavior of small manual zoom rectangles was slightly changed
1.3.1 (2007-05-07): corrected a bug where coordinate display still happened when the mouse cursor was above the reference map, even when the map object instance had the showCoords property set to false

original document site: http://www.carto.net/papers/svg/navigationTools/
Please contact the author in case you want to use code or ideas commercially.
If you use this code, please include this copyright header, the included full
LGPL 2.1 text and read the terms provided in the LGPL 2.1 license
(http://www.gnu.org/copyleft/lesser.txt)

-------------------------------

Please report bugs and send improvements to neumann@karto.baug.ethz.ch
If you use these scripts, please link to the original (http://www.carto.net/papers/svg/navigationTools/)
somewhere in the source-code-comment or the "about" of your project and give credits, thanks!

*/

//constructor: holds data on map and initializes various references
//保存地图数据和初始化几个引用
function map(mapName,maxWidth,minWidth,zoomFact,nrDecimals,
	epsg,units,unitsFactor,showCoords,
	coordXId,coordYId,
	dynamicLayers,digiLayers,activeDigiLayer,zoomRectAttribs,highlightAttribs,
	dragRectAttribs,refmapName,dragSymbol,symbolThreshold) 
	{
	//id of svg element containing the map geometry=》大地图的SVG元素ID
	this.mapName = mapName; 
	this.mapSVG = document.getElementById(this.mapName); //reference to nested SVG element holding the map-graphics
	//holds a reference to the reference map=》鹰眼小地图
	this.refmapSVG = document.getElementById(refmapName); 
	//group within mainmap - to be transformed when panning manually=》大地图中的分组，手工漫游时需要转换
	this.mainMapGroup = document.getElementById(this.mapName+"Group"); 
	//an associative array holding ids of values that are loaded from the web server dynamically (.getUrl())
	//=》保存动态获取的id值
	this.dynamicLayers = dynamicLayers; 
	this.nrLayerToLoad = 0; //statusVariable to indicate how many layers are still to load
	this.maxWidth = maxWidth; //max map width=》最大地图宽度
	this.minWidth = minWidth; //min map width, after zooming in
	this.zoomFact = zoomFact; //ratio to zoom in or out in relation to previous viewBox=》缩放因子
	this.digiLayers = digiLayers; //references to digiLayers (for digitizing tools)=》？
	this.activeDigiLayer = activeDigiLayer; //active Digi Layer, key is final group id where geometry should be copied to after digitizing
	this.zoomRectAttribs = zoomRectAttribs; //array of literals with presentation attributes defining the look of the zoom rectangle
	this.dragRectAttribs = dragRectAttribs; //array of literals with presentation attributes of the dragable rectangle in the reference map
	this.highlightAttribs = highlightAttribs; //高亮十字的属性数组=》array of literals with presentation attributes used for the highlight crosshair
	this.dragSymbol = dragSymbol; //this holds the id of a symbol that is used to display the current map extent if it is very small
	this.symbolThreshold = symbolThreshold; //this value defines a threshold after which the drag symbol should be displayed in addition to the drag rectangle
	this.pixXOffset = parseFloat(this.mapSVG.getAttributeNS(null,"x")); //offset from left margin of outer viewBox
	this.pixYOffset = parseFloat(this.mapSVG.getAttributeNS(null,"y")); //offset from top margin of outer viewBox
	var viewBox = this.mapSVG.getAttributeNS(null,"viewBox");
	var viewBoxArray = viewBox.split(" ");
	this.curxOrig = parseFloat(viewBoxArray[0]); //holds the current xOrig
	this.curyOrig = parseFloat(viewBoxArray[1]); //holds the current yOrig
	this.curWidth = parseFloat(viewBoxArray[2]); //holds the current map width
	this.curHeight = parseFloat(viewBoxArray[3]); //holds the current map height
	this.minX = this.curxOrig;
	this.minY = this.curyOrig;
	this.maxX = this.curxOrig + this.curWidth;
	this.maxY = this.curyOrig + this.curHeight;
	this.pixWidth = parseFloat(this.mapSVG.getAttributeNS(null,"width")); //holds width of the map in pixel coordinates
	this.pixHeight = parseFloat(this.mapSVG.getAttributeNS(null,"height")); //holds height of the map in pixel coordinates
	this.pixSize = this.curWidth / this.pixWidth; //size of a screen pixel in map units
	this.zoomVal = this.maxWidth / this.curWidth * 100; //zoomVal in relation to initial zoom
	this.nrDecimals = nrDecimals; //nr of decimal places to be displayed for show coordinates or accuracy when working with digitizing
	this.epsg = epsg; //epsg projection code - can be used for building URL strings for loading data from a WMS or spatial database, if you don't need it just input any number
	
	//to indicate status in navigation, default is "info", no navigation mode active
	//标明导航状态，默认"info",即导航模式未激活
	this.navStatus = "info"; 
	this.units = units; //地图尺寸单位，如'm'=》holds a string with map units, e.g. "m", alternatively String.fromCharCode(176) for degrees
	this.unitsFactor = unitsFactor; //单位转换因子=》a factor for unit conversion. Can be used f.e. to output feet coordinates when data is meter, If you don't need a conversion, just use a factor of 1
	this.showCoords = showCoords;	//鼠标在地图上移动时是否显示坐标值
	this.dragger = null; //鹰眼小地图中对拖拽框的引用=》later a reference to the drag rectangle in the reference map
	
	//initialize array of timestamp/layertoLoad values
	this.nrLayerToLoad = new Array();
	this.timestamp = null; //holds the timestamp after a zoom or pan occured
	
	//initialize coordinate display if showCoords == true
	//初始化坐标显示，如果showCoords == true；通过coordXId获得与显示X坐标SVG元素的引用
	if (this.showCoords == true) {
		//add event listener for coordinate display
		//
		this.mapSVG.addEventListener("mousemove",this,false);
		if (typeof(coordXId) == "string") {
			this.coordXText = document.getElementById(coordXId).firstChild;
		}
		else {
			alert("Error: coordXId needs to be an id of type string");
		}
		if (typeof(coordYId) == "string") {
			this.coordYText = document.getElementById(coordYId).firstChild;
		}
		else {
			alert("Error: coordYId needs to be an id of type string");
		}
	}
	//a new array containing map extents
	//存放地图浏览历史
	this.mapExtents = new Array();
	this.mapExtents.push({xmin:this.curxOrig,ymin:((this.curyOrig + this.curHeight) * -1),xmax:(this.curxOrig + this.curWidth),ymax:(this.curyOrig * -1)});
	this.curMapExtentIndex = 0;
	//create background-element to receive events for showing coordinates
	//this rect is also used for manual zooming and panning
	// 创建背景元素用于捕捉事件显示坐标
	this.backgroundRect = document.createElementNS(svgNS,"rect");
	this.backgroundRect.setAttributeNS(null,"x",this.curxOrig);
	this.backgroundRect.setAttributeNS(null,"y",this.curyOrig);
	this.backgroundRect.setAttributeNS(null,"width",this.curWidth);
	this.backgroundRect.setAttributeNS(null,"height",this.curHeight);
	this.backgroundRect.setAttributeNS(null,"fill","none");		//填充
	this.backgroundRect.setAttributeNS(null,"stroke","none");	//笔触
	this.backgroundRect.setAttributeNS(null,"pointer-events","fill");
	this.backgroundRect.setAttributeNS(null,"id","mapBackgroundRect");
	this.backgroundRect.addEventListener("mousedown",this,false);
	this.backgroundRect.addEventListener("mousemove",this,false);
	this.backgroundRect.addEventListener("mouseup",this,false);
	this.backgroundRect.addEventListener("mouseout",this,false);
	this.backgroundRect.addEventListener("click",this,false);
	this.mainMapGroup.insertBefore(this.backgroundRect,this.mainMapGroup.firstChild);
	
	//initialize highlight cross in main map
	//=》初始化高亮十字
	this.highlightCross = document.createElementNS(svgNS,"g");
	this.highlightCross.setAttributeNS(null,"visibility","hidden");
	this.highlightVisible = false; //indicates whether hightlightcrosshair is visible
	for (var attrib in this.highlightAttribs) {
		var attribValue = this.highlightAttribs[attrib];
		if (attrib == "stroke-width") {
			attribValue = this.curWidth * parseFloat(this.highlightAttribs["stroke-width"]);
		}
		if (attrib == "stroke-dasharray") {
			var dasharray = this.highlightAttribs["stroke-dasharray"].split(",");
			var attribValue = "";
			for (var i=0;i<dasharray.length;i++) {
				attribValue += (this.curWidth * parseFloat(dasharray[i]))+",";
			}
			attribValue = attribValue.slice(0,attribValue.length - 1);
		}
		this.highlightCross.setAttributeNS(null,attrib,attribValue);
	}
	this.highlightCross.setAttributeNS(null,"pointer-events","none");
	this.highlightCrossHoriz = document.createElementNS(svgNS,"line");
	this.highlightCrossHoriz.setAttributeNS(null,"x1",this.curxOrig);
	this.highlightCrossHoriz.setAttributeNS(null,"x2",this.curxOrig + this.curWidth);
	this.highlightCrossHoriz.setAttributeNS(null,"y1",this.curyOrig + this.curHeight * 0.5);
	this.highlightCrossHoriz.setAttributeNS(null,"y2",this.curyOrig + this.curHeight * 0.5);
	this.highlightCross.appendChild(this.highlightCrossHoriz);
	this.highlightCrossVert = document.createElementNS(svgNS,"line");
	this.highlightCrossVert.setAttributeNS(null,"x1",this.curxOrig + this.curWidth * 0.5);
	this.highlightCrossVert.setAttributeNS(null,"x2",this.curxOrig + this.curWidth * 0.5);
	this.highlightCrossVert.setAttributeNS(null,"y1",this.curyOrig);
	this.highlightCrossVert.setAttributeNS(null,"y2",this.curyOrig + this.curHeight);
	this.highlightCross.appendChild(this.highlightCrossVert);
	this.mainMapGroup.appendChild(this.highlightCross);
	//initialize highlight cross in reference map
	this.rMhighlightCross = document.createElementNS(svgNS,"g");
	this.rMhighlightCross.setAttributeNS(null,"visibility","hidden");
	for (var attrib in this.highlightAttribs) {
		var attribValue = this.highlightAttribs[attrib];
		if (attrib == "stroke-width") {
			var overview2MainMapFactor = this.pixWidth / parseFloat(this.refmapSVG.getAttributeNS(null,"width"));
			attribValue = this.curWidth * parseFloat(this.highlightAttribs["stroke-width"]) * overview2MainMapFactor;
		}
		if (attrib == "stroke-dasharray") {
			var dasharray = this.highlightAttribs["stroke-dasharray"].split(",");
			var attribValue = "";
			for (var i=0;i<dasharray.length;i++) {
				attribValue += (this.curWidth * parseFloat(dasharray[i]))+",";
			}
			attribValue = attribValue.slice(0,attribValue.length - 1);
		}
		this.rMhighlightCross.setAttributeNS(null,attrib,attribValue);
	}
	this.rMhighlightCross.setAttributeNS(null,"pointer-events","none");
	this.rMhighlightCrossHoriz = document.createElementNS(svgNS,"line");
	this.rMhighlightCrossHoriz.setAttributeNS(null,"x1",this.curxOrig);
	this.rMhighlightCrossHoriz.setAttributeNS(null,"x2",this.curxOrig + this.curWidth);
	this.rMhighlightCrossHoriz.setAttributeNS(null,"y1",this.curyOrig + this.curHeight * 0.5);
	this.rMhighlightCrossHoriz.setAttributeNS(null,"y2",this.curyOrig + this.curHeight * 0.5);
	this.rMhighlightCross.appendChild(this.rMhighlightCrossHoriz);
	this.rMhighlightCrossVert = document.createElementNS(svgNS,"line");
	this.rMhighlightCrossVert.setAttributeNS(null,"x1",this.curxOrig + this.curWidth * 0.5);
	this.rMhighlightCrossVert.setAttributeNS(null,"x2",this.curxOrig + this.curWidth * 0.5);
	this.rMhighlightCrossVert.setAttributeNS(null,"y1",this.curyOrig);
	this.rMhighlightCrossVert.setAttributeNS(null,"y2",this.curyOrig + this.curHeight);
	this.rMhighlightCross.appendChild(this.rMhighlightCrossVert);
	this.refmapSVG.appendChild(this.rMhighlightCross);
	//ensure that the reference map has the same viewBox than the main map
	this.refmapSVG.setAttributeNS(null,"viewBox",viewBox);
	this.refmapSVG.setAttributeNS(null,"cursor","crosshair");
	//add invisible rect to reference map to ensure that we get events in the nested svg of the reference map
	var invisRect = document.createElementNS(svgNS,"rect");
	invisRect.setAttributeNS(null,"fill","none");
	invisRect.setAttributeNS(null,"pointer-events","fill");
	invisRect.setAttributeNS(null,"x",viewBoxArray[0]);
	invisRect.setAttributeNS(null,"y",viewBoxArray[1]);
	invisRect.setAttributeNS(null,"width",viewBoxArray[2]);
	invisRect.setAttributeNS(null,"height",viewBoxArray[3]);
	this.refmapSVG.insertBefore(invisRect,this.refmapSVG.firstChild);
	//determine if viewer is capable of getScreenCTM
	if (document.documentElement.getScreenCTM) {
		this.getScreenCTM = true;
	}
	else {
		this.getScreenCTM = false;
	}
	//initialize refMapDragger object
	//=》鹰眼小地图中的可拖拽对象
	myMapApp.refMapDragger = new dragObj(this.refmapSVG,this.dragSymbol,this.symbolThreshold,this.dragRectAttribs,this.showCoords,coordXId,coordYId,this);
}

//resets viewBox of main map after zooming and panning
//每次缩放或漫游后的viewbox处理
map.prototype.newViewBox = function(history) {
	this.curxOrig = parseFloat(this.dragger.getAttributeNS(null,"x"));
	this.curyOrig = parseFloat(this.dragger.getAttributeNS(null,"y"));
	this.curWidth = parseFloat(this.dragger.getAttributeNS(null,"width"));
	this.curHeight = parseFloat(this.dragger.getAttributeNS(null,"height"));
	var myViewBoxString = this.curxOrig + " " + this.curyOrig + " " + this.curWidth + " " + this.curHeight;
	this.pixSize = this.curWidth / this.pixWidth;
	this.zoomVal = this.maxWidth / this.curWidth * 100;
	this.mapSVG.setAttributeNS(null,"viewBox",myViewBoxString);
	myMapApp.zoomSlider.setValue(this.curWidth);
	//reset line width of hightlightCross
	if (this.highlightAttribs["stroke-width"]) {
		this.highlightCross.setAttributeNS(null,"stroke-width",this.curWidth * parseFloat(this.highlightAttribs["stroke-width"]));
	}
	if (this.highlightAttribs["stroke-dasharray"]) {
		var dasharray = this.highlightAttribs["stroke-dasharray"].split(",");
		var attribValue = "";
		for (var i=0;i<dasharray.length;i++) {
			attribValue += (this.curWidth * parseFloat(dasharray[i]))+",";
		}
		attribValue = attribValue.slice(0,attribValue.length - 1);
		this.highlightCross.setAttributeNS(null,"stroke-dasharray",attribValue);	
	}
	//remove highlight cross after zooming/panning
	//=》缩放或漫游操作后删除高亮十字
	if (this.highlightVisible) {
		this.hideHighlightCross();
	}
	loadProjectSpecific();//重绘地图
	if (history) {
		//浏览历史压入堆栈，初始索引为0
	    this.mapExtents.push({xmin:this.curxOrig,ymin:((this.curyOrig + this.curHeight) * -1),xmax:(this.curxOrig + this.curWidth),ymax:(this.curyOrig * -1)});
               this.curMapExtentIndex = (this.mapExtents.length - 1);
	}
	this.checkButtons();
}

//地图浏览历史回退
map.prototype.backwardExtent = function() {
    if (this.curMapExtentIndex != 0) {
        this.curMapExtentIndex--;
        this.setNewViewBox(this.mapExtents[this.curMapExtentIndex].xmin,this.mapExtents[this.curMapExtentIndex].ymin,this.mapExtents[this.curMapExtentIndex].xmax,this.mapExtents[this.curMapExtentIndex].ymax,false);
    }
}

//地图浏览历史前放
map.prototype.forwardExtent = function() {
    if (this.mapExtents.length != (this.curMapExtentIndex + 1)) {
        this.curMapExtentIndex++;
        this.setNewViewBox(this.mapExtents[this.curMapExtentIndex].xmin,this.mapExtents[this.curMapExtentIndex].ymin,this.mapExtents[this.curMapExtentIndex].xmax,this.mapExtents[this.curMapExtentIndex].ymax,false);
    }
}

//逻辑约束：按钮是否可操作检测
map.prototype.checkButtons = function() {
           //check extent history
		   //栈底判断：curMapExtentIndex == 0 表示最后一个
           if (this.curMapExtentIndex == 0) {
                if (myMapApp.buttons["backwardExtent"].activated) {
                  myMapApp.buttons["backwardExtent"].deactivate();
                }
           }
           else {
                if (!myMapApp.buttons["backwardExtent"].activated) {
                  myMapApp.buttons["backwardExtent"].activate();
                }
           }
		   //栈顶判断：
           if (this.mapExtents.length == (this.curMapExtentIndex + 1)) {
                if (myMapApp.buttons["forwardExtent"].activated) {
                   myMapApp.buttons["forwardExtent"].deactivate();
                }
           }
           else {
                if (!myMapApp.buttons["forwardExtent"].activated) {
                  myMapApp.buttons["forwardExtent"].activate();
                }
           }

           //maximum map width reached, cannot zoom out further
		   //已经最大，不能再放大
           if (this.curWidth >= this.maxWidth) {
               if (myMapApp.buttons["zoomOut"].activated) {
                   myMapApp.buttons["zoomOut"].deactivate();
               }
               if (myMapApp.buttons["zoomFull"].activated) {
                   myMapApp.buttons["zoomFull"].deactivate();
               }
               if (myMapApp.buttons["panManual"].activated) {
                   myMapApp.buttons["panManual"].deactivate();
               }
               if (myMapApp.buttons["recenterMap"].activated) {
                   myMapApp.buttons["recenterMap"].deactivate();
               }
               if (!myMapApp.buttons["zoomIn"].activated) {
                   myMapApp.buttons["zoomIn"].activate();
               }
               if (!myMapApp.buttons["zoomManual"].activated) {
                   myMapApp.buttons["zoomManual"].activate();
               }
           }
           //minimum map width reached, cannot zoom in further
           else if (this.curWidth <= this.minWidth) {
               if (myMapApp.buttons["zoomIn"].activated) {
                   myMapApp.buttons["zoomIn"].deactivate();
               }
               if (myMapApp.buttons["zoomManual"].activated) {
                   myMapApp.buttons["zoomManual"].deactivate();
               }
               if (!myMapApp.buttons["zoomOut"].activated) {
                   myMapApp.buttons["zoomOut"].activate();
               }
               if (!myMapApp.buttons["zoomFull"].activated) {
                   myMapApp.buttons["zoomFull"].activate();
               }
               if (!myMapApp.buttons["panManual"].activated) {
                   myMapApp.buttons["panManual"].activate();
               }
               if (!myMapApp.buttons["recenterMap"].activated) {
                   myMapApp.buttons["recenterMap"].activate();
               }
           }
           //in between
           else {
               if (!myMapApp.buttons["zoomIn"].activated) {
                   myMapApp.buttons["zoomIn"].activate();
               }
               if (!myMapApp.buttons["zoomManual"].activated) {
                   myMapApp.buttons["zoomManual"].activate();
               }
               if (!myMapApp.buttons["zoomOut"].activated) {
                   myMapApp.buttons["zoomOut"].activate();
               }
               if (!myMapApp.buttons["zoomFull"].activated) {
                   myMapApp.buttons["zoomFull"].activate();
               }
               if (!myMapApp.buttons["panManual"].activated) {
                   myMapApp.buttons["panManual"].activate();
               }
               if (!myMapApp.buttons["recenterMap"].activated) {
                   myMapApp.buttons["recenterMap"].activate();
               }
           }
}

map.prototype.setNewViewBox = function(xmin,ymin,xmax,ymax,history) {
	//check if within constraints
	if (xmin < myMapApp.refMapDragger.constrXmin) {
		xmin = myMapApp.refMapDragger.constrXmin;
	}
	if (xmax > myMapApp.refMapDragger.constrXmax) {
		xmax = myMapApp.refMapDragger.constrXmin;
	}
	if (ymin < (myMapApp.refMapDragger.constrYmax * -1)) {
		ymin = myMapApp.refMapDragger.constrYmax * -1;
	}
	if (ymax > (myMapApp.refMapDragger.constrYmin * -1)) {
		ymax = myMapApp.refMapDragger.constrYmin * -1;
	}

	var origWidth = xmax - xmin;
	var origHeight = ymax - ymin;
	var myRatio = this.curWidth/this.curHeight;

	if (origWidth / origHeight > myRatio) { //case rect is more wide than ratio
		var newWidth = origWidth;
		var newHeight = origWidth * 1 / myRatio;
		ymin = (ymax + (newHeight - origHeight) / 2) * -1;
	}
	else {
		var newHeight = origHeight;
		var newWidth = newHeight * myRatio;
		xmin = xmin - (newWidth - origWidth) / 2;
		ymin = ymax * -1;
	}
	//check if within constraints
	if (xmin < myMapApp.refMapDragger.constrXmin) {
		xmin = myMapApp.refMapDragger.constrXmin;
	}
	if (ymin < myMapApp.refMapDragger.constrYmin) {
		ymin = myMapApp.refMapDragger.constrYmin;
	}
	if ((xmin + newWidth) > myMapApp.refMapDragger.constrXmax) {
		xmin = myMapApp.refMapDragger.constrXmax - newWidth;
	}
	if ((ymin + newHeight) > myMapApp.refMapDragger.constrYmax) {
		ymin = myMapApp.refMapDragger.constrYmax - newHeight;
	}
	myMapApp.refMapDragger.newView(xmin,ymin,newWidth,newHeight);
	this.newViewBox(history);
}

//handles events associated with navigation
//导航操作的处理
map.prototype.handleEvent = function(evt) {
	var callerId = evt.currentTarget.getAttributeNS(null,"id");
	//矩形选框放大
	if (callerId.match(/\bzoomBgRectManual/)) {
		this.zoomManDragRect(evt);
	}
	//
	if (callerId.match(/\bzoomBgRectRecenter/)) {
		this.recenterFinally(evt);
	}
	if (callerId.match(/\bbgPanManual/)) {
		this.panManualFinally(evt);
	}
	//鼠标移动时若不是手动漫游，则显示坐标
	if (callerId == "mainMap" && evt.type == "mousemove") {
		if (this.navStatus != "panmanualActive") {
		    this.showCoordinates(evt);
		}
	}
}

//calcs coordinates; relies on myMapApp to handle different window sizes and resizing of windows
//坐标计算；
map.prototype.calcCoord = function(evt) {
	//with getScreenCTM the values are already in the inner coordinate system
	if (!this.getScreenCTM) {
		var coords = myMapApp.calcCoord(evt,this.mapSVG);
		coords.x = this.curxOrig + (coords.x - this.pixXOffset) * this.pixSize;
		coords.y = (this.curyOrig + (coords.y - this.pixYOffset) * this.pixSize);
	}
	else {
		var coords = myMapApp.calcCoord(evt,this.mainMapGroup);
	}
	return coords;
}

//displays x and y coordinates in two separate text elements
//在两个文本SVG元素中显示xy坐标值
map.prototype.showCoordinates = function(evt) {
	var mapCoords = this.calcCoord(evt);
	this.coordXText.nodeValue = "X: " + formatNumberString((mapCoords.x * this.unitsFactor).toFixed(this.nrDecimals),",") + this.units;
	this.coordYText.nodeValue = "Y: " + formatNumberString((mapCoords.y * this.unitsFactor * -1).toFixed(this.nrDecimals),",") + this.units;
}

//checks for and removes temporary rectangle objects
//
map.prototype.stopNavModes = function(curId) {
	if (this.navStatus != "info") {
		if (this.navStatus == "zoomManual") {
			myMapApp.buttons["zoomManual"].setSwitchValue(false,false);
		}
		if (this.navStatus == "panmanual" || this.navStatus == "panmanualActive") {
			myMapApp.buttons["panManual"].setSwitchValue(false,false);
		}
		if (this.navStatus == "recenter") {
			myMapApp.buttons["recenterMap"].setSwitchValue(false,false);
		}
		if (curId != "zoomManual" && curId != "panManual" && curId != "recenterMap") {
			this.backgroundRect.setAttributeNS(null,"id","mapBackgroundRect");
			this.navStatus = "info";
			this.mapSVG.setAttributeNS(null,"cursor","crosshair");
			statusChange("模式: 信息模式");
			this.mainMapGroup.insertBefore(this.backgroundRect,this.mainMapGroup.firstChild);
			if (!myMapApp.buttons["infoButton"].getSwitchValue()) {
				myMapApp.buttons["infoButton"].setSwitchValue(true,false);
			}
		}
	}
}

//starts manual zooming mode
//开始手动缩放模式
map.prototype.zoomManual = function(evt) {
	if (Math.round(this.curWidth) > this.minWidth && evt.detail == 1) {
		this.navStatus = "zoomManual";
		this.backgroundRect.setAttributeNS(null,"id","zoomBgRectManual");
		this.mainMapGroup.appendChild(this.backgroundRect);
		this.mapSVG.setAttributeNS(null,"cursor","se-resize");
		statusChange("点击和拖动以显示新的地图.");
	}
}

//manages manual zooming by drawing a rectangle
//画矩形实现手动：事件=》按下、移动和释放
map.prototype.zoomManDragRect = function(evt) {
	var mapCoords = this.calcCoord(evt);
	var myX = mapCoords.x;
	var myY = mapCoords.y;
	var myYXFact = this.curHeight / this.curWidth;	//地图高宽比例因子，由此通过宽度计算高度，绘制等比例的选择框矩形
	var minTempWidth = this.curWidth*0.005; //this is to prevent a zero width rectangle=》临时使用的一个小宽度

	//鼠标按下时在点击处
	if (evt.type == "mousedown") {
		this.manZoomActive = 1;//状态开关变量
		this.zoomRect = document.createElementNS(svgNS,"rect");
		this.zoomRect.setAttributeNS(null,"id","zoomRect");
		for (var attrib in this.zoomRectAttribs) {
			var attribValue = this.zoomRectAttribs[attrib];
			if (attrib == "stroke-width") {
				attribValue = this.curWidth * parseFloat(this.zoomRectAttribs["stroke-width"]);
			}
			if (attrib == "stroke-dasharray") {
				var dasharray = this.zoomRectAttribs["stroke-dasharray"].split(",");
				var attribValue = "";
				for (var i=0;i<dasharray.length;i++) {
					attribValue += (this.curWidth * parseFloat(dasharray[i]))+",";
				}
				attribValue = attribValue.slice(0,attribValue.length - 1);
			}
			this.zoomRect.setAttributeNS(null,attrib,attribValue);
		}
		this.zoomRect.setAttributeNS(null,"pointer-events","none");
		this.zoomRect.setAttributeNS(null,"x",myX);
		this.zoomRect.setAttributeNS(null,"y",myY);
		this.zoomRect.setAttributeNS(null,"width",minTempWidth);
		this.zoomRect.setAttributeNS(null,"height",minTempWidth * myYXFact);
		this.mainMapGroup.appendChild(this.zoomRect);
		this.zoomRectOrigX = myX;
		this.zoomRectOrigY = myY;
	}
	
	//鼠标移动时，若在手动缩放状态，跟随鼠标位置绘制以之前的点击位置为起点的矩形
	if (evt.type == "mousemove" && this.manZoomActive == 1) {
		var myZoomWidth = myX - this.zoomRectOrigX;
		var myZoomHeight = myY - this.zoomRectOrigY;
		if (myZoomWidth == 0) {
			myZoomWidth = minTempWidth;
		}
		if (myZoomWidth < 0) {
			this.zoomRect.setAttributeNS(null,"x",myX);
		}
		else {
			this.zoomRect.setAttributeNS(null,"x",this.zoomRectOrigX);
		}
		if (myZoomHeight < 0) {
			this.zoomRect.setAttributeNS(null,"y",this.zoomRectOrigY - Math.abs(myZoomWidth) * myYXFact);		
		}
		else {
			this.zoomRect.setAttributeNS(null,"y",this.zoomRectOrigY);
		
		}
		this.zoomRect.setAttributeNS(null,"width",Math.abs(myZoomWidth));
		this.zoomRect.setAttributeNS(null,"height",Math.abs(myZoomWidth) * myYXFact);
	}
	//鼠标释放或移出，若在手动缩放状态先关闭。
	if ((evt.type == "mouseup" || evt.type == "mouseout") && this.manZoomActive == 1) {
		this.manZoomActive = 0;
		var zoomRectWidth = parseFloat(this.zoomRect.getAttributeNS(null,"width"));
		var zoomRectHeight = parseFloat(this.zoomRect.getAttributeNS(null,"height"));
		var zoomRectX = parseFloat(this.zoomRect.getAttributeNS(null,"x"));
		var zoomRectY = parseFloat(this.zoomRect.getAttributeNS(null,"y"));
		//this is to prevent people accidentally zooming with just a single click
		if (zoomRectWidth > this.curWidth * 0.02) {
			//check if rectangle too small, smaller than minWidth
			if (zoomRectWidth < this.minWidth) {
				var diffX = (this.minWidth - zoomRectWidth) * 0.5;
				var diffY = (this.minWidth  * myYXFact - zoomRectHeight) * 0.5;
				zoomRectWidth = this.minWidth;
				zoomRectHeight = this.minWidth  * myYXFact;
				zoomRectX -= diffX;
				zoomRectY -= diffY;
			}
			//设置小地图的拖拽框，并显示新的位置
			myMapApp.refMapDragger.newView(zoomRectX,zoomRectY,zoomRectWidth,zoomRectHeight);
			this.newViewBox(true);
		}
		this.mainMapGroup.removeChild(this.zoomRect);//缩放结束，删除选框
		statusChange("模式: 手动缩放完成");
	}
}

//initializes recentering mode？
//点击按钮后进入中心设置模式
map.prototype.recenter = function(evt) {
	if (evt.detail == 1) {
		this.navStatus = "recenter";
		this.backgroundRect.setAttributeNS(null,"id","zoomBgRectRecenter");//？
		this.mainMapGroup.appendChild(this.backgroundRect);
		this.mapSVG.setAttributeNS(null,"cursor","pointer");
		statusChange("点击地图以设置新的中心点。");
	}
}

//finishes recentering after mouse-click
//鼠标点击后完成地图中心设置
map.prototype.recenterFinally = function(evt) {
	if (evt.type == "click") {
		var mapCoords = this.calcCoord(evt);
		var myX = mapCoords.x;
		var myY = mapCoords.y;
		var myNewX = myX - this.curWidth / 2;
		var myNewY = myY - this.curHeight / 2;

		//check if within constraints
		if (myNewX < myMapApp.refMapDragger.constrXmin) {
			myNewX = myMapApp.refMapDragger.constrXmin;
		}
		if (myNewY < myMapApp.refMapDragger.constrYmin) {
			myNewY = myMapApp.refMapDragger.constrYmin;
		}
		if ((myNewX + this.curWidth) > myMapApp.refMapDragger.constrXmax) {
			myNewX = myMapApp.refMapDragger.constrXmax - this.curWidth;
		}
		if ((myNewY + this.curHeight) > myMapApp.refMapDragger.constrYmax) {
			myNewY = myMapApp.refMapDragger.constrYmax - this.curHeight;
		}
		myMapApp.refMapDragger.newView(myNewX,myNewY,this.curWidth,this.curHeight);
		this.newViewBox(true);
		statusChange("模式: 地图中心设定");
	}
}

//initializes manual panning
//点击按钮后进入手动漫游模式
map.prototype.panManual = function(evt) {
	if (evt.detail == 1) {
		this.navStatus = "panmanual";
		this.backgroundRect.setAttributeNS(null,"id","bgPanManual");//？
		this.mainMapGroup.appendChild(this.backgroundRect);
		this.mapSVG.setAttributeNS(null,"cursor","move");
		statusChange("按下鼠标并拖拽，移动地图");
	}
}

//manages and finishes manual panning
//鼠标按下并拖拽，执行手动漫游操作
map.prototype.panManualFinally = function(evt) {
	if (evt.type == "mousedown") {
		this.navStatus = "panmanualActive";
		this.panCoords = this.calcCoord(evt);
		this.panCoorX = this.panCoords.x;
		this.panCoorY = this.panCoords.y;
		this.diffX = 0;
		this.diffY = 0;
		this.mainMapGroup.setAttributeNS(batikNS,"static","true");
	}
	if (evt.type == "mousemove" && this.navStatus == "panmanualActive") {
		var mapCoords = this.calcCoord(evt);
		if (this.getScreenCTM) {
			this.diffX = this.panCoorX - mapCoords.x + this.diffX;
			this.diffY = this.panCoorY - mapCoords.y + this.diffY;
		}
		else {
			this.diffX = this.panCoorX - mapCoords.x;
			this.diffY = this.panCoorY - mapCoords.y;
		}
		var myNewX = this.curxOrig + this.diffX;
		var myNewY = this.curyOrig + this.diffY;
		//check if within constraints
		if (myNewX < myMapApp.refMapDragger.constrXmin) {
			var myNewXTemp = myMapApp.refMapDragger.constrXmin;
			this.diffX = this.diffX + (myNewXTemp - myNewX);
			myNewX = myNewXTemp;
		}
		if (myNewY < myMapApp.refMapDragger.constrYmin) {
			var myNewYTemp = myMapApp.refMapDragger.constrYmin;
			this.diffY = this.diffY + (myNewYTemp - myNewY);
			myNewY = myNewYTemp;
		}
		if ((myNewX + this.curWidth) > myMapApp.refMapDragger.constrXmax) {
			var myNewXTemp = myMapApp.refMapDragger.constrXmax - this.curWidth;
			this.diffX = this.diffX + (myNewXTemp - myNewX);
			myNewX = myNewXTemp;
		}
		if ((myNewY + this.curHeight) > myMapApp.refMapDragger.constrYmax) {
			var myNewYTemp = myMapApp.refMapDragger.constrYmax - this.curHeight;
			this.diffY = this.diffY + (myNewYTemp - myNewY);
			myNewY = myNewYTemp;
		}
		var transformString = "translate("+(this.diffX * -1) +","+(this.diffY * -1)+")";
		this.mainMapGroup.setAttributeNS(null,"transform",transformString);
		myMapApp.refMapDragger.newView(myNewX,myNewY,this.curWidth,this.curHeight);
	}
	if ((evt.type == "mouseup" || evt.type == "mouseout") && this.navStatus == "panmanualActive") {
		this.navStatus = "panmanual";
		this.mainMapGroup.setAttributeNS(batikNS,"static","false");
		this.mainMapGroup.setAttributeNS(null,"transform","translate(0,0)");
		this.newViewBox(true);
		statusChange("模式: 手动漫游完成");
	}
}

//highlight a point position using a highlight cross
//用高亮十字高亮显示一个点位，相应SVG元素预建
//何时触发？
map.prototype.highlightPosition = function(xcoor,ycoor,hlOverview) {
	var returnVal = false;
	this.highlightVisible = true;
	//check if coordinate within visible map range
	if (this.pointTestWithin(xcoor,ycoor)) {
		this.highlightCrossHoriz.setAttributeNS(null,"x1",this.curxOrig);
		this.highlightCrossHoriz.setAttributeNS(null,"x2",(this.curxOrig+this.curWidth));
		this.highlightCrossHoriz.setAttributeNS(null,"y1",ycoor * -1);
		this.highlightCrossHoriz.setAttributeNS(null,"y2",ycoor * -1);
		this.highlightCrossVert.setAttributeNS(null,"x1",xcoor);
		this.highlightCrossVert.setAttributeNS(null,"x2",xcoor);
		this.highlightCrossVert.setAttributeNS(null,"y1",this.curyOrig);
		this.highlightCrossVert.setAttributeNS(null,"y2",(this.curyOrig+this.curHeight));
		this.highlightCross.setAttributeNS(null,"visibility","visible");
		returnVal = true;
	}
	else {
	    if (this.highlightVisible) {
	        this.highlightCross.setAttributeNS(null,"visibility","hidden");
	    }
	}
	//？
	if (hlOverview) {
		this.rMhighlightCrossHoriz.setAttributeNS(null,"x1",this.minX);
		this.rMhighlightCrossHoriz.setAttributeNS(null,"x2",(this.maxX));
		this.rMhighlightCrossHoriz.setAttributeNS(null,"y1",ycoor * -1);
		this.rMhighlightCrossHoriz.setAttributeNS(null,"y2",ycoor * -1);
		this.rMhighlightCrossVert.setAttributeNS(null,"x1",xcoor);
		this.rMhighlightCrossVert.setAttributeNS(null,"x2",xcoor);
		this.rMhighlightCrossVert.setAttributeNS(null,"y1",this.minY);
		this.rMhighlightCrossVert.setAttributeNS(null,"y2",this.maxY);
		this.rMhighlightCross.setAttributeNS(null,"visibility","visible");
	}
	return returnVal;
}

//test if the given point is in the current map extent
//note that the y-coordinate should be positive
//检测给定点是否在当前地图显示区，注意Y坐标应该是负数
map.prototype.pointTestWithin = function(xcoor,ycoor) {
	ycoor *= -1;
	var returnVal = false;
	if ((xcoor > this.curxOrig && xcoor < (this.curxOrig + this.curWidth)) && (ycoor > this.curyOrig && ycoor < (this.curyOrig + this.curHeight))) {
		returnVal = true;
	}
	return returnVal;
}

//test if the given bbox is within the current map extent
//note that the bbox must be of type SVGRect (this is normally returned if you use element.getBBOX())
//and must be in the same viewBox coordinate system than the map itself
//检测给定的bbox是否在当前显示地图区域
map.prototype.bboxTestWithin = function(bbox) {
	var returnVal = false;
	if ((bbox.x > this.curxOrig && bbox.x < (this.curxOrig + this.curWidth)) && (bbox.y > this.curyOrig && bbox.y < (this.curyOrig + this.curHeight)) && ((bbox.x + bbox.width) > this.curxOrig && (bbox.x + bbox.width) < (this.curxOrig + this.curWidth)) && ((bbox.y + bbox.height) > this.curyOrig && (bbox.y + bbox.height) < (this.curyOrig + this.curHeight))) {
		returnVal = true;
	}
	return returnVal;
}

//test if the given bbox overlaps with the current map extent
//note that the bbox must be of type SVGRect (this is normally returned if you use element.getBBOX())
//and must be in the same viewBox coordinate system than the map itself
map.prototype.bboxTestOverlaps = function(bbox) {
	var returnVal = false;
	if (((bbox.x > this.curxOrig && bbox.x < (this.curxOrig + this.curWidth)) || ((bbox.x + bbox.width) > this.curxOrig && (bbox.x + bbox.width) < (this.curxOrig + this.curWidth)) || (bbox.x < this.curxOrig && (bbox.x + bbox.width) > (this.curxOrig + this.curWidth))) && ((bbox.y > this.curyOrig && bbox.y < (this.curyOrig + this.curHeight)) || ((bbox.y + bbox.height) > this.curyOrig && (bbox.y + bbox.height) < (this.curyOrig + this.curHeight)) || (bbox.y < this.curyOrig && (bbox.y + bbox.height) > (this.curyOrig + this.curHeight)))) {
		returnVal = true;
	}
	return returnVal;
}

//hides the highlightCross
//隐藏高亮十字，何时触发？
map.prototype.hideHighlightCross = function() {
	this.highlightCross.setAttributeNS(null,"visibility","hidden");
	this.rMhighlightCross.setAttributeNS(null,"visibility","hidden");
	this.highlightVisible = false;
}

//remove all temporarily added elements and event listeners
//删除所有临时添加的元素和事件监听
map.prototype.cleanUp = function() {
			//remove background rect
			this.backgroundRect.parentNode.removeChild(this.backgroundRect);
			//remove crosshair from mainmap
			this.mainMapGroup.removeChild(this.highlightCross);
			//remove crosshair from reference map
			this.refmapSVG.removeChild(this.rMhighlightCross);
			//remove eventlisteners
			if (this.showCoords == true) {
				//remove event listener for coordinate display
				this.mapSVG.removeEventListener("mousemove",this,false);
			}
			//call cleanup from myMapApp.refMapDragger
			myMapApp.refMapDragger.cleanUp();
}

//make an element (rectangle) draggable within constraints
//创建小地图中的可拖拽矩形（只能在约束范围内拖动）
function dragObj(referenceMap,myDragSymbol,dragSymbThreshold,dragRectAttribs,showCoords,coordXId,coordYId,mainMapObj) {
 	this.myRefMap = referenceMap;
 	//add event listeners
 	this.myRefMap.addEventListener("mousedown",this,false);
 	this.myRefMap.addEventListener("mousemove",this,false);
 	this.myRefMap.addEventListener("mouseup",this,false);
 	this.myRefMap.addEventListener("mouseout",this,false);
	//get viewBox and set min/max values
	var viewBoxArray = this.myRefMap.getAttributeNS(null,"viewBox").split(" ");
	this.constrXmin = parseFloat(viewBoxArray[0]);
	this.constrYmin = parseFloat(viewBoxArray[1]);
	this.constrXmax = this.constrXmin + parseFloat(viewBoxArray[2]);
	this.constrYmax = this.constrYmin + parseFloat(viewBoxArray[3]);
	//get additional data on nested svg of the reference map
	this.refMapX = parseFloat(this.myRefMap.getAttributeNS(null,"x"));
	this.refMapY = parseFloat(this.myRefMap.getAttributeNS(null,"y"));
	this.refMapWidth = parseFloat(this.myRefMap.getAttributeNS(null,"width"));
	this.pixSize = (this.constrXmax - this.constrXmin) / this.refMapWidth;
	this.mainMapObj = mainMapObj;
	//create draggable rectangle
	this.myDragger = document.createElementNS(svgNS,"rect");
	this.myDragger.setAttributeNS(null,"x",viewBoxArray[0]);
	this.myDragger.setAttributeNS(null,"y",viewBoxArray[1]);
	this.myDragger.setAttributeNS(null,"width",viewBoxArray[2]);
	this.myDragger.setAttributeNS(null,"height",viewBoxArray[3]);
	//根据配置参数设置SVG矩形元素
	for (var attrib in dragRectAttribs) {
		var attribValue = dragRectAttribs[attrib];
		if (attrib == "stroke-width") {
			attribValue = (this.constrXmax - this.constrXmin) * parseFloat(dragRectAttribs["stroke-width"]);
		}
		if (attrib == "stroke-dasharray") {
			var dasharray = dragRectAttribs["stroke-dasharray"].split(",");
			var attribValue = "";
			for (var i=0;i<dasharray.length;i++) {
				attribValue += ((this.constrXmax - this.constrXmin) * parseFloat(dasharray[i]))+",";
			}
			attribValue = attribValue.slice(0,attribValue.length - 1);
		}
		this.myDragger.setAttributeNS(null,attrib,attribValue);
	}
	this.myDragger.setAttributeNS(null,"pointer-events","none");
	this.myRefMap.insertBefore(this.myDragger,this.myRefMap.lastChild);
	this.mainMapObj.dragger = this.myDragger;
	//create drag symbol
	this.dragSymbThreshold = dragSymbThreshold;
	this.myDragSymbol = document.createElementNS(svgNS,"use");
	this.myDragSymbol.setAttributeNS(null,"x",viewBoxArray[0]);
	this.myDragSymbol.setAttributeNS(null,"y",viewBoxArray[1]);
	this.myDragSymbol.setAttributeNS(null,"visibility","hidden");
	this.myDragSymbol.setAttributeNS(xlinkNS,"href","#"+myDragSymbol);
	this.myRefMap.insertBefore(this.myDragSymbol,this.myRefMap.lastChild);
	//create background-element to ensure that we receive mouse events
	this.backgroundRect = document.createElementNS(svgNS,"rect");
	this.backgroundRect.setAttributeNS(null,"x",viewBoxArray[0]);
	this.backgroundRect.setAttributeNS(null,"y",viewBoxArray[1]);
	this.backgroundRect.setAttributeNS(null,"width",viewBoxArray[2]);
	this.backgroundRect.setAttributeNS(null,"height",viewBoxArray[3]);
	this.backgroundRect.setAttributeNS(null,"fill","none");
	this.backgroundRect.setAttributeNS(null,"stroke","none");
	this.backgroundRect.setAttributeNS(null,"pointer-events","fill");
	this.myRefMap.insertBefore(this.backgroundRect,this.myRefMap.firstChild);
	
	//initialize coordinate display if showCoords == true
	this.showCoords = showCoords;
	if (this.showCoords == true) {
		if (typeof(coordXId) == "string") {
			this.coordXText = document.getElementById(coordXId).firstChild;
		}
		else {
			alert("Error: coordXId needs to be an id of type string");
		}
		if (typeof(coordYId) == "string") {
			this.coordYText = document.getElementById(coordYId).firstChild;
		}
		else {
			alert("Error: coordYId needs to be an id of type string");
		}
	}
	//determine if viewer is capable of getScreenCTM
	if (document.documentElement.getScreenCTM) {
		this.getScreenCTM = true;
	}
	else {
		this.getScreenCTM = false;
	}
	this.status = false;
}

//坐标计算：
dragObj.prototype.calcCoord = function(evt) {
	//with getScreenCTM the values are already in the inner coordinate system but without using the outer offset
	if (!this.getScreenCTM) {
		var coordPoint = myMapApp.calcCoord(evt,this.myRefMap);
		coordPoint.x = this.constrXmin + (coordPoint.x - this.refMapX) * this.pixSize;
		coordPoint.y = this.constrYmin + (coordPoint.y - this.refMapY) * this.pixSize;
	}
	else {
		var coordPoint = myMapApp.calcCoord(evt,this.myDragger);
	}
	return coordPoint;
}
//小地图中拖拽对象中鼠标移动时显示坐标
dragObj.prototype.handleEvent = function(evt) {
	if (evt.type == "mousemove" && this.showCoords) {
		var mapCoords = this.calcCoord(evt);
		this.coordXText.nodeValue = "X: " + formatNumberString(mapCoords.x.toFixed(this.mainMapObj.nrDecimals),",") + this.mainMapObj.units;
		this.coordYText.nodeValue = "Y: " + formatNumberString((mapCoords.y * -1).toFixed(this.mainMapObj.nrDecimals),",") + this.mainMapObj.units;
	}
	this.drag(evt);
	evt.preventDefault();
}

//拖拽对象重新显示
dragObj.prototype.newView = function(x,y,width,height) {
	this.myDragger.setAttributeNS(null,"x",x);
	this.myDragger.setAttributeNS(null,"y",y);
	this.myDragger.setAttributeNS(null,"width",width);
	this.myDragger.setAttributeNS(null,"height",height);
	this.myDragSymbol.setAttributeNS(null,"x",(x + width/2));
	this.myDragSymbol.setAttributeNS(null,"y",(y + height/2));
	if (width < this.dragSymbThreshold) {
		this.myDragSymbol.setAttributeNS(null,"visibility","visible");
	}
	else {
		this.myDragSymbol.setAttributeNS(null,"visibility","hidden");
	}
}

//this method was previously called "resizeDragger" - now renamed to .getSliderVal
//this method receives values from the zoom slider
dragObj.prototype.getSliderVal = function(status,sliderGroupName,width) {
	var myX = parseFloat(this.myDragger.getAttributeNS(null,"x"));
	var myY = parseFloat(this.myDragger.getAttributeNS(null,"y"));
	var myWidth = parseFloat(this.myDragger.getAttributeNS(null,"width"));
	var myHeight = parseFloat(this.myDragger.getAttributeNS(null,"height"));
	var myCenterX = myX + myWidth / 2;
	var myCenterY = myY + myHeight / 2;
	var myRatio = myHeight / myWidth;
	var toMoveX = myCenterX - width / 2;
	var toMoveY = myCenterY - width * myRatio / 2;
	if (toMoveX < this.constrXmin) {
		toMoveX = this.constrXmin;
	}
	if ((toMoveX + width) > this.constrXmax) {
		toMoveX = this.constrXmax - width;
	}
	if (toMoveY < this.constrYmin) {
		toMoveY = this.constrYmin;
	}
	if ((toMoveY + width * myRatio) > this.constrYmax) {
		toMoveY = this.constrYmax - width * myRatio;
	}
	this.newView(toMoveX,toMoveY,width,width * myRatio);
	if (status == "release") {
	    myMainMap.stopNavModes("slider");
		this.mainMapObj.newViewBox(true);
	}
}

//鹰眼中拖拽处理：按下/移动和释放
dragObj.prototype.drag = function(evt) {
	if (evt.type == "mousedown") {
		this.myRefMap.setAttributeNS(null,"cursor","move");
		this.status = true;
	}
	if ((evt.type == "mousemove" || evt.type == "mousedown") && this.status == true) {
		var coords = this.calcCoord(evt);
		var newEvtX = coords.x;
		var newEvtY = coords.y;
		var myX = parseFloat(this.myDragger.getAttributeNS(null,"x"));
		var myY = parseFloat(this.myDragger.getAttributeNS(null,"y"));
		var myWidth = parseFloat(this.myDragger.getAttributeNS(null,"width"));
		var myHeight = parseFloat(this.myDragger.getAttributeNS(null,"height"));
		var toMoveX = newEvtX - myWidth / 2;
		var toMoveY = newEvtY - myHeight / 2;
		if (toMoveX < this.constrXmin) {
			toMoveX = this.constrXmin;
		}
		if ((toMoveX + myWidth) > this.constrXmax) {
			toMoveX = this.constrXmax - myWidth;
		}
		if (toMoveY < this.constrYmin) {
			toMoveY = this.constrYmin;
		}
		if ((toMoveY + myHeight) > this.constrYmax) {
			toMoveY = this.constrYmax - myHeight;
		}
		this.newView(toMoveX,toMoveY,myWidth,myHeight);
	}
	if ((evt.type == "mouseup" || evt.type == "mouseout") && this.status == true) {
		this.status = false;
		this.myRefMap.setAttributeNS(null,"cursor","crosshair");
		this.mainMapObj.newViewBox(true);
	}
}

//缩放
dragObj.prototype.zoom = function(inOrOut) {
	var myOldX = this.myDragger.getAttributeNS(null,"x");
	var myOldY = this.myDragger.getAttributeNS(null,"y");
	var myOldWidth = this.myDragger.getAttributeNS(null,"width");
	var myOldHeight = this.myDragger.getAttributeNS(null,"height");
	switch (inOrOut) {
		case "in":
			var myNewX = parseFloat(myOldX) + myOldWidth / 2 - (myOldWidth * this.mainMapObj.zoomFact * 0.5);
			var myNewY = parseFloat(myOldY) + myOldHeight / 2 - (myOldHeight * this.mainMapObj.zoomFact * 0.5);
			var myNewWidth = myOldWidth * this.mainMapObj.zoomFact;
			var myNewHeight = myOldHeight * this.mainMapObj.zoomFact;
			if (myNewWidth < this.mainMapObj.minWidth) {
				var myYXFact = this.mainMapObj.curHeight / this.mainMapObj.curWidth;
				myNewWidth = this.mainMapObj.minWidth;
				myNewHeight = myNewWidth * myYXFact;
				myNewX = parseFloat(myOldX) + myOldWidth / 2 - (myNewWidth * 0.5);
				myNewY = parseFloat(myOldY) + myOldHeight / 2 - (myNewHeight * 0.5);
			}
			break;
		case "out":
			var myNewX = parseFloat(myOldX) + myOldWidth / 2 - (myOldWidth * (1 + this.mainMapObj.zoomFact) * 0.5);
			var myNewY = parseFloat(myOldY) + myOldHeight / 2 - (myOldHeight * (1 + this.mainMapObj.zoomFact) * 0.5);
			var myNewWidth = myOldWidth * (1 + this.mainMapObj.zoomFact);
			var myNewHeight = myOldHeight * (1 + this.mainMapObj.zoomFact);
			break;
		default:
			var myNewX = this.constrXmin;
			var myNewY = this.constrYmin;
			var myNewWidth = this.constrXmax - this.constrXmin;
			var myNewHeight = this.constrYmax - this.constrYmin;
			break;
	}
	//check if within constraints
	if (myNewWidth > (this.constrXmax - this.constrXmin)) {
		myNewWidth = this.constrXmax - this.constrXmin;
	}
	if (myNewHeight > (this.constrYmax - this.constrYmin)) {
		myNewHeight = this.constrYmax - this.constrYmin;
	}
	if (myNewX < this.constrXmin) {
		myNewX = this.constrXmin;
	}
	if (myNewY < this.constrYmin) {
		myNewY = this.constrYmin;
	}
	if ((myNewX + myNewWidth) > this.constrXmax) {
		myNewX = this.constrXmax - myNewWidth;
	}
	if ((myNewY + myNewHeight) > this.constrYmax) {
		myNewY = this.constrYmax - myNewHeight;
	}
	this.newView(myNewX,myNewY,myNewWidth,myNewHeight);
	this.mainMapObj.newViewBox(true);
}

dragObj.prototype.pan = function (myX,myY,howmuch) {
	//get values from draggable rectangle
	var xulcorner = parseFloat(this.myDragger.getAttributeNS(null,"x"));
	var yulcorner = parseFloat(this.myDragger.getAttributeNS(null,"y"));
	var width = parseFloat(this.myDragger.getAttributeNS(null,"width"));
	var height = parseFloat(this.myDragger.getAttributeNS(null,"height"));

	//set values of draggable rectangle
	var rectXulcorner = xulcorner + howmuch * width * myX;
	var rectYulcorner = yulcorner + howmuch * height * myY;
	//check if within constraints
	if (rectXulcorner < this.constrXmin) {
		rectXulcorner = this.constrXmin;
	}
	if (rectYulcorner < this.constrYmin) {
		rectYulcorner = this.constrYmin;
	}
	if ((rectXulcorner + width) > this.constrXmax) {
		rectXulcorner = this.constrXmax - width;
	}
	if ((rectYulcorner + height) > this.constrYmax) {
		rectYulcorner = this.constrYmax - height;
	}
	this.newView(rectXulcorner,rectYulcorner,width,height);

	//set viewport of main map
	if ((xulcorner != rectXulcorner) || (yulcorner != rectYulcorner)) {
		this.mainMapObj.newViewBox(true);
	}

	statusChange("地图已就绪 ...");
}

//remove all temporarily used elements and event listeners
dragObj.prototype.cleanUp = function() {
	//remove eventlisteners
	if (this.showCoords == true) {
		//add event listener for coordinate display
		this.myRefMap.removeEventListener("mousedown",this,false);
		this.myRefMap.removeEventListener("mousemove",this,false);
		this.myRefMap.removeEventListener("mouseup",this,false);
		this.myRefMap.removeEventListener("mouseout",this,false);
	}
	//remove drag rectangle
	this.myRefMap.removeChild(this.myDragger);
	//remove drag symbol use instance
	this.myRefMap.removeChild(this.myDragSymbol);
	//remove background rectangle
	this.myRefMap.removeChild(this.backgroundRect);
}

function zoomIt(evt,inOrOut) {
	if (evt.detail == 1) { //only react on first click, double click: second click is ignored
		if (inOrOut == "in") {
			if (Math.round(myMainMap.curWidth) > myMainMap.minWidth) {
				myMapApp.refMapDragger.zoom("in");
			}
			else {
				statusChange("已到最大缩放比例，不能再放大。");
			}
		}
		if (inOrOut == "out") {
			if (Math.round(myMainMap.curWidth) < myMainMap.maxWidth) {
				myMapApp.refMapDragger.zoom("out");
			}
			else {
				statusChange("已到最小缩放比例，不能再缩小。");
			}
		}
		if (inOrOut == "full") {
			if (Math.round(myMainMap.curWidth) < myMainMap.maxWidth) {
				myMapApp.refMapDragger.zoom("full");
			}
			else {
				statusChange("已经显示为最大可缩放比例。");
			}
		}
	}
}

//this function starts various zoom actions or map extent history functions
function zoomImageButtons(id,evt) {
	myMainMap.stopNavModes(id);
	if (id == "zoomIn") {
		zoomIt(evt,'in');
	}
	if (id == "zoomOut") {
		zoomIt(evt,'out');
	}
	if (id == "zoomFull") {
		zoomIt(evt,'full');
	}
	if (id == "backwardExtent") {
		myMainMap.backwardExtent();
	}
	if (id == "forwardExtent") {
		myMainMap.forwardExtent();
	}
}

//this function starts various interactive zoom or pan modes
function zoomImageSwitchButtons(id,evt,onOrOff) {
	myMainMap.stopNavModes(id);
	if (id == "infoButton") {
	        myMapApp.buttons["infoButton"].setSwitchValue(true,false);
	 }
	 else {
	    if (id == "zoomManual") {
		myMainMap.zoomManual(evt);
	                if (!myMapApp.buttons["zoomManual"].getSwitchValue()) {
		    myMapApp.buttons["zoomManual"].setSwitchValue(true,false);
	                }
	     }
	    if (id == "panManual") {
		myMainMap.panManual(evt);
	                if (!myMapApp.buttons["panManual"].getSwitchValue()) {
		    myMapApp.buttons["panManual"].setSwitchValue(true,false);
	                }
	     }
	    if (id == "recenterMap") {
		myMainMap.recenter(evt);
	                if (!myMapApp.buttons["recenterMap"].getSwitchValue()) {
		    myMapApp.buttons["recenterMap"].setSwitchValue(true,false);
	                }
	    }
	    if (myMapApp.buttons["infoButton"].getSwitchValue()) {
		myMapApp.buttons["infoButton"].setSwitchValue(false,false);
	    }
	}
}

//alert map extent
//点击坐标标注交叉点时弹出窗口显示地图区域
function showExtent() {
	with(myMainMap) {
		alert("Xmin="+curxOrig.toFixed(nrDecimals)+units+"; Xmax="+(curxOrig + curWidth).toFixed(nrDecimals)+units+"\nYmin="+((curyOrig + curHeight) * -1).toFixed(nrDecimals) +units+"; Ymax="+(curyOrig*-1).toFixed(nrDecimals)+units+"\nWidth="+curWidth.toFixed(nrDecimals)+units+"; Height="+curHeight.toFixed(nrDecimals)+units);
	}
}