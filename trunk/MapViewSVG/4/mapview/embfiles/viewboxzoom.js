/*charset="iso-8859-1"*/

var mapPressed = 0;

// firefox konstrukt
var nb_click = 0;
var ym = 0;
var xm = 0;
var measureLengthCSV = 0;


//*********************************
//** Button-Navigation-Functions
//*********************************

function createToolbar() {
  if (!document.getElementById("toolBar")) return;
  var buttonNodeObj = document.getElementById("toolBar").getElementsByTagName("img");
  for (var i=0;i<buttonNodeObj.length;i++) {
    var buttonNode = buttonNodeObj.item(i);
    var butId = buttonNode.getAttribute('id');
    var objButton = new ToolbarButton(buttonNode);
    switch(butId) {
      case "pan":
        objButton.click = "arrangePanZoom('beginMapPan','doMapPan','endMapPan','outMap','overMap')";
        objButton.state = 1;
        break;
      case "zoomin":
        objButton.click = "arrangePanZoom('beginMapZoom','doMapZoom','endMapZoom','outMap','overMap')";
        objButton.state = 1;
        break;
      case "zoomout":
        objButton.click = "arrangePanZoom('beginMapZoom','doMapZoom','endMapZoom','outMap','overMap')";
        objButton.state = 1;
        break;
      case "measure":
        objButton.click = "arrangeKoordMeas()";
        objButton.state = 1;
        break;
      case "koord":
        objButton.click = "arrangeKoordMeas()";
        objButton.state = 1;
        break;
      case "identify":
        objButton.state = 1;
        break;
      case "fullextent":
        objButton.click = "fullExtent()";
        break;
      case "print":
        objButton.click = "window.print()";
        break;
      case "help":
        objButton.click = "showHelp()";
        break;
      case "extentprevious":
        objButton.click = "zoomToSavedExt(false)";
        break;
      case "extentnext":
        objButton.click = "zoomToSavedExt(true)";
        break;
      default:
        break;
    }
    if (objButton.state == 1) {
      objButton.clickImg = 'toolbar/' + butId + 'on.png';
    }
    objButton.overImg = 'toolbar/' + butId + 'over.png';
    objButton.enableImg = 'toolbar/' + butId + '.png';
    objButton.disableImg = 'toolbar/' + butId + 'grey.png';
    if (butId == theTask) {
      objButton.action = 'active';
    }
    objToolbar.add(objButton);
  }  
}

function clickEvents(newTask) {
  var objButton = objToolbar.item(newTask);
  if (!objButton) return;
  if (objButton.action == 'disabled') return;
  if (objButton.state == 1) {
    clearEvents();
    objButton.obj.setAttribute('src',objButton.clickImg);
    objButton.action = 'active';
    theTask = newTask;
  }
  objButton.clickEvent();
  menuUpdate();
}

function menuUpdate() {
  if (SVGRoot.getElementById('menu' + theTask)) SVGRoot.getElementById('menu' + theTask).setAttributeNS(null,'checked','yes');
  if (svgwinMap) svgwinMap.menuUpdate2();
  if (SVGRoot.getElementById('cur' + theTask)) setAttributesSVG(SVGRoot.getElementById('cur' + theTask),{ 'x':-100,'y':-100,'visibility':'visible' });
}

//****************************
//** Zoom- and Pan-Functions
//****************************

function arrangePanZoom(mDownFunc,mMoveFunc,mUpFunc,mOutFunc,mOverFunc) {
  var panZoomRect = SVGRoot.getElementById('panAndZoomRect');
  panZoomRect.setAttributeNS(null,'pointer-events','all');
  panZoomRect.addEventListener('mousedown',eval(mDownFunc),false);
  panZoomRect.addEventListener('mousemove',eval(mMoveFunc),false);
  panZoomRect.addEventListener('mouseup',eval(mUpFunc),false);
  panZoomRect.addEventListener('mouseout',eval(mOutFunc),false);
  panZoomRect.addEventListener('mouseover',eval(mOverFunc),false);
  setAttributesSVG(SVGRoot.getElementById('cur' + theTask),{ 'x':-100,'y':-100,'visibility':'visible' });
}

function beginMapZoom(evt) {
  if (evt.button == 2) return true;
  if (mapPressed == 1) return true;
  mapPressed = 1;
  startClientX = evt.clientX;
  startClientY = evt.clientY;
  startEvtX = getEvtX(startClientX);
  startEvtY = getEvtY(startClientY);
  if (theTask == 'zoomin') {
    var strokeWidth = ViewboxArray[0][2] / ExtentArray[1][0] / curScale;
    var newRect = buildSVGNode(SVGRoot,"rect",{'id':'zoomRect','x':startEvtX, 'y':startEvtY, 'width':0, 'height':0, 'style':'fill:none;stroke:black;stroke-width:' + strokeWidth + ';shape-rendering:optimizeSpeed', 'pointer-events':'none' });
    SVGmap.appendChild(newRect);
  }
}

function doMapZoom(evt) {
  setAttributesSVG( SVGRoot.getElementById('cur' + theTask),{'x':parseInt(evt.clientX + 15),'y':parseInt(evt.clientY + 15)});
  if (mapPressed == 1 && theTask == 'zoomin') {
    var endEvtX = getEvtX(evt.clientX);
    var endEvtY = getEvtY(evt.clientY);
    if (endEvtX - startEvtX < 0) SVGRoot.getElementById('zoomRect').setAttributeNS(null,'x',endEvtX);
    if (endEvtY - startEvtY < 0) SVGRoot.getElementById('zoomRect').setAttributeNS(null,'y',endEvtY);
    var newWidth = Math.abs(endEvtX - startEvtX);
    var newHeight = Math.abs(endEvtY - startEvtY);
    setAttributesSVG(SVGRoot.getElementById('zoomRect'),{'width':newWidth,'height':newHeight});
  }
}

function endMapZoom(evt) {
  if (mapPressed == 0) return true;
  zoomObjectIndex = 0;
  zoomBookmark = 0;
  mapPressed = 0;
  var aktScale = curScale;
  switch(theTask) {
    case "zoomin":
      var endClientX = evt.clientX;
      var endClientY = evt.clientY;
      var endEvtX = getEvtX(endClientX);
      var endEvtY = getEvtY(endClientY);
      if (SVGRoot.getElementById('zoomRect')) SVGmap.removeChild(SVGRoot.getElementById('zoomRect'));
      // nur Punkt geklickt (mit Toleranz)
      if (Math.abs(endClientX - startClientX) <= 3 && Math.abs(endClientY - startClientY) <= 3) {
        curScale = curScale * 2;
      } else {
        if (Math.abs(endEvtX - startEvtX) >= Math.abs(endEvtY - startEvtY)) {
          curScale = ViewboxArray[0][2] / Math.abs(endEvtX - startEvtX);
        } else {
          curScale = ViewboxArray[0][3] / Math.abs(endEvtY - startEvtY);
        }
        if (endEvtX < startEvtX) {
          var tmpWert = startEvtX;
          startEvtX = endEvtX;
          endEvtX = tmpWert;
        }
        if (endEvtY < startEvtY) {
          var tmpWert = startEvtY;
          startEvtY = endEvtY;
          endEvtY = tmpWert;
        }
        startEvtX = Math.abs(endEvtX - startEvtX) / 2 + startEvtX;
        startEvtY = Math.abs(endEvtY - startEvtY) / 2 + startEvtY;
      }
      break;
    case "zoomout":
      curScale = curScale / 2;
      break;
  }
  curScale = checkLimitCurScale(curScale);
  ScaleSym(aktScale);
  centerZoom(startEvtX,startEvtY);
  arrangeZoomChange(true);
  addToExtentBM();
}

function beginMapPan(evt) {
  if (evt.button == 2) return true;
  mapPressed = 1;
  startEvtX = getEvtX(evt.clientX);
  startEvtY = getEvtY(evt.clientY);
}

function doMapPan(evt) {
  setAttributesSVG( SVGRoot.getElementById('curpan'),{'x':parseInt(evt.clientX + 15),'y':parseFloat(evt.clientY + 15)});
  if (mapPressed == 0) return true;
  var endEvtX = getEvtX(evt.clientX);
  var endEvtY = getEvtY(evt.clientY);
  var newX =  ViewboxArray[1][0] + (startEvtX - endEvtX);
  var newY =  ViewboxArray[1][1] + (startEvtY - endEvtY);
  setAttributesSVG(SVGmap,{'viewBox':newX + ' ' + newY + ' ' + ViewboxArray[1][2] + ' ' + ViewboxArray[1][3]});
  if (theOverviewFlag) moveOverRect();
}

function endMapPan() {
  if (mapPressed == 0) return true;
  zoomObjectIndex = 0;
  zoomBookmark = 0;
  mapPressed = 0;
  saveViewBox(SVGmap,1);
  if (typeof(theProfVersion) != 'undefined' && theProfVersion == 1) if (svgwinMap) svgwinMap.DynFindExtent(objHTMLDocument);
  getWMSLayers();
  addToExtentBM();
}

function outMap(evt) {
  if (SVGRoot.getElementById('cur' + theTask)) SVGRoot.getElementById('cur' + theTask).setAttributeNS(null,'visibility','hidden');
}

function overMap(evt) {
  if (SVGRoot.getElementById('cur' + theTask)) SVGRoot.getElementById('cur' + theTask).setAttributeNS(null,'visibility','visible');
}

function zoomToScale(newMassStab) {
  if (parseFloat(newMassStab) >= 1) {
    var aktScale = curScale;
    massZahl = parseFloat(newMassStab);
    var newCurScale = getCurScale(massZahl);
    curScale = checkLimitCurScale(newCurScale);
    var doMassZahl = false;
    if (curScale != newCurScale) {
      doMassZahl = true;
    }
    var MitteX = ViewboxArray[1][0] + ViewboxArray[1][2] / 2;
    var MitteY = ViewboxArray[1][1] + ViewboxArray[1][3] / 2;
    ScaleSym(aktScale);
    centerZoom(MitteX,MitteY);
    arrangeZoomChange(doMassZahl);
  } else {
    showMassZahl();
  }
  addToExtentBM();
  return false;
}

function zoomPercent(newCurScale) {
  if (curScale != newCurScale) {
    var aktScale = curScale;
    curScale = newCurScale;
    var MitteX = ViewboxArray[1][0] + ViewboxArray[1][2] / 2;
    var MitteY = ViewboxArray[1][1] + ViewboxArray[1][3] / 2;
    ScaleSym(aktScale);
    centerZoom(MitteX,MitteY);
    arrangeZoomChange(false);
  }
}

function zoomToExtent(xMin,xMax,yMin,yMax,zoomBorder) {
  if (isNaN(xMin)) return;
  if (isNaN(xMax)) return;
  if (isNaN(yMin)) return;
  if (isNaN(yMax)) return;
  xMin = parseFloat(xMin);
  xMax = parseFloat(xMax);
  yMin = parseFloat(yMin);
  yMax = parseFloat(yMax);
  if (!zoomBorder) zoomBorder = 20;
  var aktScale = curScale;
  var xScaleFakt = maxScaleFakt;
  var yScaleFakt = maxScaleFakt;
  if ((xMax - xMin) > 0) xScaleFakt = ViewboxArray[0][2] / (xMax - xMin);
  if ((yMax - yMin) > 0) yScaleFakt = ViewboxArray[0][3] / (yMax - yMin);
  if (((xMax - xMin) == 0) && ((yMax - yMin) > 0)) xScaleFakt = yScaleFakt;
  if (((yMax - yMin) == 0) && ((xMax - xMin) > 0)) yScaleFakt = xScaleFakt;
  if ((xScaleFakt > maxScaleFakt) && (yScaleFakt > maxScaleFakt)) {
    xScaleFakt = maxScaleFakt;
    yScaleFakt = maxScaleFakt;
    zoomBorder = 0;
  }
  if (xScaleFakt < yScaleFakt) var zoomBorderFakt = ExtentArray[1][0] / (ExtentArray[1][0] - (2 * zoomBorder));
  else var zoomBorderFakt = ExtentArray[1][1] / (ExtentArray[1][1] - (2 * zoomBorder));
  curScale = Math.min(xScaleFakt,yScaleFakt) / zoomBorderFakt;
  curScale = checkLimitCurScale(curScale);
  var MitteX = (xMin + xMax) / 2;
  var MitteY = (yMin + yMax) / 2;
  ScaleSym(aktScale);
  centerZoom(MitteX,MitteY);
  arrangeZoomChange(true);
  addToExtentBM();
}


function fullExtent() {
  var aktScale = curScale;
  curScale = checkLimitCurScale(1);
  ScaleSym(aktScale);
  SVGmap.setAttributeNS(null,'viewBox',ViewboxArray[0][0] + ' ' + ViewboxArray[0][1] + ' ' + ViewboxArray[0][2] + ' ' + ViewboxArray[0][3]);
  saveViewBox(SVGmap,1);
  arrangeZoomChange(true);
  addToExtentBM();
  if (theGetscaleFlag && !theGeneralScaleFlag) document.formZoom.listZoom.selectedIndex = 0;
  // if (document.formZoomObject != null) document.formZoomObject.listZoomObject.selectedIndex = 0; Opera mag das nicht
}

function centerZoom(MitteX,MitteY) {
  var TransformX = MitteX - (ViewboxArray[0][2] / curScale / 2);
  var TransformY = MitteY - (ViewboxArray[0][3] / curScale / 2);
  setAttributesSVG(SVGmap,{'viewBox':TransformX + ' ' + TransformY + ' ' + ViewboxArray[0][2] / curScale + ' ' + ViewboxArray[0][3] / curScale});
  saveViewBox(SVGmap,1);
}

function addToExtentBM() {
  if (ExtentIndex == ExtentBMArray.length - 1) {
    ExtentBMArray.push(SVGmap.getAttributeNS(null,'viewBox'));
  } else {
  // zwischendrin, naechste wegschmeissen
    ExtentBMArray.splice(ExtentIndex + 1,ExtentBMArray.length - ExtentIndex - 1,SVGmap.getAttributeNS(null,'viewBox'));
  }
  ExtentIndex = ExtentIndex + 1;
}

function zoomToSavedExt(dir) {
  if (dir == true) var theStep = 1;
  else var theStep = -1;
  if (!ExtentBMArray[ExtentIndex + theStep]) return;
  var aktScale = curScale;
  SVGmap.setAttributeNS(null,'viewBox',ExtentBMArray[ExtentIndex + theStep]);
  ExtentIndex = ExtentIndex + theStep;
  saveViewBox(SVGmap,1);
  curScale = (ViewboxArray[0][2] / ViewboxArray[1][2]);
  ScaleSym(aktScale);
  arrangeZoomChange(true);
}

//************************
//** Overview-Functions
//************************

function endOverPan(evt) {
  var overAktX = parseFloat(SVGoverRect.getAttributeNS(null,'x'));
  var overAktY = parseFloat(SVGoverRect.getAttributeNS(null,'y'));
  setAttributesSVG(SVGmap,{'viewBox':overAktX + ' ' + overAktY + ' ' + ViewboxArray[1][2] + ' ' + ViewboxArray[1][3]});
  saveViewBox(SVGmap,1);
  var overGroup = SVGover.getElementById('overgroup');
  overGroup.removeEventListener('mousemove',doOverPan,false);
  overGroup.removeEventListener('mouseup',endOverPan,false);
  overGroup.removeEventListener('mouseout',endOverPan,false);
  overGroup.setAttribute('pointer-events','none');
  SVGoverRect.setAttribute('pointer-events','all');
  if (typeof(theProfVersion) != 'undefined' && theProfVersion == 1) if (svgwinMap) svgwinMap.DynFindExtent(objHTMLDocument);
  getWMSLayers();
  addToExtentBM();
}

function moveOverRect() {
  var viewboxWerte = SVGmap.getAttribute('viewBox').split(' ');
  setAttributesSVG(SVGoverRect,{'x':viewboxWerte[0],'y':viewboxWerte[1],'width':viewboxWerte[2],'height':viewboxWerte[3]});
}

//*************************************
//** Coordinate-Measurement-Functions
//*************************************

function doMeasure(evt,Convert,Text,Einheit) {
  if (theTask != 'measure') return true;
  var measurePath = SVGRoot.getElementById('measurePath');
  measureCount = measureCount + 1;
  setAttributesSVG(SVGRoot.getElementById('measureLine'),{'x1':getEvtX(evt.clientX),'y1':getEvtY(evt.clientY),'x2':getEvtX(evt.clientX),'y2':getEvtY(evt.clientY)});

  if (measureCount == 1) {
    measureLengthCSV = 0;
    setAttributesSVG(SVGRoot.getElementById('measureCircle'),{'cx':getEvtX(evt.clientX),'cy':getEvtY(evt.clientY),'visibility':'visible' });
    SVGRoot.getElementById('measureLine').setAttributeNS(null,'visibility','visible');
    measureString = "M" + getEvtX(evt.clientX) + " " + getEvtY(evt.clientY) + "L " + getEvtX(evt.clientX) + " " + getEvtY(evt.clientY);
    measurePath.setAttribute("d", measureString);
  } else {
    measureString = measureString + "L " + getEvtX(evt.clientX) + " " + getEvtY(evt.clientY);
    measurePath.setAttribute("d", measureString);
  }

  var measureTest;
  try {
    measureTest = measurePath.getTotalLength();
    measureTest = 0;
  }
  catch(e) {
    measureTest = 1;
  }

  if (measureTest == 0) {
    if (evt.detail != 1) {
      measureCount = 0;
      SVGRoot.getElementById('measureLine').setAttributeNS(null,'visibility','hidden');
    }
  } else {
    var xm1 = evt.clientX;
    var ym1 = evt.clientY;
    nb_click = nb_click + 1;
    measureLengthCSV = measureLengthCSV + calcLength(xm, ym, xm1, ym1);
    if ((Math.abs(xm-xm1) < 2) && (Math.abs(ym-ym1) < 2) && (nb_click == 2)) {
      nb_click = 0;
      xm = 0;
      ym = 0;
      measureCount = 0;
      SVGRoot.getElementById('measureLine').setAttributeNS(null,'visibility','hidden');
    } else {
      xm = xm1;
      ym = ym1;
      nb_click = 1;
    }
  }

  if (measureTest == 0) {
    var measureLength = (measurePath.getTotalLength() * Convert).toFixed(thePrecision);
  } else {
    var measureLength = (measureLengthCSV * ViewboxArray[0][2] / ExtentArray[1][0] / curScale * Convert).toFixed(thePrecision);
  }
  showText(Text + measureLength + Einheit);
}

function doKoordMeasure(evt) {
  switch(theTask) {
    case "koord":
      var XWert = (theXOrigin + getEvtX(evt.clientX)).toFixed(thePrecision);
      var YWert = (theYOrigin - getEvtY(evt.clientY)).toFixed(thePrecision);
      showText(XWert + ' : ' +  YWert);
      break;
    case "measure":
      setAttributesSVG(SVGRoot.getElementById('measureLine'),{'x2':getEvtX(evt.clientX),'y2':getEvtY(evt.clientY) });
      break;
    default:
      return true;
      break;
  }
}

function calcLength(xVon, yVon, xBis, yBis) {
  if(xVon == 0 && yVon == 0) return 0;
  var xLength = xBis - xVon;
  var yLength = yBis - yVon;
  var length = Math.sqrt(Math.pow(xLength,2) + Math.pow(yLength,2));
  return Math.round(length * 1000) / 1000.0;
}

//*****************************
//** Tooltip-Functions
//*****************************

function mapTipShow(evt,info) {
  if (!blnInit) return true;
  if (info == '') return true;
  var mapTipText = SVGRoot.getElementById('mapTipText');
  var faktor = theLegMapKoeff / curScale;
  var offsetX = (ViewboxArray[1][0]);
  var offsetY = (ViewboxArray[1][1]);
  mapTipText.firstChild.data = info;
  var rectLength = mapTipText.getComputedTextLength() + 16;
  SVGRoot.getElementById('mapTipRect').setAttributeNS(null,'width',rectLength);
  if ((evt.clientX + rectLength) > ExtentArray[1][0]) {
    var x = offsetX + (evt.clientX - rectLength - 5) * faktor;
  } else {
    var x = offsetX + evt.clientX * faktor;
  }
  if ((evt.clientY + 45) >=  ExtentArray[1][1]) {
    var y = offsetY + (evt.clientY - 25) * faktor;
  } else {
    var y = offsetY + (evt.clientY + 25) * faktor;
  }
  setAttributesSVG(SVGRoot.getElementById('mapTip'),{ 'transform':'matrix(' + faktor +  ',0,0,' + faktor + ',' + x + ',' + y + ')', 'visibility':'visible' } );
}

//***********************
//** Utilities
//***********************

function getEvtX(Xvalue) {
  var actX = (Xvalue * ViewboxArray[0][2] / ExtentArray[1][0] / curScale) + ViewboxArray[1][0];
  return actX;
}

function getEvtY(Yvalue) {
  var actY = (Yvalue * ViewboxArray[0][3] / ExtentArray[1][1] / curScale) + ViewboxArray[1][1];
  return actY;
}