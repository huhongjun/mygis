/*
 SVG API
*/
var mapAPI = new Object();

/*  */
window.parent.top.setModePan = mapAPI.setModePan;

mapAPI.setModePan = function () {
	var panbutton = document.getElementById("panManual");

	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, true);
	panbutton.dispatchEvent(evt);
		
}

/*  */
function log()
{
	//对外输出系统消息，如车辆移动/垛位更新等 ;
}