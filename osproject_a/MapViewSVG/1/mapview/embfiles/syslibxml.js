/*charset="iso-8859-1"*/

function identifyInsert(themaId,recId,thisProp) {
  var newNode;
  var trNode;
  var tdNode;
  var newWindow = false;
  var scriptPrefix = "";

  if (!document.getElementById('identifyContent')) {
    var theDoc = dataWindow.document;
    if (!theDoc.getElementById('identifyContent')) {
      newNode = buildNode(theDoc,'div',{'id':'identifyContent', 'style':'padding:10px'});
      theDoc.getElementsByTagName('body').item(0).appendChild(newNode);
    }
    newWindow = true;
    scriptPrefix = "window.opener.";
  } else {
    var theDoc = document;
  }

  var parentNode = theDoc.getElementById('identifyContent');
  parentNode.style.visibility = 'visible';
  parentNode.innerHTML = "";

  if (XMLFileArray[themaId] == null) {
    XMLFileArray[themaId] = loadXMLDoc(startURL + 'embfiles/' + themaId + '.xml');
    if (XMLFileArray[themaId] == null) return false;
  }

  var WurzelElement = XMLFileArray[themaId].documentElement;
  if (WurzelElement == null) return false;
  var themaTitel = '';
  if (WurzelElement.selectSingleNode('titel').hasChildNodes()) themaTitel =  WurzelElement.selectSingleNode('titel').firstChild.nodeValue;

  var tableNode = buildNode(theDoc,'table',{'class':'identify'});

  if (!newWindow) {
    trNode = buildNode(theDoc,'tr',{} );
    tdNode = buildNode(theDoc,'td',{'colspan':2,'class':'identifyClose'} );
    newNode = buildNode(theDoc,'image',{'src':'pictures/close.png','title':CloseButText,'onclick':'clearDataWindow(2);'});
    tdNode.appendChild(newNode);
    trNode.appendChild(tdNode);
    tableNode.appendChild(trNode);
  }

  trNode = buildNode(theDoc,'tr',{} );
  tdNode = buildNode(theDoc,'th',{ 'colspan':'2' }, themaTitel );
  trNode.appendChild(tdNode);
  tableNode.appendChild(trNode);

  if (recId.indexOf('grp') != -1) recId = recId.substring(0,recId.indexOf('grp'));
  var Selektion = WurzelElement.selectSingleNode("tabelle/records/rec[@id = '" + recId + "']");
  var TableLink = '';

  if (Selektion != null) {

    var selCustoms = Selektion.selectSingleNode("custom");
    var headings = WurzelElement.selectSingleNode("tabelle/fields");
    var tmpText;
    var imgObj = Selektion.selectSingleNode('MVSVGIm');

    if (imgObj != null) {
      tmpText = imgObj.firstChild.nodeValue;
      if (tmpText != '') {
        tmpText = startURL + "/" + tmpText;
        trNode = buildNode(theDoc,'tr',{ } );
        tdNode = buildNode(theDoc,'td',{ 'colspan':'2','class':'identifyPic' } );
        newNode = buildNode(theDoc,'image',{'src':tmpText,'alt':'','width':imgObj.getAttribute('width'),'height':imgObj.getAttribute('height') });
        tdNode.appendChild(newNode);
        trNode.appendChild(tdNode);
        tableNode.appendChild(trNode);
      }
    }

    for(var j=0; j<headings.childNodes.length; j++) {
      var heading = headings.childNodes.item(j);
      var selCustom = selCustoms.childNodes.item(j);     
      if (heading.nodeType == 1) {
        tmpText = '';
        if (heading.hasChildNodes()) tmpText = heading.firstChild.nodeValue;
        trNode = buildNode(theDoc,'tr',{} );
        tdNode = buildNode(theDoc,'td',{ 'class':'identify' }, tmpText);
        trNode.appendChild(tdNode);
        tmpText = '';
        if (selCustom.hasChildNodes()) tmpText = selCustom.firstChild.nodeValue;
        tdNode = writeTD(tmpText,theDoc,false,"",true);
        tdNode.setAttribute('class','identify');
        trNode.appendChild(tdNode);
        tableNode.appendChild(trNode);
      }
    }

    var theRecArray = getRecId(Selektion.selectSingleNode('tiles'),recId);

    if (Selektion.selectSingleNode('MVSVGLi') != null) {
      tmpText = Selektion.selectSingleNode('MVSVGLi').firstChild.nodeValue;
      if (tmpText != '') {
        var theText = '';
        trNode = buildNode(theDoc,'tr',{} );
        if (tmpText.indexOf('@') != -1) theText = 'E-Mail:';
        if (tmpText.substr(0,4).toLowerCase() == 'http') theText = 'URL:';
        tdNode = buildNode(theDoc,'td',{ 'class':'identify' }, theText);
        trNode.appendChild(tdNode);
        tdNode = writeTD(tmpText,theDoc,true,scriptPrefix,true);
        tdNode.setAttribute('class','identify');
        trNode.appendChild(tdNode);
        tableNode.appendChild(trNode);
      }
    }

    if (Selektion.selectSingleNode('MVSVGTL') != null) {
      TableLink = Selektion.selectSingleNode('MVSVGTL').firstChild.nodeValue;
    }

  } else {
    trNode = buildNode(theDoc,'tr',{} );
    tdNode = buildNode(theDoc,'td',{'class':'identify','colspan':2}, QueryNoRecText);
    trNode.appendChild(tdNode);
    tableNode.appendChild(trNode);
    var theRecArray = new Array(recId);
  }

  parentNode.appendChild(tableNode);
  parentNode.innerHTML += ""; //wichtig sonst kein Update im Explorer

  if (newWindow) {
    parentNode.innerHTML += "<p><form><input type='button' value='" + CloseButText + "' onclick='window.close();'> <input type='button' value='" + PrintButText + "' onclick='window.print();'></p></form>";
  }
 
  // Link-Tabelle
  if (TableLink != '') {
    if (XMLFileArray[themaId + 'link'] == null) {
      XMLFileArray[themaId + 'link'] = loadXMLDoc(startURL + 'embfiles/' + themaId + 'link.xml');
    }
    var WurzelElement = XMLFileArray[themaId + 'link'].documentElement;
    if (WurzelElement == null) return false;
    var themaTitel = '';
    if (WurzelElement.selectSingleNode('titel').hasChildNodes()) themaTitel =  WurzelElement.selectSingleNode('titel').firstChild.nodeValue;
    SelektionAll = WurzelElement.selectNodes("tabelle/records/rec[MVSVGTL = '" + TableLink + "']");
    if (SelektionAll != null && SelektionAll.length > 0) {
      var recCount = WurzelElement.getElementsByTagName('rec').length;
      newNode = buildNode(theDoc,"p",{'class':'tableHead'},themaTitel );
      parentNode.appendChild(newNode);
      newNode = buildNode(theDoc,"p",{}, SelektionAll.length + QueryRecText1 + recCount + QueryRecText2);
      parentNode.appendChild(newNode);
      var tableNode = buildNode(theDoc,"table",{'class':'recTable'});
      var headings = WurzelElement.selectSingleNode('tabelle/fields');
      newNode = writeTHTags(theDoc,headings,0);
      tableNode.appendChild(newNode);
      for(var j=0; j<SelektionAll.length; j++) {
        var Selektion = SelektionAll[j];
        newNode = writeRec(theDoc,Selektion,0);
        tableNode.appendChild(newNode);
      }
      parentNode.appendChild(tableNode);
    }
  }

  parentNode.innerHTML += "";
  // anfaerbeln
  colIdentifyArray = new Object();
  fillColArray(colIdentifyArray,theRecArray,colSelRecArray,thisProp,false);
}

function identifyChartInsert(themaId,recId,thisProp) {
  var theRecArray = new Array(0);
  var theArray = new Array();

  if (XMLFileArray[themaId] == null) {
    XMLFileArray[themaId] = loadXMLDoc(startURL + 'embfiles/' + themaId + '.xml');
    if (XMLFileArray[themaId] == null) return false;
  }

  var WurzelElement = XMLFileArray[themaId].documentElement;
  if (WurzelElement == null) return false;

  if (recId.indexOf('grp') != -1) recId = recId.substring(0,recId.indexOf('grp'));
  var Selektion = WurzelElement.selectSingleNode("tabelle/records/rec[@id = '" + recId + "']");
  if (Selektion != null) {

    var selCustoms = Selektion.selectSingleNode("custom");
    var fTag;
    var node;
    for(var i=0; i<ChartArray[themaId][1].length; i++) {
      fTag = ChartArray[themaId][1][i];
      node = selCustoms.getElementsByTagName('field' + fTag);
      if (node != null) {
        if (node.item(0).hasChildNodes()) {
          if (node.item(0).firstChild.nodeValue == -99999 && CheckStatus == 1) theArray[i] = Number('nix');
          else theArray[i] = Number(node.item(0).firstChild.nodeValue);
        } else {
          theArray[i] = '';
        }
      }
    }
    // Titel
    fTag = ChartArray[themaId][2];
    var theTitle = '';
    if (fTag != '-1') {
      node = selCustoms.getElementsByTagName('field' + fTag);
      if (node != null) {
        if (node.item(0).hasChildNodes()) theTitle = node.item(0).firstChild.nodeValue;
      }
    }

    var theRecArray = getRecId(Selektion.selectSingleNode('tiles'),recId);

  }

  if (!document.getElementById("identifyContent")) {
    var embed = dataWindow.document.getElementById('svgdocChart');
  } else {
    var embed = document.getElementById('svgdocChart');
    document.getElementById("identifyContent").style.visibility = 'visible';
  }
  try {
    var SVGChartRoot = embed.getSVGDocument();
  }
  catch(error) {
    return false;
  }
  if (SVGChartRoot && SVGChartRoot.defaultView)
    var svgwin = SVGChartRoot.defaultView;
  else if (embed.window)
    var svgwin = embed.window;
  else try {
    var svgwin = embed.getWindow();
  }
  catch(error) {
    return false;
  }

  if (svgwin) svgwin.drawIt(theArray,(ChartArray[themaId][0][3] / ChartArray[themaId][0][2]),theTitle);

  // anfaerbeln
  colIdentifyArray = new Object();
  fillColArray(colIdentifyArray,theRecArray,colSelRecArray,thisProp,false);
}

function fillColArray(theColArray,theRecArray,theCheckColArray,thisProp,loop) {
  for (var i=0;i<theRecArray.length; ++i) {
    //Wenn schon angefaerbelt
    if (theCheckColArray != null && theCheckColArray[theRecArray[i]] != null) {
      theColArray[theRecArray[i]] = new Array(thisProp,theCheckColArray [theRecArray[i]][1]);
    } else {
      addColArray(theColArray,theRecArray[i],thisProp,theHiColor,false);
    }
  }
}

function selRec(theSQLString,themaId,zoomTo,showTable,showRec,zoomBorder,theWindow) {
  var theTime = 0;
  if (showRec) {
    clearColArray(colSelRecArray,colIdentifyArray);
    colSelRecArray = null;
    clearColArray(colHiliteArray);
    colHiliteArray = null;
  }
  if (showTable) {  // ggf. neues Fenster anlegen
    var thisProp = SVGRoot.getElementById(themaId).getAttributeNS(theProgNS,'styleprop');
    if (theWindow == null) {
      var theWindow = writeTableDoc(thisProp);
      theTime = 300;
    }
    if (theWindow == null) {
      myAlert('Need Popups to display the results');
      return false;
    }
  }
  var timer = new Timer();
  timer.setTimeout("selRecInsert",theTime,theSQLString,themaId,zoomTo,showTable,showRec,zoomBorder,theWindow);
}

function selRecInsert(theSQLString,themaId,zoomTo,showTable,showRec,zoomBorder,theWindow) {

  var winError = window.onerror;
  window.onerror = selRecError;
  var newWindow = false;

  if (XMLFileArray[themaId] == null) {
    XMLFileArray[themaId] = loadXMLDoc(startURL + 'embfiles/' + themaId + '.xml');
    if (XMLFileArray[themaId] == null) return false;
  }

  if (theSQLString.indexOf("like") != -1) {
    try {
      XMLFileArray[themaId].setProperty('SelectionLanguage', 'XPath');
    }    
    catch(e) {
    }
  } else {
    try {
      XMLFileArray[themaId].setProperty('SelectionLanguage', 'XSLPattern');
    }    
    catch(e) {
    }
  }

  var WurzelElement = XMLFileArray[themaId].documentElement;
  if (WurzelElement == null) return false;

  theSQLString = makeSQLString(theSQLString);

  var SelektionAll = WurzelElement.selectNodes("tabelle/records/rec/custom[" + theSQLString + "]");
  var newNode;

  if (SelektionAll == null) return false;

  if (showTable) {
    var winOpenText = "window.opener.";
    var theDoc = theWindow.document;
    if (!theDoc.getElementById('selRecContent')) {
      newNode = buildNode(theDoc,'div',{'id':'selRecContent'});
      theDoc.getElementsByTagName('body').item(0).appendChild(newNode);
      newWindow = true;
      if (browserType != 'netscape') winOpenText = "window.opener.window.opener.";
    } else {
      theDoc.getElementById('selRecContent').innerHTML = "";
    }

    var parentNode = theDoc.getElementById('selRecContent');
 
    if (newWindow) {
      parentNode.innerHTML += "<p><form><input type='button' value='" + QueryClearText + "' onclick='window.close();'></form></p>";
    } else {
      parentNode.innerHTML += "<p><a href='#tableTop'><image src='" + startURL + "/pictures/arrowtable.png' title='" + QueryBackText + "' class='imgTableTop' />" + QueryBackText + "</a></p>";
    }

    var themaTitel = '';
    if (WurzelElement.selectSingleNode('titel').hasChildNodes()) var themaTitel =  WurzelElement.selectSingleNode('titel').firstChild.nodeValue;

    newNode = buildNode(theDoc,'p',{'class':'tableHead'},QueryHeadText + " - " + themaTitel );
    parentNode.appendChild(newNode);

    if (SelektionAll.length > 0) {
      var recCount = WurzelElement.getElementsByTagName('rec').length;

      newNode = buildNode(theDoc,'p',{});
      parentNode.appendChild(newNode);
      parentNode.innerHTML += QueryHelpTableText;

      newNode = buildNode(theDoc,'p',{}, SelektionAll.length + QueryRecText1 + recCount + QueryRecText2);
      parentNode.appendChild(newNode);

      var tableNode = buildNode(theDoc,'table',{'class':'recTable'});
      var headings = WurzelElement.selectSingleNode('tabelle/fields');

      newNode = writeTHTags(theDoc,headings,1);
      tableNode.appendChild(newNode);

    } else {
      newNode = buildNode(theDoc,'p',{},QueryNoRecText);
      parentNode.appendChild(newNode);
    }

  }

  if (SelektionAll.length > 0) {
    var tmpColorArray = new Array();
    var tmpText;
    var thisProp = SVGRoot.getElementById(themaId).getAttributeNS(theProgNS,'styleprop');

    for(var j=0; j<SelektionAll.length; j++) {
      var Selektion = SelektionAll[j].parentNode;
      if (zoomTo) {
        if (j==0) {
          var MapViewXMin = parseFloat(Selektion.selectSingleNode('MVSVGXMin').firstChild.nodeValue);
          var MapViewXMax = parseFloat(Selektion.selectSingleNode('MVSVGXMax').firstChild.nodeValue);
          var MapViewYMin = parseFloat(Selektion.selectSingleNode('MVSVGYMin').firstChild.nodeValue);
          var MapViewYMax = parseFloat(Selektion.selectSingleNode('MVSVGYMax').firstChild.nodeValue);
        }
        tmpText = parseFloat(Selektion.selectSingleNode('MVSVGXMin').firstChild.nodeValue);

        MapViewXMin = Math.min(MapViewXMin,tmpText);
        tmpText = parseFloat(Selektion.selectSingleNode('MVSVGXMax').firstChild.nodeValue);
        MapViewXMax = Math.max(MapViewXMax,tmpText);
        tmpText = parseFloat(Selektion.selectSingleNode('MVSVGYMin').firstChild.nodeValue);
        MapViewYMin = Math.min(MapViewYMin,tmpText);
        tmpText = parseFloat(Selektion.selectSingleNode('MVSVGYMax').firstChild.nodeValue);
        MapViewYMax = Math.max(MapViewYMax,tmpText);
      }

      tmpText = Selektion.getAttributeNode('id').value;

      var theRecArray = getRecId(Selektion.selectSingleNode('tiles'),tmpText);

      if (showRec) {
        tmpColorArray = tmpColorArray.concat(theRecArray);
      }
      if (showTable) {
        newNode = writeRec(theDoc,Selektion,1,theRecArray,thisProp,winOpenText);
        tableNode.appendChild(newNode);
        theWindow.status = QueryStatusText1 + QueryRecText3 + ': ' + (j + 1);
      }
    }
    blnUseScaleInfo = false;
    if (zoomTo) zoomToExtent(MapViewXMin,MapViewXMax,MapViewYMin,MapViewYMax,zoomBorder);
    blnUseScaleInfo = true;
    // muss spaeter erfolgen, wegen Nachladen
    if (showRec) {
      colSelRecArray = new Object();
      fillColArray(colSelRecArray,tmpColorArray,colIdentifyArray,thisProp,true);
    }

    if (showTable) {
      theWindow.status = QueryStatusText2;
      parentNode.appendChild(tableNode);
      parentNode.innerHTML += ''; //wichtig sonst kein Update im Explorer
    }
  }
  if (showTable) {
    if (newWindow) {
      parentNode.innerHTML += "<p><form><input type='button' value='" + QueryClearText + "' onclick='window.close();'></form></p>";
    } else {
      // Fenster nach unten verschieben
      parentNode.innerHTML += "<p><a href='javascript:backColor();'>" + QueryClearText + "</a></p>";
      parentNode.innerHTML += "<p><a href='#tableTop'><image src='" + startURL + "/pictures/arrowtable.png' title='" + QueryBackText + "' class='imgTableTop' />" + QueryBackText + "</a></p>";
      parentNode.scrollIntoView(true);
    }
  }
  window.onerror = winError;
}

function writeTableDoc(theObjKind) {
  var dataWindow = open("","MVSVGRec","width=700,height=400,top=100,left=100,toolbar=no,menubar=no,location=no,hotkeys=no,resizable=yes,scrollbars=yes,dependent=yes,status=yes");
  if (dataWindow == null) return null;
  dataWindow.document.open();
  with(dataWindow.document) {
    writeln("<html><head><title>" + QueryHeadText + "<\/title>");
    var theFile = startURL + 'embfiles/style.css';
    writeln("<link rel='stylesheet' href='" + theFile + "'>");
    writeln("<script language='JavaScript' type='text/javascript'>");
    if (browserType == 'netscape') writeln("var myParent = window.opener;");
    else writeln("var myParent = window.opener.window.opener;");
    writeln("<\/script>");
    writeln("<\/head>");
    writeln("<body id='tableTop' onUnload='myParent.clearColArray(myParent.colSelRecArray);myParent.colSelRecArray = null;'><\/body><\/html>");
  }
  dataWindow.document.close();
  dataWindow.focus();
  return dataWindow;
}

function writeTHTags(theDoc,myObject,recNoState) {
  var trNode = buildNode(theDoc,'tr',{ });
  var thNode;
  if (recNoState == 1) {
    thNode = buildNode(theDoc,"th",{ },recNo);
    trNode.appendChild(thNode);
  }
  var tmpText;
  for(var i=0; i<myObject.childNodes.length; i++) {
    var EColumn = myObject.childNodes.item(i);
    if (EColumn.nodeType == 1) {
      tmpText = '';
      if (EColumn.hasChildNodes()) tmpText = EColumn.firstChild.nodeValue;
      thNode = buildNode(theDoc,"th",{ }, tmpText);
      trNode.appendChild(thNode);
    }
  }
  return trNode;
}

function writeRec(theDoc,Selektion,recNoState,theRecArray,thisProp,winOpenText) {
  var tmpText;
  var tdNode;
  var trNode = buildNode(theDoc,'tr',{ });
  if (recNoState == 1) {
    var MapViewNo = Selektion.selectSingleNode('MVSVGNo').firstChild.nodeValue;
    setAttributes(trNode, { "onmouseover":winOpenText + "showRec('" + theRecArray.join(",") + "','" + thisProp + "',this);","onmouseout":winOpenText + "showOut(this);"} );
    tdNode = buildNode(theDoc,'td',{ },MapViewNo );
    trNode.appendChild(tdNode);
  }
  var SelCustom = Selektion.selectSingleNode('custom');
  for(var j=0; j<SelCustom.childNodes.length; j++) {
    var EColumn = SelCustom.childNodes.item(j);
    if (EColumn.nodeType == 1) {
      tmpText = '';
      if (EColumn.hasChildNodes()) tmpText = EColumn.firstChild.nodeValue;
      tdNode = writeTD(tmpText,theDoc,false,'',false);
      trNode.appendChild(tdNode);
    }
  }
  return trNode;
}

function writeTD(tmpText,theDoc,doMVSVGLi,scriptPrefix,theClass) {
  var newNode = null;
  var feldText = '';
  if (tmpText.indexOf('@') != -1) {
    newNode = buildNode(theDoc,'a',{'href':'mailto:' + tmpText},tmpText);
  } else {
    if (tmpText.substr(0,4).toLowerCase() == 'http') {
      newNode = buildNode(theDoc,'a',{'href':tmpText,'target':'_blank'},tmpText);
    } else {
      if (!doMVSVGLi) feldText = tmpText;
      else newNode = writeMVSVGLi(tmpText,theDoc,newNode,scriptPrefix);
    }
  }
  tdNode = buildNode(theDoc,'td',{ }, feldText);
  if (newNode != null) {
    if (theClass) newNode.setAttribute('class','identify');
    tdNode.appendChild(newNode);
  }

  return tdNode;
}

function writeMVSVGLi(tmpText,theDoc,newNod,scriptPrefix) {
  if (tmpText.substr(0,6).toLowerCase() == 'links/') {
    tmpText = startURL + tmpText;
    var newNode = buildNode(theDoc,'a',{'href':"javascript:" + scriptPrefix + "linkOpen('" + tmpText + "')",'class':'identify'},ObjectLinkText);
  } else {
    if (tmpText.substr(0,3) == '../') tmpText = startURL + tmpText;
    var newNode = buildNode(theDoc,'a',{'href':tmpText,'class':'identify','target':'_blank'},ObjectLinkText);
  }
  return newNode;
}

function makeSQLString(theString) {
  theString = theString.replace(/<>/g,'!=');
  //theString = theString.replace(/\(/g,"( "); // warum war das drin?
  theString = theString.replace(/\\/g,'\\\\');
  while(theString.indexOf("  ") != -1) {
    theString = theString.replace(/  /g,' ');
  }
  while (theString.indexOf("like") != -1) {
    var theValue = theString.substr(theString.indexOf("like") + 6,theString.length);
    theValue = theValue.substring(0,theValue.indexOf('"'));
    var theField = theString.substring(0,theString.indexOf("like") - 1);
    if (theField.lastIndexOf(" ") != -1) {
      theField = theField.substr(theField.lastIndexOf(" ") + 1,theField.length);
    }
    var strSearch = theField + ' like "' + theValue + '"';
    var strReplace = "";
    if (theValue.indexOf("%") == 0) {
      theValue = theValue.substr(1,theValue.length);
      if (theValue.substr(theValue.length - 1,1) == "%") {
        theValue = theValue.substring(0,theValue.indexOf("%"));
        strReplace = "contains(" + theField + ",'" + theValue + "')";
      } else {
        strReplace = "'" + theValue + "' = substring(" + theField + ",string-length(" + theField + ") - " + (theValue.length - 1) + ")";
      }
    } else {
      if (theValue.indexOf("%") != -1) theValue = theValue.substring(0,theValue.indexOf("%"));
      strReplace = "starts-with(" + theField + ",'" + theValue + "')";
    }
    theString = theString.replace(strSearch,strReplace);
  }
  return theString;
}


// source/credits: "Algorithm": http://www.codingforums.com/showthread.php?s=&threadid=10531
function Timer(){
    this.obj = (arguments.length)?arguments[0]:window;
    return this;
}
Timer.prototype.setInterval = function(func, msec){
    var i = Timer.getNew();
    var t = Timer.buildCall(this.obj, i, arguments);
    Timer.set[i].timer = window.setInterval(t,msec);
    return i;
}
Timer.prototype.setTimeout = function(func, msec){
    var i = Timer.getNew();
    Timer.buildCall(this.obj, i, arguments);
    Timer.set[i].timer = window.setTimeout("Timer.callOnce("+i+");",msec);
    return i;
}
Timer.prototype.clearInterval = function(i){
    if(!Timer.set[i]) return;
    window.clearInterval(Timer.set[i].timer);
    Timer.set[i] = null;
}
Timer.prototype.clearTimeout = function(i){
    if(!Timer.set[i]) return;
    window.clearTimeout(Timer.set[i].timer);
    Timer.set[i] = null;
}
Timer.set = new Array();
Timer.buildCall = function(obj, i, args){
    var t = "";
    Timer.set[i] = new Array();
    if(obj != window){
        Timer.set[i].obj = obj;
        t = "Timer.set["+i+"].obj.";
    }
    t += args[0]+"(";
    if(args.length > 2){
        Timer.set[i][0] = args[2];
        t += "Timer.set["+i+"][0]";
        for(var j=1; (j+2)<args.length; j++){
            Timer.set[i][j] = args[j+2];
            t += ", Timer.set["+i+"]["+j+"]";
    }}
    t += ");";
    Timer.set[i].call = t;
    return t;
}
Timer.callOnce = function(i){
    if(!Timer.set[i]) return;
    eval(Timer.set[i].call);
    Timer.set[i] = null;
}
Timer.getNew = function(){
    var i = 0;
    while(Timer.set[i]) i++;
    return i;
}