// ���ڱ��ļ���

var controlTimer;

function StartRealControl()
{
	if (controlTimer==null){
		controlTimer=setInterval("getDataCurrent(second)", 1000);
		var iTextBox = _el("jkState");
		iTextBox.value = "״̬:���ڼ��";	
	}
}
function StopRealControl()
{
	if (controlTimer!=null){
		clearInterval(controlTimer);
		var iTextBox = _el("jkState");
		iTextBox.value = "״̬:ֹͣ���";		
	}
}