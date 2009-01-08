function drawScaleBar() {
	//myMapApp.maxScaleBarLength is a factor in relation to eht whole map width
	var temp = Math.round(myMainMap.curWidth * myMapApp.maxScaleBarLength);
	var temp1 = "1";
	for	(var i = 0;i< String(temp).length - 1;i++) {
		temp1 += "0";
	}
	//scaleBarLength is in meters
	var scaleBarLength = Math.floor(temp / parseFloat(temp1)) * parseFloat(temp1);

	//now calculate length in pixel
	var scaleBarLengthPix = (scaleBarLength * myMainMap.maps[0].pixWidth) / myMainMap.curWidth;
	if (myMapApp.scaleBarGroup.hasChildNodes()) {
		myMapApp.scaleBarGroup.removeChild(myMapApp.scaleBarGroup.firstChild);
	}

	var scaleTempGroup = document.createElementNS(svgNS,"g");

    //draw the base line
	var scaleBarLine = document.createElementNS(svgNS,"line");
	scaleBarLine.setAttributeNS(null,"x1",myMapApp.scaleXmin);
	scaleBarLine.setAttributeNS(null,"y1",myMapApp.scaleYmin);
	scaleBarLine.setAttributeNS(null,"x2",myMapApp.scaleXmin + scaleBarLengthPix);
	scaleBarLine.setAttributeNS(null,"y2",myMapApp.scaleYmin);
	for (var attrib in myMapApp.scaleBarLinestyles) {
		scaleBarLine.setAttributeNS(null,attrib,myMapApp.scaleBarLinestyles[attrib]);
	}
	scaleBarLine.setAttributeNS(null,"marker-start","url(#markerScaleBar)");
	scaleBarLine.setAttributeNS(null,"marker-end","url(#markerScaleBar)");
	scaleTempGroup.appendChild(scaleBarLine);

	//number 0
	var scaleBarText = document.createElementNS(svgNS,"text");
	scaleBarText.setAttributeNS(null,"x",myMapApp.scaleXmin);
	scaleBarText.setAttributeNS(null,"y",myMapApp.scaleYmin - 8);
	for (var attrib in myMapApp.scaleBarTextstyles) {
		scaleBarText.setAttributeNS(null,attrib,myMapApp.scaleBarTextstyles[attrib]);
	}
	var textNode = document.createTextNode("0");
	scaleBarText.appendChild(textNode);
	scaleTempGroup.appendChild(scaleBarText);

	//number end of scalebar
	var scaleBarText = document.createElementNS(svgNS,"text");
	scaleBarText.setAttributeNS(null,"x",myMapApp.scaleXmin + scaleBarLengthPix);
	scaleBarText.setAttributeNS(null,"y",myMapApp.scaleYmin - 8);
	for (var attrib in myMapApp.scaleBarTextstyles) {
		scaleBarText.setAttributeNS(null,attrib,myMapApp.scaleBarTextstyles[attrib]);
	}
	if (scaleBarLength >= 1500) {
		var textNode = document.createTextNode(scaleBarLength /1000 + "km");
	}
	else {
		var textNode = document.createTextNode(scaleBarLength + myMainMap.units);
	}
	scaleBarText.appendChild(textNode);
	scaleTempGroup.appendChild(scaleBarText);

	//in between tick marks
	if (myMapApp.nrTicks > 2) {
		var nrInBetweenTicks = myMapApp.nrTicks - 1;
		var tickLength = scaleBarLengthPix / nrInBetweenTicks;
		var tickInterval = scaleBarLength / nrInBetweenTicks;

		for (var i=1;i<nrInBetweenTicks;i++) {
			//tick mark
			var scaleBarLine = document.createElementNS(svgNS,"line");
			scaleBarLine.setAttributeNS(null,"x1",myMapApp.scaleXmin + tickLength*i);
			scaleBarLine.setAttributeNS(null,"y1",myMapApp.scaleYmin);
			scaleBarLine.setAttributeNS(null,"x2",myMapApp.scaleXmin + tickLength*i);
			scaleBarLine.setAttributeNS(null,"y2",myMapApp.scaleYmin - 3);
			for (var attrib in myMapApp.scaleBarLinestyles) {
				scaleBarLine.setAttributeNS(null,attrib,myMapApp.scaleBarLinestyles[attrib]);
			}
			scaleTempGroup.appendChild(scaleBarLine);
			//tick text
			var scaleBarText = document.createElementNS(svgNS,"text");
			scaleBarText.setAttributeNS(null,"x",myMapApp.scaleXmin + tickLength*i);
			scaleBarText.setAttributeNS(null,"y",myMapApp.scaleYmin - 8);
			for (var attrib in myMapApp.scaleBarTextstyles) {
				scaleBarText.setAttributeNS(null,attrib,myMapApp.scaleBarTextstyles[attrib]);
			}
			if (scaleBarLength >= 1500) {
				if ((tickInterval*i/1000)%1 == 0) {
					var textNode = document.createTextNode((tickInterval*i)/1000);
				}
				else {
					var textNode = document.createTextNode(((tickInterval*i)/1000).toFixed(2));
				}
			}
			else {
				var textNode = document.createTextNode(Math.round(tickInterval*i));
			}
			scaleBarText.appendChild(textNode);
			scaleTempGroup.appendChild(scaleBarText);
		}
	}
	myMapApp.scaleBarGroup.appendChild(scaleTempGroup);

	//draw back rectangle
	var bbox = myMapApp.scaleBarGroup.getBBox();
	var scaleBarLineBack = document.createElementNS(svgNS,"rect");
	scaleBarLineBack.setAttributeNS(null,"x",1);
	scaleBarLineBack.setAttributeNS(null,"y",(myMapApp.Windows['mapWindow'].height - 25));
	scaleBarLineBack.setAttributeNS(null,"width",bbox.width + 10);
	scaleBarLineBack.setAttributeNS(null,"height",24);
	//scaleBarLineBack.setAttributeNS(null,"height",myMapApp.Windows['mapWindow'].height - (bbox.y - 5.5));
	for (var attrib in myMapApp.scaleBarBgstyles) {
		scaleBarLineBack.setAttributeNS(null,attrib,myMapApp.scaleBarBgstyles[attrib]);
	}
	scaleTempGroup.insertBefore(scaleBarLineBack,scaleTempGroup.firstChild);
}