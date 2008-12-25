//---------------------- 
var second = 1;
var svgdoc=null;	//HTML 页面内可用的SVGDocument全局变量
var cBtn = null;
var ss=null;
var staknames  =['-A区', 'A区',   'B区',   'C区',   'D区',   'E区',  'F区',  '-F区',  '1区',   '2区',   '3区',   '4区',  '5区', '6区', '7区', '8区','9区']
var stakxs     =[921.58,  911,     900.42,  889.84,  879.26,  868.68, 858.1,  847.52, 193,     203,      213,    224,    234,    245,  254,   263,  274];
var stakys     =[335.95,  325,     314.05,  303.1,   292.15,  281.2,  270.25,  259.3, 110,     120,      130,    140,150,160,170,180,190];
var stakrotates=[136.1,   136.1,   136.1,   136.1,   136.1,   136.1,  136.1,   136.1, 316.1,   316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,46.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1];
var widthscale=0.2;
var a0x=911;
var a0y=325;
var a0rotate=136.1;

top.initData = initData;
 
function initData(evt)
{
	//getGeoData_Stak();
	getGeoData_Car();

	zoomVal += 0.5;
	zoomTo(zoomVal);
	//StartRealControl();
}
	
function getGeoData_Car(sec)
{
	getURL("PHP/getCar_PDO_mysql.php?oid="+1,displayCallbackFirst);
}

function getStackInfo()
{
	getURL("GET_STACK_INFO.php?oid="+1+1,CallbackStakInfo);
}

function SetOrginPoint(str_area)
{
	len = staknames.length;
	for (i=0;i<len; i++){
		var str= staknames[i];
		if (str==str_area)
		{
			a0x=stakxs[i];
			a0y=stakys[i];
		 	a0rotate=stakrotates[i];
		}
	}
}

function CallbackStakInfo(data)
{

	if(data.success)
	{	
		string = data.content;
        cirs = string.split(';');
        for(var i=1; i < cirs.length-1;i++)
		{
			var strdata=cirs[i];
			DrawStakByStr(strdata);
		}
	}
}

function DrawStakByStr(str)
{	   
	stakstrs = str.split(':');
    
	str1 = stakstrs[1];
	str1 = str1+"";
	pos1 = stakstrs[1].indexOf("(").toFixed(0);
	pos2 = stakstrs[1].indexOf(",").toFixed(0);
	pos3 = stakstrs[1].indexOf(")").toFixed(0);

	str_area = stakstrs[1].substring(0,pos1);
	SetOrginPoint(str_area);

	x = stakstrs[1].substring(pos1-(-1),pos2);
	y = stakstrs[1].substring(pos2-(-1),pos3);
	width = y-x;

  
    widthscale = 350/1500;

	ax=a0x-(x*350/1500)*Math.cos((Math.PI / 180)*(180-a0rotate));
	ay=a0y+(x*350/1500)*Math.sin((Math.PI / 180)*(180-a0rotate));

	widthscale = 350/1500;
	//地图350表示1500米

	string = "";
	
	   string = string + "<rect x='"+ax+"' y='"+ay+"' width=' "+width*widthscale+"' height='9' style='fill:#00FFFF;stroke:#ffffff;stroke-width:1' rx= '2' ry = '2'  transform='rotate("+a0rotate+ " " +ax+","+ay+")'/>";
	   node = parseXML(string, svgdoc);
	   Map.appendChild(node);   
	   if (a0rotate<300)
	   {
	      string = "<text  x='"+(ax-10)+"' y='"+ay+"' fill='red' stroke='red' stroke-width='0.02' font-size='1'  font-family='SimSun'> "+stakstrs[2]+" </text>";
	   }
	   else
	   {
	      string = "<text  x='"+(ax-(-5))+"' y='"+(ay-0)+"' fill='red' stroke='red' stroke-width='0.02' font-size='1'  font-family='SimSun'> "+stakstrs[2]+" </text>";
	   }
	   node = parseXML(string, svgdoc);
	   Map.appendChild(node);      
}
function highColor(evt)
{
		obj = evt.target;
	obj.setAttributeNS(null,"fill","red");
}
function nomralColor(evt)
{
		obj = evt.target;
	obj.setAttributeNS(null,"fill","#ffff00");
}
function carinfor()
{
	obj = evt.target;
	
	att = obj.attributes;
	//document.getElementById("carID");
	var iTextBox = _el("carID");
	iTextBox.value = att.item(0).value;
	var iTextBox = _el("carCode");
	iTextBox.value = att.item(3).value;
	var iTextBox = _el("carName");
	iTextBox.value = att.item(4).value;	

	//用tip方式显示铲车信息
	//showinfotip(evt,"铲车ID:"+att.item(0).value);
}
function displayCallbackFirst(data)
{
	if(data.success)
	{	
		string = data.content;
        cirs = string.split(';');
        for(var i=0; i < cirs.length-1;i++)
		{
			var strdata=cirs[i];
			node = parseXML(strdata, svgdoc);
		    Map.appendChild(node);
		   //Map.getElementById("建筑物").appendChild(node);
		}
	}
}

function displayCallbackCurrentCarPos(data)
{

	if(data.success)
	{	
		string = data.content;
                cirs = string.split(';');
                for(var i=1; i < cirs.length-1;i++)
		{
			var strdata=cirs[i];

			onecirs = strdata.split(':');

			cBtn = svgdoc.getElementById(onecirs[0]);
	        x = onecirs[1];
			y = onecirs[2];

	        cBtn.setAttribute("x",x);
	        cBtn.setAttribute("y",y);
		}
	}
}
function getDataCurrent(sec)
{
	getURL("getCarCurrentPos_PDO_mysql.php?oid="+1,displayCallbackCurrentCarPos);
}
