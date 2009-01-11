//empty array for name search
var emptyTitleSearchResult = [{key:"0,no result",value:false},{key:"1,no result",value:false},{key:"2,no result",value:false},{key:"3,no result",value:false}];

function changeSearchParams(radioId,cbId,labelText) {
	if (cbId == "logicalOr") {
		myMapApp.logicalAndOr = "OR";
	}
	if (cbId == "logicalAnd") {
		myMapApp.logicalAndOr = "AND";		
	}	
}

function resetKeywords() {
	for (var checkBox in myMapApp.checkBoxes) {
		if (checkBox.match(/^KW/)) {
			if (myMapApp.checkBoxes[checkBox].checkedStatus) {
				myMapApp.checkBoxes[checkBox].uncheck(false);
			}
		}
	}
	
	myMapApp.radioButtonGroups["andOr"].selectById("logicalOr",false);
	loadPhotos();
}


function kantonSelected(id,index,value) {
	//filter bezirke by kanton id
	bezirkIdsTempArray = new Array();
	if (index == 0) {
		//in this case we want to see all of Switzerland
		myMapApp.selectionLists["bezirke"].elementsArray = bezirke;
		myMapApp.selectionLists["gemeinden"].elementsArray = gemeinden;
		//reset to full view
		myMapApp.refMapDragger.zoom("full");	
	}
	else {
		var kantonId = kantonIds[index] * 100;
		var bezirkeTempArray = new Array();
		bezirkeTempArray.push("---");
		bezirkIdsTempArray.push(undefined);
		for (var i=0;i<bezirke.length;i++) {
			if (bezirkIds[i] >= kantonId && bezirkIds[i] < (kantonId + 99)) {
				bezirkeTempArray.push(bezirke[i]);
				bezirkIdsTempArray.push(bezirkIds[i]);
			} 	
		}
		myMapApp.selectionLists["bezirke"].elementsArray = bezirkeTempArray;

		//filter gemeinden by kantons id
		kantonId /= 100;
		var gemeindenTempArray = new Array();
		gemeindenTempArray.push("---");
		for (var i=0;i<gemeinden.length;i++) {
			if (gemeindeKantonsIds[i] == kantonId) {
				gemeindenTempArray.push(gemeinden[i]);
			} 	
		}
		myMapApp.selectionLists["gemeinden"].elementsArray = gemeindenTempArray;
		//get kanton data (SVG polygon)
		var url = "sendSingleAdminData.php?adminType=kantone&name="+value;
		var getAdminDataObj = new getData(url,addAdminPolygon,"xml","get",undefined,undefined);
		getAdminDataObj.getData();
	}
	myMapApp.selectionLists["bezirke"].selectElementByPosition(0,false);
	myMapApp.selectionLists["gemeinden"].selectElementByPosition(0,false);
}

function bezirkSelected(id,index,value) {
	//filter gemeinden by bezirk id
	if (index == 0) {
		if (myMapApp.selectionLists["kantone"].getCurrentSelectionIndex() == 0) {
			myMapApp.selectionLists["gemeinden"].elementsArray = gemeinden;
			//reset to full view
			myMapApp.refMapDragger.zoom("full");		
		}
		else {
			var kantonId = kantonIds[myMapApp.selectionLists["kantone"].getCurrentSelectionIndex()];
			var gemeindenTempArray = new Array();
			gemeindenTempArray.push("---");
			for (var i=0;i<gemeinden.length;i++) {
				if (gemeindeKantonsIds[i] == kantonId) {
					gemeindenTempArray.push(gemeinden[i]);
				} 	
			}
			myMapApp.selectionLists["gemeinden"].elementsArray = gemeindenTempArray;
			//get kanton data (SVG polygon)
			var url = "sendSingleAdminData.php?adminType=kantone&name="+myMapApp.selectionLists["kantone"].getCurrentSelectionElement();
			var getAdminDataObj = new getData(url,addAdminPolygon,"xml","get",undefined,undefined);
			getAdminDataObj.getData();
		}
	}
	else {
		if (bezirkIdsTempArray.length > 0) {
			bezirksid = bezirkIdsTempArray[index];
		}
		else {
			bezirksid = bezirkIds[index];			
		}
		var gemeindenTempArray = new Array();
		gemeindenTempArray.push("---");
		for (var i=0;i<gemeinden.length;i++) {
			if (gemeindeBezirksIds[i] == bezirksid) {
				gemeindenTempArray.push(gemeinden[i]);
			} 	
		}
		myMapApp.selectionLists["gemeinden"].elementsArray = gemeindenTempArray;
		//get bezirk data (SVG polygon)
		var url = "sendSingleAdminData.php?adminType=bezirke&name="+value;
		var getAdminDataObj = new getData(url,addAdminPolygon,"xml","get",undefined,undefined);
		getAdminDataObj.getData();
	}
	myMapApp.selectionLists["gemeinden"].selectElementByPosition(0,false);
}

function gemeindeSelected(id,index,value) {
	if (index != 0) {
		//get gemeinde data (SVG polygon)
		var url = "sendSingleAdminData.php?adminType=gemeinden&name="+value;
		var getAdminDataObj = new getData(url,addAdminPolygon,"xml","get",undefined,undefined);
		getAdminDataObj.getData();
	}
	else {
		if (myMapApp.selectionLists["bezirke"].getCurrentSelectionIndex() == 0) {
			if (myMapApp.selectionLists["kantone"].getCurrentSelectionIndex() == 0) {
				//reset to full view
				myMapApp.refMapDragger.zoom("full");		
			}
			else {
				//get kanton data (SVG polygon)
				var url = "sendSingleAdminData.php?adminType=kantone&name="+myMapApp.selectionLists["kantone"].getCurrentSelectionElement();
				var getAdminDataObj = new getData(url,addAdminPolygon,"xml",undefined,undefined);
				getAdminDataObj.getData();	
			}
		}
		else {
			//get bezirk data (SVG polygon)
			var url = "sendSingleAdminData.php?adminType=bezirke&name="+myMapApp.selectionLists["bezirke"].getCurrentSelectionElement();
			var getAdminDataObj = new getData(url,addAdminPolygon,"xml","get",undefined,undefined);
			getAdminDataObj.getData();	
		}
	}
}

function addAdminPolygon(node) {
	if (myMainMap.adminGroup.hasChildNodes()) {
		myMainMap.adminGroup.removeChild(myMainMap.adminGroup.firstChild);
	}
	myMainMap.adminGroup.appendChild(node);
	var xmin = parseInt(node.getAttributeNS(attribNS,"xmin"));
	var ymin = parseInt(node.getAttributeNS(attribNS,"ymin"));
	var xmax = parseInt(node.getAttributeNS(attribNS,"xmax"));
	var ymax = parseInt(node.getAttributeNS(attribNS,"ymax"));
	var width = xmax - xmin;
	var height = ymax - ymin;
	myMainMap.showAdmin = true;
	myMainMap.setNewViewBox((xmin - width*0.01),(ymin - height*0.01),(xmax + width*0.01),(ymax + height*0.01),true);
}

function searchObject() {
	this.results = emptyTitleSearchResult;
	this.offset = 0;
	this.offsetIncr = 4;
	this.filterByMapExtent = false;
	this.selectedNameIndex = undefined; //contains the index of a selected name
	this.buttonActive = false;
	this.searchTerm = "";
	//get references to forward and backward buttons and UI elements
	this.forwardButton = document.getElementById("searchForward");
	this.backwardButton = document.getElementById("searchBackward");
}

//this method is called after pressing the filter by map extent checkbox
searchObject.prototype.checkBoxChanged = function(id,status,labelText) {
	this.filterByMapExtent = status;
	this.getData();
}

searchObject.prototype.textboxChanged = function(id,value,changeType) {
	if (id == "titleSearchTextbox" && (changeType == "change" || changeType == "set")) {
		this.offset = 0;
		this.searchTerm = value;
		this.getData();
	}
}

//get next results
searchObject.prototype.forwardResult = function() {
	this.offset += this.offsetIncr;
	this.getData();
}

//get previous results
searchObject.prototype.backwardResult = function() {
	this.offset -= this.offsetIncr;
	this.getData();
}

//request data from database
searchObject.prototype.getData = function() {
	if (this.searchTerm.length > 0) {
		var url = "sendTitleData.php?searchstring="+this.searchTerm+"&offset="+this.offset+"&limit="+this.offsetIncr+"&filterByMapExtent="+this.filterByMapExtent+"&xmin="+myMainMap.curxOrig+"&ymin="+((myMainMap.curyOrig + myMainMap.curHeight)* -1)+"&xmax="+(myMainMap.curxOrig+myMainMap.curWidth)+"&ymax="+(myMainMap.curyOrig * -1);
		var me = this;
		var getDataObject = new getData(encodeURI(url),me,"json","get",undefined,undefined);
		getDataObject.getData();
	}
	else {
		//empty the combobox
		var emptyArray = new Array();
		for (var i=0;i<this.offsetIncr;i++) {
			emptyArray[i] = {key:i+1,value:false};
		}
		myMapApp.comboboxes["titleSearchCombobox"].elementsArray = emptyArray;
		myMapApp.comboboxes["titleSearchCombobox"].createOrUpdateCombobox();
	}
}

//receive data from database
searchObject.prototype.receiveData = function(jsoncode) {
	var myResults=new Function("return "+jsoncode)();
	//check visibility of buttons
	if (myResults.length == this.offsetIncr) {
		this.forwardButton.setAttributeNS(null,"display","inherit");	
	}
	else {
		this.forwardButton.setAttributeNS(null,"display","none");	
	}
	if (this.offset == 0) {
		this.backwardButton.setAttributeNS(null,"display","none");
	}
	else {
		this.backwardButton.setAttributeNS(null,"display","inherit");		
	}
	for (var i=myResults.length;i<this.offsetIncr;i++) {
		myResults[i] = {key:i+1+this.offset,value:false};
	}
	//reset state of selected names		
	this.selectedNameIndex = undefined;
	if (this.buttonActive) {
		this.buttonActive = false;
		myMapApp.buttons["zoomToSelectedPhoto"].deactivate();
	}
	myMapApp.comboboxes["titleSearchCombobox"].elementsArray = myResults;
	myMapApp.comboboxes["titleSearchCombobox"].createOrUpdateCombobox();
}

//this method is called
searchObject.prototype.buttonPressed = function(id,evt,buttonText) {
	if (id == "zoomToSelectedPhoto") {
		var photoId = myMapApp.comboboxes["titleSearchCombobox"].elementsArray[this.selectedNameIndex].id;
		var singlePhotoRequest = new getData("sendPhotoData.php?photoId="+photoId+"&timestamp="+myMainMap.timestamp,receivePhotoDataByTitle,"xml","get",undefined,undefined);
		singlePhotoRequest.getData();
	}
	if (id == "resetTitleSearch") {
        myMapApp.textboxes["titleSearchTextbox"].setValue("",true);
	}
}

//this method is called after a combobox value was selected
searchObject.prototype.getComboboxVals = function(id,values,indexes) {
	if (id == "titleSearchCombobox") {
		var x = myMapApp.comboboxes["titleSearchCombobox"].elementsArray[indexes[0]].x;
		var y = myMapApp.comboboxes["titleSearchCombobox"].elementsArray[indexes[0]].y;
		if (x && y) {
			myMainMap.highlightPosition(x,y,true);
			this.selectedNameIndex = indexes[0];
			if (!this.buttonActive) {
				this.buttonActive = true;
				myMapApp.buttons["zoomToSelectedPhoto"].activate();
			}
		}
		else {
			myMainMap.hideHighlightCross();
			this.selectedNameIndex = undefined;
			if (this.buttonActive) {
				this.buttonActive = false;
				myMapApp.buttons["zoomToSelectedPhoto"].deactivate();
			}
		}
	}
}