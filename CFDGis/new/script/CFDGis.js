// 关于本文件：

var controlTimer;

function StartRealControl()
{
	if (controlTimer==null){
		controlTimer=setInterval("getDataCurrent(second)", 1000);
		var iTextBox = _el("jkState");
		iTextBox.value = "状态:正在监控";	
	}
}
function StopRealControl()
{
	if (controlTimer!=null){
		clearInterval(controlTimer);
		var iTextBox = _el("jkState");
		iTextBox.value = "状态:停止监控";		
	}
}