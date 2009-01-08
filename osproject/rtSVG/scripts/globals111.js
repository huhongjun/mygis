
// szy add
// 地图的显示坐标为左下角、右上角，而屏幕坐标的0，0对应地图的左上角和右下角
//画雷击点时，请先判断是否在目前所处的地图区域，然后再画图；

var jg;							//画布对象
var map_layer ; 	//纪录DHTML产生的 IMG map 的层。
var  map_tool_op=0; // 0: select ; 1: 放大； 2：缩小； 3:移动； 4:画多折线；5:测距；
var hasJK=true;	//是否处于实时监控下；
var timeJK;			//监控定时器
var hasContinousControl = false; 	//decide to continous real control
var objNodeList;  //存放从服务器反馈回来的雷电数据
var currentlocate; //记录数组当前下标
var daysval;    //记录回放间隔
var datestart;
var datestop;
var colors=['#0000cc','#3399cc','#66cc00','#9900cc','#990000','#999966','#cc66ff','#cc9933','#ccff00','#ff6600','#ffccff','#ffff00'];
var smemos=['scmemo1','scmemo2','scmemo3','scmemo4','scmemo5','scmemo6','scmemo7','scmemo8','scmemo9','scmemo10','scmemo11','scmemo12'];
var colorindex;
var daysvals;

function setMapStyle(oper){
//	alert(hcf_content.origin_point);
	hcf_content.origin_point[0]=null;		//菜单操作后清空起始点坐标；
	hcf_content.drawflag=false;			//菜单操作后清空画图标志；
	hcf_content.map_layer.setDraggable(false); 
	zoomScale=1;
	
	switch (oper){
		case 0:
			hcf_content.map_layer.div.style.cursor="default";
			break;
		case 1:
			hcf_content.map_layer.div.style.cursor="images/ZOOMIN.CUR";
			hcf_content.map_layer.setResizable(true); 
			hasContinousControl = false;
			break;
		case 2:
			hcf_content.map_layer.div.style.cursor="images/ZOOMOUT.CUR";
			hcf_content.map_layer.setResizable(true); 
			hasContinousControl = false;
			break;
		case 3:
			hcf_content.map_layer.setDraggable(true); 
			hcf_content.map_layer.div.style.cursor="move";
			break;
		case 4:
			hcf_content.map_layer.div.style.cursor="crosshair";
			hcf_content.drawflag=true;			//菜单操作后重置画图标志；
			break;
		case 5:
			hcf_content.map_layer.div.style.cursor="images/measure.cur";
			hcf_content.drawflag=true;			//菜单操作后重置画图标志；
			break;
		case 6:
			hcf_content.map_layer.div.style.cursor="images/maperr.cur";
			hcf_content.drawflag=true;			//菜单操作后重置画图标志；
			break;
		default:
			hcf_content.map_layer.div.style.cursor="default";
	}
}

//显示线路树页面
function displayXlTree(){
	hcf_content.disp1();
}
//显示实时监控页面
function displayRealJK(){
	hcf_content.disp2();
}

//显示历史回放菜单
function displayLSHF(){
	hcf_content.disp3();
}

//显示线路雷击查询菜单
function displayXLLJCX(){
	hcf_content.disp4();
}

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

//实时监控时用 called by start.jsp
function doRealControl(interval){
	if (!xmlHttp)
		initializeXmlHttp();
	interval = interval / 60000;	
	var src = "";
	if (hasContinousControl)
		src = "realControl.do?method=continues&interval=" + interval ;
	else{
		src = "realControl.do?method=onceAll&interval=" + interval ;
		hasContinousControl = true;
	}		
	//alert (src);
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateStartPageJK;
	xmlHttp.send();
}

//监控的异步返回数据
// called by start.jsp
function updateStartPageJK222(){
 
				if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}
  	  	jg.setColor("#ff1000");
for (i=0;i<200; i++){
				jg.drawEllipse(120+i*2,260,50,70); 
		}
			jg.paint();

}
function updateStartPageJK(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
    	if (xmlDoc.readyState == 4){
	       	objNodeList = xmlDoc.selectNodes("//row");
			var len = objNodeList.length;
			var x,y;
			var form = document.getElementById("zoomForm");
			var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
			var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;
            var picWidth = form.pictureWidth.value;
            var picHeight= form.pictureHeight.value;
			
			//alert(objNodeList.length);
			//alert(objNodeList[0].getAttribute("x"));
			if(jg == null){
	    		jg =new jsGraphics(map_layer.div);
	    		jg.setStroke(1);
  			}

  	  		jg.setColor("#ff1000");

			for (i=0;i<len; i++){
				//x = ((objNodeList[i].getAttribute("x")-form.pictureBottomX.value)/scx).toFixed(0);
				//y = form.pictureTopY.value - (objNodeList[i].getAttribute("y")-form.pictureBottomY.value/scy).toFixed(0);
				x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
				y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);
				//drawDot(x,y);
				if (x >0 && x< 0-(-picWidth) && y>0 && y< 0-(-picHeight)){

			   y=parseInt(y,10);
			   x=parseInt(x,10);
				jg.fillEllipse(x,y,5,5); 

			  }
			}
			jg.paint();
			//alert(i);
		}
	}
  }	
}
function updateStartPageLSHF(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
    	if (xmlDoc.readyState == 4){
	       	objNodeList = xmlDoc.selectNodes("//row");
			var len = objNodeList.length;
			var x,y;
			var form = document.getElementById("zoomForm");
			var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
			var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;
			
			//alert(objNodeList.length);
			//alert(objNodeList[0].getAttribute("x"));
				if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}

  	  	jg.setColor("#ff1000");
      currentlocate = 0;
      colorindex = 0;
      daysvals = 0;
      ClearAllSchmaticName();
      				      if (jg != null){
			           jg.clear();
			          }
      drawLSHF();
			
			jg.paint();

		}
	}
  }	
}

function drawLSHF(){
			var x,y;
			var len = objNodeList.length;
			var is;
			var flashTime;
			var isJumpNextVal;
			var delayID;
			isJumpNextVal = false;
			var form = document.getElementById("zoomForm");
			var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
			var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;			
            var picWidth = form.pictureWidth.value;
            var picHeight= form.pictureHeight.value;

            if (daysvals != 0){

                  SetSchmaticName(colorindex,daysvals);
                }
                
			while(!isJumpNextVal){

			    if (currentlocate > len -1 )	{

				      if (delayID != null){
			           clearTimeout(delayID);
			          }
				      return;
			    }
			    
                i=currentlocate;

			    //x = (objNodeList[i].getAttribute("x")/scx).toFixed(0);
			    //y = (objNodeList[i].getAttribute("y")/scy).toFixed(0);

				//x = ((objNodeList[i].getAttribute("x")-form.pictureBottomX.value)/scx).toFixed(0);
				//y = form.pictureTopY.value - ((objNodeList[i].getAttribute("y")-form.pictureBottomY.value)/scy).toFixed(0);			    

				//x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
				//y = ((objNodeList[i].getAttribute("y")-form.pictureTopY.value)/scy).toFixed(0);	
				x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
				y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);			    
			    
        
		idayval = objNodeList[i].getAttribute("dayval");

                if (daysvals == 0){
        	      jg.setColor(colors[colorindex]);
                  //daysvals = idayval;
                  // alert(idayval);
                  // alert(daysvals);
                  daysvals = daysval*((idayval/daysval).toFixed(0)-(-1));
                  //alert(daysvals);
                  SetSchmaticName(colorindex,daysvals);

                } 
                                    //alert(idayval -(- daysval) - daysvals);
                		        //	alert(daysvals);


		        if (( (idayval -(- daysval) - daysvals) >= 0) && ( (idayval -(- daysval) - daysvals) < daysval ))
		        {
						   if (x >0 && x< 0-(-picWidth) && y>0 && y< 0-(-picHeight)){
						       y=parseInt(y,10);
						       x=parseInt(x,10);
							   jg.fillEllipse(x,y,5,5); 
							   jg.paint();
					       }        	
		        }
		        else {

                	//alert("sdfsdf");

		        	isJumpNextVal = true;
		            daysvals = daysval*((idayval/daysval).toFixed(0)-(-1));
                		        	                               //alert(idayval);
                		        //	alert(daysvals);
		        	colorindex ++;
		        	jg.setColor(colors[colorindex]);
		            
		        	
		        	if (colorindex > colors.len -1 ){
		        		colorindex = 0;
		        		alert('所选回放间隔太小，建议选择更大间隔！');
				      if (delayID != null){
			           clearTimeout(delayID);
			          }
				      return;

		        	}
		        		
		        	currentlocate ++;

		        	delayID=setTimeout("drawLSHF()", 4000);


				}
			  currentlocate ++;
			}

}

function ClearAllSchmaticName(){
	
	len = smemos.length;
	for (i=0;i<len; i++){
		var str= smemos[i];
		var iTextBox = document.getElementById(str);
	    iTextBox.value = '';
	}
}
	
function SetSchmaticName(iColor,sname){
	  
	 var str= smemos[iColor];
	 var s1=sname/daysval;
	 s1="第"+s1;
	 var valname;
	 	if (dateval == "day"){
			valname="天";
		}
		if (dateval == "week"){
			valname="周";
		}		
		if (dateval == "month"){
			valname="月";
		}
		if (dateval == "season"){
			valname="季";
		}
		if (dateval == "year"){
			valname="年";
		}
	 s1=s1+	valname;
     var iTextBox = document.getElementById(str);
	 iTextBox.value = s1;
}
function  DateDiff(beginDate,  endDate){    //beginDate和endDate都是2007-8-10格式
       var  arrbeginDate,    arrendDate,  iDays ;
       alert(beginDate);
  var   Date1=cdate(beginDate); 
  alert(Date1);  
    Date1=new   Date(Date1);   
   var   Date2=Date.parse(endDate);   
     Date2=new   Date(Date2); 
  /*
       arrbeginDate=  beginDate.split("-"); 
       alert(arrbeginDate[1]); 
       Date1=  new  Date(arrbeginDate[1]  +  '-'  +  arrbeginDate[2]  +  '-'  +  arrbeginDate[0]);    //转换为2007-8-10格式
      arrendDate=  endDate.split("-") ; 
       Date2=  new  Date(arrendDate[1]  +  '-'  +  arrendDate[2]  +  '-'  +  arrendDate[0]);  
       */
       iDays  =  parseInt(Math.abs(Date1-  Date2)  /  1000  /  60  /  60  /24);    //转换为天数 
       alert(iDays);
       //return  iDays ; 
   }

//draw a dot , called by updateStartPageJK
function drawDot(x,y){
	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}
  	jg.setColor("#ff1000");
    jg.drawOval(x-2,y-2,4,4); 
  	jg.paint();
}

//draw a dot , called by updateStartPageJK
function cxDrawDot(x,y){
	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}
  	jg.setColor("#ff1000");
  	var bj=document.getElementById("hcqbj").value;
  	var form = document.getElementById("zoomForm");
  	if (bj==null || bj=="")
  		bj=1000;
  	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
  	bj=(bj/scx).toFixed(0);
  	//alert(bj);
  	jg.fillOval(x-2,y-2,4,4);
  	jg.drawOval(x-bj,y-bj,2*bj,2*bj); 
  	jg.paint();
}

//get xl img request called by xltree.html
function getXlImg(xlURI){
	if (!xmlHttp)
		initializeXmlHttp();
	//set default xl buffer to 100m
	var src = "xlTree.do?method=getXlImg&xlURI=" + xlURI + "&xlbuf=1000";
	//alert (src);
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateXlImg;
	xmlHttp.send();	
}
//get xl img reponse  called by xltree.html
function updateXlImg(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
		var form = document.getElementById("zoomForm");
		if (xmlDoc.readyState == 4){
			form.pictureWidth.value  = xmlDoc.getElementsByTagName("pictureWidth")[0].childNodes[0].nodeValue;
			form.pictureHeight.value = xmlDoc.getElementsByTagName("pictureHeight")[0].childNodes[0].nodeValue;
			form.pictureTopX.value  = xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].nodeValue;
			form.pictureTopY.value  = xmlDoc.getElementsByTagName("pictureTopY")[0].childNodes[0].nodeValue;
			form.pictureBottomX.value  = xmlDoc.getElementsByTagName("pictureBottomX")[0].childNodes[0].nodeValue;
			form.pictureBottomY.value  = xmlDoc.getElementsByTagName("pictureBottomY")[0].childNodes[0].nodeValue;
			form.pictureUrl.value = xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue;
			//alert(form.pictureUrl.value);
			map_layer.swapImage(
				xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue);
		//	parent.map_layer. moveTo(0,0);
			if (parent.jg!=null)
				parent.jg.clear();
		}
    }
   }
}

//called by start.jsp op=0,1,2,3 : realcontrol, 
function getDataList(op){
	var src=""
	if (op==0)
		src = "realControl.do?method=getDataForm";
	window.open(src,"","height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no")  ;
	
}
//getLdListBymutl query in start.jsp
function getLdDataList(target,formId,actionName,methodName){
var form =document.getElementById(formId);
if(target!='')
form.target=target;
form.action=getMethod(actionName,methodName);
form.submit();
	
}
function getMethod(af, m){
	return af + "?method=" + m;

}
function showHistoryOnMainView(){
  //var form = document.getElementById("lshfForm")
  dateq = document.getElementById("hfsjq").value
  datez = document.getElementById("hfsjz").value
  dateval = document.getElementById("hfjg").value
	if (!xmlHttp)
		initializeXmlHttp();
	datestart = dateq;
	datestop = datez;
	var src = "";
//alert(dateval);
	src = "realControl.do?method=lshf&hfsjq=" + dateq +"&hfsjz="+datez+"&hfjg="+dateval;
		if (dateval == "day"){
			daysval = 1;
			daysvals = 0;
		}
		if (dateval == "week"){
			daysval = 7;
			daysvals = 0;
		}		
		if (dateval == "month"){
			daysval = 30;
			daysvals = 0;
		}
		if (dateval == "season"){
			daysval = 120;
			daysvals = 0;
		}
		if (dateval == "year"){
			daysval = 365;
			daysvals = 0;
		}			
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateStartPageLSHF;
	xmlHttp.send();


}

//get xlldcx data called by start.jsp
function getLdxlData(tree,form){
	if (!xmlHttp)
		initializeXmlHttp();
	if (tree==null || tree.getSelected()==null || tree.getSelected().parentNode==null 
		|| tree.getSelected().parentNode.parentNode==null){
		alert("您必须选择线路");
		return;
	}
	var xlmc = tree.getSelected().text;
	var dydj = tree.getSelected().parentNode.text;
	var xianmc = tree.getSelected().parentNode.parentNode.text;
	
	if (dydj.lastIndexOf("k")<1){
		alert("您必须选择线路");
		return;
	}
	var hcqbj = form.hcqbj.value==null?1000:form.hcqbj.value;
	var ljsjq = form.ljsjq.value==null?"":form.ljsjq.value;
	var ljsjz = form.ljsjz.value==null?"":form.ljsjz.value;
	var minldqd = form.minLjqd.value==null?"":form.minLjqd.value;
	var maxldqd = form.maxLjqd.value==null?"":form.maxLjqd.value;
	
	var src = "editThunder.do?method=getXlLdData&xianmc=" + xianmc + "&dydj=" + dydj + "&xlmc=" + xlmc
			+ "&hcqbj=" + hcqbj + "&ljsjq=" + ljsjq + "&ljsjz=" + ljsjz + "&minldqd=" + minldqd 
			+ "&maxldqd=" + maxldqd + "&flag=1";
//	alert (src);
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateLdxlData;
	xmlHttp.send();	
}
// called by start.jsp 
function updateLdxlData(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
		var form = document.getElementById("zoomForm");
		if (xmlDoc.readyState == 4){
	       	objNodeList = xmlDoc.selectNodes("//row");
	       	if (objNodeList==null) return;
			var len = objNodeList.length;
			if (len<1)
				return;
			var x,y;
			var scWidth = form.pictureWidth.value;
			var scHeight = form.pictureHeight.value;
			var form = document.getElementById("zoomForm");
			var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
			var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;
			//x = ((objNodeList[i].getAttribute("x")-form.pictureBottomX.value)/scx).toFixed(0);
			//y =scHeight - ((objNodeList[i].getAttribute("y")-form.pictureBottomY.value)/scy).toFixed(0);
				x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
				y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);
			
			if (x>=0&&x<=scWidth && y>=0&&y<=scHeight)
				drawDot(x,y);
			
			//alert(form.pictureUrl.value);

		}
    }
   }
}

// called by start 组合查询
function playZdyLdDataList(formId){
	var form =document.getElementById(formId);
	var hasZdy = document.getElementById("chkzdy").checked;
	
	var hcqbj = form.hcqbj.value==null?1000:form.hcqbj.value;
	
	var ljsjq = form.ljqssj.value==null?"":form.ljqssj.value;
	var ljsjz = form.ljzzsj.value==null?"":form.ljzzsj.value;
	
	var minldqd = form.minLdqd.value==null?"":form.minLdqd.value;
	var maxldqd = form.maxLdqd.value==null?"":form.maxLdqd.value;
	
	var minLatitude = form.minLatitude.value==null?"":form.minLatitude.value;
	var maxLatitude = form.maxLatitude.value==null?"":form.maxLatitude.value;
	
	var minLongitude = form.minLongitude.value==null?"":form.minLongitude.value;
	var maxLongitude = form.maxLongitude.value==null?"":form.maxLongitude.value;
	
	var xianmc = form.xianmc.value==null?"":form.xianmc.value;
	var hasdot = document.getElementById("radio").checked;		//true : draw dot; false: draw line
	var url = "editThunder.do?method=getZdyPlayLdData&xianmc=" + xianmc 
			+ "&ljsjq=" + ljsjq + "&ljsjz=" + ljsjz + "&minldqd=" + minldqd 
			+ "&maxldqd=" + maxldqd + "&minLatitude=" + minLatitude 
			+ "&maxLatitude=" + maxLatitude + "&minLongitude=" + minLongitude
			+ "&maxLongitude=" + maxLongitude ;
	if (hasZdy){
		var x="";
		var y="";
		if (hasdot){
			x = origin_point[0]==null?"":origin_point[0];
			y = origin_point[1]==null?"":origin_point[1];
			url +="&hasdot=1&hcqbj=" + hcqbj + "&x=" + x + "&y=" + y;
		}else{
			url +="&hasdot=0&hcqbj=" + hcqbj;
			for(var i=pointX.length-1;i>=0;i--){
				if (i!=0){
					x += pointX[i] + ",";
					y += pointY[i] + ",";
				}else{
					x += pointX[i];
					y += pointY[i];
				}
			}
			url += "&x=" + x + "&y=" + y;
		}
	}
	alert (url);
	
	if (!xmlHttp)
	initializeXmlHttp();
	xmlHttp.open("post",url, true);
	xmlHttp.onreadystatechange = updateLdxlData;
	xmlHttp.send();	
}

