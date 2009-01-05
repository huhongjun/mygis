

var styles = new Array();
styles["car"] 	= {"highcolor":"fill:red","normalcolor":"fill:#ffff00"};
styles["stack"] = {"highcolor":"fill:#00FF00;stroke:#00ff00;stroke-width:0","normalcolor":"fill:#00FFFF;stroke:#ffffff;stroke-width:0"};

// 鼠标over时高亮显示车辆/垛位对象
function setHighColor(obj)
{

	var style = styles[obj.getAttribute("type")];
	obj.setAttributeNS(null,"style",style["highcolor"]);

}

function setNormalColor(obj)
{
	var style = styles[obj.getAttribute("type")];
	obj.setAttributeNS(null,"style",style["normalcolor"]);
}

function objectMouseOver(evt)
{
	obj = evt.target;
	setHighColor(obj);
	statusChange("对象: " + obj.getAttribute("infotip"));
}

function objectMouseOut(evt)
{
	obj = evt.target;
	setNormalColor(obj);
}

// 应该写成调用html页面的javascript函数，并传输大文本串(数据库字段名：值，保存用的url)，实现解耦
function objectMouseClick(evt)
{
	window.parent.svgNotification("car","hello");
}

function carinfor(evt)
{
	obj = evt.target;
	//obj.setAttributeNS(null,"style","fill:#00FF00;stroke:#00ffff;stroke-width:1");
	att = obj.attributes;
	
	fr=window.frames("outputfrm_car_inspect");
	
//   alert((fr==null));
	
//	fr=s1.carID;document
//	alert((fr.carID1==null));

//	alert((fr.document.a001==null));
//	alert(fr.document.form001.carID.value);
	//var itext = fr.carID;
	fr.onNodeSelect(att.item(0).value);
//	itext.value = att.item(0).value;
	/*
	var iTextBox = _el("carID");
	iTextBox.value = att.item(0).value;
	
	var iTextBox = _el("carType");
	iTextBox.value = att.item(5).value;
		
	var iTextBox = _el("carCode");
	iTextBox.value = att.item(3).value;
		
	var iTextBox = _el("carName");
	iTextBox.value = att.item(4).value;	*/

	//用tip方式显示铲车信息
	showinfotip(evt,"铲车ID:"+att.item(0).value);
}

function stakinfor(evt)
{
	obj = evt.target;
//	+" STOWid='"+STOWid+"' STOW_NAME='"+STOW_NAME+"' BOAT_NAME='"+BOAT_NAME+"' GOODS_NAME='"+GOODS_NAME+"' COUSTOMER_NAME='"+COUSTOMER_NAME+	
	att = obj.attributes;
	//document.getElementById("carID");
	var iTextBox = _el("STOWid");
	iTextBox.value = att.item(4).value;
	
	var iTextBox = _el("STOW_NAME");
	iTextBox.value = att.item(5).value;
		
	var iTextBox = _el("BOAT_NAME");
	iTextBox.value = att.item(6).value;
		
	var iTextBox = _el("GOODS_NAME");
	iTextBox.value = att.item(7).value;	

	var iTextBox = _el("COUSTOMER_NAME");
	iTextBox.value = att.item(8).value;	
	
	// 垛位数据采集：垛位id，垛位区域，当前测绘车辆位置(999)
	var iTextBox = _el("uSTOWid");			iTextBox.value = att.item(4).value;
	
	var iTextBox = _el("uStackArea");	iTextBox.value = att.item(5).value;
			
	var carCH = document.getElementById("999");
	carAtt = carCH.attributes;
	var iTextBox = _el("uCarPosX");			iTextBox.value = carAtt.item(1).value;	iTextBox.value = Map.value;	
	var iTextBox = _el("uCarPosY");			iTextBox.value = carAtt.item(2).value;	
	
	//用tip方式显示铲车信息
	//showinfotip(evt,"铲车ID:"+att.item(0).value);
	
}