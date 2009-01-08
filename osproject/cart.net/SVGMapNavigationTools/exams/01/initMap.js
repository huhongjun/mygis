//global variables for map application and navigation
var myMapApp;
var myMainMap;

function initMap(mapData) {
	var layoutData = mapData.getElementsByTagName("layout").item(0);

	//extract viewBox information and set it in svg root element
	var viewBox = layoutData.getElementsByTagName("coordinateSystem").item(0).getAttribute("viewBox");
	document.documentElement.setAttributeNS(null,"viewBox",viewBox);
	document.documentElement.setAttributeNS(null,"zoomAndPan","disable");
	
	//now create all the GUI elements	
	//parse GUI information and create new GUI elements
	myMapApp.guiDefaults = new Array();
	myMapApp.currentRadiobuttongroup = undefined;
	var guiData = layoutData.getElementsByTagName("gui").item(0);
	var guiChild = guiData.firstChild;
	parseGUI(guiChild,document.documentElement);
	
	//close info window window
	myMapApp.Windows["additionalInfoWindow"].close();
	
	//read main map data
	var mainMapData = layoutData.getElementsByTagName("mainMap").item(0);
	var mainMapId = mainMapData.getAttribute("id");
	var origXPix = mainMapData.getAttribute("x");
	var mainMapX = eval(origXPix);
	var origYPix = mainMapData.getAttribute("y");
	var mainMapY = eval(origYPix);
	var origWidthPix = mainMapData.getAttribute("width");
	var mainMapWidth = eval(origWidthPix);
	var origHeightPix = mainMapData.getAttribute("height");
	var mainMapHeight = eval(origHeightPix);
	var mainMapXWorld = parseFloat(mainMapData.getAttribute("xWorld"));
	var origXWorld = mainMapXWorld;
	var mainMapYWorld = parseFloat(mainMapData.getAttribute("yWorld"));
	var origYWorld = mainMapYWorld;
	var mainMapWidthWorld = parseFloat(mainMapData.getAttribute("widthWorld"));
	var origWidthWorld = mainMapWidthWorld;
	var mainMapHeightWorld = parseFloat(mainMapData.getAttribute("heightWorld"));
	var origHeightWorld = mainMapHeightWorld;
	var mainMapEpsg = parseInt(mainMapData.getAttribute("epsg"));
	var mainMapUnits = mainMapData.getAttribute("units");
	var mainMapUnitsFactor = parseFloat(mainMapData.getAttribute("unitsFactor"));
	var mainMapMinWidthFact = parseFloat(mainMapData.getAttribute("minWidthFact"));
	var mainMapParent = mainMapData.getAttribute("parentId");
	var zoomRectAttribs = eval(mainMapData.getAttribute("zoomRectAttribs"));
	var highlightAttribs = eval(mainMapData.getAttribute("highlightAttribs"));
	//calculate new viewBox based on old values and changed window size
	var mapRatio = origWidthWorld / origHeightWorld;
	var windowRatio = mainMapWidth / mainMapHeight;
	var mapCenterX = origXWorld + origWidthWorld / 2;
	var mapCenterY = origYWorld - origHeightWorld / 2;
	if (mapRatio > windowRatio) {
		//case map is wider than window, we need to adjust map height
		mainMapHeightWorld = origWidthWorld * (mainMapHeight / mainMapWidth);
		mainMapYWorld = mapCenterY + mainMapHeightWorld / 2;
	}
	else {
		//case map is narrower than window, we need to adjust map width
		mainMapWidthWorld = origHeightWorld * windowRatio;
		mainMapXWorld = mapCenterX - mainMapWidthWorld / 2;
	}
	//create inner svg element and nested empty group
	var svgMainMap = document.createElementNS(svgNS,"svg");
	svgMainMap.setAttributeNS(null,"id",mainMapId);
	svgMainMap.setAttributeNS(null,"x",mainMapX);
	svgMainMap.setAttributeNS(null,"y",mainMapY);
	svgMainMap.setAttributeNS(null,"width",mainMapWidth);
	svgMainMap.setAttributeNS(null,"height",mainMapHeight);
	svgMainMap.setAttributeNS(null,"viewBox",mainMapXWorld + " " + (mainMapYWorld * -1) + " " + mainMapWidthWorld + " " + mainMapHeightWorld);
	svgMainMap.setAttributeNS(null,"cursor","crosshair");
	//create inner group for panning
	var svgMainMapGroup = document.createElementNS(svgNS,"g");
	svgMainMapGroup.setAttributeNS(null,"id",mainMapId+"Group");
	svgMainMapGroup.setAttributeNS(null,"transform","translate(0,0)");
	svgMainMap.appendChild(svgMainMapGroup);
	document.getElementById(mainMapParent).appendChild(svgMainMap);
	//create copyright text
	if (layoutData.getElementsByTagName("copyright").length > 0) {
		var copyrightData = layoutData.getElementsByTagName("copyright").item(0);
		myMapApp.copyrightOrigX = copyrightData.getAttribute("x");
		var copyrightX = eval(myMapApp.copyrightOrigX);
		myMapApp.copyrightOrigY = copyrightData.getAttribute("y");
		var copyrightY = eval(myMapApp.copyrightOrigY);
		var copyrightStyles = eval(copyrightData.getAttribute("styles"));
		var copyrightBgStyles = eval(copyrightData.getAttribute("copyRightBgStyle"));
		var parentNode = document.getElementById(copyrightData.getAttribute("parentId"));
		var copyrightText = copyrightData.firstChild.nodeValue;
		myMapApp.copyright = document.createElementNS(svgNS,"text");
		myMapApp.copyright.setAttributeNS(null,"x",copyrightX);
		myMapApp.copyright.setAttributeNS(null,"y",copyrightY);
		myMapApp.copyright.setAttributeNS(null,"pointer-events","none");
		for (var attrib in copyrightStyles) {
			value = copyrightStyles[attrib];
			if (attrib == "font-size") {
				value += "px";
			}
			myMapApp.copyright.setAttributeNS(null,attrib,value);
		}
		var textNode = document.createTextNode(String.fromCharCode(169)+copyrightText);
		myMapApp.copyright.appendChild(textNode);
		parentNode.appendChild(myMapApp.copyright);
		//draw back rectangle
		var bbox = myMapApp.copyright.getBBox();
		myMapApp.copyrightBackRect = document.createElementNS(svgNS,"rect");
		myMapApp.copyrightBackRect.setAttributeNS(null,"x",bbox.x - 5);
		myMapApp.copyrightBackRect.setAttributeNS(null,"y",bbox.y - 5);
		myMapApp.copyrightBackRect.setAttributeNS(null,"width",bbox.width + 9.5);
		myMapApp.copyrightBackRect.setAttributeNS(null,"height",bbox.height + 6.5);
		myMapApp.copyrightBackRect.setAttributeNS(null,"pointer-events","none");
		for (var attrib in copyrightBgStyles) {
			myMapApp.copyrightBackRect.setAttributeNS(null,attrib,copyrightBgStyles[attrib]);
		}
		parentNode.insertBefore(myMapApp.copyrightBackRect,myMapApp.copyright);
	}
	//now create coordinate elements
	var coordGroup = document.createElementNS(svgNS,"g");
	coordGroup.setAttributeNS(null,"pointer-events","none");
	var coordDisplayData = layoutData.getElementsByTagName("coordinateDisplay").item(0);
	var parentNode = document.getElementById(coordDisplayData.getAttribute("parentId"));
	var accuracy = parseInt(coordDisplayData.getAttribute("accuracy"));
	//bg rect if available
	if (coordDisplayData.getElementsByTagName("background").length > 0) {
		var bgData = coordDisplayData.getElementsByTagName("background").item(0);
		var bgRect = document.createElementNS(svgNS,"rect");
		bgRect.setAttributeNS(null,"x",parseFloat(bgData.getAttribute("x")));
		bgRect.setAttributeNS(null,"y",parseFloat(bgData.getAttribute("y")));
		bgRect.setAttributeNS(null,"width",parseFloat(bgData.getAttribute("width")));
		bgRect.setAttributeNS(null,"height",parseFloat(bgData.getAttribute("height")));
		var bgRectStyles = eval(bgData.getAttribute("styles"));
		for (var attrib in bgRectStyles) {
			bgRect.setAttributeNS(null,attrib,bgRectStyles[attrib]);
		}
		coordGroup.appendChild(bgRect);
	}
	//coordx/y text elements
	var coordXData = coordDisplayData.getElementsByTagName("coordX").item(0);
	var coordXId = coordXData.getAttribute("id");
	var coordXX = parseFloat(coordXData.getAttribute("x"));
	var coordXY = parseFloat(coordXData.getAttribute("y"));
	var coordXStyles = eval(coordXData.getAttribute("styles"));
	var coordX = document.createElementNS(svgNS,"text");
	coordX.setAttributeNS(null,"x",coordXX);
	coordX.setAttributeNS(null,"y",coordXY);
	coordX.setAttributeNS(null,"id",coordXId);
	for (var attrib in coordXStyles) {
		value = coordXStyles[attrib];
		if (attrib == "font-size") {
			value += "px";
		}
		coordX.setAttributeNS(null,attrib,value);
	}
	var textNode = document.createTextNode("X:");
	coordX.appendChild(textNode);
	coordGroup.appendChild(coordX);
	var coordYData = coordDisplayData.getElementsByTagName("coordY").item(0);
	var coordYId = coordYData.getAttribute("id");
	var coordYX = parseFloat(coordYData.getAttribute("x"));
	var coordYY = parseFloat(coordYData.getAttribute("y"));
	var coordYStyles = eval(coordYData.getAttribute("styles"));
	var coordY = document.createElementNS(svgNS,"text");
	coordY.setAttributeNS(null,"x",coordYX);
	coordY.setAttributeNS(null,"y",coordYY);
	coordY.setAttributeNS(null,"id",coordYId);
	for (var attrib in coordYStyles) {
		value = coordYStyles[attrib];
		if (attrib == "font-size") {
			value += "px";
		}
		coordY.setAttributeNS(null,attrib,value);
	}
	var textNode = document.createTextNode("Y:");
	coordY.appendChild(textNode);
	coordGroup.appendChild(coordY);
	parentNode.appendChild(coordGroup);

	//now start work on map navigation tools
	//node reference to navigation data group
	var navtoolsData = layoutData.getElementsByTagName("mapNavigation").item(0);
	//create reference map
	var referenceMapData = layoutData.getElementsByTagName("referenceMap").item(0);
	var navGroupId = referenceMapData.getAttribute("parentId");
	var referenceMapId = referenceMapData.getAttribute("id");
	var refMapParentNode = document.getElementById(referenceMapData.getAttribute("parentId"));
	var dragId = referenceMapData.getAttribute("dragId");
	var referenceMapX = parseFloat(referenceMapData.getAttribute("x"));
	var referenceMapY = parseFloat(referenceMapData.getAttribute("y"));
	var referenceMapWidth = parseFloat(referenceMapData.getAttribute("width"));
	var referenceMapHeight = parseFloat(referenceMapData.getAttribute("height"));
	var referenceMapXWorld = parseFloat(referenceMapData.getAttribute("xWorld"));
	var referenceMapYWorld = parseFloat(referenceMapData.getAttribute("yWorld"));
	var referenceMapWidthWorld = parseFloat(referenceMapData.getAttribute("widthWorld"));
	var referenceMapHeightWorld = parseFloat(referenceMapData.getAttribute("heightWorld"));
	var referenceMapGeomFile = referenceMapData.getAttribute("geomFile");
	var dragrectstyles = eval(referenceMapData.getAttribute("dragRectStyles"));
	var dragsymbolstyles = eval(referenceMapData.getAttribute("dragSymbolStyles"));
	var dragSymbolThreshold = parseFloat(referenceMapData.getAttribute("dragSymbolThreshold"));
	//create dragsymbol
	var dragSymbol = document.createElementNS(svgNS,"symbol");
	dragSymbol.setAttributeNS(null,"id","myDragCrossSymbol");
	dragSymbol.setAttributeNS(null,"overflow","visible");
	var dragSymbolGroup = document.createElementNS(svgNS,"g");
	for (var attrib in dragsymbolstyles) {
		dragSymbolGroup.setAttributeNS(null,attrib,dragsymbolstyles[attrib]);
	}
	dragSymbolGroup.setAttributeNS(null,"pointer-events","none");
	dragSymbolGroup.setAttributeNS(null,"stroke-width",referenceMapXWorld * 0.01);
	dragSymbol.appendChild(dragSymbolGroup);
	var lineLength = mainMapWidthWorld * 0.03;
	var line = document.createElementNS(svgNS,"line");
	line.setAttributeNS(null,"x1",lineLength * -2);
	line.setAttributeNS(null,"x2",lineLength * -1);
	line.setAttributeNS(null,"y1",0);
	line.setAttributeNS(null,"y2",0);
	dragSymbolGroup.appendChild(line);
	var line = document.createElementNS(svgNS,"line");
	line.setAttributeNS(null,"x1",lineLength * 2);
	line.setAttributeNS(null,"x2",lineLength * 1);
	line.setAttributeNS(null,"y1",0);
	line.setAttributeNS(null,"y2",0);
	dragSymbolGroup.appendChild(line);
	var line = document.createElementNS(svgNS,"line");
	line.setAttributeNS(null,"x1",0);
	line.setAttributeNS(null,"x2",0);
	line.setAttributeNS(null,"y1",lineLength * -2);
	line.setAttributeNS(null,"y2",lineLength * -1);
	dragSymbolGroup.appendChild(line);
	var line = document.createElementNS(svgNS,"line");
	line.setAttributeNS(null,"x1",0);
	line.setAttributeNS(null,"x2",0);
	line.setAttributeNS(null,"y1",lineLength * 2);
	line.setAttributeNS(null,"y2",lineLength * 1);
	dragSymbolGroup.appendChild(line);
	document.documentElement.getElementsByTagName("defs").item(0).appendChild(dragSymbol);
	//now create svg group for reference map
	var referenceMapSVGElement = document.createElementNS(svgNS,"svg");
	referenceMapSVGElement.setAttributeNS(null,"id",referenceMapId);
	referenceMapSVGElement.setAttributeNS(null,"x",referenceMapX);
	referenceMapSVGElement.setAttributeNS(null,"y",referenceMapY);
	referenceMapSVGElement.setAttributeNS(null,"width",referenceMapWidth);
	referenceMapSVGElement.setAttributeNS(null,"height",referenceMapHeight);
	referenceMapSVGElement.setAttributeNS(null,"viewBox",referenceMapXWorld+" -"+referenceMapYWorld+" "+referenceMapWidthWorld+" "+referenceMapHeightWorld);
	referenceMapSVGElement.setAttributeNS(null,"cursor","crosshair");
	document.getElementById(navGroupId).appendChild(referenceMapSVGElement);

	//empty arrays for map layers
	var dynamicLayers = new Array();
	var digiLayers = new Array();
	//initialize map object
	myMainMap = new map(mainMapId,mainMapWidthWorld,(mainMapWidthWorld * mainMapMinWidthFact),0.6,accuracy,mainMapEpsg,mainMapUnits,mainMapUnitsFactor,true,coordXId,coordYId,dynamicLayers,digiLayers,"",zoomRectAttribs,highlightAttribs,dragrectstyles,referenceMapId,"myDragCrossSymbol",(dragSymbolThreshold * referenceMapWidthWorld));
	//add original width/height/x/y
	myMainMap.origX = origXWorld;
	myMainMap.origY = origYWorld;
	myMainMap.origWidth = origWidthWorld;
	myMainMap.origHeight = origHeightWorld;
	myMainMap.origXPix = origXPix;
	myMainMap.origYPix = origYPix;
	myMainMap.origWidthPix = origWidthPix;
	myMainMap.origHeightPix = origHeightPix;
	myMainMap.minWidthFact = mainMapMinWidthFact;

	//adopt zoom slider
	myMapApp.sliders["zoomSlider"].value1 = myMainMap.minWidth;
	myMapApp.sliders["zoomSlider"].value2 = myMainMap.maxWidth;
	myMapApp.sliders["zoomSlider"].setValue(myMainMap.maxWidth,false);
	myMapApp.sliders["zoomSlider"].functionToCall = myMapApp.refMapDragger;

	//add event listeners to reference map, note that mousemove was already added from the navigation tools
	referenceMapSVGElement.addEventListener("mousedown",myMapApp.refMapDragger,false);
	referenceMapSVGElement.addEventListener("mouseup",myMapApp.refMapDragger,false);
	referenceMapSVGElement.addEventListener("mouseout",myMapApp.refMapDragger,false);

	//see if we need to disable buttons
	myMainMap.checkButtons();

	//get data for reference map
	var refDataFetch = new getData(referenceMapGeomFile,refDataAppend,"xml","get",undefined,undefined);
	refDataFetch.getData();

	//create scalebar
	if (layoutData.getElementsByTagName("scalebar").length > 0) {
		var scaleBarData = layoutData.getElementsByTagName("scalebar").item(0);
		myMapApp.scalebar = true;
		//create a group to hold the scalebar graphics
		myMapApp.scaleBarGroup = document.createElementNS(svgNS,"g");
		myMapApp.scaleBarGroup.setAttributeNS(null,"id","scaleBar");
		myMapApp.scaleBarGroup.setAttributeNS(null,"pointer-events","none");
		document.getElementById(scaleBarData.getAttribute("parentNode")).appendChild(myMapApp.scaleBarGroup);
		//read out scalebar attributes
		myMapApp.maxScaleBarLength=parseFloat(scaleBarData.getAttribute("maxScaleBarLength"));
		myMapApp.scalebarXOrig = scaleBarData.getAttribute("scaleXmin");
		myMapApp.scalebarYOrig = scaleBarData.getAttribute("scaleYmin");
		myMapApp.scaleXmin=eval(myMapApp.scalebarXOrig);
		myMapApp.scaleYmin=eval(myMapApp.scalebarYOrig);
		myMapApp.nrTicks=parseInt(scaleBarData.getAttribute("nrTicks"));
		myMapApp.scaleBarBgstyles=eval(scaleBarData.getAttribute("scaleBarBgStyles"));
		myMapApp.scaleBarLinestyles=eval(scaleBarData.getAttribute("scaleBarLineStyles"));
		myMapApp.scaleBarTextstyles=eval(scaleBarData.getAttribute("scaleBarTextStyles"));
	}
	else {
		myMapApp.scalebar = false;
	}	
	
	//create layer for pixel map
	var group = document.createElementNS(svgNS,"g");
	group.setAttributeNS(null,"id","pk");
	group.setAttributeNS(null,"opacity",0.8);
	group.setAttributeNS(null,"display","inherit");
	svgMainMapGroup.insertBefore(group,svgMainMapGroup.lastChild);

	//this group holds admin geometry
	myMainMap.adminGroup = document.createElementNS(svgNS,"g");
	svgMainMapGroup.insertBefore(myMainMap.adminGroup,svgMainMapGroup.lastChild);
	myMainMap.showAdmin = false;

	//create layer for photo symbols
	var group = document.createElementNS(svgNS,"g");
	group.setAttributeNS(null,"id","photoSymbols");
	svgMainMapGroup.insertBefore(group,svgMainMapGroup.lastChild);
	
	//create layer for selected photo symbol
	var group = document.createElementNS(svgNS,"g");
	group.setAttributeNS(null,"id","photoSymbolDetail");
	svgMainMapGroup.insertBefore(group,svgMainMapGroup.lastChild);

	//prepare photo selection window
	myMapApp.photoGalleryGroup = document.getElementById("photoGalleryGroup");
	myMapApp.photoFrame = document.getElementById("photoFrame");
	myMapApp.buttons["zoomToPhoto"].hideButton();
	myMapApp.buttons["higherResolution"].hideButton();
	myMapApp.buttons["returnToGallery"].hideButton();
	
	myMapApp.logicalAndOr = "OR";
					
	//initialize tab
	myMapApp.currentTab = "searchPanelThematic";
	
	//set nr photos per page
	myMapApp.nrPerPage = 5;

	//put copyright to proper place
	window.setTimeout("readSessionId()",2000);
	myMapApp.nrTriesSessionId = 0;
	
	//initialize events of search GUI elements
	myMapApp.searchObj = new searchObject();
	myMapApp.textboxes["titleSearchTextbox"].functionToCall = myMapApp.searchObj;
	myMapApp.checkBoxes["filterByMapExtent"].functionToCall = myMapApp.searchObj;
	myMapApp.comboboxes["titleSearchCombobox"].functionToCall = myMapApp.searchObj;
	myMapApp.buttons["zoomToSelectedPhoto"].deactivate();
	myMapApp.buttons["zoomToSelectedPhoto"].functionToCall = myMapApp.searchObj;
	myMapApp.buttons["resetTitleSearch"].functionToCall = myMapApp.searchObj;
	myMapApp.zoomedFromTitleSearch = false;

	//hide initial text
	document.getElementById("loadingAppText").setAttributeNS(null,"display","none");

}

function readSessionId(node) {
	if (node) {
		myMapApp.sessionId = String(node);
		loadProjectSpecific();
	}
	//get session id
	else {
		if (myMapApp.navigator != "Batik") {
			try {
				myMapApp.sessionId = String(top.document.getElementById("sessionId").getAttribute("value"));
				if (myMapApp.sessionId) {
					if (myMapApp.sessionId != "undefined") {
						loadProjectSpecific();
					}
				}
			}
			catch(er) {
				myMapApp.nrTriesSessionId++;
				if (myMapApp.nrTriesSessionId < 2) {
					window.setTimeout("readSessionId()",1000);
				}
				else {
					//this is a fallback for viewers other than Batik that don't support "top"
					var getSessionId = new getData("getSessionId.php",readSessionId,"json","get",undefined,undefined);
					getSessionId.getData();
				}
			}
		}
		else {
			//alternative for Batik
			var getSessionId = new getData("getSessionId.php",readSessionId,"json","get",undefined,undefined);
			getSessionId.getData();
		}
	}
}

//this function is called after getXMLData() request to add geometry data to the reference map
function refDataAppend(node) {
	var refMapSVG = myMapApp.refMapDragger.myRefMap;
	refMapSVG.insertBefore(node,refMapSVG.firstChild.nextSibling);
	//this is because of a bug in Mozilla SVG, it does not display images loaded through XMLHttpRequest()
	var images = node.getElementsByTagName("image");
	for (i=0;i<images.length;i++) {
		images.item(i).setAttributeNS(xlinkNS,"href",images.item(i).getAttributeNS(xlinkNS,"href"));
	}
}

function additionalInfoWindow() {
	myMapApp.Windows["additionalInfoWindow"].open();
}
