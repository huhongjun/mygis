// map_zoom.js  szy add 2008-2-20
//利用ajax技术进行放大缩小
// all called by start.jsp


function doZoom(zomForm,coords){
	/*if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}
    jg.drawString(isLoadingMap,100,100);            
    jg.paint(); */	
	
	if(isLoadingMap){
		return;
     }
    isLoadingMap = true;
   
	var form = document.getElementById(zomForm);
	form.centerx.value = coords[0];
	form.centery.value = coords[1];
	if (!xmlHttp)
		initializeXmlHttp();
	xmlHttp.open("post",getZoomURL(form.action,form) , true);
	xmlHttp.onreadystatechange = updatePage;
	xmlHttp.send();
	
}

function doImgMove(action,form){
	if(isLoadingMap){
		return;
     }
    // alert(action);
    isLoadingMap = true;
	if (!xmlHttp)
		initializeXmlHttp();
	xmlHttp.open("post",getZoomURL(action,form) , true);
	xmlHttp.onreadystatechange = updatePage;
	xmlHttp.send();	
}

function getZoomURL(action,form){
	
	var url;
	url = action;
	url = url + "&centerx=" + form.centerx.value;
	url = url + "&centery=" + form.centery.value;
	url = url + "&zoomScale=" + zoomScale;
	url = url + "&pictureWidth=" + form.pictureWidth.value;
	url = url + "&pictureHeight=" + form.pictureHeight.value;
	url = url + "&pictureTopX=" + form.pictureTopX.value;
	url = url + "&pictureTopY=" + form.pictureTopY.value;
	url = url + "&pictureBottomX=" + form.pictureBottomX.value;
	url = url + "&pictureBottomY=" + form.pictureBottomY.value;
	url = url + "&pictureUrl=" + form.pictureUrl.value;
	//alert(url);
	return url;
}

function updatePage() {
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
		var form = document.getElementById("zoomForm");
		if (xmlDoc.readyState == 4){
			if (xmlDoc.getElementsByTagName("pictureWidth").length==0){
				isLoadingMap = false;
				return;
			}				
			form.centerx.value  = xmlDoc.getElementsByTagName("centerx")[0].childNodes[0].nodeValue;
			form.centery.value  = xmlDoc.getElementsByTagName("centery")[0].childNodes[0].nodeValue;
			form.zoomScale.value  = xmlDoc.getElementsByTagName("zoomScale")[0].childNodes[0].nodeValue;
			form.pictureWidth.value  = xmlDoc.getElementsByTagName("pictureWidth")[0].childNodes[0].nodeValue;
			form.pictureHeight.value = xmlDoc.getElementsByTagName("pictureHeight")[0].childNodes[0].nodeValue;
			form.pictureTopX.value  = xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].nodeValue;
			form.pictureTopY.value  = xmlDoc.getElementsByTagName("pictureTopY")[0].childNodes[0].nodeValue;
			form.pictureBottomX.value  = xmlDoc.getElementsByTagName("pictureBottomX")[0].childNodes[0].nodeValue;
			form.pictureBottomY.value  = xmlDoc.getElementsByTagName("pictureBottomY")[0].childNodes[0].nodeValue;
			form.pictureUrl.value = xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue;
			map_layer.swapImage(
				xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue);
			map_layer. moveTo(0,0);
			if (jg!=null)
				jg.clear();
			//调用画雷击点函数
			reDrawLdDots();
			drawFlashExplor();
		isLoadingMap = false;
		}
    }
   }
   	
}

