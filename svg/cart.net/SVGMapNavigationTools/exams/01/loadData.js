function loadRasterLayer(layername,baseurl,servicename,layernames,format,epsg) {
	var myRasterLayer = document.getElementById(layername);
	if (myRasterLayer.childNodes.length > 0) {
		var oldImage = document.getElementById(layername+"Image");
		myRasterLayer.removeChild(oldImage);
	}
	if (myRasterLayer.getAttributeNS(null,"display") == "inherit") {
		var myRasterImage = document.createElementNS(svgNS,"image");
		myRasterImage.setAttributeNS(null,"x",myMainMap.curxOrig);
		myRasterImage.setAttributeNS(null,"y",myMainMap.curyOrig);
		myRasterImage.setAttributeNS(null,"width",myMainMap.curWidth);
		myRasterImage.setAttributeNS(null,"height",myMainMap.curHeight);
		myRasterImage.setAttributeNS(null,"id",layername+"Image");
		//var myImageUrl = baseurl + "?servicename="+servicename+"&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS="+layernames+"&STYLES=&SRS=EPSG:"+epsg;
		var myImageUrl = baseurl + servicename+"&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS="+layernames+"&STYLES=&SRS=EPSG:"+epsg;
		myImageUrl = myImageUrl + "&BBOX=" + parseInt(myMainMap.curxOrig) + "," + (parseInt(myMainMap.curyOrig + myMainMap.curHeight) * -1) + ",";
		myImageUrl = myImageUrl + parseInt(myMainMap.curxOrig + myMainMap.curWidth) + "," + (parseInt(myMainMap.curyOrig) * -1) + "&width=" + Math.round(myMainMap.maps[0].pixWidth * myMapApp.unitPixSize);
		myImageUrl = myImageUrl + "&height=" + Math.round(myMainMap.maps[0].pixHeight * myMapApp.unitPixSize) + "&format=image/"+format+"&sessionId="+myMapApp.sessionId;
		alert(myImageUrl);
		myRasterImage.setAttributeNS(xlinkNS,"xlink:href",myImageUrl);
		myRasterLayer.appendChild(myRasterImage);
	}	
}

function loadPhotos() {
	//check keywords
	var myKeywords = new Array();
	for (var checkBox in myMapApp.checkBoxes) {
		if (checkBox.match(/^KW/)) {
			if (myMapApp.checkBoxes[checkBox].checkedStatus) {
				myKeywords.push(checkBox.replace(/KW/,""));	
			}
		}
	}
	var myPhotoDataUrl = "sendPhotoData.php?xmin="+myMainMap.curxOrig+"&ymin="+((myMainMap.curyOrig + myMainMap.curHeight)* -1)+"&xmax="+(myMainMap.curxOrig+myMainMap.curWidth)+"&ymax="+(myMainMap.curyOrig * -1)+"&keywords="+myKeywords.join(",")+"&logicalAndOr="+myMapApp.logicalAndOr+"&timestamp="+myMainMap.timestamp;
	var getPhotoDataObj = new getData(myPhotoDataUrl,receivePhotoData,"xml","get",undefined,undefined);
	getPhotoDataObj.getData();
}
