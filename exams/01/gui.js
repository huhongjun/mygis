var reSizePosCounter = 0;
var reSizePosObjects = new Array();

//this function parses and creates GUI elements
//the function is called recursively
function parseGUI(node,parentNode) {
	while(node) {
		if (node.nodeType == 1) { //ELEMENT_NODE
			var parent = false;
			if (node.nodeName == "guiDefaults") {
				parseGUIDefaults(node);
			}
			if (node.nodeName == "window") {
				var parent = parseWindow(node,parentNode);
			}
			if (node.nodeName == "tabgroup") {
				var parent = parseTabgroup(node,parentNode);
			}
			if (node.nodeName == "tab") {
				var parent = parseTab(node,parentNode);
			}
			if (node.nodeName == "textbox") {
				parseTextbox(node,parentNode);
			}
			if (node.nodeName == "button") {
				parseButton(node,parentNode);
			}
			if (node.nodeName == "selectionList") {
				parseSelectionList(node,parentNode);
			}
			if (node.nodeName == "combobox") {
				parseCombobox(node,parentNode);
			}
			if (node.nodeName == "radioButtonGroup") {
				var parent = parseRadioButtonGroup(node,parentNode);
			}
			if (node.nodeName == "checkBox") {
				parseCheckBox(node,parentNode);
			}
			if (node.nodeName == "slider") {
				parseSlider(node,parentNode);
			}
			if (node.nodeName == "svg:text" || node.nodeName == "svg:g" || node.nodeName == "svg:rect" || node.nodeName == "svg:circle" || node.nodeName == "svg:ellipse" || node.nodeName == "svg:path") {
				parseSVG(node,parentNode);
			}
			if (node.nodeName == "svgExternalFragment") {
				addExternalSVGFragment(node,parentNode);
			}
			if (node.hasChildNodes() && parent && (!node.nodeName.match(/\bsvg:/))) {
				parseGUI(node.firstChild,parent);
			}
		}
		node = node.nextSibling;
	}
}

//this function parses default values applicable to all GUI elements of a certain kind
function parseGUIDefaults(node) {
	var guiChild = node.firstChild;
	while (guiChild) {
		if (guiChild.nodeType == 1) {
			var guiName = guiChild.nodeName.replace(/Defaults/,"")
			myMapApp.guiDefaults[guiName] = new Array();
			for (var i=0;i<guiChild.attributes.length;i++) {
				myMapApp.guiDefaults[guiName][guiChild.attributes.item(i).nodeName] = guiChild.attributes.item(i).nodeValue;
				//make sure that in case of an empty string we still get a value
				if (!guiChild.attributes.item(i).nodeValue) {
					myMapApp.guiDefaults[guiName][guiChild.attributes.item(i).nodeName] = new String("");
				}
			}
		}
		guiChild = guiChild.nextSibling;
	}
}

//error message for missing gui attribute
function errorMissingGUIAttribute(id,guiName,missingAttrib) {
	alert("Error in creating '"+guiName+"' with id '"+id+"': missing required attribute '"+missingAttrib+"'");
}

/********************* --------------- ****************/
/*************************** Window *******************/
/********************* --------------- ****************/
function parseWindow(node,parentNode) {
	var createWindow = true;
	var guiName = "window";
	//read out window properties
	if (node.hasAttribute("id")) {
		var windowId = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createWindow = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of window with id '"+windowId+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of window with id '"+windowId+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"parentId");	
		createWindow = false;
	}
	if (node.hasAttribute("width")) {
		var origWidth = node.getAttribute("width");
		var width = eval(origWidth);
	}
	else if (myMapApp.guiDefaults[guiName]["width"]) {
		var origWidth = myMapApp.guiDefaults[guiName]["width"];	
		var width = eval(origWidth);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"width");	
		createWindow = false;
	}
	if (node.hasAttribute("height")) {
		var origHeight = node.getAttribute("height");
		var height = eval(origHeight);
	}
	else if (myMapApp.guiDefaults[guiName]["height"]) {
		var origHeight = myMapApp.guiDefaults[guiName]["height"];	
		var height = eval(origHeight);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"height");	
		createWindow = false;
	}
	if (node.hasAttribute("transX")) {
		var origtransX = node.getAttribute("transX");
		var transX = eval(origtransX);
	}
	else if (myMapApp.guiDefaults[guiName]["transX"]) {
		var origtransX = myMapApp.guiDefaults[guiName]["transX"];	
		var transX = eval(origtransX);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"transX");	
		createWindow = false;
	}
	if (node.hasAttribute("transY")) {
		var origtransY = node.getAttribute("transY");
		var transY = eval(origtransY);
	}
	else if (myMapApp.guiDefaults[guiName]["transY"]) {
		var origtransY = myMapApp.guiDefaults[guiName]["transY"];	
		var transY = eval(origtransY);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"transY");	
		createWindow = false;
	}
	if (node.hasAttribute("moveable")) {
		var moveable = eval(node.getAttribute("moveable"));
	}
	else if (myMapApp.guiDefaults[guiName]["moveable"]) {
		var moveable = eval(myMapApp.guiDefaults[guiName]["moveable"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"moveable");	
		createWindow = false;
	}
	if (node.hasAttribute("constrXmin")) {
		var constrXmin = parseFloat(node.getAttribute("constrXmin"));
	}
	else if (myMapApp.guiDefaults[guiName]["constrXmin"]) {
		var constrXmin = parseFloat(myMapApp.guiDefaults[guiName]["constrXmin"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"constrXmin");	
		createWindow = false;
	}
	if (node.hasAttribute("constrXmax")) {
		var constrXmax = parseFloat(node.getAttribute("constrXmax"));
	}
	else if (myMapApp.guiDefaults[guiName]["constrXmax"]) {
		var constrXmax = parseFloat(myMapApp.guiDefaults[guiName]["constrXmax"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"constrXmax");	
		createWindow = false;
	}
	if (node.hasAttribute("constrYmin")) {
		var constrYmin = parseFloat(node.getAttribute("constrYmin"));
	}
	else if (myMapApp.guiDefaults[guiName]["constrYmin"]) {
		var constrYmin = parseFloat(myMapApp.guiDefaults[guiName]["constrYmin"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"constrYmin");	
		createWindow = false;
	}
	if (node.hasAttribute("constrYmax")) {
		var constrYmax = parseFloat(node.getAttribute("constrYmax"));
	}
	else if (myMapApp.guiDefaults[guiName]["constrYmax"]) {
		var constrYmax = parseFloat(myMapApp.guiDefaults[guiName]["constrYmax"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"constrYmax");	
		createWindow = false;
	}
	if (node.hasAttribute("showContent")) {
		var showContent = eval(node.getAttribute("showContent"));
	}
	else if (myMapApp.guiDefaults[guiName]["showContent"]) {
		var showContent = eval(myMapApp.guiDefaults[guiName]["showContent"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"showContent");	
		createWindow = false;
	}
	if (node.hasAttribute("placeholderStyles")) {
		var placeholderStyles = eval(node.getAttribute("placeholderStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["placeholderStyles"]) {
		var placeholderStyles = eval(myMapApp.guiDefaults[guiName]["placeholderStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"placeholderStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("windowStyles")) {
		var windowStyles = eval(node.getAttribute("windowStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["windowStyles"]) {
		var windowStyles = eval(myMapApp.guiDefaults[guiName]["windowStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"windowStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("margin")) {
		var margin = parseFloat(node.getAttribute("margin"));
	}
	else if (myMapApp.guiDefaults[guiName]["margin"]) {
		var margin = parseFloat(myMapApp.guiDefaults[guiName]["margin"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"margin");	
		createWindow = false;
	}
	if (node.hasAttribute("titleBarVisible")) {
		var titleBarVisible = eval(node.getAttribute("titleBarVisible"));
	}
	else if (myMapApp.guiDefaults[guiName]["titleBarVisible"]) {
		var titleBarVisible = eval(myMapApp.guiDefaults[guiName]["titleBarVisible"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"titleBarVisible");	
		createWindow = false;
	}
	if (node.hasAttribute("statusBarVisible")) {
		var statusBarVisible = eval(node.getAttribute("statusBarVisible"));
	}
	else if (myMapApp.guiDefaults[guiName]["statusBarVisible"]) {
		var statusBarVisible = eval(myMapApp.guiDefaults[guiName]["statusBarVisible"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"statusBarVisible");	
		createWindow = false;
	}
	if (node.hasAttribute("titleText")) {
		var titleText = node.getAttribute("titleText");
	}
	else if (myMapApp.guiDefaults[guiName]["titleText"]) {
		var titleText = myMapApp.guiDefaults[guiName]["titleText"];
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"titleText");	
	}
	if (node.hasAttribute("statusText")) {
		var statusText = node.getAttribute("statusText");
	}
	else if (myMapApp.guiDefaults[guiName]["statusText"]) {
		var statusText = myMapApp.guiDefaults[guiName]["statusText"];
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"statusText");	
		createWindow = false;
	}
	if (node.hasAttribute("closeButton")) {
		var closeButton = eval(node.getAttribute("closeButton"));
	}
	else if (myMapApp.guiDefaults[guiName]["closeButton"]) {
		var closeButton = eval(myMapApp.guiDefaults[guiName]["closeButton"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"closeButton");	
		createWindow = false;
	}
	if (node.hasAttribute("minimizeButton")) {
		var minimizeButton = eval(node.getAttribute("minimizeButton"));
	}
	else if (myMapApp.guiDefaults[guiName]["minimizeButton"]) {
		var minimizeButton = eval(myMapApp.guiDefaults[guiName]["minimizeButton"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"minimizeButton");	
		createWindow = false;
	}
	if (node.hasAttribute("maximizeButton")) {
		var maximizeButton = eval(node.getAttribute("maximizeButton"));
	}
	else if (myMapApp.guiDefaults[guiName]["maximizeButton"]) {
		var maximizeButton = eval(myMapApp.guiDefaults[guiName]["maximizeButton"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"maximizeButton");	
		createWindow = false;
	}
	if (node.hasAttribute("titlebarStyles")) {
		var titlebarStyles = eval(node.getAttribute("titlebarStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["titlebarStyles"]) {
		var titlebarStyles = eval(myMapApp.guiDefaults[guiName]["titlebarStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"titlebarStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("titlebarHeight")) {
		var titlebarHeight = parseFloat(node.getAttribute("titlebarHeight"));
	}
	else if (myMapApp.guiDefaults[guiName]["titlebarHeight"]) {
		var titlebarHeight = parseFloat(myMapApp.guiDefaults[guiName]["titlebarHeight"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"titlebarHeight");	
		createWindow = false;
	}
	if (node.hasAttribute("statusbarStyles")) {
		var statusbarStyles = eval(node.getAttribute("statusbarStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["statusbarStyles"]) {
		var statusbarStyles = eval(myMapApp.guiDefaults[guiName]["statusbarStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"statusbarStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("statusbarHeight")) {
		var statusbarHeight = parseFloat(node.getAttribute("statusbarHeight"));
	}
	else if (myMapApp.guiDefaults[guiName]["statusbarHeight"]) {
		var statusbarHeight = parseFloat(myMapApp.guiDefaults[guiName]["statusbarHeight"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"statusbarHeight");	
		createWindow = false;
	}
	if (node.hasAttribute("titletextStyles")) {
		var titletextStyles = eval(node.getAttribute("titletextStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["titletextStyles"]) {
		var titletextStyles = eval(myMapApp.guiDefaults[guiName]["titletextStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"titletextStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("statustextStyles")) {
		var statustextStyles = eval(node.getAttribute("statustextStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["statustextStyles"]) {
		var statustextStyles = eval(myMapApp.guiDefaults[guiName]["statustextStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"statustextStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("buttonStyles")) {
		var buttonStyles = eval(node.getAttribute("buttonStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["buttonStyles"]) {
		var buttonStyles = eval(myMapApp.guiDefaults[guiName]["buttonStyles"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"buttonStyles");	
		createWindow = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"functionToCall");	
		createWindow = false;
	}
	var resize = false;
	if (node.hasAttribute("resize")) {
		resize = eval(node.getAttribute("resize"));
	}
	else if (myMapApp.guiDefaults[guiName]["resize"]) {
		resize = eval(myMapApp.guiDefaults[guiName]["resize"]);
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//initialize return value, first false, but if successfully creating window it contains the group node where new content can be appended
	var newParent = false;
	//create new window instance
	if (createWindow) {
		myMapApp.Windows[windowId] = new Window(windowId,parentId,width,height,transX,transY,moveable,constrXmin,constrYmin,constrXmax,constrYmax,showContent,placeholderStyles,windowStyles,margin,titleBarVisible,statusBarVisible,titleText,statusText,closeButton,minimizeButton,maximizeButton,titlebarStyles,titlebarHeight,statusbarStyles,statusbarHeight,titletextStyles,statustextStyles,buttonStyles,functionToCall);
		if (resize || repos) {
			if (resize) {
				myMapApp.Windows[windowId].origWidth = origWidth;
				myMapApp.Windows[windowId].origHeight = origHeight;
				myMapApp.Windows[windowId].Resize = true;
			}
			else {
				myMapApp.Windows[windowId].Resize = false;
			}
			if (repos) {
				myMapApp.Windows[windowId].origtransX = origtransX;
				myMapApp.Windows[windowId].origtransY = origtransY;
				myMapApp.Windows[windowId].Repos = true;
			}
			else {
				myMapApp.Windows[windowId].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.Windows[windowId];
			reSizePosCounter++;
		}
		newParent = myMapApp.Windows[windowId].windowMainGroup;
	}
	return newParent;
}

/********************* --------------- ****************/
/************************* tabgroup *******************/
/********************* --------------- ****************/
function parseTabgroup(node,parentNode) {
	var createTabgroup = true;
	var guiName = "tabgroup";
	//read out tabgroup properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createTabgroup = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of tabgroup with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of tabgroup with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createTabgroup = false;
	}
	if (node.hasAttribute("transX")) {
		var origX = node.getAttribute("transX");
		var transX = eval(origX);
	}
	else if (myMapApp.guiDefaults[guiName]["transX"]) {
		var origX = myMapApp.guiDefaults[guiName]["transX"];	
		var transX = eval(origX);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"transX");	
		createTabgroup = false;
	}
	if (node.hasAttribute("transY")) {
		var origY = node.getAttribute("transY");
		var transY = eval(origY);
	}
	else if (myMapApp.guiDefaults[guiName]["transY"]) {
		var origY = myMapApp.guiDefaults[guiName]["transY"];	
		var transY = eval(origY);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"transY");	
		createTabgroup = false;
	}
	if (node.hasAttribute("width")) {
		var origWidth = node.getAttribute("width");
		var width = eval(origWidth);
	}
	else if (myMapApp.guiDefaults[guiName]["width"]) {
		var origWidth = myMapApp.guiDefaults[guiName]["width"];	
		var width = eval(origWidth);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"width");	
		createTabgroup = false;
	}
	if (node.hasAttribute("height")) {
		var origHeight = node.getAttribute("height");
		var height = eval(origHeight);
	}
	else if (myMapApp.guiDefaults[guiName]["height"]) {
		var origHeight = myMapApp.guiDefaults[guiName]["height"];	
		var height = eval(origHeight);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"height");	
		createTabgroup = false;
	}
	if (node.hasAttribute("tabheight")) {
		var tabheight = parseFloat(node.getAttribute("tabheight"));
	}
	else if (myMapApp.guiDefaults[guiName]["tabheight"]) {
		var tabheight = parseFloat(myMapApp.guiDefaults[guiName]["tabheight"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"tabheight");	
		createTabgroup = false;
	}
	if (node.hasAttribute("cornerLeft")) {
		var cornerLeft = node.getAttribute("cornerLeft");
	}
	else if (myMapApp.guiDefaults[guiName]["cornerLeft"]) {
		var cornerLeft = myMapApp.guiDefaults[guiName]["cornerLeft"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"cornerLeft");	
		createTabgroup = false;
	}
	if (node.hasAttribute("cornerRight")) {
		var cornerRight = node.getAttribute("cornerRight");
	}
	else if (myMapApp.guiDefaults[guiName]["cornerRight"]) {
		var cornerRight = myMapApp.guiDefaults[guiName]["cornerRight"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"cornerRight");	
		createTabgroup = false;
	}
	if (node.hasAttribute("tabmargins")) {
		var tabmargins = parseFloat(node.getAttribute("tabmargins"));
	}
	else if (myMapApp.guiDefaults[guiName]["tabmargins"]) {
		var tabmargins = parseFloat(myMapApp.guiDefaults[guiName]["tabmargins"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"tabmargins");	
		createTabgroup = false;
	}
	if (node.hasAttribute("spaceBetweenTabs")) {
		var spaceBetweenTabs = parseFloat(node.getAttribute("spaceBetweenTabs"));
	}
	else if (myMapApp.guiDefaults[guiName]["spaceBetweenTabs"]) {
		var spaceBetweenTabs = parseFloat(myMapApp.guiDefaults[guiName]["spaceBetweenTabs"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"spaceBetweenTabs");	
		createTabgroup = false;
	}
	if (node.hasAttribute("tabStyles")) {
		var tabStyles = eval(node.getAttribute("tabStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["tabStyles"]) {
		var tabStyles = eval(myMapApp.guiDefaults[guiName]["tabStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"tabStyles");	
		createTabgroup = false;
	}
	if (node.hasAttribute("activetabBGColor")) {
		var activetabBGColor = node.getAttribute("activetabBGColor");
	}
	else if (myMapApp.guiDefaults[guiName]["activetabBGColor"]) {
		var activetabBGColor = myMapApp.guiDefaults[guiName]["activetabBGColor"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"activetabBGColor");	
		createTabgroup = false;
	}
	if (node.hasAttribute("tabwindowStyles")) {
		var tabwindowStyles = eval(node.getAttribute("tabwindowStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["tabwindowStyles"]) {
		var tabwindowStyles = eval(myMapApp.guiDefaults[guiName]["tabwindowStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"tabwindowStyles");	
		createTabgroup = false;
	}
	if (node.hasAttribute("tabtextStyles")) {
		var tabtextStyles = eval(node.getAttribute("tabtextStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["tabtextStyles"]) {
		var tabtextStyles = eval(myMapApp.guiDefaults[guiName]["tabtextStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"tabtextStyles");	
		createTabgroup = false;
	}
	if (node.hasAttribute("activeTabindex")) {
		var activeTabindex = parseInt(node.getAttribute("activeTabindex"));
	}
	else if (myMapApp.guiDefaults[guiName]["activeTabindex"]) {
		var activeTabindex = parseInt(myMapApp.guiDefaults[guiName]["activeTabindex"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"activeTabindex");	
		createTabgroup = false;
	}
	if (node.hasAttribute("hideContent")) {
		var hideContent = eval(node.getAttribute("hideContent"));
	}
	else if (myMapApp.guiDefaults[guiName]["hideContent"]) {
		var hideContent = eval(myMapApp.guiDefaults[guiName]["hideContent"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"hideContent");	
		createTabgroup = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"functionToCall");	
		createTabgroup = false;
	}
	var resize = false;
	if (node.hasAttribute("resize")) {
		resize = eval(node.getAttribute("resize"));
	}
	else if (myMapApp.guiDefaults[guiName]["resize"]) {
		resize = eval(myMapApp.guiDefaults[guiName]["resize"]);
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//now read individual tabs
	var tabTitles = new Array();
	var tabGroupChild = node.firstChild;
	while (tabGroupChild) {
		if (tabGroupChild.nodeType == 1) {
			if (tabGroupChild.nodeName == "tab") {
				tabTitles.push(tabGroupChild.getAttribute("title"));
			}
		}
		tabGroupChild = tabGroupChild.nextSibling;
	}
	//create new window instance
	if (createTabgroup) {
		//now create tabgroup
		myMapApp.tabgroups[id] = new tabgroup(id,parentId,transX,transY,width,height,tabheight,cornerLeft,cornerRight,tabmargins,spaceBetweenTabs,tabStyles,activetabBGColor,tabwindowStyles,tabtextStyles,tabTitles,activeTabindex,hideContent,functionToCall);
		//have to add resize/repos functionality here later
		if (resize || repos) {
			if (resize) {
				myMapApp.tabgroups[id].origWidth = origWidth;
				myMapApp.tabgroups[id].origHeight = origHeight;
				myMapApp.tabgroups[id].Resize = true;
			}
			else {
				myMapApp.tabgroups[id].Resize = false;
			}
			if (repos) {
				myMapApp.tabgroups[id].origtransX = origX;
				myMapApp.tabgroups[id].origtransY = origY;
				myMapApp.tabgroups[id].Repos = true;
			}
			else {
				myMapApp.tabgroups[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.tabgroups[id];
			reSizePosCounter++;
		}
	}
	var newParent = false;
	if (tabTitles.length > 0) {
		//we return the id of the tabgroup so the child tab knows which is his parent
		newParent = id;
	}
	return newParent;
}

/********************* --------------- ****************/
/************************** tab ***********************/
/********************* --------------- ****************/
function parseTab(node,id) {
	//now we have to find the correct index for being able to return a new parent
	var newParent = false;
	var tabId = node.getAttribute("title");
	for (var i=0;i<myMapApp.tabgroups[id].tabTitles.length;i++) {
		if (myMapApp.tabgroups[id].tabTitles[i] == tabId) {
			newParent = myMapApp.tabgroups[id].tabwindows[i]["content"];
		}
	}
	return newParent;
}


/********************* --------------- ****************/
/************************** textbox *******************/
/********************* --------------- ****************/
function parseTextbox(node,parentNode) {
	var createTextbox = true;
	var guiName = "textbox";
	//read out tabgroup properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createTextbox = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of textbox with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of textbox with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createTextbox = false;
	}
	if (node.hasAttribute("defaultVal")) {
		var defaultVal = node.getAttribute("defaultVal");
		if (!defaultVal) {
			defaultVal = new String("");
		}
	}
	else if (myMapApp.guiDefaults[guiName]["defaultVal"]) {
		var defaultVal = myMapApp.guiDefaults[guiName]["defaultVal"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"defaultVal");	
		createTextbox = false;
	}
	if (node.hasAttribute("maxChars")) {
		var maxChars = parseInt(node.getAttribute("maxChars"));
	}
	else if (myMapApp.guiDefaults[guiName]["maxChars"]) {
		var maxChars = parseInt(myMapApp.guiDefaults[guiName]["maxChars"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"maxChars");	
		createTextbox = false;
	}
	if (node.hasAttribute("x")) {
		var origX = node.getAttribute("x");
		var x = eval(origX);
	}
	else if (myMapApp.guiDefaults[guiName]["x"]) {
		var origX = myMapApp.guiDefaults[guiName]["x"];	
		var x = eval(origX);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"x");	
		createTextbox = false;
	}
	if (node.hasAttribute("y")) {
		var origY = node.getAttribute("y");
		var y = eval(origY);
	}
	else if (myMapApp.guiDefaults[guiName]["y"]) {
		var origY = myMapApp.guiDefaults[guiName]["y"];	
		var y = eval(origY);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"y");	
		createTextbox = false;
	}
	if (node.hasAttribute("boxWidth")) {
		var origWidth = node.getAttribute("boxWidth");
		var boxWidth = eval(origWidth);
	}
	else if (myMapApp.guiDefaults[guiName]["boxWidth"]) {
		var origWidth = myMapApp.guiDefaults[guiName]["boxWidth"];	
		var boxWidth = eval(origWidth);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"boxWidth");	
		createTextbox = false;
	}
	if (node.hasAttribute("boxHeight")) {
		var origHeight = node.getAttribute("boxHeight");
		var boxHeight = eval(origHeight);
	}
	else if (myMapApp.guiDefaults[guiName]["boxHeight"]) {
		var origHeight = myMapApp.guiDefaults[guiName]["boxHeight"];	
		var boxHeight = eval(origHeight);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"boxHeight");	
		createTextbox = false;
	}
	if (node.hasAttribute("textYOffset")) {
		var textYOffsetOrig = node.getAttribute("textYOffset");
		var textYOffset = eval(textYOffsetOrig);
	}
	else if (myMapApp.guiDefaults[guiName]["textYOffset"]) {
		var textYOffsetOrig = myMapApp.guiDefaults[guiName]["textYOffset"];	
		var textYOffset = eval(textYOffsetOrig);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textYOffset");	
		createTextbox = false;
	}
	if (node.hasAttribute("textStyles")) {
		var textStyles = eval(node.getAttribute("textStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["textStyles"]) {
		var textStyles = eval(myMapApp.guiDefaults[guiName]["textStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textStyles");	
		createTextbox = false;
	}
	if (node.hasAttribute("boxStyles")) {
		var boxStyles = eval(node.getAttribute("boxStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["boxStyles"]) {
		var boxStyles = eval(myMapApp.guiDefaults[guiName]["boxStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"boxStyles");	
		createTextbox = false;
	}
	if (node.hasAttribute("cursorStyles")) {
		var cursorStyles = eval(node.getAttribute("cursorStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["cursorStyles"]) {
		var cursorStyles = eval(myMapApp.guiDefaults[guiName]["cursorStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"cursorStyles");	
		createTextbox = false;
	}
	if (node.hasAttribute("selBoxStyles")) {
		var selBoxStyles = eval(node.getAttribute("selBoxStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["selBoxStyles"]) {
		var selBoxStyles = eval(myMapApp.guiDefaults[guiName]["selBoxStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"selBoxStyles");	
		createTextbox = false;
	}
	if (node.hasAttribute("allowedChars")) {
		var allowedchrs = node.getAttribute("allowedChars");
		if (allowedchrs) {
			if (allowedChars == "undefined") {
				allowedChars = undefined;
			}
			else {
				var allowedChars = allowedchrs;
			}
		}
		else {
			allowedChars = undefined;
		}
	}
	else if (myMapApp.guiDefaults[guiName]["allowedChars"]) {
		var allowedchrs = myMapApp.guiDefaults[guiName]["allowedChars"];	
		if (allowedchrs) {
			if (allowedchrs == "undefined") {
				allowedChars = undefined;
			}
			else {
				var allowedChars = allowedchrs;
			}
		}
		else {
			allowedChars = undefined;
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"allowedChars");	
		createTextbox = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"functionToCall");	
		createTextbox = false;
	}
	var resize = false;
	if (node.hasAttribute("resize")) {
		resize = eval(node.getAttribute("resize"));
	}
	else if (myMapApp.guiDefaults[guiName]["resize"]) {
		resize = eval(myMapApp.guiDefaults[guiName]["resize"]);
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//create new textbox instance
	if (createTextbox) {
		myMapApp.textboxes[id] = new textbox(id,parentId,defaultVal,maxChars,x,y,boxWidth,boxHeight,textYOffset,textStyles,boxStyles,cursorStyles,selBoxStyles,allowedChars,functionToCall);
		if (resize || repos) {
			if (resize) {
				myMapApp.textboxes[id].origWidth = origWidth;
				myMapApp.textboxes[id].Resize = true;
			}
			else {
				myMapApp.textboxes[id].Resize = false;
			}
			if (repos) {
				myMapApp.textboxes[id].origtransX = origX;
				myMapApp.textboxes[id].origtransY = origY;
				myMapApp.textboxes[id].Repos = true;
			}
			else {
				myMapApp.textboxes[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.textboxes[id];
			reSizePosCounter++;
		}
	}
}

/********************* --------------- ****************/
/********************** SVG Elements *******************/
/********************* --------------- ****************/
function parseSVG(node,parentNode) {
	var guiName = node.nodeName.replace(/\bsvg:/,"");
	//see if we have an id
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		var id = "undefined";
	}
	//see how we can get a parent node
	if (node.hasAttribute("parentId")) {
		var parentId = document.getElementById(node.getAttribute("parentId"));
		node.removeAttribute("parentId");
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g" || parentNode.nodeName == "svg:svg" || parentNode.nodeName == "svg:g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of svg element with id '"+id+"' and nodeName '"+node.nodeName+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of svg element with id '"+id+"' and nodeName '"+node.nodeName+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
	}
	//parentId is now a node reference
	//apply default variables if not present
	for (var key in myMapApp.guiDefaults[guiName]) {
		if (node.hasAttribute(key) == false) {
			node.setAttribute(key,myMapApp.guiDefaults[guiName][key])
		}
	}
	//append node
	//I really don't understand why I have to clone the node first; if I don't clone the node, the parseGUI will stop with its loop
	var clonedNode = node.cloneNode(true);
	parentId.appendChild(clonedNode);
}

/********************* --------------- ****************/
/** SVG fragments to be loaded from external files*****/
/********************* --------------- ****************/
function addExternalSVGFragment(node,parentNode) {
	var guiName = node.nodeName.replace(/\bsvg:/,"");
	//see if we have an id
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		var id = "undefined";
	}
	//see how we can get a parent node
	if (node.hasAttribute("parentId")) {
		var parentId = document.getElementById(node.getAttribute("parentId"));
		node.removeAttribute("parentId");
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g" || parentNode.nodeName == "svg:svg" || parentNode.nodeName == "svg:g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of svg element with id '"+id+"' and nodeName '"+node.nodeName+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of svg element with id '"+id+"' and nodeName '"+node.nodeName+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
	}
	//get url
	if (node.hasAttribute("url")) {
		var url = document.getElementById(node.getAttribute("url"));
	}
	else {
		alert("Required url of external svg fragment with id '"+id+"' is undefined");
		url = undefined;
	}
	//make network request
	if (url) {
		var externalFragmentLoader = new getData(url,appendExternalSVGFragment,"xml","get",undefined,undefined);
	}
	
}

/********************* --------------- ****************/
/** SVG fragments to be loaded from external files*****/
/********************* --------------- ****************/
function appendExternalSVGFragment(node) {


}

/********************* --------------- ****************/
/************************** button *******************/
/********************* --------------- ****************/
function parseButton(node,parentNode) {
	var createButton = true;
	var guiName = "button";
	//read out button properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createButton = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of button with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of button with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createButton = false;
	}
	if (node.hasAttribute("whichButton")) {
		var whichButton = node.getAttribute("whichButton");
	}
	else if (myMapApp.guiDefaults[guiName]["whichButton"]) {
		var whichButton = myMapApp.guiDefaults[guiName]["whichButton"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"whichButton");	
		createButton = false;
	}
	//test if of value "button" or "switchbutton"
	if (whichButton != "button" && whichButton != "switchbutton") {
		alert("Error: attribute 'whichButton' has to be either 'button' or 'switchbutton'");
		createButton = false;
	}
	if (node.hasAttribute("buttonType")) {
		var buttonType = node.getAttribute("buttonType");
	}
	else if (myMapApp.guiDefaults[guiName]["buttonType"]) {
		var buttonType = myMapApp.guiDefaults[guiName]["buttonType"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"buttonType");	
		createButton = false;
	}
	//test if of value "rect" or "ellipse"
	if (buttonType != "rect" && buttonType != "ellipse") {
		alert("Error: attribute 'buttonType' has to be either 'rect' or 'ellipse'");
		createButton = false;
	}
	if (node.hasAttribute("buttonText")) {
		var buttonText = node.getAttribute("buttonText");
	}
	else if (myMapApp.guiDefaults[guiName]["buttonText"]) {
		var buttonText = myMapApp.guiDefaults[guiName]["buttonText"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"buttonText");	
		createButton = false;
	}
	//see if it is undefined
	if (buttonText == "undefined") {
		buttonText = undefined;
	}
	if (node.hasAttribute("buttonSymbolId")) {
		var buttonSymbolId = node.getAttribute("buttonSymbolId");
	}
	else if (myMapApp.guiDefaults[guiName]["buttonSymbolId"]) {
		var buttonSymbolId = myMapApp.guiDefaults[guiName]["buttonSymbolId"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"buttonSymbolId");	
		createButton = false;
	}
	//see if it is undefined
	if (buttonSymbolId == "undefined") {
		buttonSymbolId = undefined;
	}	
	if (node.hasAttribute("x")) {
		var origX = node.getAttribute("x");
		var x = eval(origX);
	}
	else if (myMapApp.guiDefaults[guiName]["x"]) {
		var origX = myMapApp.guiDefaults[guiName]["x"];	
		var x = eval(origX);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"x");	
		createButton = false;
	}
	if (node.hasAttribute("y")) {
		var origY = node.getAttribute("y");
		var y = eval(origY);
	}
	else if (myMapApp.guiDefaults[guiName]["y"]) {
		var origY = myMapApp.guiDefaults[guiName]["y"];	
		var y = eval(origY);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"y");	
		createButton = false;
	}
	if (node.hasAttribute("width")) {
		var origWidth = node.getAttribute("width");
		var width = eval(origWidth);
	}
	else if (myMapApp.guiDefaults[guiName]["width"]) {
		var origWidth = myMapApp.guiDefaults[guiName]["width"];	
		var width = eval(origWidth);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"width");	
		createButton = false;
	}
	if (node.hasAttribute("height")) {
		var origHeight = node.getAttribute("height");
		var height = eval(origHeight);
	}
	else if (myMapApp.guiDefaults[guiName]["height"]) {
		var origHeight = myMapApp.guiDefaults[guiName]["height"];	
		var height = eval(origHeight);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"height");	
		createButton = false;
	}
	if (node.hasAttribute("textStyles")) {
		var textStyles = eval(node.getAttribute("textStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["textStyles"]) {
		var textStyles = eval(myMapApp.guiDefaults[guiName]["textStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textStyles");	
		createButton = false;
	}
	if (node.hasAttribute("buttonStyles")) {
		var buttonStyles = eval(node.getAttribute("buttonStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["buttonStyles"]) {
		var buttonStyles = eval(myMapApp.guiDefaults[guiName]["buttonStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"buttonStyles");	
		createButton = false;
	}
	if (node.hasAttribute("shadeLightStyles")) {
		var shadeLightStyles = eval(node.getAttribute("shadeLightStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["shadeLightStyles"]) {
		var shadeLightStyles = eval(myMapApp.guiDefaults[guiName]["shadeLightStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"shadeLightStyles");	
		createButton = false;
	}
	if (node.hasAttribute("shadeDarkStyles")) {
		var shadeDarkStyles = eval(node.getAttribute("shadeDarkStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["shadeDarkStyles"]) {
		var shadeDarkStyles = eval(myMapApp.guiDefaults[guiName]["shadeDarkStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"shadeDarkStyles");	
		createButton = false;
	}
	if (node.hasAttribute("shadowOffset")) {
		var shadowOffset = eval(node.getAttribute("shadowOffset"));
	}
	else if (myMapApp.guiDefaults[guiName]["shadowOffset"]) {
		var shadowOffset = eval(myMapApp.guiDefaults[guiName]["shadowOffset"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"shadowOffset");	
		createButton = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"functionToCall");	
		createButton = false;
	}
	var resize = false;
	if (node.hasAttribute("resize")) {
		resize = eval(node.getAttribute("resize"));
	}
	else if (myMapApp.guiDefaults[guiName]["resize"]) {
		resize = eval(myMapApp.guiDefaults[guiName]["resize"]);
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//create new button instance
	if (createButton) {
		if (whichButton == "button") {
			myMapApp.buttons[id] = new button(id,parentId,functionToCall,buttonType,buttonText,buttonSymbolId,x,y,width,height,textStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,shadowOffset); 
		}
		if (whichButton == "switchbutton") {
			myMapApp.buttons[id] = new switchbutton(id,parentId,functionToCall,buttonType,buttonText,buttonSymbolId,x,y,width,height,textStyles,buttonStyles,shadeLightStyles,shadeDarkStyles,shadowOffset); 
		}
		if (resize || repos) {
			if (resize) {
				myMapApp.buttons[id].origWidth = origWidth;
				myMapApp.buttons[id].origHeight = origHeight;
				myMapApp.buttons[id].Resize = true;
			}
			else {
				myMapApp.buttons[id].Resize = false;
			}
			if (repos) {
				myMapApp.buttons[id].origtransX = origX;
				myMapApp.buttons[id].origtransY = origY;
				myMapApp.buttons[id].Repos = true;
			}
			else {
				myMapApp.buttons[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.buttons[id];
			reSizePosCounter++;
		}
	}
}

/********************* --------------- ****************/
/*********************  Selectionlist  *****************/
/********************* --------------- ****************/
function parseSelectionList(node,parentNode) {
	var createSelList = true;
	var guiName = "selectionList";
	//read out selectionList properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createSelList = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of selectionList with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of selectionList with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createSelList = false;
	}
	if (node.hasAttribute("width")) {
		var origWidth = node.getAttribute("width");
		var width = eval(origWidth);
	}
	else if (myMapApp.guiDefaults[guiName]["whichButton"]) {
		var origWidth = myMapApp.guiDefaults[guiName]["width"];	
		var width = eval(origWidth);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"width");	
		createSelList = false;
	}
	if (node.hasAttribute("xOffset")) {
		var origX = node.getAttribute("xOffset");
		var xOffset = eval(origX);
	}
	else if (myMapApp.guiDefaults[guiName]["xOffset"]) {
		var origX = myMapApp.guiDefaults[guiName]["xOffset"];	
		var xOffset = eval(origX);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"xOffset");	
		createSelList = false;
	}
	if (node.hasAttribute("yOffset")) {
		var origY = node.getAttribute("yOffset");
		var yOffset = eval(origY);
	}
	else if (myMapApp.guiDefaults[guiName]["yOffset"]) {
		var origY = myMapApp.guiDefaults[guiName]["yOffset"];	
		var yOffset = eval(origY);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"yOffset");	
		createSelList = false;
	}
	if (node.hasAttribute("cellHeight")) {
		var cellHeight = parseFloat(node.getAttribute("cellHeight"));
	}
	else if (myMapApp.guiDefaults[guiName]["cellHeight"]) {
		var cellHeight = parseFloat(myMapApp.guiDefaults[guiName]["cellHeight"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"cellHeight");	
		createSelList = false;
	}
	if (node.hasAttribute("textPadding")) {
		var textPadding = parseFloat(node.getAttribute("textPadding"));
	}
	else if (myMapApp.guiDefaults[guiName]["textPadding"]) {
		var textPadding = parseFloat(myMapApp.guiDefaults[guiName]["textPadding"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textPadding");	
		createSelList = false;
	}
	if (node.hasAttribute("heightNrElements")) {
		var heightNrElements = parseInt(node.getAttribute("heightNrElements"));
	}
	else if (myMapApp.guiDefaults[guiName]["heightNrElements"]) {
		var heightNrElements = parseInt(myMapApp.guiDefaults[guiName]["heightNrElements"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"heightNrElements");	
		createSelList = false;
	}
	if (node.hasAttribute("textStyles")) {
		var textStyles = eval(node.getAttribute("textStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["textStyles"]) {
		var textStyles = eval(myMapApp.guiDefaults[guiName]["textStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textStyles");	
		createSelList = false;
	}
	if (node.hasAttribute("boxStyles")) {
		var boxStyles = eval(node.getAttribute("boxStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["boxStyles"]) {
		var boxStyles = eval(myMapApp.guiDefaults[guiName]["boxStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"boxStyles");	
		createSelList = false;
	}
	if (node.hasAttribute("scrollbarStyles")) {
		var scrollbarStyles = eval(node.getAttribute("scrollbarStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["scrollbarStyles"]) {
		var scrollbarStyles = eval(myMapApp.guiDefaults[guiName]["scrollbarStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"scrollbarStyles");	
		createSelList = false;
	}
	if (node.hasAttribute("selBoxSmallrectStyles")) {
		var selBoxSmallrectStyles = eval(node.getAttribute("selBoxSmallrectStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["selBoxSmallrectStyles"]) {
		var selBoxSmallrectStyles = eval(myMapApp.guiDefaults[guiName]["selBoxSmallrectStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"selBoxSmallrectStyles");	
		createSelList = false;
	}
	if (node.hasAttribute("highlightStyles")) {
		var highlightStyles = eval(node.getAttribute("highlightStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["highlightStyles"]) {
		var highlightStyles = eval(myMapApp.guiDefaults[guiName]["highlightStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"highlightStyles");	
		createSelList = false;
	}
	if (node.hasAttribute("selBoxTriangleStyles")) {
		var selBoxTriangleStyles = eval(node.getAttribute("selBoxTriangleStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["selBoxTriangleStyles"]) {
		var selBoxTriangleStyles = eval(myMapApp.guiDefaults[guiName]["selBoxTriangleStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"selBoxTriangleStyles");	
		createSelList = false;
	}
	if (node.hasAttribute("preSelect")) {
		var preSelect = eval(node.getAttribute("preSelect"));
	}
	else if (myMapApp.guiDefaults[guiName]["preSelect"]) {
		var preSelect = eval(myMapApp.guiDefaults[guiName]["preSelect"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"preSelect");	
		createSelList = false;
	}
	if (node.hasAttribute("openAbove")) {
		var openAbove = eval(node.getAttribute("openAbove"));
	}
	else if (myMapApp.guiDefaults[guiName]["openAbove"]) {
		var openAbove = eval(myMapApp.guiDefaults[guiName]["openAbove"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"openAbove");	
		createSelList = false;
	}
	if (node.hasAttribute("putOnTopOfParent")) {
		var putOnTopOfParent = eval(node.getAttribute("putOnTopOfParent"));
	}
	else if (myMapApp.guiDefaults[guiName]["putOnTopOfParent"]) {
		var putOnTopOfParent = eval(myMapApp.guiDefaults[guiName]["putOnTopOfParent"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"putOnTopOfParent");	
		createSelList = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"functionToCall");	
		createSelList = false;
	}
	var resize = false;
	if (node.hasAttribute("resize")) {
		resize = eval(node.getAttribute("resize"));
	}
	else if (myMapApp.guiDefaults[guiName]["resize"]) {
		resize = eval(myMapApp.guiDefaults[guiName]["resize"]);
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//now read items
	if (node.hasAttribute("datasource")) {
		var datasource = node.getAttribute("datasource");
	}
	else if (myMapApp.guiDefaults[guiName]["datasource"]) {
		var datasource = myMapApp.guiDefaults[guiName]["datasource"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"datasource");	
		createSelList = false;
	}
	var elementsArray = new Array();
	if (datasource == "inline") {
		var selBoxChild = node.firstChild;
		while (selBoxChild) {
			if (selBoxChild.nodeType == 1) {
				if (selBoxChild.nodeName == "item") {
					elementsArray.push(selBoxChild.firstChild.nodeValue);
				}
			}
			selBoxChild = selBoxChild.nextSibling;
		}
	}
	if (datasource == "variable") {
		var selBoxChilds = node.getElementsByTagName("variable");
		if (selBoxChilds.length == 1) {
			elementsArray = eval(selBoxChilds.item(0).getAttribute("name"));
		}
		else {
			alert("Error in selectionList with id '"+id+"': for datasource='variable' you need exactly one child with the elementsname 'variable'!")
		}
	}
	//create new selectionList instance
	if (createSelList) {
		myMapApp.selectionLists[id] = new selectionList(id,parentNode,elementsArray,width,xOffset,yOffset,cellHeight,textPadding,heightNrElements,textStyles,boxStyles,scrollbarStyles,selBoxSmallrectStyles,highlightStyles,selBoxTriangleStyles,preSelect,openAbove,putOnTopOfParent,functionToCall); 
		if (resize || repos) {
			if (resize) {
				myMapApp.selectionLists[id].origWidth = origWidth;
				myMapApp.selectionLists[id].Resize = true;
			}
			else {
				myMapApp.selectionLists[id].Resize = false;
			}
			if (repos) {
				myMapApp.selectionLists[id].origtransX = origX;
				myMapApp.selectionLists[id].origtransY = origY;
				myMapApp.selectionLists[id].Repos = true;
			}
			else {
				myMapApp.selectionLists[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.selectionLists[id];
			reSizePosCounter++;
		}
	}
}

/********************* --------------- ****************/
/*********************  Combobox  *****************/
/********************* --------------- ****************/
function parseCombobox(node,parentNode) {
	var createCombobox = true;
	var guiName = "combobox";
	//read out selectionList properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createCombobox = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of combobox with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of combobox with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createCombobox = false;
	}
	if (node.hasAttribute("width")) {
		var origWidth = node.getAttribute("width");
		var width = eval(origWidth);
	}
	else if (myMapApp.guiDefaults[guiName]["whichButton"]) {
		var origWidth = myMapApp.guiDefaults[guiName]["width"];	
		var width = eval(origWidth);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"width");	
		createCombobox = false;
	}
	if (node.hasAttribute("xOffset")) {
		var origX = node.getAttribute("xOffset");
		var xOffset = eval(origX);
	}
	else if (myMapApp.guiDefaults[guiName]["xOffset"]) {
		var origX = myMapApp.guiDefaults[guiName]["xOffset"];	
		var xOffset = eval(origX);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"xOffset");	
		createCombobox = false;
	}
	if (node.hasAttribute("yOffset")) {
		var origY = node.getAttribute("yOffset");
		var yOffset = eval(origY);
	}
	else if (myMapApp.guiDefaults[guiName]["yOffset"]) {
		var origY = myMapApp.guiDefaults[guiName]["yOffset"];	
		var yOffset = eval(origY);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"yOffset");	
		createCombobox = false;
	}
	if (node.hasAttribute("cellHeight")) {
		var cellHeight = parseFloat(node.getAttribute("cellHeight"));
	}
	else if (myMapApp.guiDefaults[guiName]["cellHeight"]) {
		var cellHeight = parseFloat(myMapApp.guiDefaults[guiName]["cellHeight"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"cellHeight");	
		createCombobox = false;
	}
	if (node.hasAttribute("textPadding")) {
		var textPadding = parseFloat(node.getAttribute("textPadding"));
	}
	else if (myMapApp.guiDefaults[guiName]["textPadding"]) {
		var textPadding = parseFloat(myMapApp.guiDefaults[guiName]["textPadding"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textPadding");	
		createCombobox = false;
	}
	if (node.hasAttribute("heightNrElements")) {
		var heightNrElements = parseInt(node.getAttribute("heightNrElements"));
	}
	else if (myMapApp.guiDefaults[guiName]["heightNrElements"]) {
		var heightNrElements = parseInt(myMapApp.guiDefaults[guiName]["heightNrElements"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"heightNrElements");	
		createCombobox = false;
	}
	if (node.hasAttribute("multiple")) {
		var multiple = eval(node.getAttribute("multiple"));
	}
	else if (myMapApp.guiDefaults[guiName]["multiple"]) {
		var multiple = eval(myMapApp.guiDefaults[guiName]["multiple"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"multiple");	
		createCombobox = false;
	}
	if (node.hasAttribute("offsetValue")) {
		var offsetValue = parseInt(node.getAttribute("offsetValue"));
	}
	else if (myMapApp.guiDefaults[guiName]["offsetValue"]) {
		var offsetValue = parseInt(myMapApp.guiDefaults[guiName]["offsetValue"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"offsetValue");	
		createCombobox = false;
	}
	if (node.hasAttribute("textStyles")) {
		var textStyles = eval(node.getAttribute("textStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["textStyles"]) {
		var textStyles = eval(myMapApp.guiDefaults[guiName]["textStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textStyles");	
		createCombobox = false;
	}
	if (node.hasAttribute("boxStyles")) {
		var boxStyles = eval(node.getAttribute("boxStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["boxStyles"]) {
		var boxStyles = eval(myMapApp.guiDefaults[guiName]["boxStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"boxStyles");	
		createCombobox = false;
	}
	if (node.hasAttribute("scrollbarStyles")) {
		var scrollbarStyles = eval(node.getAttribute("scrollbarStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["scrollbarStyles"]) {
		var scrollbarStyles = eval(myMapApp.guiDefaults[guiName]["scrollbarStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"scrollbarStyles");	
		createCombobox = false;
	}
	if (node.hasAttribute("smallrectStyles")) {
		var smallrectStyles = eval(node.getAttribute("smallrectStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["smallrectStyles"]) {
		var smallrectStyles = eval(myMapApp.guiDefaults[guiName]["smallrectStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"smallrectStyles");	
		createCombobox = false;
	}
	if (node.hasAttribute("highlightStyles")) {
		var highlightStyles = eval(node.getAttribute("highlightStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["highlightStyles"]) {
		var highlightStyles = eval(myMapApp.guiDefaults[guiName]["highlightStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"highlightStyles");	
		createCombobox = false;
	}
	if (node.hasAttribute("triangleStyles")) {
		var triangleStyles = eval(node.getAttribute("triangleStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["triangleStyles"]) {
		var triangleStyles = eval(myMapApp.guiDefaults[guiName]["triangleStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"triangleStyles");	
		createCombobox = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"functionToCall");	
		createCombobox = false;
	}
	var resize = false;
	if (node.hasAttribute("resize")) {
		resize = eval(node.getAttribute("resize"));
	}
	else if (myMapApp.guiDefaults[guiName]["resize"]) {
		resize = eval(myMapApp.guiDefaults[guiName]["resize"]);
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//now read items
	if (node.hasAttribute("datasource")) {
		var datasource = node.getAttribute("datasource");
	}
	else if (myMapApp.guiDefaults[guiName]["datasource"]) {
		var datasource = myMapApp.guiDefaults[guiName]["datasource"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"datasource");	
		createCombobox = false;
	}
	var elementsArray = new Array();
	if (datasource == "inline") {
		var comboBoxChild = node.firstChild;
		while (comboBoxChild) {
			if (comboBoxChild.nodeType == 1) {
				if (comboBoxChild.nodeName == "item") {
					var checked = eval(comboBoxChild.getAttribute("checked"));
					elementsArray.push({key:comboBoxChild.firstChild.nodeValue,value:checked});
				}
			}
			comboBoxChild = comboBoxChild.nextSibling;
		}
	}
	if (datasource == "variable") {
		var comboBoxChild = node.getElementsByTagName("variable");
		if (comboBoxChild.length == 1) {
			elementsArray = eval(comboBoxChild.item(0).getAttribute("name"));
		}
		else {
			alert("Error in combobox with id '"+id+"': for datasource='variable' you need exactly one child with the elementsname 'variable' and the attribute 'name'!")
		}
	}
	//create new selectionList instance
	if (createCombobox) {
		myMapApp.comboboxes[id] = new combobox(id,parentNode,elementsArray,width,xOffset,yOffset,cellHeight,textPadding,heightNrElements,multiple,offsetValue,textStyles,boxStyles,scrollbarStyles,smallrectStyles,highlightStyles,triangleStyles,functionToCall); 
		if (resize || repos) {
			if (resize) {
				myMapApp.comboboxes[id].origWidth = origWidth;
				myMapApp.comboboxes[id].Resize = true;
			}
			else {
				myMapApp.comboboxes[id].Resize = false;
			}
			if (repos) {
				myMapApp.comboboxes[id].origtransX = origX;
				myMapApp.comboboxes[id].origtransY = origY;
				myMapApp.comboboxes[id].Repos = true;
			}
			else {
				myMapApp.comboboxes[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.comboboxes[id];
			reSizePosCounter++;
		}
	}
}


/********************* --------------- ****************/
/*********************  checkbox  *****************/
/********************* --------------- ****************/
function parseCheckBox(node,parentNode) {
	var createCheckBox = true;
	var guiName = "checkBox";
	//read out checkBox properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createCheckBox = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of checkBox with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of checkBox with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createCheckBox = false;
	}
	if (node.hasAttribute("x")) {
		var origX = node.getAttribute("x");
		var x = eval(origX);
	}
	else if (myMapApp.guiDefaults[guiName]["x"]) {
		var origX = myMapApp.guiDefaults[guiName]["x"];	
		var x = eval(origX);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"x");	
		createCheckBox = false;
	}
	if (node.hasAttribute("y")) {
		var origY = node.getAttribute("y");
		var y = eval(origY);
	}
	else if (myMapApp.guiDefaults[guiName]["y"]) {
		var origY = myMapApp.guiDefaults[guiName]["y"];	
		var y = eval(origY);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"y");	
		createCheckBox = false;
	}
	if (node.hasAttribute("checkboxId")) {
		var checkboxId = node.getAttribute("checkboxId");
	}
	else if (myMapApp.guiDefaults[guiName]["checkboxId"]) {
		var checkboxId = myMapApp.guiDefaults[guiName]["checkboxId"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"checkboxId");	
		createCheckBox = false;
	}
	if (node.hasAttribute("checkcrossId")) {
		var checkcrossId = node.getAttribute("checkcrossId");
	}
	else if (myMapApp.guiDefaults[guiName]["checkcrossId"]) {
		var checkcrossId = myMapApp.guiDefaults[guiName]["checkcrossId"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"checkcrossId");	
		createCheckBox = false;
	}
	if (node.hasAttribute("checkedStatus")) {
		var checkedStatus = eval(node.getAttribute("checkedStatus"));
	}
	else if (myMapApp.guiDefaults[guiName]["checkedStatus"]) {
		var checkedStatus = eval(myMapApp.guiDefaults[guiName]["checkedStatus"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"checkedStatus");	
		createCheckBox = false;
	}
	if (node.hasAttribute("labelText")) {
		var labelText = node.getAttribute("labelText");
	}
	else if (myMapApp.guiDefaults[guiName]["labelText"]) {
		var labelText = myMapApp.guiDefaults[guiName]["labelText"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"labelText");	
		createCheckBox = false;
	}
	if (node.hasAttribute("textStyles")) {
		var textStyles = eval(node.getAttribute("textStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["textStyles"]) {
		var textStyles = eval(myMapApp.guiDefaults[guiName]["textStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"textStyles");	
		createCheckBox = false;
	}
	if (node.hasAttribute("labelDistance")) {
		var labelDistance = parseFloat(node.getAttribute("labelDistance"));
	}
	else if (myMapApp.guiDefaults[guiName]["labelDistance"]) {
		var labelDistance = parseFloat(myMapApp.guiDefaults[guiName]["labelDistance"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"labelDistance");	
		createCheckBox = false;
	}
	if (node.hasAttribute("labelYOffset")) {
		var labelYOffset = parseFloat(node.getAttribute("labelYOffset"));
	}
	else if (myMapApp.guiDefaults[guiName]["labelYOffset"]) {
		var labelYOffset = parseFloat(myMapApp.guiDefaults[guiName]["labelYOffset"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"labelYOffset");	
		createCheckBox = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(windowId,guiName,"functionToCall");	
		createCheckBox = false;
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//create new checkBox instance
	if (createCheckBox) {
		myMapApp.checkBoxes[id] = new checkBox(id,parentNode,x,y,checkboxId,checkcrossId,checkedStatus,labelText,textStyles,labelDistance,labelYOffset,myMapApp.currentRadiobuttongroup,functionToCall); 
		if (repos) {
			if (repos) {
				myMapApp.checkBoxes[id].origtransX = origX;
				myMapApp.checkBoxes[id].origtransY = origY;
				myMapApp.checkBoxes[id].Repos = true;
			}
			else {
				myMapApp.checkBoxes[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.checkBoxes[id];
			reSizePosCounter++;
		}
	}
}

/********************* --------------- ****************/
/*********************  slider        *****************/
/********************* --------------- ****************/
function parseSlider(node,parentNode) {
	var createSlider = true;
	var guiName = "slider";
	//read out slider properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createSlider = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = node.getAttribute("parentId");
	}
	else if (myMapApp.guiDefaults[guiName]["parentId"]) {
		var parentId = myMapApp.guiDefaults[guiName]["parentId"];	
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of slider with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of slider with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createSlider = false;
	}
	if (node.hasAttribute("x1")) {
		var origX1 = node.getAttribute("x1");
		var x1 = eval(origX1);
	}
	else if (myMapApp.guiDefaults[guiName]["x1"]) {
		var origX1 = myMapApp.guiDefaults[guiName]["x1"];	
		var x1 = eval(origX1);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"x1");	
		createSlider = false;
	}
	if (node.hasAttribute("y1")) {
		var origY1 = node.getAttribute("y1");
		var y1 = eval(origY1);
	}
	else if (myMapApp.guiDefaults[guiName]["y1"]) {
		var origY1 = myMapApp.guiDefaults[guiName]["y1"];	
		var y1 = eval(origY1);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"y1");	
		createSlider = false;
	}
	if (node.hasAttribute("value1")) {
		var origValue1 = node.getAttribute("value1");
		var value1 = eval(origValue1);
	}
	else if (myMapApp.guiDefaults[guiName]["value1"]) {
		var origValue1 = myMapApp.guiDefaults[guiName]["value1"];	
		var value1 = eval(origValue1);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"value1");	
		createSlider = false;
	}
	if (node.hasAttribute("x2")) {
		var origX2 = node.getAttribute("x2");
		var x2 = eval(origX2);
	}
	else if (myMapApp.guiDefaults[guiName]["x2"]) {
		var origX2 = myMapApp.guiDefaults[guiName]["x2"];	
		var x2 = eval(origX2);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"x2");	
		createSlider = false;
	}
	if (node.hasAttribute("y2")) {
		var origY2 = node.getAttribute("y2");
		var y2 = eval(origY2);
	}
	else if (myMapApp.guiDefaults[guiName]["y2"]) {
		var origY2 = myMapApp.guiDefaults[guiName]["y2"];	
		var y2 = eval(origY2);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"y2");	
		createSlider = false;
	}
	if (node.hasAttribute("value2")) {
		var origValue2 = node.getAttribute("value2");
		var value2 = eval(origValue2);
	}
	else if (myMapApp.guiDefaults[guiName]["value2"]) {
		var origValue2 = myMapApp.guiDefaults[guiName]["value2"];	
		var value2 = eval(origValue2);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"value2");	
		createSlider = false;
	}
	if (node.hasAttribute("startVal")) {
		var startVal = parseFloat(eval(node.getAttribute("startVal")));
	}
	else if (myMapApp.guiDefaults[guiName]["startVal"]) {
		var startVal = parseFloat(eval(myMapApp.guiDefaults[guiName]["startVal"]));	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"startVal");	
		createSlider = false;
	}
	if (node.hasAttribute("sliderStyles")) {
		var sliderStyles = eval(node.getAttribute("sliderStyles"));
	}
	else if (myMapApp.guiDefaults[guiName]["sliderStyles"]) {
		var sliderStyles = eval(myMapApp.guiDefaults[guiName]["sliderStyles"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"sliderStyles");	
		createSlider = false;
	}
	if (node.hasAttribute("invisSliderWidth")) {
		var invisSliderWidth = parseFloat(eval(node.getAttribute("invisSliderWidth")));
	}
	else if (myMapApp.guiDefaults[guiName]["invisSliderWidth"]) {
		var invisSliderWidth = parseFloat(eval(myMapApp.guiDefaults[guiName]["invisSliderWidth"]));	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"invisSliderWidth");	
		createSlider = false;
	}
	if (node.hasAttribute("sliderSymb")) {
		var sliderSymb = node.getAttribute("sliderSymb");
	}
	else if (myMapApp.guiDefaults[guiName]["sliderSymb"]) {
		var sliderSymb = myMapApp.guiDefaults[guiName]["sliderSymb"];	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"sliderSymb");	
		createSlider = false;
	}
	if (node.hasAttribute("mouseMoveBool")) {
		var mouseMoveBool = eval(node.getAttribute("mouseMoveBool"));
	}
	else if (myMapApp.guiDefaults[guiName]["mouseMoveBool"]) {
		var mouseMoveBool = eval(myMapApp.guiDefaults[guiName]["mouseMoveBool"]);	
	}
	else {
		errorMissingGUIAttribute(id,guiName,"mouseMoveBool");	
		createSlider = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else if (myMapApp.guiDefaults[guiName]["functionToCall"]) {
		var functionToCall = eval(myMapApp.guiDefaults[guiName]["functionToCall"]);
	}
	else {
		errorMissingGUIAttribute(id,guiName,"functionToCall");	
		createSlider = false;
	}
	var repos = false;
	if (node.hasAttribute("repos")) {
		repos = eval(node.getAttribute("repos"));
	}
	else if (myMapApp.guiDefaults[guiName]["repos"]) {
		repos = eval(myMapApp.guiDefaults[guiName]["repos"]);
	}
	//create new slider instance
	if (createSlider) {
		myMapApp.sliders[id] = new slider(id,parentId,x1,y1,value1,x2,y2,value2,startVal,sliderStyles,invisSliderWidth,sliderSymb,functionToCall,mouseMoveBool);
		if (repos) {
			if (repos) {
				myMapApp.sliders[id].origtransX1 = origX1;
				myMapApp.sliders[id].origtransY1 = origY1;
				myMapApp.sliders[id].origtransX2 = origX2;
				myMapApp.sliders[id].origtransY2 = origY2;
				myMapApp.sliders[id].Repos = true;
			}
			else {
				myMapApp.sliders[id].Repos = false;				
			}
			reSizePosObjects[reSizePosCounter] = myMapApp.sliders[id];
			reSizePosCounter++;
		}
	}
}


/********************* --------------- ****************/
/*********************  radioButtonGroup   *****************/
/********************* --------------- ****************/
function parseRadioButtonGroup(node,parentNode) {
	var createRadioButtonGroup = true;
	var guiName = "radioButtonGroup";
	//read out radioButtonGroup properties
	if (node.hasAttribute("id")) {
		var id = node.getAttribute("id");
	}
	else {
		errorMissingGUIAttribute("undefined",guiName,"id");
		createRadioButtonGroup = false;
	}
	if (node.hasAttribute("parentId")) {
		var parentId = document.getElementById(node.getAttribute("parentId"));
	}
	else if (parentNode) {
		if (typeof(parentNode) == "object") {
			if (parentNode.nodeName == "svg" || parentNode.nodeName == "g" || parentNode.nodeName == "svg:svg" || parentNode.nodeName == "svg:g") {
				var parentId = parentNode;
			}
			else {
				alert("parent node of radioButtonGroup with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");			
			}
		}
		else {
			alert("parent node of radioButtonGroup with id '"+id+"' has to be of type object and nodeName 'svg' or 'g'!");
		}
	}
	else {
		errorMissingGUIAttribute(id,guiName,"parentId");	
		createRadioButtonGroup = false;
	}
	if (node.hasAttribute("functionToCall")) {
		var functionToCall = eval(node.getAttribute("functionToCall"));
	}
	else {
		errorMissingGUIAttribute(id,guiName,"functionToCall");	
		createRadioButtonGroup = false;
	}
	
	//create new radioButtonGroup instance
	if (createRadioButtonGroup && node.hasChildNodes()) {
		myMapApp.radioButtonGroups[id] = new radioButtonGroup(id,functionToCall);
		myMapApp.currentRadiobuttongroup = myMapApp.radioButtonGroups[id];
		var radioButtonChild = node.firstChild;
		while(radioButtonChild) {
			if (radioButtonChild.nodeType == 1) { //ELEMENT_NODE
				if (radioButtonChild.nodeName == "checkBox") {
					parseCheckBox(radioButtonChild,parentId);
				}
			}
			radioButtonChild = radioButtonChild.nextSibling;
		}
		myMapApp.currentRadiobuttongroup = undefined;
	}
}
