/*
 SVG API
*/
var mapAPI = new Object();

/*  */
window.parent.highLightObject = highLightObject;

function highLightObject(objectId) {
	var object = document.getElementById(objectId);

	setHighColor(object);
}

/*  */
function log()
{
		var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, true);
	panbutton.dispatchEvent(evt);
		
	//对外输出系统消息，如车辆移动/垛位更新等 ;
}