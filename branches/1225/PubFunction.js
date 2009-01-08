
//通过ajax异步获取图片数据；

//通过ajax异步获取图片数据；
var xmlHttp = false;
function initializeXmlHttp(){
	try {
	  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try {
	    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e2) {
	    xmlHttp = false;
	  }
	}

	if (!xmlHttp && typeof XMLHttpRequest != "undefined") {
	  xmlHttp = new XMLHttpRequest();
	}
}

function AjaxGetCurCarsPosData()
{
		if (!xmlHttp)
		initializeXmlHttp();
	alert("99999");
	src = "CarCurrentPos.php?oid=1";
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateAjaxGetCurCarsPosData;
	xmlHttp.send();	
}
function updateAjaxGetCurCarsPosData(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlResult=xmlHttp.responseXML;

		var root = xmlResult.documentElement;

      	var string=req.responseText;
        cirs = string.split(';');
        for(var i=1; i < cirs.length-1;i++)
		{
			var strdata=cirs[i];

			onecirs = strdata.split(':');

			cBtn = svgdoc.getElementById(onecirs[0]);
	        x = onecirs[1];
			y = onecirs[2];

	        cBtn.setAttribute("cx",x);
	        cBtn.setAttribute("cy",y);
		}
   }
}

function AjaxGetCarTreeData()
{
		if (!xmlHttp)
		initializeXmlHttp();
    src = "GetCarTreeData.php";
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateAjaxGetCarTreeData;
	xmlHttp.send();	
}


function updateAjaxGetCarTreeData(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlResult=xmlHttp.responseXML;

		var root = xmlResult.documentElement;

      	var string=req.responseText;
      	
		//string = data.content;
        cirs = string.split(';');
        for(var i=1; i < cirs.length-1;i++)
		{
			var strdata=cirs[i];
			onecirs = strdata.split(':');
			carNames.push(strdata);
			alert(strdata);
			//dtree1.add(i,0,onecirs[1],'javascript:show()');
	    }
	    //_el("dtree1").innerHTML = dtree1;
    
   }
}