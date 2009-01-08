/*charset="iso-8859-1"*/

var theAlert = window.alert;
window.alert = null;
var blnInit = false;
var SVGRoot = null;
var SVGmap = null;
var svgwinMap = null;
var ViewboxArray = new Array(2);
var ExtentArray = new Array(2);
var ThemeArray = new Object();
var massZahl = 1;
var colHiliteArray = null;
var colIdentifyArray = null;
var colSelRecArray = null;
var colHiliteSelRecArray = null;
var measureString = '';
var measureCount = 0;
var dataWindow = null;
var theTask = 'identify';
var curScale = 1; // als Globalvariable jetzt auch in der ASV-Zoom-Version sonst hier nicht unbedingt noetig
var XMLFileArray = new Array(); // Laden der XML-Dateien in den Speicher, sonst staendiges Neuladen
var sliderNumActive = 0;
var scrollTimeout = null;
var browserType = '';
var objToolbar = null;
var ExtentBMArray = new Array();
var ExtentIndex = -1;
var zoomObjectIndex = 0;
var zoomBookmark = 0;

// Prof-Version
var layerArray = new Array();
var blnUseScaleInfo = true;
var gNoTileAdd = false;
var oldCurScale = 1; 
var objHTMLDocument;
var startURL = '';

// AIO-Vergleich
// ViewboxArray 0=map(original) 1=map(aktuell) 2=over(original)
// ExtentArray  0=map(von Datei) 1=map(Bildschirmangepasst = mapBrowseWidth/-Height)
//              2=legend(von Datei) 3=legend(Bildschirmangepasst) 4=over(von Datei) 5=over(Bildschirmangepasst)


function init() {
  blnInit = false;

  // Testen des Browsertyps?
  if (document.implementation && document.implementation.createDocument) {
    browserType = 'netscape';
    if (navigator.appName.toLowerCase().indexOf('opera') != -1) browserType = 'opera';
  } else {
    if (window.ActiveXObject) {
      browserType = 'mie';
    }
  }

  oldCurScale = 1;
  
  // based on code by Jonathan Watt (jwatt)
  var embed = document.getElementById('svgdocMap');

  if (browserType == 'opera') {
    while (!embed) {
      var embed = document.getElementById('svgdocMap');
    }
  }

  try {
    SVGRoot = embed.getSVGDocument();
  }
  catch(error) {
    myAlert('Browser does not support MapViewSVG functionality');
    return false;
  }

  if (SVGRoot && SVGRoot.defaultView) {
    svgwinMap = SVGRoot.defaultView;
  }
  else if (embed.window) {
    svgwinMap = embed.window;
  }
  else try {
    svgwinMap = embed.getWindow(); ///xxx anders als bei watt
  }
  catch(error) {
    myAlert('Browser does not support MapViewSVG functionality'); 
  }

  SVGmap = SVGRoot.getElementById('map');

  saveViewBox(SVGmap,0);
  saveViewBox(SVGmap,1);
  saveExtent(SVGmap,1);
  addToExtentBM();

  if (theGeneralScaleFlag) {
    massZahl = getMassZahl(curScale);
  }

  if (theOverviewFlag) {

    embed = document.getElementById('svgdocOverview');

    SVGover = embed.getSVGDocument();
    SVGoverRect = SVGover.getElementById("overrect");

    saveViewBox(SVGover.documentElement,2);
    saveExtent(SVGover.documentElement,5);

  }

  if (theLegendFlag) {
    embed = document.getElementById('svgdocLegend');
    SVGlegend = embed.getSVGDocument();
  }

  listThemes();

  checkVisThemes();

  if (theScalebarFlag) {
    embed = document.getElementById('svgdocScalebar');
    SVGscalebar = embed.getSVGDocument();
  }


  if (theGetscaleFlag) {

    if (theGeneralScaleFlag) {
      showMassZahl();

    } else {
      document.formZoom.listZoom.selectedIndex = 0;
    }

  }

  if (document.formZoomObject != null) {
    document.formZoomObject.listZoomObject.selectedIndex = 0;
  }

  // Testen des ASV
  if (browserType == 'mie') {
    if (embed.getSVGViewerVersion().indexOf('2.0') != -1) {
      myAlert(SVGSupportText);
      if (SVGRoot.getElementById('ASVText')) {
        SVGRoot.getElementById('ASVText').setAttribute('display','inline');
        return false;
      }
    }
  }

  if (location.href.lastIndexOf('/') != -1) startURL = location.href.substring(0,(location.href.lastIndexOf('/') + 1));


  // 
  var DemoStat = (theOverviewFlag) ? 'w' : 'a';
  DemoStat = DemoStat + thePrecision.toString() + theXOrigin.toString().substr(1,1) + 'eH';
  DemoStat = DemoStat + theHiColor.substr(2,1).toUpperCase() + theLegMapKoeff.toString().substr(theLegMapKoeff.toString().length - 1,1);

  if (CheckStatus != DemoStat) {
    var newNode = SVGRoot.createElementNS('http://www.w3.org/2000/svg','defs');
    var pathNode = buildSVGNode(SVGRoot,'path',{'id':'demopath', 'd':'M ' + ViewboxArray[0][0] + ' ' + ViewboxArray[0][1] + 'l ' + ViewboxArray[0][2] + ' ' + ViewboxArray[0][3] });
    newNode.appendChild(pathNode);
    SVGmap.appendChild(newNode);
    var newNode = SVGRoot.createElementNS('http://www.w3.org/2000/svg','text');
    var theFontsize = (ExtentArray[1][0] + ExtentArray[1][1]) / 6 * theLegMapKoeff;
    if (theFontsize == 0) theFontsize = 100;
    var textNode = SVGRoot.createTextNode('DEMO');
    if (browserType != 'netscape') {
      setAttributesSVG(newNode,{'font-size':theFontsize,'fill':'grey','fill-opacity':0.5,'baseline-shift':'-30%','pointer-events':'none'}) 
      var textPathNode = SVGRoot.createElementNS('http://www.w3.org/2000/svg','textPath');
      textPathNode.setAttributeNS('http://www.w3.org/1999/xlink','href','#demopath');
      textPathNode.setAttributeNS(null,'startOffset','15%');
      textPathNode.appendChild(textNode);
      newNode.appendChild(textPathNode);
    } else {
      setAttributesSVG(newNode,{'font-size':theFontsize,'fill':'grey','fill-opacity':0.5,'pointer-events':'none','x':ViewboxArray[0][0],'y':(ViewboxArray[0][3] - ViewboxArray[0][1]) / 2}) 
      newNode.appendChild(textNode);
    }
    SVGmap.appendChild(newNode);
  }

  objHTMLDocument = this;

  // mozXPath [http://km0ti0n.blunted.co.uk/mozxpath/] km0ti0n@gmail.com

  try {
    if (document.implementation.hasFeature("XPath", "3.0")) {
      if(window.Document && !window.XMLDocument) window.XMLDocument = window.Document;      
      XMLDocument.prototype.selectNodes = function(cXPathString, xNode) {
        if (!xNode) { xNode = this; } 
        var oNSResolver = this.createNSResolver(this.documentElement);
        var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var aResult = [];
        for( var i=0;i<aItems.snapshotLength; i++) {
          aResult[i] =  aItems.snapshotItem(i);
        }
        return aResult;
      }

      XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode) {
        if( !xNode ) { xNode = this; } 
        var xItems = this.selectNodes(cXPathString, xNode);
        if( xItems.length > 0 ) {
          return xItems[0];
        } else {
          return null;
        }
      }

      Element.prototype.selectNodes = function(cXPathString) {
        if(this.ownerDocument.selectNodes) {
          return this.ownerDocument.selectNodes(cXPathString, this);
        } else { throw "For XML Elements Only"; }
      }

      Element.prototype.selectSingleNode = function(cXPathString) {	
        if(this.ownerDocument.selectSingleNode) {
          return this.ownerDocument.selectSingleNode(cXPathString, this);
        } else { throw "For XML Elements Only"; }
      }
    }
  }
  catch(error) {
  }


  if (typeof(theProfVersion) != 'undefined' && theProfVersion == 1) {
    if (ShareGeomId) {
      var theParArray = ShareGeomId.split("_");
      if (theParArray[3] == 'xml') XMLFileArray[theParArray[0]] = loadXMLDoc('embfiles/' + theParArray[0] + '.xml');
    }
    if (svgwinMap) svgwinMap.DynFindExtent(this);
  }

  // Toolbar aufbauen
  objToolbar = new Toolbar();
  createToolbar();
  //userToolbar();
  //clickEvents(theTask);

  //User-Skripte
  userInit();


  blnInit = true;

}

//*********************************
//** Button-Navigation-Functions
//*********************************

function ToolbarButton(obj) {
  this.obj = obj;
  this.id = obj.id;
  this.clickImg = "";
  this.enableImg = "";
  this.overImg = "";
  this.disableImg = "";
  this.state = 0;
  this.click = "";
  this.action = 'enabled';

  if(this.obj.addEventListener) this.obj.addEventListener('click',clickBut,false);
  else if(this.obj.attachEvent) this.obj.attachEvent('onclick',clickBut);

  if(this.obj.addEventListener) this.obj.addEventListener('mouseout',mouseoutEvents,false);
  else if(this.obj.attachEvent) this.obj.attachEvent('onmouseout',mouseoutEvents);

  if(this.obj.addEventListener) this.obj.addEventListener('mouseover',mouseoverEvents,false);
  else if(this.obj.attachEvent) this.obj.attachEvent('onmouseover',mouseoverEvents);

  this.clickEvent = function() {
    if (this.click.length > 0) {
      var theFunction = makeFunction(this.click);
      window.setTimeout(theFunction,0);
     }
  }
}

function Toolbar() {
  this.Array = new Array();

  this.add = function(obj) {
    this.Array.push(obj); 
  }

  this.remove = function() {
  }

  this.item = function(id) {
    for (var i=0;i<this.Array.length;i++) {
      if (this.Array[i].id == id) {
        return this.Array[i];
      }
    }
  }

  this.clearAction = function() {
    for (var i=0;i<this.Array.length;i++) {
      var objButton = this.Array[i];
      if (objButton.state == 1) {
        objButton.obj.setAttribute('src',objButton.enableImg);
      }
      objButton.action = 'enabled';
    }
  }
}

function clearEvents() {

  if (theTask == 'measure' || theTask == 'koord') {
    SVGRoot.getElementById('koordrect').setAttributeNS(null,'pointer-events','none');
    SVGRoot.getElementById('measurePath').setAttributeNS(null,'d', 'M 0 0 L 0 0');
    SVGRoot.getElementById('measureCircle').setAttributeNS(null,'visibility','hidden');
    SVGRoot.getElementById('measureLine').setAttributeNS(null,'visibility','hidden');
    if (theShowKoord == 'textbox') {
      document.formShowKoord.style.display = 'none';
      document.formShowKoord.ShowKoord.value = '';
    }
    window.status = "";
    measureCount = 0;
  }

  if (SVGRoot.getElementById('panAndZoomRect')) {
    var panZoomRect = SVGRoot.getElementById('panAndZoomRect');
    panZoomRect.setAttributeNS(null,'pointer-events','none');
    panZoomRect.removeEventListener('mousedown',beginMapZoom,false);
    panZoomRect.removeEventListener('mousemove',doMapZoom,false);
    panZoomRect.removeEventListener('mouseup',endMapZoom,false);
    panZoomRect.removeEventListener('mousedown',beginMapPan,false);
    panZoomRect.removeEventListener('mousemove',doMapPan,false);
    panZoomRect.removeEventListener('mouseup',endMapPan,false);
    panZoomRect.removeEventListener('mouseout',outMap,false);
    panZoomRect.removeEventListener('mouseover',overMap,false);
  }

  if (SVGRoot.getElementById('cur' + theTask)) SVGRoot.getElementById('cur' + theTask).setAttributeNS(null,'visibility','hidden')
  if (SVGRoot.getElementById('menu' + theTask)) SVGRoot.getElementById('menu' + theTask).setAttributeNS(null,'checked','no')
  objToolbar.clearAction();
}

function makeFunction(functionText) {
  var theFunction = functionText.substring(0,functionText.indexOf("("));
  var argList = functionText.substring(functionText.indexOf("(") + 1,functionText.indexOf(")"));
  var argArray = argList.split(",");
  argList = "";
  var thePara;
  for (var i=0;i<argArray.length;i++) {
    thePara = eval(argArray[i]);
    if (typeof(thePara) == 'string') {
      thePara = "'" + thePara + "'";
    }
    argList = argList + thePara + ",";
  }
  theFunction = theFunction + "(" + argList.substring(0,argList.length - 1) + ")";
  return theFunction;
}

function clickBut(evt) {
  if(!document.all) var newTask = evt.target.id;
  else var newTask = event.srcElement.id; 
  clickEvents(newTask);
}

function mouseoverEvents(evt) {
  if(!document.all) var newTask = evt.target.id;
  else var newTask = event.srcElement.id; 
  var objButton = objToolbar.item(newTask);
  if (objButton) {
    if (objButton.action == 'enabled') {
      objButton.obj.setAttribute('src',objButton.overImg);
    }
  }
}

function mouseoutEvents(evt) {
  if(!document.all) var newTask = evt.target.id;
  else var newTask = event.srcElement.id; 
  var objButton = objToolbar.item(newTask);
  if (objButton) {
    if (objButton.action == 'enabled') {
      objButton.obj.setAttribute('src',objButton.enableImg);
    }
  }
}

//****************************
//** Zoom- and Pan-Functions
//****************************

function arrangeZoomChange(doMassZahl) {
  if (theGeneralScaleFlag) {
    if (doMassZahl) {
      massZahl = getMassZahl(curScale);
      showMassZahl();
    }
    if (typeof(theProfVersion) != 'undefined' && theProfVersion == 1) if (svgwinMap) svgwinMap.DynFindExtent(this);
  } else massZahl = curScale;
  checkVisThemes();
  if (theOverviewFlag) moveOverRect();
  if (theScalebarFlag) changeScalebar();
}

//********************
//** Map-Functions
//********************

function getMassZahl(theCurScale) {
// myAlert(ViewboxArray[0][2] + " : " + ExtentArray[1][0] + " : " + theCurScale );
  var zahl = parseInt(((theScaleConvert * ViewboxArray[0][2]) / (theCurScale * ExtentArray[1][0])) + 0.5);
  return zahl;
}

function getCurScale(theMassZahl) {
  if (theGeneralScaleFlag) {
    var zahl = parseFloat((theScaleConvert * ViewboxArray[0][2]) / (theMassZahl * ExtentArray[1][0]));
    return zahl;
  } else return theMassZahl;
}

function showMassZahl() {
  if (theGetscaleFlag && theGeneralScaleFlag)  document.formScale.massstab.value = massZahl;
}

function changeScalebar() {
  var a = parseFloat(theMassGesamtLength / curScale);
  for (var i=1; i<=theRectCount; i++) {
    var iItem = SVGscalebar.getElementById('masstext' + i);
    if (a < 1) {
      iItem.firstChild.data = (Math.round(a / theRectCount * i * 100) / 100).toString();
    } else {
      iItem.firstChild.data = (Math.round(a / theRectCount * i * 10) / 10).toString();
    }
  }
}

function checkLimitCurScale(theCurScale) {
  var limitMassZahl = parseFloat(SVGRoot.getElementById('mapContent').getAttributeNS(theProgNS,'minscale'));
  var limitCurScale = getCurScale(limitMassZahl);
  if (limitCurScale <= theCurScale) theCurScale = limitCurScale;
  limitMassZahl = parseFloat(SVGRoot.getElementById('mapContent').getAttributeNS(theProgNS,'maxscale'));
  limitCurScale = getCurScale(limitMassZahl);
  if (limitCurScale >= theCurScale) theCurScale = limitCurScale;
  return theCurScale;
}

//***********************
//** Layer-Functions
//***********************

function listThemes() {
  // SVGRoot = document.map.getSVGDocument(); xxx ich glaube beim Tiling muss das nochmals aufgerufen werden
  var mapInhalt = SVGRoot.getElementById('mapContent').getElementsByTagName('g');
  for (var i=0;i<mapInhalt.length;i++) {
    var thisTheme = mapInhalt.item(i);
    var gId = thisTheme.getAttributeNS(null,'id');
    if (gId.indexOf('grp') == -1) {          //#am Tiling
      if (gId.indexOf('rec') == -1) {
        if (gId.indexOf('txt') == -1) {
          ThemeArray[gId] = new Object();
          XMLFileArray[gId] = null;
        } else {
          var themaId = gId.substring(0, gId.indexOf('txt'));
          ThemeArray[themaId][gId] = gId;
        }
      }
    }
  }
}

function checkVisThemes() {
  for (var themaId in ThemeArray) {
    var checkThemeStatus = 1;
    if (theLegendFlag) {
      var nummer = themaId.substring(2,themaId.length);
      var kaest = SVGlegend.getElementById('Vis' + String(nummer));
      if (kaest != null) {
        checkThemeStatus = 2;
        var kaestVis = kaest.getAttributeNS(null,'display');
        if (kaestVis == 'inline') {
          var kaestFlag = checkThemeScale(themaId);
          KaestColor(kaestFlag,kaest);
          checkTxtThemeScale(themaId);
        }
      }
    }
    if (checkThemeStatus == 1) {
      checkThemeScale(themaId);
      checkTxtThemeScale(themaId);
    }
  }
}

function checkThemeScale(themaId) {
  var thisTheme = SVGRoot.getElementById(themaId);
  var minScale = parseFloat(thisTheme.getAttributeNS(theProgNS,'minscale'));
  var maxScale = parseFloat(thisTheme.getAttributeNS(theProgNS,'maxscale'));
  if ((massZahl >= minScale) && (massZahl <= maxScale)) {
    var boolDisplay = true;
    for (var shareGeomId in ShareGeomArray) {
      if (shareGeomId == thisTheme.getAttributeNS(null,'id')) {
        boolDisplay = false;
        thisTheme.setAttributeNS(null,'display',ShareGeomArray[thisTheme.getAttribute('id')]);
      }  
    }
    if (boolDisplay) thisTheme.setAttributeNS(null,'display','inline');
    var kaestFlag = true;
    getWMSLayer(themaId);
  } else {
    thisTheme.setAttributeNS(null,'display','none');
    var kaestFlag = false;
  }
  return kaestFlag;
}

function checkTxtThemeScale(themaId) {
  var thisTheme = SVGRoot.getElementById(themaId);
  for (var txtThemaId in ThemeArray[themaId]) {
    if (thisTheme.getAttributeNS(null,'display') == 'inline') {
      checkThemeScale(txtThemaId);
    } else {
      var thisTxtTheme = SVGRoot.getElementById(txtThemaId);
      thisTxtTheme.setAttributeNS(null,'display','none');
    }
  }
}

function getWMSLayers() {
  for (var themaId in WMSLayerArray) {
    var thisTheme = SVGRoot.getElementById(themaId);
    if (thisTheme.getAttributeNS(null,'display') == 'inline') getWMSLayer(themaId);
  }
}

function getWMSLayer(themaId) {
  if (!WMSLayerArray[themaId]) return true;
  var WMSlayer = SVGRoot.getElementById(themaId);
  if (WMSlayer) {
    var ImageId = themaId + 'Image';
    if (SVGRoot.getElementById(ImageId)) {
      WMSlayer.removeChild(SVGRoot.getElementById(ImageId));
    }
    var imageNode = buildSVGNode(SVGRoot,'image',{'id':ImageId, 'x':ViewboxArray[1][0], 'y':ViewboxArray[1][1], 'width':ViewboxArray[1][2], 'height':ViewboxArray[1][3] });
    var xMin = parseFloat(theXOrigin + ViewboxArray[1][0]);
    var xMax = xMin + ViewboxArray[1][2];
    var yMax = theYOrigin - ViewboxArray[1][1];
    var yMin = yMax - ViewboxArray[1][3];
    var WMSUrl = WMSLayerArray[themaId] + "&BBOX=" + xMin + "," + yMin + "," + xMax + "," + yMax;
    WMSUrl = WMSUrl + "&width=" + ExtentArray[1][0];
    WMSUrl = WMSUrl + "&height=" + ExtentArray[1][1];
    imageNode.setAttributeNS('http://www.w3.org/1999/xlink','href',WMSUrl);
    WMSlayer.appendChild(imageNode);
  }
}

//************************
//** Overview-Functions
//************************

function beginOverPan(evt) {
  if (SVGoverRect.getAttribute('width') >= ViewboxArray[2][2]) return true;
  SVGoverRect.setAttributeNS(null,'pointer-events','none');
  var overGroup = SVGover.getElementById('overgroup');
  overGroup.setAttributeNS(null,'pointer-events','all');
  overGroup.addEventListener('mousemove',doOverPan,false);
  overGroup.addEventListener('mouseout',endOverPan,false);
  overGroup.addEventListener('mouseup',endOverPan,false);
  overAktX = parseFloat(SVGoverRect.getAttributeNS(null,'x'));
  overAktY = parseFloat(SVGoverRect.getAttributeNS(null,'y'));
  overEvtX = parseFloat(evt.clientX);
  overEvtY = parseFloat(evt.clientY);
}

function doOverPan(evt) {
  var newOverEvtX = parseFloat(evt.clientX);
  var newOverEvtY = parseFloat(evt.clientY);
  var toMoveX = overAktX + (newOverEvtX - overEvtX) * ViewboxArray[2][2] / ExtentArray[5][0];
  var toMoveY = overAktY + (newOverEvtY - overEvtY) * ViewboxArray[2][3] / ExtentArray[5][1];
  if (toMoveX < ViewboxArray[2][0]) {
    SVGoverRect.setAttributeNS(null,'x',ViewboxArray[2][0]);
  }
  else if ((toMoveX + parseFloat(SVGoverRect.getAttributeNS(null,'width'))) > (ViewboxArray[2][0] + ViewboxArray[2][2])) {
    SVGoverRect.setAttributeNS(null,'x',ViewboxArray[2][0] + ViewboxArray[2][2] - parseFloat(SVGoverRect.getAttributeNS(null,'width')));
  }
  else {
    SVGoverRect.setAttribute('x',toMoveX);
  }
  if (toMoveY < ViewboxArray[2][1]) {
    SVGoverRect.setAttributeNS(null,'y',ViewboxArray[2][1]);
  }
  else if ((toMoveY + parseFloat(SVGoverRect.getAttributeNS(null,'height'))) > (ViewboxArray[2][1] + ViewboxArray[2][3])) {
    SVGoverRect.setAttributeNS(null,'y',ViewboxArray[2][1] + ViewboxArray[2][3] - parseFloat(SVGoverRect.getAttributeNS(null,'height')));
  }
  else {
    SVGoverRect.setAttribute('y',toMoveY);
  }
  overEvtX = newOverEvtX;
  overEvtY = newOverEvtY;
  overAktX = parseFloat(SVGoverRect.getAttributeNS(null,'x'));
  overAktY = parseFloat(SVGoverRect.getAttributeNS(null,'y'));
}

//************************
//** Legend-Functions
//************************

function makeInVisLeg(thNum,theParentId) { 
  var leg = SVGlegend.getElementById('leg' + thNum);
  var kaest = SVGlegend.getElementById('Vis' + thNum);
  var legHeight = Number(leg.getAttributeNS(theProgNS,'height'));
  var legGroup = leg.getAttributeNS(theProgNS,'group');
  var thisTheme = SVGRoot.getElementById('th' + thNum);
  if (kaest.getAttribute('display') == 'inline') {
    SVGlegend.getElementById('legth' + thNum + '').setAttribute('display','none');
    kaest.setAttribute('display','none');
    thisTheme.setAttribute('display','none');
    var legHeight = legHeight * -1;
  } else {
    SVGlegend.getElementById('legth' + thNum).setAttribute('display','inline');
    kaest.setAttribute('display','inline');
    var kaestFlag = checkThemeScale('th' + thNum);
    KaestColor(kaestFlag,kaest);
  }
  while (legGroup == 'child') {
    var parentHeight = Number(leg.parentNode.parentNode.getAttributeNS(theProgNS,'height'));
    leg.parentNode.parentNode.setAttributeNS(theProgNS,'height',(parentHeight + legHeight));
    leg = leg.parentNode.parentNode;
    legGroup = leg.getAttributeNS(theProgNS,'group');
  }

  leg = SVGlegend.getElementById('leg' + thNum);
  var legNext = leg.nextSibling;

  while (legNext != null) {
    if (legNext.parentNode.getAttributeNS(null,'id') == theParentId) break;
    if (legNext.nodeName == 'g') {
      var theArray = getTranslateArray(legNext.getAttributeNS(null,'transform'));
      var thisX = parseInt(theArray[0]);
      var thisY = parseInt(theArray[1]);
      legNext.setAttributeNS(null,'transform','translate(' + thisX + ',' + (thisY + legHeight) + ')');
    }
    if (legNext == leg.parentNode.lastChild) {
      var leg = leg.parentNode;
      legNext = leg.nextSibling;
    } else {
      legNext = legNext.nextSibling;
    }
  }
  checkTxtThemeScale('th' + thNum);
}

function KaestColor(theFlag,theObj) {
  if (theFlag) {
    theObj.setAttributeNS(null,'fill','none');
  } else {
    theObj.setAttributeNS(null,'fill',theBGColor2);
  }
}

//******************************
//** Identify-Functions
//******************************

function identify(evt,theStatus,access) {
  var thisTarget = evt.target;
  if (thisTarget.getAttributeNS(null,'id') == '' || thisTarget.getAttributeNS(null,'id') == null) thisTarget = thisTarget.parentNode;
  if (thisTarget.getAttributeNS(null,'id').indexOf('rec') == -1) thisTarget = thisTarget.parentNode;
  var themaId = evt.currentTarget.getAttributeNS(null,'id');
  var oldTheme = themaId;
  var thisProp = evt.currentTarget.getAttributeNS(theProgNS,'styleprop');
  clearColArray(colHiliteArray);
  colHiliteArray = null;
  var recId = thisTarget.getAttributeNS(null,'id');
  if (colIdentifyArray != null) {
    // auf dasselbe geklickt
    if (colIdentifyArray[recId] != null) {
      if (dataWindow != null) dataWindow.focus();
      return true;
    } else {
      for (var theRec in colIdentifyArray) {
        oldTheme = theRec.substring(0,theRec.indexOf('rec'));
        break;
      }
    }
  }

  // Loeschen des Charts-Grundgeruestes, wenn anderes Thema
  if (themaId != oldTheme) {
    if (dataWindow != null) {
      try {
        dataWindow.close(); //Opera konstrukt
      }
      catch(error) {
      }
      dataWindow = null;
    } else {
      if (document.getElementById('identifyContent')) document.getElementById('identifyContent').innerHTML = "";
    }
  } else {
    if (dataWindow != null) {
      try {
        dataWindow.focus(); //Opera konstrukt
      }
      catch(error) {
        dataWindow = null;
      }
    }
  }

  clearIdentifyArray();

  if (theStatus == 'list') {
    if (access == 'db') var theFunctionText = "identifyInsertDB('" + themaId + "','" + recId + "','" + thisProp + "')";
      else var theFunctionText = "identifyInsert('" + themaId + "','" + recId + "','" + thisProp + "')";
      identifyList(theFunctionText);
  } else {
    if (dataWindow || document.getElementById('svgdocChart')){
      if (access == 'db') identifyChartInsertDB(themaId,recId,thisProp);
      else identifyChartInsert(themaId,recId,thisProp);
    } else {
      if (access == 'db') var theFunctionText = "identifyChartInsertDB('" + themaId + "','" + recId + "','" + thisProp + "')";
      else var theFunctionText = "identifyChartInsert('" + themaId + "','" + recId + "','" + thisProp + "')";
      identifyChart(themaId,theFunctionText);
    } 
  }
}

function identifyList(theText) {
  var theTime = 0;
  if (!document.getElementById("identifyContent") && dataWindow == null) {
    dataWindow = open("","MVSVGObjWin","width=350,height=450,top=50,left=50,toolbar=no,menubar=no,location=no,hotkeys=no,resizable=yes,scrollbars=yes,dependent=yes,status=no");
    with(dataWindow.document) {
      open();
      writeln("<html><head><title>" + infoWindowLabel + "<\/title>");
      writeln("<link rel='stylesheet' href='" + startURL + "embfiles/style.css' \/>");
      writeln("<script language='JavaScript' type='text/javascript'>");
      writeln("function backColor() {");
      writeln("window.opener.clearDataWindow(1);");
      writeln("}");
      writeln("<\/script><\/head>");
      writeln("<body onunload='backColor();'><\/body><\/html>");
      close();
    }
    theTime = 300; //zeitversetzt wegen Firefox
  }
  setTimeout(theText,theTime);
}

function identifyChart(themaId,theText) {
  var chartWidth = ChartArray[themaId][0][0];
  var chartHeight = ChartArray[themaId][0][1];
  if (!document.getElementById("identifyContent")) {
    dataWindow = window.open("","MVSVGObjWin","width=" + (chartWidth + 50) + ",height=" + (chartHeight + 120) + ",top=50,left=50,toolbar=no,menubar=no,location=no,hotkeys=no,resizable=yes,scrollbars=yes,dependent=yes,status=yes");
    with(dataWindow.document) {
      open();
      writeln("<html><head><title>" + infoWindowLabel + "<\/title>");
      writeln("<link rel='stylesheet' href='" + startURL + "embfiles/style.css' \/>");
      writeln("<script language='JavaScript' type='text/javascript'>");
      writeln("function backColor() {");
      writeln("window.opener.clearDataWindow(1);");
      writeln("}");
      writeln("<\/script><\/head>");
      writeln("<body onunload='backColor();'>");
      writeln("<embed type='image/svg+xml' id='svgdocChart' src='" + startURL + "embfiles/" + themaId + "chart.svg' width='" + chartWidth + "px' height='" + chartHeight + "px'></embed>");
      writeln("<form><input type='button' value='" + CloseButText + "' onclick='window.close();'></form>");
      writeln("<\/body><\/html>");
      close();
    }
  } else {
    var parentNode = document.getElementById('identifyContent');
    var newNode = buildNode(document,'image',{'src':'pictures/close.png','title':CloseButText,'onclick':'clearDataWindow(2);'});
    parentNode.appendChild(newNode);
    parentNode.innerHTML += "<br><embed type='image/svg+xml' id='svgdocChart' src='" + startURL + "embfiles/" + themaId + "chart.svg' width='" + chartWidth + "px' height='" + chartHeight + "px'></embed>";
  }
  setTimeout(theText,600);
}

function selRecError() {
  myAlert("Syntax Error");
}

function clearIdentifyArray() {
  clearColArray(colIdentifyArray,colSelRecArray);
  colIdentifyArray = null;
}

function clearDataWindow(status) {
  clearIdentifyArray();
  if (status == 1) dataWindow = null;
  else document.getElementById('identifyContent').innerHTML = '';
}

//*************************************
//** Query-Functions
//*************************************

function showRec(recIdList,thisProp,theRow) {
  var myArray = recIdList.split(",");
  colHiliteSelRecArray = new Object();
  while (myArray.length > 0) {
    addColArray(colHiliteSelRecArray,myArray.pop(),thisProp,theHiQueryColor,false)
  }
  theRow.style.background = theHiColor;
}

function showOut(theRow) {
  clearColArray(colHiliteSelRecArray);
  colHiliteSelRecArray = null;

  theRow.style.background = theBGColor;
}

//*************************************
//** Coordinate-Measurement-Functions
//*************************************

function arrangeKoordMeas() {
  SVGRoot.getElementById('koordrect').setAttributeNS(null,'pointer-events','all');
  if (theShowKoord == 'textbox') {
    document.formShowKoord.style.display = 'inline';
    document.formShowKoord.ShowKoord.value = '';
  }
}

function endKoord() {
  if (theTask == 'koord') {
   if (theShowKoord == 'textbox') document.formShowKoord.ShowKoord.value = "";
   else window.status = "";
  }
}

function showText(theText) {
  if (theShowKoord == 'statusbar') window.status = theText;
  else document.formShowKoord.ShowKoord.value = theText;
}

//******************************
//** Symbol-Scaling-Functions
//******************************

function ScaleSym(aktScale) {
  if(aktScale == curScale) return true;
  for (var themaId in ThemeArray) {
    ScaleSymTheme(themaId, aktScale);
  }
  // Picture-Fuellungen werden nicht mit skaliert
  var theEles = SVGRoot.getElementsByTagName('pattern');
  for (var i=0; i<theEles.length; i++) {
    var nPattern = theEles.item(i);
    var patChildren = nPattern.childNodes;
    for (var j=0;j<patChildren.length;j++) {
      var nChild = patChildren.item(j);
      if (nChild.nodeName == 'image') {
        var cSize = nChild.getAttributeNS(null,'width');
        nChild.setAttributeNS(null,'width',cSize * aktScale / curScale);
        cSize = nChild.getAttributeNS(null,'height');
        nChild.setAttributeNS(null,'height',cSize * aktScale / curScale);
        cSize = nPattern.getAttributeNS(null,'width');
        nPattern.setAttributeNS(null,'width',cSize * aktScale / curScale);
        cSize = nPattern.getAttributeNS(null,'height');
        nPattern.setAttributeNS(null,'height',cSize * aktScale / curScale);
      }
    }
  }
  if (SVGRoot.getElementById('measurePath')) {
    var thisObj = SVGRoot.getElementById('measurePath');
    var cValue = thisObj.getAttributeNS(null,'stroke-width') * aktScale / curScale;
    thisObj.setAttributeNS(null,'stroke-width', cValue);
    setAttributesSVG(SVGRoot.getElementById('measureCircle'),{'stroke-width':cValue, 'r':2 * cValue});
    SVGRoot.getElementById('measureLine').setAttributeNS(null,'stroke-width', cValue); // Variante I
  }
  if (SVGRoot.getElementById('addressMarker')) {
    var thisObj = SVGRoot.getElementById('addressMarker');
    if (thisObj.getAttributeNS(theProgNS,'scaleEle') == 'path') {
      var cValue = thisObj.getAttributeNS(null,'r') * aktScale / curScale;
      thisObj.setAttributeNS(null,'r', cValue);
    }
  }
}

function ScaleSymTheme(themaId,aktScale) {
  if(aktScale == curScale) return true;
  if (aktScale > 0) {
    var scaleFaktor = aktScale / curScale;
  } else {
    var scaleFaktor = aktScale * -1;  
  } 
  var thisTheme = SVGRoot.getElementById(themaId);
  var symEle = thisTheme.getAttributeNS(theProgNS,'scaleEle');
  if (symEle != '' && symEle != null) {
    var blnIsVisible = false;
    if (thisTheme.getAttributeNS(null,'display') == 'inline') {
      thisTheme.setAttributeNS(null,'display','none');
      blnIsVisible = true;
    }
    oldCurScale = curScale;
    if (symEle.indexOf('text') != -1) DoScaleSym(thisTheme,'text','font-size',scaleFaktor,'px');
    if (symEle.indexOf('tspan') != -1) DoScaleSym(thisTheme,'tspan','font-size',scaleFaktor,'px');
    if (symEle.indexOf('gText') != -1) DoScaleSym(thisTheme,'g','font-size',scaleFaktor,'px');
    if (symEle.indexOf('gPath') != -1) DoScaleSym(thisTheme,'g','stroke-width',scaleFaktor,'');
    if (symEle.indexOf('use') != -1) DoScaleSym(thisTheme,'use','stroke-width',scaleFaktor,'');
    if (symEle.indexOf('path') != -1) DoScaleSym(thisTheme,'path','stroke-width',scaleFaktor,'');
    if (symEle.indexOf('pCL') != -1) DoScaleSym2(thisTheme,scaleFaktor);
    if (symEle.indexOf('circle') != -1) { 
      DoScaleSym(thisTheme,'circle','stroke-width',scaleFaktor,'');
      DoScaleSym(thisTheme,'circle','r',scaleFaktor,'');
    }
    if (symEle.indexOf('gCircle') != -1) { 
      DoScaleSym(thisTheme,'g','stroke-width',scaleFaktor,'');
      DoScaleSym(thisTheme,'circle','r',scaleFaktor,'');
    }
    if (blnIsVisible) thisTheme.setAttributeNS(null,'display','inline');
  }
}

function DoScaleSym(thisTheme,theKind,prop,scaleFaktor,unit) {
  var gChildren = thisTheme.getElementsByTagName(theKind);
  for (var i=0, len=gChildren.length;i<len;i++) {
    var ele = gChildren.item(i);
    var theVal = parseFloat(ele.getAttributeNS(null,prop)) * scaleFaktor;
    ele.setAttributeNS(null,prop,theVal + unit);
  }
}

function DoScaleSym2(thisTheme,scaleFaktor) {
  var gChildren = thisTheme.getElementsByTagName('path');
  for (var i=0;i<gChildren.length;i++) {
    if (gChildren.item(i).getAttributeNS(null,'id').indexOf('rec') != -1) {
      var theVal = gChildren.item(i).getAttributeNS(null,'stroke-width') * scaleFaktor;
      gChildren.item(i).setAttributeNS(null,'stroke-width',theVal);
    }
  }
}

//************************
//** Window-Functions
//************************

function showAbout() {
  var theWin = open("","MVSVGAbout","width=302,height=420,top=50,left=50,toolbar=no,menubar=no,location=no,hotkeys=no,resizable=yes,scrollbars=yes,dependent=yes,status=no");
  with(theWin.document) {
    open();
    writeln("<html><head><title>About MapViewSVG<\/title><\/head>");
    writeln("<body>");
    writeln("<embed type='image/svg+xml' src='" + startURL + "embfiles/about.svg' width='252px' height='370px'></embed>");
    writeln("<\/body><\/html>");
    close();
  }
  theWin.focus();
}

function showWindow(filePath,captionText,layoutSettings) {
  if ((filePath.indexOf('links/') == 0) || (filePath.indexOf('.') == 0) || (filePath.indexOf('embfiles') == 0)) filePath = startURL + filePath;
  var theWin = window.open(filePath,captionText,layoutSettings);
  if (theWin) theWin.focus();
}

// von wo aus wird diese Funktion gebraucht
function showWindow2(filePath) {
  //myAlert("hier");
  window.open(filePath,'MVSVGWin');
}

//********************************
//** Attributtable-Functions
//********************************

function hiliteRec(myRec,xMin,xMax,yMin,yMax,theRow,tabWindow,evt) {
  if (tabWindow.event) {
    if (tabWindow.event.ctrlKey) {
      blnUseScaleInfo = false;
      zoomToExtent(xMin,xMax,yMin,yMax,20);
      blnUseScaleInfo = false;
    }
  } else {
    if (evt.ctrlKey) {
      blnUseScaleInfo = false;
      zoomToExtent(xMin,xMax,yMin,yMax,20);
      blnUseScaleInfo = false;
    }
  }
  theRow.style.background = theHiColor;
  hiliteRec1(myRec,0);
}

function hiliteRec1(myRec,lngCount) {
  var myRecArray = myRec.split(',');
  var myElement;
  var mainRec = myRecArray.pop();
  if (myRecArray.length == 0) myElement = SVGRoot.getElementById(mainRec);
  else { 
    myElement = SVGRoot.getElementById(mainRec.concat(myRecArray.pop()));
  }
  if (!myElement) {
    if (lngCount < 50) { 
      lngCount = parseFloat(lngCount) + 1;
      setTimeout("hiliteRec1('" + myRec + "'," + lngCount + ")",100);
    }
    return;
  }

  if (myElement) {
    var parentElement = myElement.parentNode;
    while (parentElement.getAttributeNS(theProgNS,'styleprop') == '' || parentElement.getAttributeNS(theProgNS,'styleprop') == null) {
      parentElement = parentElement.parentNode;
    }
    var thisProp = parentElement.getAttributeNS(theProgNS,'styleprop');
    clearColArray(colHiliteArray);
    colHiliteArray = new Object();
    addColArray(colHiliteArray,myElement.getAttributeNS(null,'id'),thisProp,theHiColor,false);
    while (myRecArray.length > 0) {
      addColArray(colHiliteArray,mainRec.concat(myRecArray.pop()),thisProp,theHiColor,false);
    }
  }
}

function hiliteRecOut(theRow) {
  clearColArray(colHiliteArray);
  colHiliteArray = null;
  theRow.style.background = theBGColor;
}

//*****************************
//** Tooltip-Functions
//*****************************

function mapTipOver(evt,info,recIdList) {
  if (!blnInit) return true;
  var thisParent = evt.currentTarget.parentNode;
  var thisProp = thisParent.getAttributeNS(theProgNS,'styleprop');
  while (thisProp == '' || thisProp == null) {
    var thisParent = thisParent.parentNode;
    var thisProp = thisParent.getAttributeNS(theProgNS,'styleprop');
  }
  var recId = evt.currentTarget.getAttributeNS(null,'id');
  if (recId.indexOf('grp') != -1 && recIdList) recId = recId.substring(0,recId.indexOf('grp'));
  addRecListColArray(thisProp,theHiColor,recId,recIdList);
  mapTipShow(evt,info);
}

function mapTipOut() {
  if (!blnInit) return true;
  SVGRoot.getElementById('mapTip').setAttributeNS(null,'visibility','hidden');
  clearColArray(colHiliteArray);
  colHiliteArray = null;
}

function chartRecOver(evt,recIdList) {
  if (!blnInit) return true;
  var thisTarget = evt.target;
  var recId = thisTarget.getAttributeNS(null,'id');
  while (recId == '' || recId == null) {
    thisTarget = thisTarget.parentNode;
    recId = thisTarget.getAttributeNS(null,'id');
  }
  recId = recId.substring(0,recId.indexOf('ch'));
  themaId = recId.substring(0,recId.indexOf('rec'));
  var thisProp = SVGRoot.getElementById(themaId).getAttributeNS(theProgNS,'styleprop');
  addRecListColArray(thisProp,theHiColor,recId,recIdList);
}

//*****************************
//** Scrollbar-Functions
//*****************************

function scrollBottom(state) {
 var offset = Math.abs(ScrollArray[sliderNumActive][1]) + ScrollArray[sliderNumActive][4];
 if (state) offset = (offset * -1);
 setScrollY(offset);
}

function setScrollY(OffsetY) {
  var obj = SVGlegend.getElementById(ScrollArray[sliderNumActive][0]);
  var theArray = getTranslateArray(obj.getAttributeNS(null,'transform'));
  var aktY = parseFloat(theArray[1]);
  var newY = aktY + OffsetY;
  if (newY > 0) newY = 0;
  if (newY < ScrollArray[sliderNumActive][1]) newY = ScrollArray[sliderNumActive][1];
  obj.setAttribute('transform','translate(0,' + newY  + ')');
  SVGlegend.getElementById('slider' + sliderNumActive).setAttribute('y',(ScrollArray[sliderNumActive][3] + -newY * ScrollArray[sliderNumActive][2]));
}

function scrollUp(evt,theNum) {
  if (!isNaN(theNum)) sliderNumActive = theNum;
  setScrollY(evt ? -16 : -3);
  scrollTimeout = setTimeout("scrollUp()", (evt ? 300 : 5));
}

function scrollDown(evt,theNum) {
  if (!isNaN(theNum)) sliderNumActive = theNum;
  setScrollY(evt ? 16 : 3);
  scrollTimeout = setTimeout("scrollDown()", (evt ? 300 : 5));
}

function scrollStop() {
  if (scrollTimeout) clearTimeout( scrollTimeout);
  scrollTimeout = null;
}

function sliderDown(evt,theNum) {
  if (!isNaN(theNum)) sliderNumActive = theNum;
  SVGlegend.getElementById('slider' + sliderNumActive).setAttributeNS(null,'pointer-events','none');
  SVGlegend.getElementById('scrollbar' + sliderNumActive).setAttributeNS(null,'pointer-events','none');
  var legRect = SVGlegend.getElementById('legRect');
  legRect.setAttributeNS(null,'pointer-events','all');
  legRect.addEventListener('mousemove',sliderMove,false);
  legRect.addEventListener('mouseout',sliderUp,false);
  legRect.addEventListener('mouseup',sliderUp,false);
  startEvtY = evt.clientY;
}

function sliderMove(evt) {
  if (startEvtY - evt.clientY == 0) return true;
  var dEvtY = (startEvtY - evt.clientY) / ScrollArray[sliderNumActive][2];
  setScrollY(dEvtY);
  startEvtY = evt.clientY;
}

function sliderUp() {
  var legRect = SVGlegend.getElementById('legRect');
  SVGlegend.getElementById('slider' + sliderNumActive).setAttributeNS(null,'pointer-events','all');
  SVGlegend.getElementById('scrollbar' + sliderNumActive).setAttributeNS(null,'pointer-events','all');
  legRect.setAttributeNS(null,'pointer-events','none');
  legRect.removeEventListener('mousemove',sliderMove,false);
  legRect.removeEventListener('mouseup',sliderUp,false);
  legRect.removeEventListener('mouseout',sliderUp,false);
}

function scrollPage(evt) {
  var y = evt.clientY;
  var sliderY = parseFloat(SVGlegend.getElementById('slider' + sliderNumActive).getAttribute('y')) + parseFloat(ScrollArray[sliderNumActive][5]);
  var dy = ScrollArray[sliderNumActive][4] / 2; 
  if (y < sliderY) setScrollY(dy);
  else setScrollY(dy * -1);
}

//***********************
//** Utilities
//***********************

function linkOpen(theFile) {
  //var theWin = window.open(theFile,'MVSVGWin2',BrowserSet);
  var theWin = window.open(theFile,'',BrowserSet);
  theWin.focus();
}

function loadXMLDoc(docname) {
  window.status = 'Loading file, please wait ...';
  if (document.implementation && document.implementation.createDocument) {
    try {
      var XMLDokument = document.implementation.createDocument("", "", null);
      XMLDokument.async=false; 
      XMLDokument.load(docname); 
    }
    catch(error) {
      return;
    }
  } else {
    if (window.ActiveXObject) {
      var XMLDokument = new ActiveXObject("microsoft.xmldom");
      XMLDokument.async = false;
      XMLDokument.load(docname);
    }
  }
  window.status = '';
  return XMLDokument;
}

function saveViewBox(SVGEle,index){
  var objArray = new Array(4);
  var viewboxWerte = SVGEle.getAttribute('viewBox').split(' ');
  objArray[0] = parseFloat(viewboxWerte[0]);
  objArray[1] = parseFloat(viewboxWerte[1]);
  objArray[2] = parseFloat(viewboxWerte[2]);
  objArray[3] = parseFloat(viewboxWerte[3]);
  ViewboxArray[index]=objArray;
}

function saveExtent(SVGEle,index){
  var objArray = new Array(2);
  objArray[0] = parseFloat(SVGEle.getAttributeNS(null,'width'));
  objArray[1] = parseFloat(SVGEle.getAttributeNS(null,'height'));
  ExtentArray[index]=objArray;
}

function addRecListColArray(thisProp,theHiColor,recId,recIdList) {
  colHiliteArray = new Object();
  if (recIdList) {
    var theRecArray = recIdList.split(",");
    while (theRecArray.length > 0) {
      addColArray(colHiliteArray,recId + theRecArray.pop(),thisProp,theHiColor,false)
    }
  } else {
    addColArray(colHiliteArray,recId,thisProp,theHiColor,false)
  }
}

function addColArray(theArray,myRec,thisProp,hiColor,loop) {
  var theEle = SVGRoot.getElementById(myRec);
  if (loop) {
    if (!theEle) {
      setTimeout("addColArray(colSelRecArray,'" + myRec + "','" + thisProp + "','" + hiColor + "',true)",100);
      return;
    }
  }
  if (theEle) {
    var theColor = theEle.getAttributeNS(null,thisProp);
    theArray[myRec] = new Array(thisProp,theColor);
    theEle.setAttributeNS(null,thisProp,hiColor);
  }
}

function clearColArray(theArray,theCheckArray) {
  for (var theRec in theArray) {
    if (theCheckArray != null && theCheckArray[theRec] != null) {
    } else {
      var theEle = SVGRoot.getElementById(theRec);
      theEle.setAttributeNS(null,theArray[theRec][0],theArray[theRec][1]);
    }
  }
}

function getTranslateArray(transVal) {
  transVal = transVal.substring((transVal.indexOf('(') + 1),transVal.indexOf(')'));
  var theArray = transVal.split(",");
  if (theArray.length == 1) theArray = transVal.split(" ");
  if (theArray.length == 1) theArray.unshift(0);
  return theArray;
}

function getRecId(selTiles,theMainRec) {
  var theRecArray = new Array();
  if (selTiles.hasChildNodes()) {
    var selTile = selTiles.firstChild;
    while (selTile != null) {
      if (selTile.nodeType == 1) {
        theRecArray[theRecArray.length] = theMainRec.concat(selTile.firstChild.nodeValue);
      }
      selTile = selTile.nextSibling;
    }
  }
  if (theRecArray.length == 0) theRecArray[0] = theMainRec;
  return theRecArray;
}

function getMapviewX(realValue) {
  if (isNaN(realValue)) return Number.NaN;
  var koord = parseFloat(realValue) - theXOrigin;
  return koord;
}

function getMapviewY(realValue) {
  if (isNaN(realValue)) return Number.NaN;
  var koord = theYOrigin - parseFloat(realValue);
  return koord;
}

function setAttributes(objNode,attribute) {
  for (var attribut in attribute) {
    objNode.setAttribute(attribut, attribute[attribut]);
  }
}

function buildNode(doc,typ,attribute,txt) {
  var newNode = doc.createElement(typ);
  setAttributes(newNode,attribute);
  if ( txt != null ) {
    var textNode = doc.createTextNode(txt);
    newNode.appendChild(textNode);
  }
  return newNode;
}

function setAttributesSVG(objNode,attribute) {
  for (var attribut in attribute) {
    objNode.setAttributeNS(null,attribut, attribute[attribut]);
  }
}

function buildSVGNode(doc,typ,attribute,txt) {
  var newNode = doc.createElementNS('http://www.w3.org/2000/svg',typ);
  setAttributesSVG(newNode,attribute);
  if ( txt != null ) {
    var textNode = doc.createTextNode(txt);
    newNode.appendChild(textNode);
  }
  return newNode;
}

function myAlert(theText) {
  var theTest = "'" + theText + "'";
  if (theTest.indexOf("{") != -1) theText = 'Oh, you are interested in the code!';
  window.alert = theAlert;
  alert(theText);
  window.alert = null;
}

function HTMLSonder(theString) { // xxxx
  theString = theString.replace(/&/g,'&amp;');
  theString = theString.replace(/</g,'&lt;');
  theString = theString.replace(/>/g,'&gt;');
  theString = theString.replace(/"/g,'&quot;');
  return theString;
}

function SVGsupport() {
  myAlert(SVGSupportText);
  return true;
}

//* braucht Gazetteer und legenddb
function changeUmlaut(theString) {
  theString = theString.replace(/&#39;/g,"'");
  theString = theString.replace(/&#60;/g,"<");
  theString = theString.replace(/&#62;/g,">");
  for (var i=127;i<=255;i++) {
    var tt = new RegExp("&#" + i + ";",['g']);
    theString = theString.replace(tt,String.fromCharCode(i)); 
  }
  theString = theString.replace(/&#38;/g,"&");
  return theString;
}

// nicht in Betrieb
function errorHandling(text1,text2) {
  SVGscalebar.getElementById("DataX").firstChild.data = text1;
  SVGscalebar.getElementById("DataY").firstChild.data = text2;
}