/*
Scripts for SVG only webmapping application navigation tools
Copyright (C) <2004 - 2006>  <Andreas Neumann>
Version 1.9, 2006-09-05
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

current version: 1.9

version history:
1.0 initial version
1.01 (2005-02-15) added cleanUp() method to map and dragObj objects, some fixes in the documentation
1.02 (2005-02-20) fixed problems with double clicks, the second click of a double click is now ignored, using the evt.detail property
1.03 (2005-02-22) introduced timestamp and nrLayerToLoad array for dynamic loading (getUrl)
1.04 (2005-09-15) introduced a few changes with coordinate calculation to support MozillaSVG, introduced epsg and unitsFactor property based on a suggestion by Bruce Rindahl
1.1 (2005-10-05) introduced button object (see button.js file), introduced zoom and pan "modes" for repeated actions in the same mode, introduced history of map extents with the ability to go back and forth in the list of previous map extents, some internal changes in the code (e.g. less global variables), added experimental support for the batik SVG 1.2 "static" attribute to improve performance while panning the map, added cursors to give better status feedback
1.2 (2006-05-08) dragObj is now called directly from the map object (please remove it from the initialization function of previous versions), new constructor parameters, added method .pointTestWithin(xcoor,ycoor), added method .highlightPosition(xcoor,ycoor,hlOverview) and method .hideHighlightCross(); drag rectangle and drag symbol are now automatically added (please remove them from previous projects if you defined them in your svg file), event listeners are now automatically added to the reference map (please remove previous event handler attributes from your project, otherwise functions will fire twice); the previous primitive checkbox object is now replaced with the more sophisticated checkbox object available from the carto.net SVG GUI section
1.2.1 (2006-05-13): fixed a bug in the documentation, fixed a severe bug in the helper_functions.js file, functions dd2dms() and dms2dd(); thanks Bruce Rindahl for bug-reporting and providing fixes
1.2.2 (2006-06-08): fixed a bug in the .stopNavModes() function that would prevent entering info mode after pressing the info button
1.2.3 (2006-06-19): changed the behaviour of the highlightCross, the highlightCross is now automatically hidden after each zoom and pan; highlightCross in main map now correctly disappears if coordinate outside of main map; fixed a bug when repeatedly starting the same mode
1.2.4 (2006-08-10): added methods .bboxTestWithin(bbox) and .bboxTestOverlaps(bbox); updated the slider object in index.svg
1.3 (2007-04-19): added evt.preventDefault() in dragObj.prototype.handleEvent to prevent that a potential raster image is dragged in the reference map (applies to Apple Safari); manual zoom rectangle can now be drawn in all directions; the behavior of small manual zoom rectangles was slightly changed
1.9 (2006-09-05): this is an unofficial, internal release - added support for multiple, synchronous maps. Added support for maps that have a different width/height ratio than the reference map. This needs more testing.

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
function map(mapName,maxWidth,minWidth,zoomFact,nrDecimals,epsg,units,unitsFactor,showCoords,coordXId,coordYId,dynamicLayers,digiLayers,activeDigiLayer,zoomRectAttribs,highlightAttribs,dragRectAttribs,refmapName,dragSymbol,symbolThreshold) {
	this.maps = new Array(); //this array contains mapdata from all maps controlled by the map object
	this.maps.push(new mapData(mapName,dynamicLayers,digiLayers,activeDigiLayer,highlightAttribs));
	this.maps[0].backgroundRect.addEventListener("mousedown",this,false);
	this.maps[0].backgroundRect.addEventListener("mousemove",this,false);
	this.maps[0].backgroundRect.addEventListener("mouseup",this,false);
	this.maps[0].backgroundRect.addEventListener("mouseout",this,false);
	this.maps[0].backgroundRect.addEventListener("click",this,false);
	this.refmapSVG = document.getElementById(refmapName); //holds a reference to the reference map
	this.maxWidth = maxWidth; //max map width
	this.minWidth = minWidth; //min map width, after zooming in
	this.zoomFact = zoomFact; //ratio to zoom in or out in relation to previous viewBox
	this.zoomRectAttribs = zoomRectAttribs; //array of literals with presentation attributes defining the look of the zoom rectangle
	this.dragRectAttribs = dragRectAttribs; //array of literals with presentation attributes of the dragable rectangle in the reference map
	this.highlightAttribs = highlightAttribs; //array of literals with presentation attributes used for the highlight crosshair
	this.dragSymbol = dragSymbol; //this holds the id of a symbol that is used to display the current map extent if it is very small
	this.symbolThreshold = symbolThreshold; //this value defines a threshold after which the drag symbol should be displayed in addition to the drag rectangle
	//get viewBox of first main map
	var viewBox = this.maps[0].mapSVG.getAttributeNS(null,"viewBox");
	var viewBoxArray = viewBox.split(" ");
	this.curxOrig = parseFloat(viewBoxArray[0]); //holds the current xOrig
	this.curyOrig = parseFloat(viewBoxArray[1]); //holds the current yOrig
	this.curWidth = parseFloat(viewBoxArray[2]); //holds the current map width
	this.curHeight = parseFloat(viewBoxArray[3]); //holds the current map height
	//get viewBox of reference map, which is the reference for min/max
	var viewBoxRefMap = this.refmapSVG.getAttributeNS(null,"viewBox");
	var viewBoxRefArray = viewBoxRefMap.split(" ");	
	this.minX = parseFloat(viewBoxArray[0]); //holds the minX value
	this.minY = parseFloat(viewBoxArray[1]); //holds the minY value
	this.maxX = this.minX + parseFloat(viewBoxArray[2]); //holds the maxX value
	this.maxY = this.minY + parseFloat(viewBoxArray[3]); //holds the maxY value
	this.minXorig = this.minX;
	this.minYorig = this.minY;
	this.maxXorig = this.maxX;
	this.maxYorig = this.maxY;
	this.refMapRatio = (this.maxX - this.minX) / (this.maxY - this.minY);
	this.zoomVal = this.maxWidth / this.curWidth * 100; //zoomVal in relation to initial zoom
	this.nrDecimals = nrDecimals; //nr of decimal places to be displayed for show coordinates or accuracy when working with digitizing
	this.epsg = epsg; //epsg projection code - can be used for building URL strings for loading data from a WMS or spatial database, if you don't need it just input any number
	this.navStatus = "info"; //to indicate status in navigation, default is "info", no navigation mode active
	this.units = units; //holds a string with map units, e.g. "m", alternatively String.fromCharCode(176) for degrees
	this.unitsFactor = unitsFactor; //a factor for unit conversion. Can be used f.e. to output feet coordinates when data is meter, If you don't need a conversion, just use a factor of 1
	this.showCoords = showCoords;
	this.dragger = null; //later a reference to the drag rectangle in the reference map
	//initialize array of timestamp/layertoLoad values
	this.nrLayerToLoad = new Array();
	this.timestamp = null; //holds the timestamp after a zoom or pan occured
	//initialize coordinate display if showCoords == true
	if (this.showCoords == true) {
		for (var i=0;i<this.maps.length;i++) {
			//add event listener for coordinate display
			this.maps[i].mapSVG.addEventListener("mousemove",this,false);
		}
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
	this.mapExtents = new Array();
	this.mapExtents.push({xmin:this.curxOrig,ymin:((this.curyOrig + this.curHeight) * -1),xmax:(this.curxOrig + this.curWidth),ymax:(this.curyOrig * -1)});
	this.curMapExtentIndex = 0;
	//initialize highlight cross in reference map
	this.rMhighlightCross = document.createElementNS(svgNS,"g");
	this.rMhighlightCross.setAttributeNS(null,"visibility","hidden");
	for (var attrib in this.highlightAttribs) {
		var attribValue = this.highlightAttribs[attrib];
		if (attrib == "stroke-width") {
			var overview2MainMapFactor = (this.maps[0].pixWidth + this.maps[0].pixHeight) / (parseFloat(this.refmapSVG.getAttributeNS(null,"width"))+parseFloat(this.refmapSVG.getAttributeNS(null,"height")));
			attribValue = ((this.curWidth + this.curHeight) * 0.5) * parseFloat(this.highlightAttribs["stroke-width"]) * overview2MainMapFactor;
		}
		if (attrib == "stroke-dasharray") {
			var dasharray = this.highlightAttribs["stroke-dasharray"].split(",");
			var attribValue = "";
			for (var i=0;i<dasharray.length;i++) {
				attribValue += (((this.curWidth + this.curHeight) * 0.5) * parseFloat(dasharray[i]))+",";
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
	myMapApp.refMapDragger = new dragObj(this.refmapSVG,this.dragSymbol,this.symbolThreshold,this.dragRectAttribs,true,coordXId,coordYId,this);
}

//resets viewBox of main map after zooming and panning
map.prototype.newViewBox = function(history) {
	this.curxOrig = parseFloat(this.dragger.getAttributeNS(null,"x"));
	this.curyOrig = parseFloat(this.dragger.getAttributeNS(null,"y"));
	this.curWidth = parseFloat(this.dragger.getAttributeNS(null,"width"));
	this.curHeight = parseFloat(this.dragger.getAttributeNS(null,"height"));
	var myViewBoxString = this.curxOrig + " " + this.curyOrig + " " + this.curWidth + " " + this.curHeight;
	this.zoomVal = this.maxWidth / this.curWidth * 100;
	myMapApp.sliders["zoomSlider"].setValue(this.curWidth);
	for (var i=0;i<this.maps.length;i++) {
		this.maps[i].pixSize = this.curWidth / this.maps[i].pixWidth;
		this.maps[i].mapSVG.setAttributeNS(null,"viewBox",myViewBoxString);
		//reset line width of hightlightCross
		if (this.highlightAttribs["stroke-width"]) {
			this.maps[i].highlightCross.setAttributeNS(null,"stroke-width",((this.curWidth + this.curHeight) * 0.5) * parseFloat(this.highlightAttribs["stroke-width"]));
		}
		if (this.highlightAttribs["stroke-dasharray"]) {
			var dasharray = this.highlightAttribs["stroke-dasharray"].split(",");
			var attribValue = "";
			for (var i=0;i<dasharray.length;i++) {
				attribValue += (((this.curWidth + this.curHeight) * 0.5) * parseFloat(dasharray[i]))+",";
			}
			attribValue = attribValue.slice(0,attribValue.length - 1);
			this.maps[i].highlightCross.setAttributeNS(null,"stroke-dasharray",attribValue);	
		}
	}
	//remove highlight cross after zooming/panning
	if (this.highlightVisible) {
		this.hideHighlightCross();
	}
	loadProjectSpecific();
	if (history) {
	    this.mapExtents.push({xmin:this.curxOrig,ymin:((this.curyOrig + this.curHeight) * -1),xmax:(this.curxOrig + this.curWidth),ymax:(this.curyOrig * -1)});
        this.curMapExtentIndex = (this.mapExtents.length - 1);
	}
	this.checkButtons();
}

//this function allows to reposition and resize one of the main map
map.prototype.reSizePos = function(mapIndex,x,y,width,height) {
	var widthBefore = this.curWidth;
	var heightBefore = this.curHeight;
	var xBefore = this.curxOrig;
	var yBefore = this.curyOrig;
	this.maps[mapIndex].pixXOffset = x;
	this.maps[mapIndex].pixYOffset = y;
	this.maps[mapIndex].pixWidth = width;
	this.maps[mapIndex].pixHeight = height;
	this.maps[mapIndex].mapSVG.setAttributeNS(null,"x",this.maps[mapIndex].pixXOffset)
	this.maps[mapIndex].mapSVG.setAttributeNS(null,"y",this.maps[mapIndex].pixYOffset)
	this.maps[mapIndex].mapSVG.setAttributeNS(null,"width",this.maps[mapIndex].pixWidth)
	this.maps[mapIndex].mapSVG.setAttributeNS(null,"height",this.maps[mapIndex].pixHeight)
	var newRatio = width / height;
	if (newRatio > this.refMapRatio) {
		var maxHeight = this.maxYorig - this.minYorig;
		if (this.curHeight > maxHeight) {
			this.curHeight = maxHeight;
			this.curyOrig = this.minYorig;
		}
		//case we have to add in width
		this.curWidth = this.curHeight * newRatio;
		this.curxOrig = this.curxOrig + (widthBefore - this.curWidth) * 0.5;
		this.minY = this.minYorig;
		this.maxY = this.maxYorig;
		this.maxWidth = (this.maxY - this.minY) * newRatio;
		this.minX = this.minXorig + ((this.maxXorig - this.minXorig) - this.maxWidth) * 0.5;
		this.maxX = this.maxXorig + ((this.maxXorig - this.minXorig) - this.maxWidth) * -0.5;
	}
	else {
		//case we have to add in height
		this.maxWidth = this.maxXorig - this.minXorig;
		if (this.curWidth > this.maxWidth) {
			this.curWidth = this.maxWidth;
			this.curxOrig = this.minXorig;
		}
		this.minX = this.minXorig;
		this.maxX = this.maxXorig;
		this.curHeight = this.curWidth * (height / width);
		this.curyOrig = this.curyOrig + (heightBefore - this.curHeight) * 0.5;
		var maxHeight = (this.maxX - this.minX) * (height / width);
		this.minY = this.minYorig + ((this.maxYorig - this.minYorig) - maxHeight) * 0.5;
		this.maxY = this.maxYorig + ((this.maxYorig - this.minYorig) - maxHeight) * -0.5;
	}
	this.maps[mapIndex].mapSVG.setAttributeNS(null,"viewBox",this.curxOrig+" "+this.curyOrig+" "+this.curWidth+" "+this.curHeight);

	this.maps[mapIndex].pixSize = this.curWidth / this.maps[mapIndex].pixWidth; //size of a screen pixel in map units
	this.zoomVal = this.maxWidth / this.curWidth * 100; //zoomVal in relation to initial zoom
	
	//need to adopt rect in reference map
	myMapApp.refMapDragger.newView(this.curxOrig,this.curyOrig,this.curWidth,this.curHeight);
		
	//need to adopt zoom slider
	myMapApp.sliders["zoomSlider"].value2 = this.maxWidth;
	myMapApp.sliders["zoomSlider"].setValue(this.curWidth);
	
	//check buttons
	this.checkButtons();
	
	loadProjectSpecific();
}

map.prototype.backwardExtent = function() {
    if (this.curMapExtentIndex != 0) {
        this.curMapExtentIndex--;
        this.setNewViewBox(this.mapExtents[this.curMapExtentIndex].xmin,this.mapExtents[this.curMapExtentIndex].ymin,this.mapExtents[this.curMapExtentIndex].xmax,this.mapExtents[this.curMapExtentIndex].ymax,false);
    }
}

map.prototype.forwardExtent = function() {
    if (this.mapExtents.length != (this.curMapExtentIndex + 1)) {
        this.curMapExtentIndex++;
        this.setNewViewBox(this.mapExtents[this.curMapExtentIndex].xmin,this.mapExtents[this.curMapExtentIndex].ymin,this.mapExtents[this.curMapExtentIndex].xmax,this.mapExtents[this.curMapExtentIndex].ymax,false);
    }
}

map.prototype.checkButtons = function() {
           //check extent history
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
		   //this statement is to avoid rounding errors
		   //previously we had this.curWidth >= this.maxWidth
           if (this.curWidth/this.maxWidth > 0.999) {
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
	if (xmin < this.minX) {
		xmin = this.minX;
	}
	if (xmax > this.maxX) {
		xmax = this.maxX;
	}
	if (ymin < (this.maxY * -1)) {
		ymin = this.maxY * -1;
	}
	if (ymax > (this.minY * -1)) {
		ymax = this.minY * -1;
	}

	var origWidth = xmax - xmin;
	//check if new width is below min width
	if (origWidth < this.minWidth) {
		var diffX = this.minWidth - origWidth;
		xmin -= diffX * 0.5;
		xmax += diffX * 0.5;
		origWidth = this.minWidth;
	}
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
	if (xmin < this.minX) {
		xmin = this.minX;
	}
	if (ymin < this.minY) {
		ymin = this.minY;
	}
	if ((xmin + newWidth) > this.maxX) {
		xmin = this.maxX - newWidth;
	}
	if ((ymin + newHeight) > this.maxY) {
		ymin = this.maxY - newHeight;
	}
	myMapApp.refMapDragger.newView(xmin,ymin,newWidth,newHeight);
	this.newViewBox(history);
}

//handles events associated with navigation
map.prototype.handleEvent = function(evt) {
	var callerId = evt.currentTarget.getAttributeNS(null,"id");
	//System.out.println("callerID="+callerId);
	for (var i=0;i<this.maps.length;i++) {
		if (callerId == "zoomBgRectManual"+i) {
			this.zoomManDragRect(evt,i);
		}
		if (callerId == "zoomBgRectRecenter"+i) {
			this.recenterFinally(evt,i);
		}
		if (callerId == "bgPanManual"+i) {
			this.panManualFinally(evt,i);
		}
		if (callerId == this.maps[i].mapName) {
			if (evt.type == "mousemove") {
				if (this.navStatus != "panmanualActive") {
				    this.showCoordinates(evt,i);
				}
			}
		}
	}
	evt.preventDefault();
}

//calcs coordinates; relies on myMapApp to handle different window sizes and resizing of windows
map.prototype.calcCoord = function(evt,index) {
	//with getScreenCTM the values are already in the inner coordinate system
	if (!this.getScreenCTM) {
		var coords = myMapApp.calcCoord(evt,this.maps[index].mapSVG);
		coords.x = this.curxOrig + (coords.x - this.maps[index].pixXOffset) * this.maps[index].pixSize;
		coords.y = (this.curyOrig + (coords.y - this.maps[index].pixYOffset) * this.maps[index].pixSize);
	}
	else {
		var coords = myMapApp.calcCoord(evt,this.maps[index].mainMapGroup);
	}
	return coords;
}

//displays x and y coordinates in two separate text elements
map.prototype.showCoordinates = function(evt,index) {
	var mapCoords = this.calcCoord(evt,index);
	mapCoords.y *= -1;
	var geogCoords = swiss2geog(mapCoords,0);
	geogCoords.lat = dd2dms(geogCoords.lat);
	geogCoords.lon = dd2dms(geogCoords.lon);
	this.coordXText.nodeValue = "X: " + formatNumberString((mapCoords.x * this.unitsFactor).toFixed(this.nrDecimals)) + this.units + ", Y: " + formatNumberString((mapCoords.y * this.unitsFactor).toFixed(this.nrDecimals)) + this.units;
	this.coordYText.nodeValue = "E "+geogCoords.lon.deg +String.fromCharCode(176)+" "+geogCoords.lon.min+"' "+geogCoords.lon.sec.toFixed(2)+"'', N "+geogCoords.lat.deg +String.fromCharCode(176)+" "+geogCoords.lat.min+"' "+geogCoords.lat.sec.toFixed(2)+"''";
}

//checks for and removes temporary rectangle objects
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
			for (var i=0;i<this.maps.length;i++) {
				this.maps[i].backgroundRect.setAttributeNS(null,"id","mapBackgroundRect");
				this.maps[i].mapSVG.setAttributeNS(null,"cursor","crosshair");
				this.maps[i].mainMapGroup.insertBefore(this.maps[i].backgroundRect,this.maps[i].mainMapGroup.firstChild);
			}
			this.navStatus = "info";
			statusChange("Mode: Infomode");
			if (!myMapApp.buttons["infoButton"].getSwitchValue()) {
				myMapApp.buttons["infoButton"].setSwitchValue(true,false);
			}
		}
	}
}

//starts manual zooming mode
map.prototype.zoomManual = function(evt) {
	if (Math.round(this.curWidth) > this.minWidth && evt.detail == 1) {
		this.navStatus = "zoomManual";
		for (var i=0;i<this.maps.length;i++) {
			this.maps[i].backgroundRect.setAttributeNS(null,"id","zoomBgRectManual"+i);
			this.maps[i].mainMapGroup.appendChild(this.maps[i].backgroundRect);
			this.maps[i].mapSVG.setAttributeNS(null,"cursor","se-resize");
		}
		statusChange("Click and drag rectangle for new map extent.");
	}
}

//manages manual zooming by drawing a rectangle
map.prototype.zoomManDragRect = function(evt,index) {
	var mapCoords = this.calcCoord(evt,index);
	var myX = mapCoords.x;
	var myY = mapCoords.y;
	var myYXFact = this.curHeight / this.curWidth;
	var minTempWidth = this.curWidth*0.005; //this is to prevent a zero width rectangle
	if (evt.type == "mousedown") {
		this.manZoomActive = 1;
		this.zoomRect = document.createElementNS(svgNS,"rect");
		this.zoomRect.setAttributeNS(null,"id","zoomRect");
		for (var attrib in this.zoomRectAttribs) {
			var attribValue = this.zoomRectAttribs[attrib];
			if (attrib == "stroke-width") {
				attribValue = ((this.curWidth + this.curHeight) * 0.5) * parseFloat(this.zoomRectAttribs["stroke-width"]);
			}
			if (attrib == "stroke-dasharray") {
				var dasharray = this.zoomRectAttribs["stroke-dasharray"].split(",");
				var attribValue = "";
				for (var i=0;i<dasharray.length;i++) {
					attribValue += (((this.curWidth + this.curHeight) * 0.5) * parseFloat(dasharray[i]))+",";
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
		this.maps[index].mainMapGroup.appendChild(this.zoomRect);
		this.zoomRectOrigX = myX;
		this.zoomRectOrigY = myY;
	}
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
			myMapApp.refMapDragger.newView(zoomRectX,zoomRectY,zoomRectWidth,zoomRectHeight);
			this.newViewBox(true);
		}
		this.maps[index].mainMapGroup.removeChild(this.zoomRect);
		statusChange("Mode: Manual Zooming");
	}
}

//initializes recentering mode
map.prototype.recenter = function(evt) {
	if (evt.detail == 1) {
		this.navStatus = "recenter";
		for (var i=0;i<this.maps.length;i++) {
			this.maps[i].backgroundRect.setAttributeNS(null,"id","zoomBgRectRecenter"+i);
			this.maps[i].mainMapGroup.appendChild(this.maps[i].backgroundRect);
			this.maps[i].mapSVG.setAttributeNS(null,"cursor","pointer");
		}
		statusChange("Click in map to define new map center.");
	}
}

//finishes recentering after mouse-click
map.prototype.recenterFinally = function(evt,index) {
	if (evt.type == "click") {
		var mapCoords = this.calcCoord(evt,index);
		var myX = mapCoords.x;
		var myY = mapCoords.y;
		var myNewX = myX - this.curWidth / 2;
		var myNewY = myY - this.curHeight / 2;

		//check if within constraints
		if (myNewX < this.minX) {
			myNewX = this.minX;
		}
		if (myNewY < this.minY) {
			myNewY = this.minY;
		}
		if ((myNewX + this.curWidth) > this.maxX) {
			myNewX = this.maxX - this.curWidth;
		}
		if ((myNewY + this.curHeight) > this.maxY) {
			myNewY = this.maxY - this.curHeight;
		}
		myMapApp.refMapDragger.newView(myNewX,myNewY,this.curWidth,this.curHeight);
		this.newViewBox(true);
		statusChange("Mode: Recentering Map");
	}
}

//initializes manual panning
map.prototype.panManual = function(evt) {
	if (evt.detail == 1) {
		this.navStatus = "panmanual";
		for (var i=0;i<this.maps.length;i++) {
			this.maps[i].backgroundRect.setAttributeNS(null,"id","bgPanManual"+i);
			this.maps[i].mainMapGroup.appendChild(this.maps[i].backgroundRect);
			this.maps[i].mapSVG.setAttributeNS(null,"cursor","move");
		}
		statusChange("Mouse down and move to pan the map");
	}
}

//manages and finishes manual panning
map.prototype.panManualFinally = function(evt,index) {
	if (evt.type == "mousedown") {
		this.navStatus = "panmanualActive";
		this.panCoords = this.calcCoord(evt,index);
		this.panCoorX = this.panCoords.x;
		this.panCoorY = this.panCoords.y;
		this.diffX = 0;
		this.diffY = 0;
		this.maps[index].mainMapGroup.setAttributeNS(batikNS,"static","true");
	}
	if (evt.type == "mousemove" && this.navStatus == "panmanualActive") {
		var mapCoords = this.calcCoord(evt,index);
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
		if (myNewX < this.minX) {
			var myNewXTemp = this.minX;
			this.diffX = this.diffX + (myNewXTemp - myNewX);
			myNewX = myNewXTemp;
		}
		if (myNewY < this.minY) {
			var myNewYTemp = this.minY;
			this.diffY = this.diffY + (myNewYTemp - myNewY);
			myNewY = myNewYTemp;
		}
		if ((myNewX + this.curWidth) > this.maxX) {
			var myNewXTemp = this.maxX - this.curWidth;
			this.diffX = this.diffX + (myNewXTemp - myNewX);
			myNewX = myNewXTemp;
		}
		if ((myNewY + this.curHeight) > this.maxY) {
			var myNewYTemp = this.maxY - this.curHeight;
			this.diffY = this.diffY + (myNewYTemp - myNewY);
			myNewY = myNewYTemp;
		}
		var transformString = "translate("+(this.diffX * -1) +","+(this.diffY * -1)+")";
		this.maps[index].mainMapGroup.setAttributeNS(null,"transform",transformString);
		myMapApp.refMapDragger.newView(myNewX,myNewY,this.curWidth,this.curHeight);
	}
	if ((evt.type == "mouseup" || evt.type == "mouseout") && this.navStatus == "panmanualActive") {
		this.navStatus = "panmanual";
		this.maps[index].mainMapGroup.setAttributeNS(batikNS,"static","false");
		this.maps[index].mainMapGroup.setAttributeNS(null,"transform","translate(0,0)");
		this.newViewBox(true);
		statusChange("Mode: Manual Panning");
	}
}

//highlight a point position using a highlight cross
map.prototype.highlightPosition = function(xcoor,ycoor,hlOverview) {
	var returnVal = false;
	this.highlightVisible = true;
	//check if coordinate within visible map range
	if (this.pointTestWithin(xcoor,ycoor)) {
		for (var i=0;i<this.maps.length;i++) {
			this.maps[i].highlightCrossHoriz.setAttributeNS(null,"x1",this.curxOrig);
			this.maps[i].highlightCrossHoriz.setAttributeNS(null,"x2",(this.curxOrig+this.curWidth));
			this.maps[i].highlightCrossHoriz.setAttributeNS(null,"y1",ycoor * -1);
			this.maps[i].highlightCrossHoriz.setAttributeNS(null,"y2",ycoor * -1);
			this.maps[i].highlightCrossVert.setAttributeNS(null,"x1",xcoor);
			this.maps[i].highlightCrossVert.setAttributeNS(null,"x2",xcoor);
			this.maps[i].highlightCrossVert.setAttributeNS(null,"y1",this.curyOrig);
			this.maps[i].highlightCrossVert.setAttributeNS(null,"y2",(this.curyOrig+this.curHeight));
			this.maps[i].highlightCross.setAttributeNS(null,"visibility","visible");
		}
		returnVal = true;
	}
	else {
	    if (this.highlightVisible) {
			for (var i=0;i<this.maps.length;i++) {
	        	this.maps[i].highlightCross.setAttributeNS(null,"visibility","hidden");
			}
	    }
	}
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
map.prototype.hideHighlightCross = function() {
	for (var i=0;i<this.maps.length;i++) {
		this.maps[i].highlightCross.setAttributeNS(null,"visibility","hidden");
	}
	this.rMhighlightCross.setAttributeNS(null,"visibility","hidden");
	this.highlightVisible = false;
}

//remove all temporarily added elements and event listeners
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

map.prototype.addMap = function(mapName,dynamicLayers,digiLayers,activeDigiLayer) {
	this.maps.push(new mapData(mapName,dynamicLayers,digiLayers,activeDigiLayer,this.highlightAttribs));
	var index = this.maps.length - 1;
	this.maps[index].backgroundRect.addEventListener("mousedown",this,false);
	this.maps[index].backgroundRect.addEventListener("mousemove",this,false);
	this.maps[index].backgroundRect.addEventListener("mouseup",this,false);
	this.maps[index].backgroundRect.addEventListener("mouseout",this,false);
	this.maps[index].backgroundRect.addEventListener("click",this,false);
	this.maps[index].mapSVG.addEventListener("mousemove",this,false);
	if (this.navStatus == "zoomManual") {
			this.maps[index].backgroundRect.setAttributeNS(null,"id","zoomBgRectManual"+index);
			this.maps[index].mainMapGroup.appendChild(this.maps[index].backgroundRect);
			this.maps[index].mapSVG.setAttributeNS(null,"cursor","se-resize");	
	}
	if (this.navStatus == "recenter") {
			this.maps[index].backgroundRect.setAttributeNS(null,"id","zoomBgRectRecenter"+index);
			this.maps[index].mainMapGroup.appendChild(this.maps[index].backgroundRect);
			this.maps[index].mapSVG.setAttributeNS(null,"cursor","pointer");	
	}
	if (this.navStatus == "panmanual" || this.navStatus == "panmanualActive") {
			this.maps[index].backgroundRect.setAttributeNS(null,"id","bgPanManual"+index);
			this.maps[index].mainMapGroup.appendChild(this.maps[index].backgroundRect);
			this.maps[index].mapSVG.setAttributeNS(null,"cursor","move");	
	}
}

map.prototype.removeMap = function(index) {
	if (index < this.maps.length) {
		//first remove bg rectangle
		this.maps[index].mainMapGroup.removeChild(this.maps[index].backgroundRect);
		if (index == (this.maps.length - 1)) {
			this.maps.pop();
		}
		else if (index == 0) {
			this.maps.shift();
		}
		else {
			var tempArray = this.maps.slice(0,index-1).concat(this.maps.slice(index+1,this.maps.length-1));
			this.maps = tempArray;
		}
	}
	else {
		alert("error in map object (method 'removeMap'): provided parameter index with value of '"+index+"' is out of range.")
	}
}

function mapData(mapName,dynamicLayers,digiLayers,activeDigiLayer,highlightAttribs) {
	this.mapName = mapName;
	this.dynamicLayers = dynamicLayers;
	this.digiLayers = digiLayers;
	this.activeDigiLayer = activeDigiLayer;
	this.highlightAttribs = highlightAttribs;

	this.mapSVG = document.getElementById(this.mapName); //reference to nested SVG element holding the map-graphics
	this.mainMapGroup = document.getElementById(this.mapName+"Group"); //group within mainmap - to be transformed when panning manually
	this.pixXOffset = parseFloat(this.mapSVG.getAttributeNS(null,"x")); //offset from left margin of outer viewBox
	this.pixYOffset = parseFloat(this.mapSVG.getAttributeNS(null,"y")); //offset from top margin of outer viewBox
	this.pixWidth = parseFloat(this.mapSVG.getAttributeNS(null,"width")); //holds width of the map in pixel coordinates
	this.pixHeight = parseFloat(this.mapSVG.getAttributeNS(null,"height")); //holds height of the map in pixel coordinates
	this.nrLayerToLoad = 0; //statusVariable to indicate how many layers are still to load

	var viewBox = this.mapSVG.getAttributeNS(null,"viewBox");
	var viewBoxArray = viewBox.split(" ");
	var curxOrig = parseFloat(viewBoxArray[0]); //holds the current xOrig
	var curyOrig = parseFloat(viewBoxArray[1]); //holds the current yOrig
	var curWidth = parseFloat(viewBoxArray[2]); //holds the current map width
	var curHeight = parseFloat(viewBoxArray[3]); //holds the current map height
	this.pixSize = curWidth / this.pixWidth; //size of a screen pixel in map units

	//create background-element to receive events for showing coordinates
	//this rect is also used for manual zooming and panning
	this.backgroundRect = document.createElementNS(svgNS,"rect");
	this.backgroundRect.setAttributeNS(null,"x",curxOrig);
	this.backgroundRect.setAttributeNS(null,"y",curyOrig);
	this.backgroundRect.setAttributeNS(null,"width",curWidth);
	this.backgroundRect.setAttributeNS(null,"height",curHeight);
	this.backgroundRect.setAttributeNS(null,"fill","none");
	this.backgroundRect.setAttributeNS(null,"stroke","none");
	this.backgroundRect.setAttributeNS(null,"pointer-events","fill");
	this.backgroundRect.setAttributeNS(null,"id","mapBackgroundRect");
	this.mainMapGroup.insertBefore(this.backgroundRect,this.mainMapGroup.firstChild);
	//initialize highlight cross in main map
	this.highlightCross = document.createElementNS(svgNS,"g");
	this.highlightCross.setAttributeNS(null,"visibility","hidden");
	this.highlightVisible = false; //indicates whether hightlightcrosshair is visible
	for (var attrib in this.highlightAttribs) {
		var attribValue = this.highlightAttribs[attrib];
		if (attrib == "stroke-width") {
			attribValue = ((curWidth + curHeight) * 0.5) * parseFloat(this.highlightAttribs["stroke-width"]);
		}
		if (attrib == "stroke-dasharray") {
			var dasharray = this.highlightAttribs["stroke-dasharray"].split(",");
			var attribValue = "";
			for (var i=0;i<dasharray.length;i++) {
				attribValue += (((curWidth + curHeight) * 0.5) * parseFloat(dasharray[i]))+",";
			}
			attribValue = attribValue.slice(0,attribValue.length - 1);
		}
		this.highlightCross.setAttributeNS(null,attrib,attribValue);
	}
	this.highlightCross.setAttributeNS(null,"pointer-events","none");
	this.highlightCrossHoriz = document.createElementNS(svgNS,"line");
	this.highlightCrossHoriz.setAttributeNS(null,"x1",curxOrig);
	this.highlightCrossHoriz.setAttributeNS(null,"x2",curxOrig + curWidth);
	this.highlightCrossHoriz.setAttributeNS(null,"y1",curyOrig + curHeight * 0.5);
	this.highlightCrossHoriz.setAttributeNS(null,"y2",curyOrig + curHeight * 0.5);
	this.highlightCross.appendChild(this.highlightCrossHoriz);
	this.highlightCrossVert = document.createElementNS(svgNS,"line");
	this.highlightCrossVert.setAttributeNS(null,"x1",curxOrig + curWidth * 0.5);
	this.highlightCrossVert.setAttributeNS(null,"x2",curxOrig + curWidth * 0.5);
	this.highlightCrossVert.setAttributeNS(null,"y1",curyOrig);
	this.highlightCrossVert.setAttributeNS(null,"y2",curyOrig + curHeight);
	this.highlightCross.appendChild(this.highlightCrossVert);
	this.mainMapGroup.appendChild(this.highlightCross);
}

//make an element (rectangle) draggable within constraints
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
	this.newView(this.mainMapObj.minX,this.mainMapObj.minY,(this.mainMapObj.maxX - this.mainMapObj.minX),(this.mainMapObj.maxY - this.mainMapObj.minY));
	this.status = false;
}

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

dragObj.prototype.handleEvent = function(evt) {
	if (evt.type == "mousemove" && this.showCoords) {
		var mapCoords = this.calcCoord(evt);
		this.coordXText.nodeValue = "X: " + formatNumberString(mapCoords.x.toFixed(this.mainMapObj.nrDecimals)) + this.mainMapObj.units + ", Y: " + formatNumberString((mapCoords.y * -1).toFixed(this.mainMapObj.nrDecimals)) + this.mainMapObj.units;
		this.coordYText.nodeValue = " ";
	}
	this.drag(evt);
	evt.preventDefault();
}

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
	if (toMoveX < this.mainMapObj.minX) {
		toMoveX = this.mainMapObj.minX;
	}
	if ((toMoveX + width) > this.mainMapObj.maxX) {
		toMoveX = this.mainMapObj.maxX - width;
	}
	if (toMoveY < this.mainMapObj.minY) {
		toMoveY = this.mainMapObj.minY;
	}
	if ((toMoveY + width * myRatio) > this.mainMapObj.maxY) {
		toMoveY = this.mainMapObj.maxY - width * myRatio;
	}
	this.newView(toMoveX,toMoveY,width,width * myRatio);
	if (status == "release") {
	    myMainMap.stopNavModes("slider");
		this.mainMapObj.newViewBox(true);
	}
}

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
		if (toMoveX < this.mainMapObj.minX) {
			toMoveX = this.mainMapObj.minX;
		}
		if ((toMoveX + myWidth) > this.mainMapObj.maxX) {
			toMoveX = this.mainMapObj.maxX - myWidth;
		}
		if (toMoveY < this.mainMapObj.minY) {
			toMoveY = this.mainMapObj.minY;
		}
		if ((toMoveY + myHeight) > this.mainMapObj.maxY) {
			toMoveY = this.mainMapObj.maxY - myHeight;
		}
		this.newView(toMoveX,toMoveY,myWidth,myHeight);
	}
	if ((evt.type == "mouseup" || evt.type == "mouseout") && this.status == true) {
		this.status = false;
		this.myRefMap.setAttributeNS(null,"cursor","crosshair");
		this.mainMapObj.newViewBox(true);
	}
}

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
			var myNewX = this.mainMapObj.minX;
			var myNewY = this.mainMapObj.minY;
			var myNewWidth = this.mainMapObj.maxX - this.mainMapObj.minX;
			var myNewHeight = this.mainMapObj.maxY - this.mainMapObj.minY;
			break;
	}
	//check if within constraints
	if (myNewWidth > (this.mainMapObj.maxX - this.mainMapObj.minX)) {
		myNewWidth = this.mainMapObj.maxX - this.mainMapObj.minX;
	}
	if (myNewHeight > (this.mainMapObj.maxY - this.mainMapObj.minY)) {
		myNewHeight = this.mainMapObj.maxY - this.mainMapObj.minY;
	}
	if (myNewX < this.mainMapObj.minX) {
		myNewX = this.mainMapObj.minX;
	}
	if (myNewY < this.mainMapObj.minY) {
		myNewY = this.mainMapObj.minY
	}
	if ((myNewX + myNewWidth) > this.mainMapObj.maxX) {
		myNewX = this.mainMapObj.maxX - myNewWidth;
	}
	if ((myNewY + myNewHeight) > this.mainMapObj.maxY) {
		myNewY = this.mainMapObj.maxY - myNewHeight;
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
	if (rectXulcorner < this.mainMapObj.minX) {
		rectXulcorner = this.mainMapObj.minX;
	}
	if (rectYulcorner < this.mainMapObj.minY) {
		rectYulcorner = this.mainMapObj.minY;
	}
	if ((rectXulcorner + width) > this.mainMapObj.maxX) {
		rectXulcorner = this.mainMapObj.maxX - width;
	}
	if ((rectYulcorner + height) > this.mainMapObj.maxY) {
		rectYulcorner = this.mainMapObj.maxY - height;
	}
	this.newView(rectXulcorner,rectYulcorner,width,height);

	//set viewport of main map
	if ((xulcorner != rectXulcorner) || (yulcorner != rectYulcorner)) {
		this.mainMapObj.newViewBox(true);
	}

	statusChange("map ready ...");
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
				statusChange("Maximum zoom factor reached. Cannot zoom in any more.");
			}
		}
		if (inOrOut == "out") {
			if (Math.round(myMainMap.curWidth) < myMainMap.maxWidth) {
				myMapApp.refMapDragger.zoom("out");
			}
			else {
				statusChange("Minimum zoom factor reached. Cannot zoom out any more.");
			}
		}
		if (inOrOut == "full") {
			if (Math.round(myMainMap.curWidth) < myMainMap.maxWidth) {
				myMapApp.refMapDragger.zoom("full");
			}
			else {
				statusChange("Full view already reached.");
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
function showExtent() {
	with(myMainMap) {
		alert("Xmin="+curxOrig.toFixed(nrDecimals)+units+"; Xmax="+(curxOrig + curWidth).toFixed(nrDecimals)+units+"\nYmin="+((curyOrig + curHeight) * -1).toFixed(nrDecimals) +units+"; Ymax="+(curyOrig*-1).toFixed(nrDecimals)+units+"\nWidth="+curWidth.toFixed(nrDecimals)+units+"; Height="+curHeight.toFixed(nrDecimals)+units);
	}
}