//this function receives the photo metadata
function receivePhotoData(node) {
	var timestamp = parseInt(node.getAttributeNS(null,"timestamp"));
	var photoCounter = 0;
	if (timestamp == myMainMap.timestamp) {
		var child = node.firstChild;
		myMapApp.photoData = new Array();
		while(child) {			
			if (child.nodeType == "1") {
				if (child.nodeName == "photo") {
					var id = "id_"+child.getAttributeNS(null,"id");
					var FileName = child.getAttributeNS(null,"FileName");
					var ObjectName = child.getAttributeNS(null,"ObjectName");
					var Model = child.getAttributeNS(null,"Make")+", "+child.getAttributeNS(null,"Model");
					var DateTime = child.getAttributeNS(null,"DateTime");
					var Height = parseInt(child.getAttributeNS(null,"Length"));
					var Width = parseInt(child.getAttributeNS(null,"Width"));
					var Exposure = child.getAttributeNS(null,"Exposure");
					var Aperture = parseInt(child.getAttributeNS(null,"Aperture"));
					var ISO = parseInt(child.getAttributeNS(null,"ISO"));
					var FocalLength35 = parseInt(child.getAttributeNS(null,"FocalLength35"));
					var Owner = child.getAttributeNS(null,"UserFirstName")+" "+child.getAttributeNS(null,"UserName");
					var Copyright = child.getAttributeNS(null,"Copyright");
					var StandPointX = parseInt(child.getAttributeNS(null,"StandPointX"));
					var StandPointY = parseInt(child.getAttributeNS(null,"StandPointY"));
					var TargetPointX = parseInt(child.getAttributeNS(null,"TargetPointX"));
					var TargetPointY = parseInt(child.getAttributeNS(null,"TargetPointY"));
					var AngleOfView = parseInt(child.getAttributeNS(null,"AngleOfView"));
					var ProvinceState = child.getAttributeNS(null,"ProvinceState");
					var SubLocation = child.getAttributeNS(null,"SubLocation");
					var City = child.getAttributeNS(null,"City");
					var keywordArray = new Array();
					var grandChild = child.firstChild;
					while(grandChild) {
						if (grandChild.nodeType == "1") {
							if (grandChild.nodeName == "keywords") {
								var grandGrandChild = grandChild.firstChild;
								while(grandGrandChild) {
									if (grandGrandChild.nodeType == "1") {
										if (grandGrandChild.nodeName == "keyword") {
											keywordArray.push(grandGrandChild.firstChild.nodeValue);
										}	
									}
									grandGrandChild = grandGrandChild.nextSibling;	
								}	
							}	
						}
						grandChild = grandChild.nextSibling;	
					}
					myMapApp.photoData[id]= {key:id,value:new photo(id,FileName,ObjectName,Model,DateTime,Height,Width,Exposure,Aperture,ISO,FocalLength35,Owner,Copyright,StandPointX,StandPointY,TargetPointX,TargetPointY,AngleOfView,ProvinceState,SubLocation,City,keywordArray)};
					myMapApp.photoData.push(myMapApp.photoData[id]);
					photoCounter++;
				}	
			}
			child = child.nextSibling;	
		}
		drawCameraSymbols();
		if (myMapApp.zoomedFromTitleSearch) {
			displayPhotosSmall("start",undefined);
			displaySinglePhoto(myMapApp.photoSelectedId);
			drawSelectedPhotoDetail(myMapApp.photoSelectedId);
			var curPhoto = myMapApp.photoData[myMapApp.photoSelectedId].value;
			showInfos(curPhoto);
			myMapApp.photoSelectStatus = true;
			myMapApp.zoomedFromTitleSearch = false;
		}
		else {
			if (myMapApp.photoSelectStatus) {
				drawSelectedPhotoDetail();
			}
			else {
				displayPhotosSmall("start",undefined);
			}
		}
	}
}

//this function is called after a getDataRequest for a single Photo
function receivePhotoDataByTitle(node) {
	var child = node.getElementsByTagName("photo").item(0);
	var id = "id_"+child.getAttributeNS(null,"id");
	var FileName = child.getAttributeNS(null,"FileName");
	var ObjectName = child.getAttributeNS(null,"ObjectName");
	var Model = child.getAttributeNS(null,"Make")+", "+child.getAttributeNS(null,"Model");
	var DateTime = child.getAttributeNS(null,"DateTime");
	var Height = parseInt(child.getAttributeNS(null,"Length"));
	var Width = parseInt(child.getAttributeNS(null,"Width"));
	var Exposure = child.getAttributeNS(null,"Exposure");
	var Aperture = parseInt(child.getAttributeNS(null,"Aperture"));
	var ISO = parseInt(child.getAttributeNS(null,"ISO"));
	var FocalLength35 = parseInt(child.getAttributeNS(null,"FocalLength35"));
	var Owner = child.getAttributeNS(null,"UserFirstName")+" "+child.getAttributeNS(null,"UserName");
	var Copyright = child.getAttributeNS(null,"Copyright");
	var StandPointX = parseInt(child.getAttributeNS(null,"StandPointX"));
	var StandPointY = parseInt(child.getAttributeNS(null,"StandPointY"));
	var TargetPointX = parseInt(child.getAttributeNS(null,"TargetPointX"));
	var TargetPointY = parseInt(child.getAttributeNS(null,"TargetPointY"));
	var AngleOfView = parseInt(child.getAttributeNS(null,"AngleOfView"));
	var ProvinceState = child.getAttributeNS(null,"ProvinceState");
	var SubLocation = child.getAttributeNS(null,"SubLocation");
	var City = child.getAttributeNS(null,"City");
	var keywordArray = new Array();
	var grandChild = child.firstChild;
	while(grandChild) {
		if (grandChild.nodeType == "1") {
			if (grandChild.nodeName == "keywords") {
				var grandGrandChild = grandChild.firstChild;
				while(grandGrandChild) {
					if (grandGrandChild.nodeType == "1") {
						if (grandGrandChild.nodeName == "keyword") {
							keywordArray.push(grandGrandChild.firstChild.nodeValue);
						}	
					}
					grandGrandChild = grandGrandChild.nextSibling;	
				}	
			}	
		}
		grandChild = grandChild.nextSibling;	
	}
	var singlePhoto = new photo(id,FileName,ObjectName,Model,DateTime,Height,Width,Exposure,Aperture,ISO,FocalLength35,Owner,Copyright,StandPointX,StandPointY,TargetPointX,TargetPointY,AngleOfView,ProvinceState,SubLocation,City,keywordArray);
	calculateAngleOfView(singlePhoto);
	myMapApp.zoomedFromTitleSearch = true;
	zoomToPhoto(undefined,undefined,undefined,singlePhoto);
}

//this function parses the metadata
function photo(id,FileName,ObjectName,Model,DateTime,Height,Width,Exposure,Aperture,ISO,FocalLength35,Owner,Copyright,StandPointX,StandPointY,TargetPointX,TargetPointY,AngleOfView,ProvinceState,SubLocation,City,keywordArray) {
	this.id = id;
	this.FileName = FileName;
	this.ObjectName = ObjectName;
	this.Model = Model;
	this.DateTime = DateTime;
	this.Height = Height;
	this.Width = Width;
	this.Exposure = Exposure;
	this.Aperture = Aperture;
	this.ISO = ISO;
	this.FocalLength35 = FocalLength35;
	this.Owner = Owner;
	this.Copyright = Copyright;
	this.StandPointX = StandPointX;
	this.StandPointY = StandPointY;
	this.TargetPointX = TargetPointX;
	this.TargetPointY = TargetPointY;
	this.AngleOfView = AngleOfView;
	this.ProvinceState = ProvinceState;
	this.SubLocation = SubLocation;
	this.City = City;
	this.keywordArray = keywordArray.join(", ");
}


//this function draws the camera symbols according to the map scale
function drawCameraSymbols() {
	if (this.supportsSuspendRedraw) {
		var suspHandle = document.documentElement.suspendRedraw(5000);
	}
	var photoSymbolGroup = document.getElementById("photoSymbols");
	if (photoSymbolGroup.hasChildNodes()) {
		photoSymbolGroup.removeChild(photoSymbolGroup.firstChild);
	}
	//create temporary group for photo symbols
	var photoSymbolsTempGroup = document.createElementNS(svgNS,"g");
	photoSymbolsTempGroup.setAttributeNS(null,"id","photoSymbolsTemp");
	photoSymbolGroup.appendChild(photoSymbolsTempGroup);
	
	//update symbol sizes
	if (myMapApp.navigator != "Batik") {
		document.getElementById("cameraSmallSymbGeom").setAttributeNS(null,"transform","scale("+(myMainMap.curWidth * 0.002)+")");
		document.getElementById("cameraSymbGeom").setAttributeNS(null,"transform","scale("+(myMainMap.curWidth * 0.002)+")");
	}
	
	for (var i=0;i<myMapApp.photoData.length;i++) {
		var photoSymbol = document.createElementNS(svgNS,"use");
		if (myMainMap.curWidth > 10000) {
			photoSymbol.setAttributeNS(xlinkNS,"href","#cameraSmall");
			if (myMapApp.navigator == "Batik") {
				photoSymbol.setAttributeNS(null,"transform","translate("+myMapApp.photoData[i].value.StandPointX+","+(myMapApp.photoData[i].value.StandPointY*-1)+"),scale("+(myMainMap.curWidth * 0.002)+")");		
			}
		}
		else {
			photoSymbol.setAttributeNS(xlinkNS,"href","#camera");			
			var direction = toPolarDir(myMapApp.photoData[i].value.TargetPointX - myMapApp.photoData[i].value.StandPointX,myMapApp.photoData[i].value.TargetPointY - myMapApp.photoData[i].value.StandPointY) / Math.PI * 180;
			if (myMapApp.navigator == "Batik") {
				photoSymbol.setAttributeNS(null,"transform","translate("+myMapApp.photoData[i].value.StandPointX+","+(myMapApp.photoData[i].value.StandPointY*-1)+"),rotate("+(direction*-1)+"),scale("+(myMainMap.curWidth * 0.002)+")");						
			}
			else {
				photoSymbol.setAttributeNS(null,"transform","rotate("+(direction*-1)+","+myMapApp.photoData[i].value.StandPointX+","+(myMapApp.photoData[i].value.StandPointY * -1)+")");
			}
		}
		if (myMapApp.navigator != "Batik") {
			photoSymbol.setAttributeNS(null,"x",myMapApp.photoData[i].value.StandPointX);
			photoSymbol.setAttributeNS(null,"y",myMapApp.photoData[i].value.StandPointY * -1);
		}
		photoSymbol.setAttributeNS(null,"id","photoSymbol_"+myMapApp.photoData[i].value.id);
		photoSymbol.addEventListener("mouseover",showPhotoData,false);
		photoSymbol.addEventListener("mouseout",showPhotoData,false);
		photoSymbol.addEventListener("click",setPhotoExtentCheck,false);
		photoSymbol.addEventListener("click",showPhotoData,false);
		photoSymbolsTempGroup.appendChild(photoSymbol);
	}
	if (this.supportsSuspendRedraw) {
		document.documentElement.unsuspendRedraw(suspHandle);
	}
}


//this function writes information tho a photo in the photo informaiton window
function showInfos(id){
	var curPhoto = id;
	var metaObjectName = document.getElementById("metaObjectName");
	var dy = textFlow("Photo Name: " + curPhoto.ObjectName,metaObjectName,48,5,13,2);
	document.getElementById("metaModel").firstChild.nodeValue = "Camera: " + curPhoto.Model;
	document.getElementById("metaDate").firstChild.nodeValue = "Date: " + curPhoto.DateTime;
	if (curPhoto.Exposure == 'NULL') {
		document.getElementById("metaExposure").firstChild.nodeValue = "Exposure Time: undefined";	
	}
	else {
		document.getElementById("metaExposure").firstChild.nodeValue = "Exposure Time: " + curPhoto.Exposure + "s";
	}
	if (isNaN(curPhoto.Aperture)) {
		document.getElementById("metaAperture").firstChild.nodeValue = "Aperture (F-Value): undefined";
	}
	else {
		document.getElementById("metaAperture").firstChild.nodeValue = "Aperture (F-Value): " + curPhoto.Aperture;
	}
	if (isNaN(curPhoto.ISO)) {
		document.getElementById("metaISO").firstChild.nodeValue = "ISO Value: undefined";
	}
	else {
		document.getElementById("metaISO").firstChild.nodeValue = "ISO Value: " + curPhoto.ISO;
	}
	document.getElementById("metaFocal").firstChild.nodeValue = "Focal Length (35mm Equivalent): " + curPhoto.FocalLength35 + "mm";
	document.getElementById("metaClassification").firstChild.nodeValue = "Geographical/political classification:";
	document.getElementById("metaKanton").firstChild.nodeValue = "Kanton: " + curPhoto.ProvinceState;
	document.getElementById("metaBezirk").firstChild.nodeValue = "Bezirk: " + curPhoto.SubLocation;
	document.getElementById("metaGemeinde").firstChild.nodeValue = "Gemeinde: " + curPhoto.City;
	var metaKeywords = document.getElementById("metaKeywords");
	dy = textFlow("Keywords: " + curPhoto.keywordArray,metaKeywords,50,5,13,2);	
}


//this function empties the photo information window
function showInfosEmpty(){
	var metaObjectName = document.getElementById("metaObjectName");
	var dy = textFlow("Photo Name: ",metaObjectName,50,5,13,undefined);
	document.getElementById("metaModel").firstChild.nodeValue = "Camera: ";
	document.getElementById("metaDate").firstChild.nodeValue = "Date: ";
	document.getElementById("metaExposure").firstChild.nodeValue = "Exposure Time: ";
	document.getElementById("metaAperture").firstChild.nodeValue = "Aperture (F-Value): ";
	document.getElementById("metaISO").firstChild.nodeValue = "ISO Value: ";
	document.getElementById("metaFocal").firstChild.nodeValue = "Focal Length (35mm Equivalent): ";
	document.getElementById("metaClassification").firstChild.nodeValue = "Geographical/political classification:";
	document.getElementById("metaKanton").firstChild.nodeValue = "Kanton: ";
	document.getElementById("metaBezirk").firstChild.nodeValue = "Bezirk: ";
	document.getElementById("metaGemeinde").firstChild.nodeValue = "Gemeinde: ";
	var metaKeywords = document.getElementById("metaKeywords");
	dy = textFlow("Keywords: ",metaKeywords,50,5,13,undefined);
}


//this function displays photo metadata according to mouse-events
function showPhotoData(evt) {
	var symbReference = evt.currentTarget;
	var origId = symbReference.getAttributeNS(null,"id");
	var id = origId.replace(/photoSymbol_|photoSmall_/,"");
	var curPhoto = myMapApp.photoData[id].value;
	if (evt.type == "mouseover") {
		showInfos(curPhoto);
		//show crosshair cursor in map
		if (origId.match(/photoSmall_/)) {
			myMainMap.highlightPosition(curPhoto.StandPointX,curPhoto.StandPointY,true);
		}
		//adapt photo frame
		if (!myMapApp.photoSelectStatus) {
			try {
				var photoBBox = document.getElementById("photoSmall_"+id).getBBox();
				myMapApp.photoFrame.setAttributeNS(null,"x",photoBBox.x-1);
				myMapApp.photoFrame.setAttributeNS(null,"y",photoBBox.y-1);
				myMapApp.photoFrame.setAttributeNS(null,"width",photoBBox.width+2);
				myMapApp.photoFrame.setAttributeNS(null,"height",photoBBox.height+2);
				myMapApp.photoFrame.setAttributeNS(null,"display","inherit");
			}
			catch(er) {}
		}
	}		
	
	if (evt.type == "mouseout") {
		if (myMapApp.photoSelectStatus) {
			id = myMapApp.photoSelectedId;
			var curPhoto = myMapApp.photoData[id].value;
			showInfos(curPhoto);
		}
		else {
			showInfosEmpty();
		}
		myMapApp.photoFrame.setAttributeNS(null,"display","none");
		//hide crosshair cursor in map
		if (origId.match(/photoSmall_/)) {
			myMainMap.hideHighlightCross();
		}
	}
	
	if (evt.type == "click") {
		myMapApp.photoSelectStatus = true;
		myMapApp.photoSelectedId = id;
		showInfos(curPhoto);
		
		calculateAngleOfView(curPhoto);
		
		//first check if angle of view is within map extent		
		if (myMainMap.pointTestWithin(curPhoto.StandPointX,curPhoto.StandPointY) == true && myMainMap.pointTestWithin(curPhoto.TargetPointX,curPhoto.TargetPointY) == true && myMainMap.pointTestWithin(myMapApp.selPhotoPointX1,myMapApp.selPhotoPointY1*-1) == true && myMainMap.pointTestWithin(myMapApp.selPhotoPointX2,myMapApp.selPhotoPointY2*-1) == true) {
			drawSelectedPhotoDetail();
		}
		else {
			zoomToPhoto();	
		}
		//display a single photo
		displaySinglePhoto(id);
	}
}

//this function calculates the angle of view
function calculateAngleOfView(curPhoto) {
	//calculate angle of view
	myMapApp.selPhotoDistance = toPolarDist(curPhoto.StandPointX - curPhoto.TargetPointX,curPhoto.StandPointY - curPhoto.TargetPointY);
	myMapApp.selPhotoDirection = toPolarDir(curPhoto.TargetPointX - curPhoto.StandPointX,curPhoto.TargetPointY - curPhoto.StandPointY) / Math.PI * 180;
	var diffX = toRectX((myMapApp.selPhotoDirection + (curPhoto.AngleOfView*0.5))*Math.PI/180,myMapApp.selPhotoDistance);
	var diffY = toRectY((myMapApp.selPhotoDirection + (curPhoto.AngleOfView*0.5))*Math.PI/180,myMapApp.selPhotoDistance) * -1;
	myMapApp.selPhotoPointX1 = curPhoto.StandPointX + diffX;
	myMapApp.selPhotoPointY1 = curPhoto.StandPointY * -1 + diffY;
	diffX = toRectX((myMapApp.selPhotoDirection - (curPhoto.AngleOfView*0.5))*Math.PI/180,myMapApp.selPhotoDistance);
	diffY = toRectY((myMapApp.selPhotoDirection - (curPhoto.AngleOfView*0.5))*Math.PI/180,myMapApp.selPhotoDistance) * -1;
	myMapApp.selPhotoPointX2 = curPhoto.StandPointX + diffX;
	myMapApp.selPhotoPointY2 = curPhoto.StandPointY * -1 + diffY;
}



//this function draws the angle of view to the selected photo
function drawSelectedPhotoDetail() {
	var id = myMapApp.photoSelectedId;
	var photoSymbolDetailGroup = document.getElementById("photoSymbolDetail");
	//check if we have to remove old geometry
	if (photoSymbolDetailGroup.hasChildNodes()) {
		photoSymbolDetailGroup.removeChild(photoSymbolDetailGroup.firstChild);
	}
	//only draw if the data is available
	if (myMapApp.photoData[id]) {
		//create temporary group for photo symbols
		var curPhoto = myMapApp.photoData[id].value;
		var photoSymbolDetailTempGroup = document.createElementNS(svgNS,"g");
		photoSymbolDetailTempGroup.setAttributeNS(null,"id","photoSymbolDetailTemp");
		photoSymbolDetailTempGroup.setAttributeNS(null,"pointer-events","none");
		photoSymbolDetailGroup.appendChild(photoSymbolDetailTempGroup);
									
		var viewAngle = document.createElementNS(svgNS,"path");
		viewAngle.setAttributeNS(null,"stroke","darkred");		
		viewAngle.setAttributeNS(null,"stroke-width",(myMainMap.curWidth * 0.001));
		viewAngle.setAttributeNS(null,"fill","darkred");		
		viewAngle.setAttributeNS(null,"fill-opacity","0.2");
		var d = "M"+curPhoto.StandPointX+","+(curPhoto.StandPointY*-1)+"L"+myMapApp.selPhotoPointX1+","+myMapApp.selPhotoPointY1+"A"+myMapApp.selPhotoDistance+","+myMapApp.selPhotoDistance+" 0 0,1 "+myMapApp.selPhotoPointX2+" "+myMapApp.selPhotoPointY2+"z";
		viewAngle.setAttributeNS(null,"d",d);
		photoSymbolDetailTempGroup.appendChild(viewAngle);
						
		var connectLine = document.createElementNS(svgNS,"line");
		connectLine.setAttributeNS(null,"stroke","darkred");		
		connectLine.setAttributeNS(null,"id","connectLine");		
		connectLine.setAttributeNS(null,"stroke-width",(myMainMap.curWidth * 0.002));		
		connectLine.setAttributeNS(null,"x1",curPhoto.StandPointX);		
		connectLine.setAttributeNS(null,"y1",curPhoto.StandPointY * -1);		
		connectLine.setAttributeNS(null,"x2",curPhoto.TargetPointX);		
		connectLine.setAttributeNS(null,"y2",curPhoto.TargetPointY * -1);
		photoSymbolDetailTempGroup.appendChild(connectLine);
	
		var photoSymbol = document.createElementNS(svgNS,"use");
		photoSymbol.setAttributeNS(xlinkNS,"href","#camera");
		photoSymbol.setAttributeNS(null,"x",curPhoto.StandPointX);
		photoSymbol.setAttributeNS(null,"y",curPhoto.StandPointY * -1);
		photoSymbol.setAttributeNS(null,"id","photoDetailSymbol_"+curPhoto.id);
		photoSymbol.setAttributeNS(null,"transform","rotate("+(myMapApp.selPhotoDirection*-1)+","+curPhoto.StandPointX+","+(curPhoto.StandPointY * -1)+")");
		photoSymbolDetailTempGroup.appendChild(photoSymbol);
	}
	else {
		myMapApp.photoSelectStatus = false;
		displayPhotosSmall("start",undefined);
		showInfosEmpty();		
	}
}


//this function zooms to the selcted photo
function zoomToPhoto(id,evt,buttonText,currentPhoto) {
	if (currentPhoto) {
		var curPhoto = currentPhoto;
		myMapApp.photoSelectStatus = true;
		myMapApp.photoSelectedId = curPhoto.id;
	}
	else {
		var curPhoto = myMapApp.photoData[myMapApp.photoSelectedId].value;
	}	
	xmin = curPhoto.StandPointX;
	if (curPhoto.TargetPointX < xmin) {
		xmin = curPhoto.TargetPointX;
	}
	if (myMapApp.selPhotoPointX1 < xmin) {
		xmin = myMapApp.selPhotoPointX1;
	}
	if (myMapApp.selPhotoPointX2 < xmin) {
		xmin = myMapApp.selPhotoPointX2;
	}
	xmax = curPhoto.StandPointX;
	if (curPhoto.TargetPointX > xmax) {
		xmax = curPhoto.TargetPointX;
	}
	if (myMapApp.selPhotoPointX1 > xmax) {
		xmax = myMapApp.selPhotoPointX1;
	}
	if (myMapApp.selPhotoPointX2 > xmax) {
		xmax = myMapApp.selPhotoPointX2;
	}
	ymin = curPhoto.StandPointY;
	if (curPhoto.TargetPointY < ymin) {
		ymin = curPhoto.TargetPointY;
	}
	if (myMapApp.selPhotoPointY1*-1 < ymin) {
		ymin = myMapApp.selPhotoPointY1*-1;
	}
	if (myMapApp.selPhotoPointY2*-1 < ymin) {
		ymin = myMapApp.selPhotoPointY2*-1;
	}
	ymax = curPhoto.StandPointY;
	if (curPhoto.TargetPointY > ymax) {
		ymax = curPhoto.TargetPointY;
	}
	if (myMapApp.selPhotoPointY1*-1 > ymax) {
		ymax = myMapApp.selPhotoPointY1*-1;
	}
	if (myMapApp.selPhotoPointY2*-1 > ymax) {
		ymax = myMapApp.selPhotoPointY2*-1;
	}
	var width = xmax - xmin;
	var height = ymax - ymin;
	myMainMap.setNewViewBox(xmin - width * 0.1,ymin - height * 0.1,xmax + width * 0.1,ymax + height * 0.1,true);
}


//this function displays thumbnails
function displayPhotosSmall(groupId,evt) {
	//alter window status bar
	myMapApp.Windows["photoSelectionWindow"].statusTextNode.nodeValue = "Click on a photo to get more information (photos are ordered descending by date created)";
	
	//first remove old content, if any
	while (myMapApp.photoGalleryGroup.hasChildNodes()) {
		myMapApp.photoGalleryGroup.removeChild(myMapApp.photoGalleryGroup.firstChild);
	}
	//set selected status to false
	myMapApp.photoSelectStatus = false;
	var photoSymbolDetailGroup = document.getElementById("photoSymbolDetail");
	if (photoSymbolDetailGroup.hasChildNodes()) {
		photoSymbolDetailGroup.removeChild(photoSymbolDetailGroup.firstChild);
	}
	//create temporary group for photos small
	var photosSmallTempGroup = document.createElementNS(svgNS,"g");
	myMapApp.photoGalleryGroup.appendChild(photosSmallTempGroup);
	//display buttons
	myMapApp.buttons["photoGalForward"].showButton();	
	myMapApp.buttons["photoGalBackward"].showButton();	
	//hide three other buttons
	myMapApp.buttons["zoomToPhoto"].hideButton();
	myMapApp.buttons["higherResolution"].hideButton();
	myMapApp.buttons["returnToGallery"].hideButton();	
	if (groupId == "start") {
		myMapApp.photoGalleryOffset = 0;
	}
	if (groupId == "photoGalBackward") {
		myMapApp.photoGalleryOffset -= myMapApp.nrPerPage;
	}
	if (groupId == "photoGalForward") {
		myMapApp.photoGalleryOffset += myMapApp.nrPerPage;
	}
	//need to control visibility of arrows
	var photoGalleryEnd = myMapApp.photoData.length;
	if ((myMapApp.photoGalleryOffset + myMapApp.nrPerPage) < myMapApp.photoData.length) {
		photoGalleryEnd = myMapApp.photoGalleryOffset + myMapApp.nrPerPage;
		myMapApp.buttons["photoGalForward"].activate();
	}
	else {
		myMapApp.buttons["photoGalForward"].deactivate();
	}
	if (myMapApp.photoGalleryOffset == 0) {
		myMapApp.buttons["photoGalBackward"].deactivate();
	}
	else {
		myMapApp.buttons["photoGalBackward"].activate();
	}
	
	//arrange thumbnails
	var x = 35;
	var photoGap = 18;
	var bigLength = 120;
	for (var i = myMapApp.photoGalleryOffset;i<photoGalleryEnd;i++) {
		var curPhoto = myMapApp.photoData[i].value;
		file = curPhoto.FileName.split(".");
		var ext = file[1];
		var fileSmall = file[0] + "_thumb200." + ext;
		var photosSmall = document.createElementNS(svgNS,"image");
		photosSmall.setAttributeNS(null,"id","photoSmall_"+curPhoto.id);
		photosSmall.setAttributeNS(xlinkNS,"href",fileSmall);
		photosSmall.addEventListener("mouseover",showPhotoData,false);
		photosSmall.addEventListener("mouseout",showPhotoData,false);
		photosSmall.addEventListener("click",setPhotoExtentCheck,false);
		photosSmall.addEventListener("click",showPhotoData,false);
		var photoTitleText = document.createElementNS(svgNS,"text");
		photoTitleText.setAttributeNS(null,"font-family","Cisalpin LT Std");
		photoTitleText.setAttributeNS(null,"fill","dimgray");
		photoTitleText.setAttributeNS(null,"text-anchor","middle");
		photoTitleText.setAttributeNS(null,"font-size",11);
		var y = 22;
		if (curPhoto.Width > curPhoto.Height) {
			//case landscape
			var photoHeight = bigLength * (curPhoto.Height / curPhoto.Width);
			photosSmall.setAttributeNS(null,"width",bigLength);
			photosSmall.setAttributeNS(null,"height",photoHeight);	
			photosSmall.setAttributeNS(null,"x",x);
			photosSmall.setAttributeNS(null,"y",y);
			var textX = x+bigLength * 0.5;
			photoTitleText.setAttributeNS(null,"x",textX);
			photoTitleText.setAttributeNS(null,"y",y+photoHeight+15);
		}
		else {
			//case portrait
			var widthTemp = bigLength * (curPhoto.Width / curPhoto.Height);
			photosSmall.setAttributeNS(null,"height",bigLength);
			photosSmall.setAttributeNS(null,"width",widthTemp);
			photosSmall.setAttributeNS(null,"x",x);
			photosSmall.setAttributeNS(null,"y",y);
			var textX = x + widthTemp + 15;
			var textY = y + bigLength * 0.5;
			photoTitleText.setAttributeNS(null,"x",textX);
			photoTitleText.setAttributeNS(null,"y",textY);
			photoTitleText.setAttributeNS(null,"transform","rotate(-90,"+textX+","+textY+")");
		}
		x += bigLength + photoGap;			
		photosSmallTempGroup.appendChild(photosSmall);
		photosSmallTempGroup.appendChild(photoTitleText);
		var dy = textFlow(curPhoto.ObjectName,photoTitleText,22,textX,13,2);		
	}
}


//this function displays a small photo with some metadata
function displaySinglePhoto(id) {
	//alter window status bar
	myMapApp.Windows["photoSelectionWindow"].statusTextNode.nodeValue = "Photo detail view - zoom to the photo, see it in higher resolution or return to gallery";
	//first remove old content, if any
	while (myMapApp.photoGalleryGroup.hasChildNodes()) {
		myMapApp.photoGalleryGroup.removeChild(myMapApp.photoGalleryGroup.firstChild);
	}
	//create temporary group for single photo
	var singlePhotoTempGroup = document.createElementNS(svgNS,"g");
	myMapApp.photoGalleryGroup.appendChild(singlePhotoTempGroup);
	//hide photo frame, crosshair and buttons	
	myMapApp.photoFrame.setAttributeNS(null,"display","none");
	myMapApp.buttons["photoGalForward"].hideButton();
	myMapApp.buttons["photoGalBackward"].hideButton();
	
	var curPhoto = myMapApp.photoData[id].value;
	file = curPhoto.FileName.split(".");
	var ext = file[1];
	var fileSmall = file[0] + "_thumb200." + ext;
	var singlePhotoSmall = document.createElementNS(svgNS,"image");
	singlePhotoSmall.setAttributeNS(null,"id","photoSmall_"+curPhoto.id);
	singlePhotoSmall.setAttributeNS(xlinkNS,"href",fileSmall);
	var x = 20;
	var y = 20;
	var bigHeight = 127;
	var widthTemp = bigHeight * (curPhoto.Width / curPhoto.Height);
	if (curPhoto.Width > curPhoto.Height) {
		//case landscape
		singlePhotoSmall.setAttributeNS(null,"width",widthTemp);
		singlePhotoSmall.setAttributeNS(null,"height",bigHeight);	
		singlePhotoSmall.setAttributeNS(null,"x",x);
		singlePhotoSmall.setAttributeNS(null,"y",y);
	}
	else {
		//case portrait
		x += 40;
		singlePhotoSmall.setAttributeNS(null,"height",bigHeight);
		singlePhotoSmall.setAttributeNS(null,"width",widthTemp);
		singlePhotoSmall.setAttributeNS(null,"x",x);
		singlePhotoSmall.setAttributeNS(null,"y",y);
	}		
	singlePhotoTempGroup.appendChild(singlePhotoSmall);
	
	//create temporary group for photo text
	var photoTextTempGroup = document.createElementNS(svgNS,"g");
	photoTextTempGroup.setAttributeNS(null,"id","photoTextTemp");
	photoTextTempGroup.setAttributeNS(null,"pointer-events","none");
	photoTextTempGroup.setAttributeNS(null,"font-family","Cisalpin LT Std");
	photoTextTempGroup.setAttributeNS(null,"font-size",11);
	photoTextTempGroup.setAttributeNS(null,"fill","dimgray");
	myMapApp.photoGalleryGroup.appendChild(photoTextTempGroup);
	
	var standPoint = document.createElementNS(svgNS,"text");
	standPoint.setAttributeNS(null,"x",230);
	standPoint.setAttributeNS(null,"y",35);
	var textNode = document.createTextNode("Standpoint Coordinates: Y " + curPhoto.StandPointX + "m, X " + curPhoto.StandPointY + "m");
	standPoint.appendChild(textNode);
	photoTextTempGroup.appendChild(standPoint);
	
	var targetPoint = document.createElementNS(svgNS,"text");
	targetPoint.setAttributeNS(null,"x",230);
	targetPoint.setAttributeNS(null,"y",50);
	var textNode = document.createTextNode("Viewpoint Coordinates: Y " + curPhoto.TargetPointX + "m, X " + curPhoto.TargetPointY + "m");
	targetPoint.appendChild(textNode);
	photoTextTempGroup.appendChild(targetPoint);
		
	var distance = document.createElementNS(svgNS,"text");
	distance.setAttributeNS(null,"x",230);
	distance.setAttributeNS(null,"y",65);
	var textNode = document.createTextNode("Distance (Standpoint - Viewpoint): " + parseInt(toPolarDist(curPhoto.StandPointX - curPhoto.TargetPointX,curPhoto.StandPointY - curPhoto.TargetPointY)) + "m");
	distance.appendChild(textNode);
	photoTextTempGroup.appendChild(distance);
	
	var angleOfView = document.createElementNS(svgNS,"text");
	angleOfView.setAttributeNS(null,"x",230);
	angleOfView.setAttributeNS(null,"y",80);
	var textNode = document.createTextNode("Angle of View (calculated from Focal Length): " + curPhoto.AngleOfView + String.fromCharCode(176));
	angleOfView.appendChild(textNode);
	photoTextTempGroup.appendChild(angleOfView);
	
	var resolution = document.createElementNS(svgNS,"text");
	resolution.setAttributeNS(null,"x",230);
	resolution.setAttributeNS(null,"y",100);
	var textNode = document.createTextNode("Original Resolution: " + curPhoto.Width + " x " + curPhoto.Height + " px");
	resolution.appendChild(textNode);
	photoTextTempGroup.appendChild(resolution);
	
	var owner = document.createElementNS(svgNS,"text");
	owner.setAttributeNS(null,"x",230);
	owner.setAttributeNS(null,"y",115);
	var textNode = document.createTextNode("Owner: " + curPhoto.Owner);
	owner.appendChild(textNode);
	photoTextTempGroup.appendChild(owner);
	
	var copyright = document.createElementNS(svgNS,"text");
	copyright.setAttributeNS(null,"x",230);
	copyright.setAttributeNS(null,"y",130);
	photoTextTempGroup.appendChild(copyright);
	var dy = textFlow("Copyright Notice: " + curPhoto.Copyright,copyright,100,230,13,2);
	
	//show buttons zoom to this photo, see higher resolution and return to gallery
	myMapApp.buttons["zoomToPhoto"].showButton();
	myMapApp.buttons["higherResolution"].showButton();
	myMapApp.buttons["returnToGallery"].showButton();
	
}

function showPhotoHigherResolution() {
	//first change status text of window
	//myMapApp.Windows["photoSelectionWindow"].statusTextNode.value = " ";
	var bigLength = 600;
	var curPhoto = myMapApp.photoData[myMapApp.photoSelectedId].value;	
	//create filename
	file = curPhoto.FileName.split(".");
	var ext = file[1];
	var fileBig = file[0] + "_thumb600." + ext;
	//create new photo
	var photoBig = document.createElementNS(svgNS,"image");
	photoBig.setAttributeNS(xlinkNS,"href",fileBig);
	photoBig.setAttributeNS(null,"x",1);
	photoBig.setAttributeNS(null,"y",18);
	if (curPhoto.Width > curPhoto.Height) {
		//case landscape
		var width = bigLength;
		var height = bigLength * (curPhoto.Height / curPhoto.Width);
		photoBig.setAttributeNS(null,"width",width);
		photoBig.setAttributeNS(null,"height",height);	
	}
	else {
		//case portrait
		var width = bigLength * (curPhoto.Width / curPhoto.Height);
		var height = bigLength;
		photoBig.setAttributeNS(null,"width",width);
		photoBig.setAttributeNS(null,"height",height);
	}		
	
	//create new window	
	if (curPhoto.Width > curPhoto.Height) {
		//case landscape
		var windowX = 200;
		var windowY = 100;
	}
	else {
		//case portrait
		var windowX = 300;
		var windowY = 30;
	}
	
	var windowWidth = width+2;
	var windowHeight = height + 33;
	var freeWindow = false;
	var id = 0;
	while (!freeWindow) {
		if (myMapApp.Windows["photoWindow"+id]) {
			id++;
		}
		else {
			freeWindow = true;
		}
	}	
	myMapApp.Windows["photoWindow"+id] = new Window("photoWindow"+id,"Windows",windowWidth,windowHeight,windowX,windowY,true,0,0,1024,700,true,winPlaceholderStyles,winWindowStyles,3,true,true,"Photo Window",curPhoto.ObjectName,true,true,true,winTitlebarStyles,17,winStatusbarStyles,14,winTitletextStyles,winStatustextStyles,winButtonStyles,destroyWindow);
	myMapApp.Windows["photoWindow"+id].appendContent(photoBig);
	//write objectName in statusbar
	var numberOfChar = parseInt(windowWidth * 0.2);
	var dy = textFlow(curPhoto.ObjectName,myMapApp.Windows["photoWindow"+id].statusTextNode.parentNode,numberOfChar,3,13,1);
}

function destroyWindow(windowId,status) {
	if (status == "closed") {
		myMapApp.Windows[windowId]=null;
	}
}

function backToPhotoGallery() {
	myMainMap.hideHighlightCross();
	if (myMapApp.photoExtentCheck == true) {
		for (var i=0;i<myMapApp.photoData.length;i++) {
			if(myMapApp.photoData[i].value.id == myMapApp.photoSelectedId) {
				myMapApp.photoGalleryOffset = Math.floor(i/myMapApp.nrPerPage) * myMapApp.nrPerPage;
				break;
			}
		}
		displayPhotosSmall("unchanged",undefined);		
	}
	else {
		displayPhotosSmall("start",undefined);
	}
}

function setPhotoExtentCheck() {		
		//status to determine if extent was changed
		myMapApp.photoExtentCheck = true;
}

//function to change map transparency
function changeMapTransparency(status,id,value) {
	document.getElementById("pk").setAttributeNS(null,"opacity",value);
}