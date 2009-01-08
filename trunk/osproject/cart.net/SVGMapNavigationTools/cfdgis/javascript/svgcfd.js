

var styles = new Array();
styles["car"] 	= {"highcolor":"fill:red","normalcolor":"fill:#ffff00"};
styles["stack"] = {"highcolor":"fill:#00FF00;stroke:#00ff00;stroke-width:0","normalcolor":"ffill:#00FFFF;stroke:#000000;stroke-width:1"};

function objectMouseHandle(evt)
{
	if(evt.type == "mouseover") 	{ objectMouseOver(evt); }
	if(evt.type == "mouseout") 	{ objectMouseOut(evt); }
	if(evt.type == "mouseclick") 	{ objectMouseClick(evt); }	
}

// 鼠标over时高亮显示车辆/垛位对象
function setHighColor(obj)
{

	var style = styles[obj.getAttributeNS(null, "type")];
	obj.setAttributeNS(null,"style",style["highcolor"]);

}

function setNormalColor(obj)
{
	var style = styles[obj.getAttributeNS(null, "type")];
	obj.setAttributeNS(null,"style",style["normalcolor"]);
}

function objectMouseOver(evt)
{
	obj = evt.target;
	setHighColor(obj);
	statusChange("对象: " + obj.getAttributeNS(null, "tooltip"));
	myMapApp.displayTooltip(evt);
}

function objectMouseOut(evt)
{
	obj = evt.target;
	setNormalColor(obj);
	myMapApp.displayTooltip(evt);
}

// 应该写成调用html页面的javascript函数，并传输大文本串(数据库字段名：值，保存用的url)，实现解耦
function objectMouseClick(evt)
{
	var obj =evt.target;
	var objecttype = obj.getAttributeNS(null,"type");
	var objectid = obj.getAttributeNS(null,"id");
	
	window.parent.svgNotification(objecttype,objectid); // Ƕ��htmlҳ��ʱ��Ч
	//svgNotification("car","hello");
}
