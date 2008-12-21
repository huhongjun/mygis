// Author: Unregistered Demo Version/Creator: MapViewSVG Professional 6.2.11 for ArcGIS by uismedia (http://www.mapviewsvg.com); 2007-8-9 9:44:23
var SVGscalebar;
var theScalebarFlag = true;
var theMassGesamtLength = 600;
var theRectCount = 3;
var ObjectLinkText = "Further Data";
var BrowserSet = 'width=400,height=400,top=50,left=50,toolbar=no,menubar=no,location=no,hotkeys=no,resizable=yes,scrollbars=no,dependent=yes,status=no';
var infoWindowLabel = "Object-Information";
var CloseButText = "Clear Selection";
var PrintButText = "Print";
var WMSLayerArray = new Array(0);
var ShareGeomArray = new Array();
var ShareGeomId = '';
var theShowKoord = 'statusbar';
var theHiColor = 'red';
var theBGColor = 'white';
var theBGColor2 = 'silver';
var SVGSupportText = "This site needs the Adobe SVG Viewer 3.0.\n(http://www.adobe.com/svg/viewer/install/main.html)";
var theLegMapKoeff = 2.05;
var QueryNoRecText = "No records selected. (Maybe due to the Demo Version.)";
var SVGover;
var SVGoverRect;
var theOverviewFlag = true;
var theLegendFlag = true;
var SVGlegend;
var ScrollArray = new Array(2);
var theGetscaleFlag = true;
var theGeneralScaleFlag = true;
var theScaleConvert = 3393;
var CheckStatus = 1;
var butZoomFlag = false;
var thePrecision = 3;
var theXOrigin = 88.75;
var theYOrigin = 1011.25;
var maxScaleFakt = 20;
var theProfVersion = 0;
var theProgNS = "http://www.mapviewsvg.com";

function OperaFlag() {
  var theFlag = false;
  if (document.implementation && document.implementation.createDocument) {
    if (navigator.appName.toLowerCase().indexOf('opera') != -1) theFlag = true;
  }
  return theFlag;
}
function embedHead() {
  if (OperaFlag()) {
    document.write('<div id="head"><object type="image/svg+xml" id="svgdocHead" data="embfiles/head.svg" width="719px" height="55px"><param name="src" value="embfiles/head.svg"></object></div>');
  } else {
    document.write('<div id="head"><embed type="image/svg+xml" id="svgdocHead" src="embfiles/head.svg" width="719px" height="55px"/></div>');
  }
}
function embedLegend() {
  if (OperaFlag()) {
    document.write('<div id="legend"><object type="image/svg+xml"  id="svgdocLegend" data="embfiles/legend.svg" width="40px" height="33px"><param name="src" value="embfiles/legend.svg"></object></div>');
  } else {
    document.write('<div id="legend"><embed type="image/svg+xml"  id="svgdocLegend" src="embfiles/legend.svg" width="40px" height="33px"/></div>');
  }
}
function embedMap() {
  if (OperaFlag()) {
    document.write('<div id="map"><object type="image/svg+xml"  id="svgdocMap" data="embfiles/map.svg" width="448px" height="448px"><param name="src" value="embfiles/map.svg"></object></div>');
  } else {
    document.write('<div id="map"><embed type="image/svg+xml"  id="svgdocMap" src="embfiles/map.svg" width="448px" height="448px"/></div>');
  }
}
function embedOverview() {
  if (OperaFlag()) {
    document.write('<div id="overview"><object type="image/svg+xml"  id="svgdocOverview" data="embfiles/overview.svg" width="150px" height="150px"><param name="src" value="embfiles/overview.svg"></object></div>');
  } else {
    document.write('<div id="overview"><embed type="image/svg+xml"  id="svgdocOverview" src="embfiles/overview.svg" width="150px" height="150px"/></div>');
  }
}
function embedSiteinfo() {
  if (OperaFlag()) {
    document.write('<div id="siteinfo"><object type="image/svg+xml"  id="svgdocSiteinfo" data="embfiles/siteinfo.svg" width="0px" height="0px"><param name="src" value="embfiles/siteinfo.svg"></object></div>');
  } else {
    document.write('<div id="siteinfo"><embed type="image/svg+xml"  id="svgdocSiteinfo" src="embfiles/siteinfo.svg" width="0px" height="0px"/></div>');
  }
}
function embedScalebar() {
  if (OperaFlag()) {
    document.write('<div id="scalebar"><object type="image/svg+xml"  id="svgdocScalebar" data="embfiles/scalebar.svg" width="298px" height="35px"><param name="src" value="embfiles/scalebar.svg"></object></div>');
  } else {
    document.write('<div id="scalebar"><embed type="image/svg+xml"  id="svgdocScalebar" src="embfiles/scalebar.svg" width="298px" height="35px"/></div>');
  }
}

function userInit() {
//This function is for your own scripts, it will be called on loading, do not delete it
//myAlert("function userInit");
}
