
// szy add
// 地图的显示坐标为左下角、右上角，而屏幕坐标的0，0对应地图的左上角和右下角
//画雷击点时，请先判断是否在目前所处的地图区域，然后再画图；

var jg;							//画布对象
var jgShow;
var jgExplore;
var jgWait;
var currentPage;
var jgSelectedFlash;
var map_layer ; 	//纪录DHTML产生的 IMG map 的层。
var  map_tool_op=0; // 0: select ; 1: 放大； 2：缩小； 3:移动； 4:画多折线；5:测距；
var hasJK=true;	//是否处于实时监控下；
var timeJK;			//监控定时器
var timeSetIsLoadingMap;
var hasContinousControl = false; 	//decide to continous real control
var objNodeList;  //存放从服务器反馈回来的雷电数据
var currentlocate; //记录数组当前下标
var daysval;    //记录回放间隔
var datestart;
var datestop;
var colors=['#0000cc','#3399cc','#66cc00','#9900cc','#990000','#999966','#cc66ff','#cc9933','#ccff00','#ff6600','#ffccff','#ffff00'];
var smemos=['scmemo1','scmemo2','scmemo3','scmemo4','scmemo5','scmemo6','scmemo7','scmemo8','scmemo9','scmemo10','scmemo11','scmemo12'];
var exploreName=[' 海淀上庄 ','密云新城子',' 房山张坊 ',' 延庆康庄 ',' 平谷峪口 ',' 怀柔雁栖 ','怀柔喇叭沟门','大兴庞各庄'];
var exploreCrdX=[490256,584090,445111,477214,555401,525881,522155,495782];
var exploreCrdY=[324353,387303,267669,375710,335371,355088,415014,272574];
var colorindex;
var daysvals;
var xpoints;
var currentDots=new Array(); 
var currentDotsColor=new Array(); 
var isLoadingMap=false;
	

function setMapStyle(oper){
//	alert(hcf_content.origin_point);
	hcf_content.origin_point[0]=null;		//菜单操作后清空起始点坐标；
	hcf_content.drawflag=false;			//菜单操作后清空画图标志；
	hcf_content.map_layer.setDraggable(false); 
	zoomScale=1;
	
	switch (oper){
		case 0:
			hcf_content.map_layer.div.style.cursor="default";
			backToHome();
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
	case 7:		//清除雷电图形
		clearLd();
		break;
	case 8:  //清缓冲区
		clearBuffers();
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

//显示线路雷击查询菜单
function displayXLXSSZ(){
	hcf_content.disp5();
}

//显示雷电密度查询菜单
function displayMD(){
	hcf_content.disp6();
}

//显示查询结果菜单
function displayResult(){
	hcf_content.disp7();
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
    if (isLoadingMap)
           return;
    isLoadingMap = true;	
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

function updateStartPageJK(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
    	if (xmlDoc.readyState == 4){
	       	objNodeList = xmlDoc.selectNodes("//row");
			drawLdDots();
            isLoadingMap = false;			
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
      currentDotsIndex = 0;
      currentDots=new Array();
    currentDotsColor=new Array();  
    initDotsCol();      
      ClearAllSchmaticName();
      if (jg != null){
			jg.clear();
		}
		currentPage=1;
		SetFlashList();
      drawLSHF();
			
		jg.paint();
            isLoadingMap = false;
	    jgWait.clear();       
		}
	}
  }	
}

function initDotsCol(){
	len = objNodeList.length;
	for (i=0;i<len; i++){
		currentDotsColor[i]=9;
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

            //newval为所选的时间段分为12等分
            var newval;
            if (daysvals != 0){

                //  SetSchmaticName(colorindex,daysvals);
                }
                
			while(!isJumpNextVal){

			    if (currentlocate > len -1 )	{

				      if (delayID != null){
			           clearTimeout(delayID);
			          }
				      return;
			    }
			    
                i=currentlocate;

				x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
				y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);
				
			    idayval = objNodeList[i].getAttribute("dayval");
			    idayval = idayval*24;
                selecteddayval = objNodeList[i].getAttribute("selecteddayval");
                selecteddayval = (selecteddayval - (-1))*24;
                newval = (selecteddayval/12).toFixed(0);
                daysval = newval;

                if (daysvals < newval){
        	      jg.setColor(colors[colorindex]);
                  daysvals = daysval;
                  SetSchmaticName(colorindex,daysvals);
                  //alert('colorindex:'+colorindex);
                } 
                
               
		        if (( (idayval -(- daysval) - daysvals) >= 0) && ( (idayval -(- daysval) - daysvals) < daysval ))
		        {
 						   
						   if (x >0 && x< 0-(-picWidth) && y>0 && y< 0-(-picHeight)){
						       y=parseInt(y,10);
						       x=parseInt(x,10);
						       currentDots.push( currentlocate);
						       currentDotsColor[currentlocate]=colorindex;
							   jg.fillPolygon(new Array(x-3,x+3,x),new Array(y+3,y+3,y-3));
							   
							   jg.paint();

					       } 
					       currentlocate ++;       	
		        }
		        else {

		        	isJumpNextVal = true;
		        	colorindex ++;
		        	//alert('colorindex:'+colorindex);
		            daysvals = daysval  * (colorindex -( -1));
                    SetSchmaticName(colorindex,daysvals);
		        	jg.setColor(colors[colorindex]);
		        	
		        	if (colorindex > colors.len -1 ){
		        		colorindex = 0;
		        		alert('所选回放间隔太小，建议选择更大间隔！');
				      if (delayID != null){
			            clearTimeout(delayID);
			          }
				      return;

		        	}
		        		
		        	delayID=setTimeout("drawLSHF()", 400);

				}
			}

}

function FindCurrentDotByXY(xi,yi){
	if (currentDots == null ){
		return;
	}
	if (currentDots.length<1){
		return;
	}
	if (objNodeList == null ){
		return;
	}		
	var form = document.getElementById("zoomForm");
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;			
    var picWidth = form.pictureWidth.value;
    var picHeight= form.pictureHeight.value;
    var xlen;
    var ylen;
    var iTextBox1 = document.getElementById("currentdotflashtime");    
    var iTextBox2 = document.getElementById("currentdotintension"); 
    iTextBox1.value="";
    iTextBox2.value="";
    var cx;
    var cy;
	len = currentDots.length;
	 if(jgShow == null){
	    jgShow =new jsGraphics(map_layer.div);
	    jgShow.setStroke(1);
  	}	
	//jgShow.setColor("red");
    jgShow.setFont("宋体","15px"); 

	for (j=0;j<len; j++){
		i = currentDots[j];
		if ( j > objNodeList.length -1) {
			break;
		}
		x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
		y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);

		xlen=x-xi;
		ylen=y-yi;

		xlen=Math.abs(xlen);
		ylen=Math.abs(ylen);

        if ((0-(-xlen)< 5) && (0-(-ylen)< 5)) {
           
        	//alert('found');
        	iTextBox1.value=objNodeList[i].getAttribute("flashtime");
        	iTextBox2.value=objNodeList[i].getAttribute("intension");
		    cx=xi*scx -(-form.pictureTopX.value );
		    cy=form.pictureBottomY.value - yi*scy  ; 
		    cx=parseInt(objNodeList[i].getAttribute("x"),10); 
		    cy=parseInt(objNodeList[i].getAttribute("y"),10); 
		    x = x-(-10);  

            jgShow.drawString("雷击时间："+objNodeList[i].getAttribute("flashtime"),x,y-60); 
            jgShow.drawString("雷击强度："+objNodeList[i].getAttribute("intension")+ "  千安",x,y-40);
            jgShow.drawString("雷击坐标x："+cx,x,y-20); 
            jgShow.drawString("雷击坐标y："+cy,x,y);            
            jgShow.paint();        	
        	break;
        }
             
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
	 var t1;
	 var t2;
	 s1 = iColor+1;
	 s1="第"+s1;
     dateq = document.getElementById("hfsjq").value
     var   val=new  Date(dateq.replace(/-/g,  "\/"));
     var   Date1=new   Date(val);   
     Date1.setHours('00','00');   
     Date1.setHours(Date1.getHours()+sname);     	 
	 s1=s1+'时间间隔';
     var iTextBox = document.getElementById(str);
     t1 = (Date1.getMonth()-(-1))+'-'+Date1.getDate()+' '+Date1.getHours() +'点';
     Date1.setHours(Date1.getHours()-daysval); 
     t2 = (Date1.getMonth()-(-1))+'-'+Date1.getDate()+' '+Date1.getHours()  +'点';
	 iTextBox.value = t2 +'至'+t1
}

function prevpage(){
	if (currentPage != 1){
	  currentPage = currentPage - 1;
	  SetFlashList();
	}
}
function GotoPage(){
	var	len;
	var j;
	var iTextBox;
	var textBoxName;
	var enteredpage;
	len = objNodeList.length;
	var totalPages;
	if (len==0){
	    totalPages = 0;
	}
	else{
		if ((len/15).toFixed(0)==len/15){
			totalPages = (len/15).toFixed(0);
		}
		else{
		    totalPages = (len/15).toFixed(0)-(-1);
		}
	}	
	
	var iTextBox = document.getElementById("currentpage");
	enteredpage = iTextBox.value;

	if ((enteredpage>0)&&(enteredpage<=totalPages)){
		currentPage = enteredpage;
		SetFlashList();
	}
	
}
function nextpage(){
	var	len;
	len = objNodeList.length;
	var totalPages;
	if (len==0){
	    totalPages = 0;
	}
	else{
		if ((len/15).toFixed(0)==len/15){
			totalPages = (len/15).toFixed(0);
		}
		else{
		    totalPages = (len/15).toFixed(0)-(-1);
		}
	}	
	if (currentPage < totalPages){
	currentPage = currentPage + 1;
	SetFlashList();
	}
}
function showWaitPanel(){
     var form = document.getElementById("zoomForm");
	 var scWidth = form.pictureWidth.value;
	 var scHeight = form.pictureHeight.value;
     if(jgWait == null){
	    jgWait =new jsGraphics(map_layer.div);
	    jgWait.setStroke(1);
     	jgWait.setColor("#ffccff");
     }
     jgWait.fillRectWithStr((scWidth-250)/2,(scHeight-60)/2,250,60,'正在查询...');
     jgWait.paint();
     		
}
function FindCurrentFlash(currentindex){
	var i;
	i = (currentPage-1)*15 + currentindex;
 	if (objNodeList==null || objNodeList.length<1 || i>objNodeList.length-1) return;
	var len = objNodeList.length;

	if (len<1)
		return;
	var x,y;
	var form = document.getElementById("zoomForm");
	var scWidth = form.pictureWidth.value;
	var scHeight = form.pictureHeight.value;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;

	if(jgSelectedFlash == null){
	    jgSelectedFlash =new jsGraphics(map_layer.div);
	    jgSelectedFlash.setStroke(1);
	    
  	}
  	jgSelectedFlash.clear();
  	jgSelectedFlash.setColor("#cc66ff");

	x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
	y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);				
   

	if (x >0 && x< 0-(-scWidth) && y>0 && y< 0-(-scHeight)){
   		y=parseInt(y,10);
  		x=parseInt(x,10);
		jgSelectedFlash.fillOval(x-4,y-4,8,8);
		//jgSelectedFlash.fillPolygon(new Array(x-3,x+3,x),new Array(y+3,y+3,y-3));
   }
	
	jgSelectedFlash.paint();	
}

function SetFlashList(){
	var	len;
	var j;
	var iTextBox;
	var textBoxName;
	len = objNodeList.length;
	var totalPages;
	if (len==0){
	    totalPages = 0;
	}
	else{
		if ((len/15).toFixed(0)==len/15){
			totalPages = (len/15).toFixed(0);
		}
		else{
		    totalPages = (len/15).toFixed(0)-(-1);
		}
	}
	iTextBox = document.getElementById("totalpages");
    iTextBox.value = "共"+len+"条分"+totalPages+"页 ";
    iTextBox = document.getElementById("currentpage");
    iTextBox.value = currentPage;
	for (j=0;j<15; j++){
		if ((currentPage-1)*15 + j < len){ 
			indexstr    =(currentPage-1)*15 + j + 1;
        	flashtimestr=objNodeList[(currentPage-1)*15 + j].getAttribute("flashtime");
        	intensionstr=objNodeList[(currentPage-1)*15 + j].getAttribute("intension");
		}
		else{
			indexstr    ="";
        	flashtimestr="";
        	intensionstr="";
		}
		    textBoxName = "code"+(j-(-1));
        	iTextBox = document.getElementById("code"+(j-(-1)));
        	iTextBox.value = indexstr;
        	iTextBox = document.getElementById("flashtime"+(j-(-1)));
        	iTextBox.value = flashtimestr;
        	iTextBox = document.getElementById("intension"+(j-(-1)));
        	iTextBox.value = intensionstr;
	}
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
	xpoints="";
	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}
  	jg.setColor("#ff1000");
  	var bj=document.getElementById("zdycx").hcqbj.value;
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
function getXlImg(xlURI,xlmc){
    if (isLoadingMap)
           return;
    isLoadingMap = true;
	if (!xmlHttp)
		initializeXmlHttp();
	//set default xl buffer to 100m
	var src = "xlTree.do?method=getXlImg&xlURI=" + xlURI
			+ "&xlmc=" + xlmc + "&xlbuf=1000";
	document.getElementById("xlmc").value = xlmc;
	document.getElementById("xlmcURI").value =xlURI;
	//alert (src);
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateXlImg;
	xmlHttp.send();	
        
}

function getXzqImg(dwURI,xzq){
    if (isLoadingMap)
           return;
    isLoadingMap = true;	
	if (dwURI=="" || dwURI.length <3) return;
	if (!xmlHttp)
		initializeXmlHttp();
	//set default xl buffer to 100m
	
	var src = "xlTree.do?method=getXzqImg&dwURI=" + dwURI + "&xzq=" + xzq;
	//document.getElementById("xianmc").value = xzq;
	document.getElementById("xlmc").value ="";
	document.getElementById("xzqURI").value =dwURI;
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

			if (xmlDoc.getElementsByTagName("pictureWidth").length==0){
				isLoadingMap = false;
				return;
			}
			form.pictureWidth.value  = xmlDoc.getElementsByTagName("pictureWidth")[0].childNodes[0].nodeValue;
			form.pictureHeight.value = xmlDoc.getElementsByTagName("pictureHeight")[0].childNodes[0].nodeValue;
			form.pictureTopX.value  = xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].nodeValue;
			form.pictureTopY.value  = xmlDoc.getElementsByTagName("pictureTopY")[0].childNodes[0].nodeValue;
			form.pictureBottomX.value  = xmlDoc.getElementsByTagName("pictureBottomX")[0].childNodes[0].nodeValue;
			form.pictureBottomY.value  = xmlDoc.getElementsByTagName("pictureBottomY")[0].childNodes[0].nodeValue;
			form.pictureUrl.value = xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue;

			map_layer.swapImage(
				xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue);
            if (jg!=null)
              jg.clear();
    		    var src = "zoom.do?method=onImgMove&x=" + 1 + "&y=" + 1;
               var form = document.getElementById("zoomForm");
               parent.isLoadingMap = false;
               doImgMove(src,form);			

		}
    }
   }
}

//called by start.jsp op=0,1,2,3 : realcontrol, 
function getDataList(op){
	var src=""
	if (op==0)
		src = "realControl.do?method=getDataForm";
	window.open(src,"","height=600, width=800, top=0, left=20, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no")  ;
	
}
//getLdListBymutl query in start.jsp
function getLdDataList(target,formId,actionName,methodName){
	var form =document.getElementById(formId);
	if(target!='')
	form.target=target;
	var url = getMethod(actionName,methodName);
	//form.action=getMethod(actionName,methodName);
	if (formId==1) {	//线路雷击查询
		var xlmc = form.xlmc.value;
		if (xlmc!=null && xlmc!="")
			url += "&optype=1";
		var xlURI=document.getElementById("xlmcURI").value;
		url +="&xlURI=" + xlURI
	}
	if (formId==2) {	//自定义查询
		var formZ = document.getElementById("zoomForm");
		var hasZdy = form.chkzdy.checked;
		if (hasZdy){
			var x="";
			var y="";
			var scx = (formZ.pictureBottomX.value - formZ.pictureTopX.value)/formZ.pictureWidth.value;
			var scy = (formZ.pictureBottomY.value - formZ.pictureTopY.value)/formZ.pictureHeight.value;
			url += "&optype=2" + "&mapLeftX=" + formZ.pictureTopX.value 
					+ "&mapLeftY=" + formZ.pictureTopY.value + "&mapRightX=" 
					+ formZ.pictureBottomX.value + "&mapRightY=" + formZ.pictureBottomY.value
					+ "&xpoints=" + xpoints;
			
			url += "&scx=" + scx + "&scy=" + scy  + "&scrHeight=" + formZ.pictureHeight.value;
			
			var hasdot = document.getElementById("radio").checked;	
			if (hasdot){
				if (xpoints==""){
					if (origin_point[0]==null){
						alert("没有选择点，请重新操作！");
						return;
					}
				}
				x = origin_point[0]==null?"":origin_point[0];
				y = origin_point[1]==null?"":origin_point[1];
				url +="&hasdot=1" + "&x=" + x + "&y=" + y;
			}else{
				url +="&hasdot=0";
				if (xpoints==""){
					if (pointX.length<1){
						alert("没有选择线，请重新操作！");
						return ;
					}
				}
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
	}
//	alert(url);
	form.action=url;
	form.submit();
	
}
function getMethod(af, m){
	return af + "?method=" + m;

}
function showHistoryOnMainView(){
     if (isLoadingMap)
           return;
     showWaitPanel();
    
    isLoadingMap = true;
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
    if (isLoadingMap)
           return;
    showWaitPanel();
    isLoadingMap = true;	
	if (!xmlHttp)
		initializeXmlHttp();
/*	if (tree==null || tree.getSelected()==null || tree.getSelected().parentNode==null 
		|| tree.getSelected().parentNode.parentNode==null){
		alert("您必须选择线路");
		return;
	}
	var xlmc = tree.getSelected().text;
	var dydj = tree.getSelected().parentNode.text;
	var xianmc = tree.getSelected().parentNode.parentNode.text;
	 */
/*	if (dydj.lastIndexOf("k")<1){
		alert("您必须选择线路");
		return;
	} */
	var xlmc = form.xlmc.value;
	var xianmc = form.xianmc.value;
	var xlURI = form.xlmcURI.value; //获取线路URI
		
	var hcqbj = form.hcqbj.value==null?1000:form.hcqbj.value;
	var ljsjq = form.ljsjq.value==null?"":form.ljsjq.value;
	var ljsjz = form.ljsjz.value==null?"":form.ljsjz.value;
	var minldqd = form.minLjqd.value==null?"":form.minLjqd.value;
	var maxldqd = form.maxLjqd.value==null?"":form.maxLjqd.value;
	
	var src = "editThunder.do?method=getXlLdData&xianmc=" + xianmc + "&xlmc=" + xlmc + "&xlURI=" + xlURI
			+ "&hcqbj=" + hcqbj + "&ljsjq=" + ljsjq + "&ljsjz=" + ljsjz + "&minldqd=" + minldqd 
			+ "&maxldqd=" + maxldqd;
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
			if (xmlDoc.getElementsByTagName("xpoints")[0].childNodes.length>0)
				xpoints = xmlDoc.getElementsByTagName("xpoints")[0].childNodes[0].nodeValue;
	       	objNodeList = xmlDoc.selectNodes("//row");

	       	if (xmlDoc.getElementsByTagName("ploygnarea")[0].childNodes.length>0){
			//alert("aa");
	       		ploygnarea= xmlDoc.getElementsByTagName("ploygnarea")[0].childNodes[0].nodeValue;
	       		ploygncenterx= xmlDoc.getElementsByTagName("ploygncenterx")[0].childNodes[0].nodeValue;
	       		ploygncentery= xmlDoc.getElementsByTagName("ploygncentery")[0].childNodes[0].nodeValue;
				drawLdmd(ploygnarea,ploygncenterx,ploygncentery,objNodeList.length)
	       	}
			drawLdDots();
            isLoadingMap = false;
		currentPage=1;
		SetFlashList();
		jgWait.clear();			
		}
    }
   }
}

function drawLdmd(ploygnarea,ploygncenterx,ploygncentery,tot){
	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
  	}
  	sl = (tot / ploygnarea).toFixed(2);	
  	var str = sl  + " 个/平方公里";
  	jg.drawString("雷电密度：" + str,10,30); 
}

// called by start 组合查询
function playZdyLdDataList(formId){
    if (isLoadingMap)
           return;
    showWaitPanel();
    isLoadingMap = true;	
	var form =document.getElementById(formId);
	var hasZdy = document.getElementById("chkzdy").checked;
	
	var hcqbj = form.hcqbj.value==null?1000:form.hcqbj.value;
	
	var ljsjq = form.ljqssj.value==null?"":form.ljqssj.value;
	var ljsjz = form.ljzzsj.value==null?"":form.ljzzsj.value;
	
	var minldqd = form.minLdqd.value==null?"":form.minLdqd.value;
	var maxldqd = form.maxLdqd.value==null?"":form.maxLdqd.value;
	/*
	var minLatitude = form.minLatitude.value==null?"":form.minLatitude.value;
	var maxLatitude = form.maxLatitude.value==null?"":form.maxLatitude.value;
	
	var minLongitude = form.minLongitude.value==null?"":form.minLongitude.value;
	var maxLongitude = form.maxLongitude.value==null?"":form.maxLongitude.value;
	*/
	var xianmc = form.xianmc.value==null?"":form.xianmc.value;
	var hasdot = document.getElementById("radio").checked;		//true : draw dot; false: draw line
	var formZ = document.getElementById("zoomForm");
	var url = "editThunder.do?method=getZdyPlayLdData&xianmc=" + xianmc 
			+ "&ljsjq=" + ljsjq + "&ljsjz=" + ljsjz + "&minldqd=" + minldqd 
			+ "&maxldqd=" + maxldqd + "&mapLeftX=" + formZ.pictureTopX.value 
			+ "&mapLeftY=" + formZ.pictureTopY.value + "&mapRightX=" 
			+ formZ.pictureBottomX.value + "&mapRightY=" + formZ.pictureBottomY.value;
	
	if (hasZdy){
		var x="";
		var y="";
		var scx = (formZ.pictureBottomX.value - formZ.pictureTopX.value)/formZ.pictureWidth.value;
		var scy = (formZ.pictureBottomY.value - formZ.pictureTopY.value)/formZ.pictureHeight.value;
		
		url += "&scx=" + scx + "&scy=" + scy  + "&scrHeight=" + formZ.pictureHeight.value;
		
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
	//alert (url);
	
	if (!xmlHttp)
	initializeXmlHttp();
	xmlHttp.open("post",url, true);
	xmlHttp.onreadystatechange = updatePlayZdyLdData;
	xmlHttp.send();	
}
// called by start 密度查询
function playLdMdData(){

     if (isLoadingMap)
           return;
    showWaitPanel();
    isLoadingMap = true;
   	var form = document.getElementById("zoomForm");

        dateq = document.getElementById("mdqssj").value;
        datez = document.getElementById("mdzzsj").value;
	var mdminldqd = document.getElementById("mdminldqd").value;
	var mdmaxldqd = document.getElementById("mdmaxldqd").value;

	if (!xmlHttp)
		initializeXmlHttp();
	datestart = dateq;
	datestop = datez;
	
	var url = "";


	url = "editThunder.do?method=getLdMdData&mdqssj=" + dateq +"&mdzzsj="+datez+"&mdminldqd="+mdminldqd+"&mdmaxldqd="+mdmaxldqd;
	url = url + "&leftx=" + form.pictureTopX.value;
	url = url + "&lefty=" + form.pictureTopY.value;
	url = url + "&rightx=" + form.pictureBottomX.value;
	url = url + "&righty=" + form.pictureBottomY.value;
	xmlHttp.open("post",url, true);
	xmlHttp.onreadystatechange = updateStartPageLDMD;
	xmlHttp.send();
}
function updateStartPageLDMD(){
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
			
  	     }
	     colorindex = 0;
	     currenti = 20;
	     drawColorBlock();
	    jgWait.clear();
         isLoadingMap = false;      
	}
  }	
}
function drawColorBlock()
{
	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
	    
  	}
/*	var delayID;
	if (currenti > 140 )	{

	      if (delayID != null){
           clearTimeout(delayID);
          }
	      return;
    }*/
    var form = document.getElementById("zoomForm");
	var scWidth = form.pictureWidth.value;
	var scHeight = form.pictureHeight.value;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;    
    var wid = 2000/scx;	
    //alert(wid);
    var len = objNodeList.length;
	for (i=0;i<len; i++){
		//x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
		//y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);	
		currenti = objNodeList[i].getAttribute("i");
		j = objNodeList[i].getAttribute("y");
		ldcount = objNodeList[i].getAttribute("ldcount");
		if (ldcount > 0){
 
	   	    //jg.setColor(colors[colorindex]);
	   	    /*alert(currenti*wid+1);
	   	    alert((currenti+1)*wid);
	   	    alert(currenti*wid+1);
	   	    alert(j*wid+1);
	   	    alert(j*wid+1);
	   	    alert((j+1)*wid);*/
	   	    if ((ldcount > 0)&&( ldcount < 5)){
	   	    	jg.setColor("#66ffff");
	   	    }
	   	    if ((ldcount > 6)&&( ldcount < 10)){
	   	    	jg.setColor("#66ccff");
	   	    }
	   	    if ((ldcount > 11)&&( ldcount < 15)){
	   	    	jg.setColor("#6699ff");
	   	    }
	   	    if ((ldcount > 16)&&( ldcount < 20)){
	   	    	jg.setColor("#6666ff");
	   	    }
	   	    if ((ldcount > 21)&&( ldcount < 25)){
	   	    	jg.setColor("#6633ff");
	   	    }
	   	    if (ldcount > 26){
	   	    	jg.setColor("#6600ff");
	   	    }
	        jg.fillPolygon(new Array(currenti*wid-(-1),(currenti-(-1))*wid,(currenti-(-1))*wid,currenti*wid-(-1)),new Array(j*wid-(-0),j*wid-(-0),(j-(-1))*wid,(j-(-1))*wid));
	        colorindex =colorindex+1;
	        if (colorindex > 10 ){
		      colorindex = 0;
		      
	        }
	        jg.paint();  
        }
	  }
	
}
// called by start.jsp 
function updatePlayZdyLdData(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
    	if (xmlDoc.getElementsByTagName("pictureTopX").length<1)
    		return;
		var form = document.getElementById("zoomForm");
		if (xmlDoc.readyState == 4){
			if (xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].length>0){
				form.pictureTopX.value  = xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].nodeValue;
				form.pictureTopY.value  = xmlDoc.getElementsByTagName("pictureTopY")[0].childNodes[0].nodeValue;
				form.pictureBottomX.value  = xmlDoc.getElementsByTagName("pictureBottomX")[0].childNodes[0].nodeValue;
				form.pictureBottomY.value  = xmlDoc.getElementsByTagName("pictureBottomY")[0].childNodes[0].nodeValue;
			}
			if (xmlDoc.getElementsByTagName("xpoints")[0].childNodes.length>0)
				xpoints = xmlDoc.getElementsByTagName("xpoints")[0].childNodes[0].nodeValue;
			
			var url = 	xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue;

			if (url!='null'){
				map_layer.swapImage(url);
				form.pictureUrl.value=url;

			}
			if (jg!=null)
				jg.clear();
	       	objNodeList = xmlDoc.selectNodes("//row");
			drawLdDots();
		currentPage=1;
		SetFlashList();
		jgWait.clear();
            isLoadingMap = false;
		}
    }
   }
}


function drawLdDots(){
 	if (objNodeList==null || objNodeList.length<1) return;
	var len = objNodeList.length;

	if (len<1)
		return;
	var x,y;
	var form = document.getElementById("zoomForm");
	var scWidth = form.pictureWidth.value;
	var scHeight = form.pictureHeight.value;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;

	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
	    
  	}
  	
  	jg.setColor("#ff1000");
    currentDots=new Array();
    currentDotsColor=new Array();  
    initDotsCol();
	for (i=0;i<len; i++){
		x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
		y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);				
	   

		if (x >0 && x< 0-(-scWidth) && y>0 && y< 0-(-scHeight)){
	   		y=parseInt(y,10);
	  		x=parseInt(x,10);

			jg.fillPolygon(new Array(x-3,x+3,x),new Array(y+3,y+3,y-3));
			currentDots.push( i);			
	  }
	}
	jg.paint();
}

function reDrawLdDots(){
 	if (objNodeList==null || objNodeList.length<1) return;
	var len = objNodeList.length;

	if (len<1)
		return;
	var x,y;
	form = document.getElementById("zoomForm");
	var scWidth = form.pictureWidth.value;
	var scHeight = form.pictureHeight.value;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;
	var iCol=11;
	
	if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(1);
	    
  	}
  	currentDots=new Array();
  	
	for (i=0;i<len; i++){
		x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
		y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);				

		if (x >0 && x< 0-(-scWidth) && y>0 && y< 0-(-scHeight)){
	   		y=parseInt(y,10);
	  		x=parseInt(x,10);
		    iCol = currentDotsColor[i];
		    jg.setColor(colors[iCol]);
			jg.fillPolygon(new Array(x-3,x+3,x),new Array(y+3,y+3,y-3));
			currentDots.push( i);
	  	}
	}
	jg.paint();
}

function backToHome(){
    if (isLoadingMap)
           return;
    isLoadingMap = true;	
	if (!xmlHttp)
		initializeXmlHttp();
	var url="zoom.do?method=getBackToHomeImg";
	xmlHttp.open("post",url, true);
	xmlHttp.onreadystatechange = updateBackToHome;
	xmlHttp.send();	
}
function updateBackToHome(){	
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
		var form =hcf_content.document.getElementById("zoomForm");
		if (xmlDoc.readyState == 4){
			if (xmlDoc.getElementsByTagName("pictureWidth").length==0){
				isLoadingMap = false;
				return;
			}
			form.pictureWidth.value  = xmlDoc.getElementsByTagName("pictureWidth")[0].childNodes[0].nodeValue;
			form.pictureHeight.value = xmlDoc.getElementsByTagName("pictureHeight")[0].childNodes[0].nodeValue;
			form.pictureTopX.value  = xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].nodeValue;
			form.pictureTopY.value  = xmlDoc.getElementsByTagName("pictureTopY")[0].childNodes[0].nodeValue;
			form.pictureBottomX.value  = xmlDoc.getElementsByTagName("pictureBottomX")[0].childNodes[0].nodeValue;
			form.pictureBottomY.value  = xmlDoc.getElementsByTagName("pictureBottomY")[0].childNodes[0].nodeValue;
			form.pictureUrl.value = xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue;

			hcf_content.map_layer.swapImage(
				xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue);
			if (hcf_content.jg!=null)
				hcf_content.jg.clear();
			reDrawLdDots2(hcf_content.objNodeList);
            isLoadingMap = false;			
		}
    }
   }
}

function reDrawLdDots2(objNodeList){
 	if (objNodeList==null || objNodeList.length<1) return;
	var len = objNodeList.length;

	if (len<1)
		return;
	var x,y;
	form = hcf_content.document.getElementById("zoomForm");
	var scWidth = form.pictureWidth.value;
	var scHeight = form.pictureHeight.value;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;
	var iCol=11;
	
	if(hcf_content.jg == null){
	    hcf_content.jg =new jsGraphics(hcf_content.map_layer.div);
	    hcf_content.jg.setStroke(1);
	    
  	}
 	
	for (i=0;i<len; i++){
		x = ((objNodeList[i].getAttribute("x")-form.pictureTopX.value)/scx).toFixed(0);
		y = ((form.pictureBottomY.value-objNodeList[i].getAttribute("y"))/scy).toFixed(0);				

		if (x >0 && x< 0-(-scWidth) && y>0 && y< 0-(-scHeight)){
	   		y=parseInt(y,10);
	  		x=parseInt(x,10);
	  	//	iCol=currentDotsColor[i];
	  	//	iCol=iCol+'';
		    //jg.SetColor(colors[currentDotsColor[i]]);
		    iCol = hcf_content.currentDotsColor[i];
		    hcf_content.jg.setColor(hcf_content.colors[iCol]);
			hcf_content.jg.fillPolygon(new Array(x-3,x+3,x),new Array(y+3,y+3,y-3));
	  	}
	}
	hcf_content.jg.paint();
}
// clear the ld s called by index.jsp
function clearLd(){
	if (hcf_content.jg!=null)
		hcf_content.jg.clear();
	xpoints="";
}

// clear the buffers called by index.jsp
function clearBuffers(){
    if (isLoadingMap)
           return;
    isLoadingMap = true;	
    
	if (!xmlHttp)
		initializeXmlHttp();
	//clear buffers
	var src = "zoom.do?method=clearBuffers";
	xpoints="";
	
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = updateClearBuffers;
	xmlHttp.send();		
}

function updateClearBuffers(){
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200){
    	var xmlDoc=xmlHttp.responseXML;
		var form = hcf_content.document.getElementById("zoomForm");
		if (xmlDoc.readyState == 4){
			if (xmlDoc.getElementsByTagName("pictureWidth").length==0){
				isLoadingMap = false;
				return;
			}			
			form.pictureWidth.value  = xmlDoc.getElementsByTagName("pictureWidth")[0].childNodes[0].nodeValue;
			form.pictureHeight.value = xmlDoc.getElementsByTagName("pictureHeight")[0].childNodes[0].nodeValue;
			form.pictureTopX.value  = xmlDoc.getElementsByTagName("pictureTopX")[0].childNodes[0].nodeValue;
			form.pictureTopY.value  = xmlDoc.getElementsByTagName("pictureTopY")[0].childNodes[0].nodeValue;
			form.pictureBottomX.value  = xmlDoc.getElementsByTagName("pictureBottomX")[0].childNodes[0].nodeValue;
			form.pictureBottomY.value  = xmlDoc.getElementsByTagName("pictureBottomY")[0].childNodes[0].nodeValue;
			form.pictureUrl.value = xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue;

			hcf_content.map_layer.swapImage(
				xmlDoc.getElementsByTagName("pictureUrl")[0].childNodes[0].nodeValue);

			if (hcf_content.jg!=null)
				hcf_content.jg.clear();
            isLoadingMap = false;			
		}
    }
   }
}

//set map layer display called by start.jsp
function setXlDisp(form){
    if (isLoadingMap)
           return;
    isLoadingMap = true;	
	if (!xmlHttp)
		initializeXmlHttp();
	var xlURI="11,12,13,14,";
	if (form.xl500.checked)	
		xlURI +="4,";
	if (form.xl220.checked)	
		xlURI +="3,";
	if (form.xl110.checked)	
		xlURI +="2,";
	if (form.xl35.checked)	
		xlURI +="1,";
	if (form.xl10.checked)	
		xlURI +="5,";
	if (form.yxt.checked)	
		xlURI +="-2,";


	var src = "zoom.do?method=setLayer&xlURI=" + xlURI;
	
	xmlHttp.open("post",src, true);
	xmlHttp.onreadystatechange = getMessReturn;
	xmlHttp.send();	
}

function getMessReturn(){
	if (xmlHttp.readyState == 4) {
    	if (xmlHttp.status == 200){
    		    var src = "zoom.do?method=onImgMove&x=" + 1 + "&y=" + 1;
               var form = document.getElementById("zoomForm");
               isLoadingMap = false;
               doImgMove(src,form);
    	}
    }
}

function drawFlashExplor(){
	 if(jgExplore == null){
	    jgExplore =new jsGraphics(map_layer.div);
	    jgExplore.setStroke(1);
  	}	
  	jgExplore.clear();
	jgExplore.setColor("red");
    jgExplore.setFont("arial","14px",Font.ITALIC_BOLD);   	
	var x,y;
	form = document.getElementById("zoomForm");
	var scWidth = form.pictureWidth.value;
	var scHeight = form.pictureHeight.value;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/scWidth;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/scHeight;  	

	
	for (i=0;i<8; i++){
		x = ((exploreCrdX[i]-form.pictureTopX.value)/scx).toFixed(0);
		y = ((form.pictureBottomY.value-exploreCrdY[i])/scy).toFixed(0);

			y=parseInt(y,10);
	  		x=parseInt(x,10);
	    jgExplore.drawImage("images/explorer.gif", x, y, 20, 20); 
       jgExplore.drawString(exploreName[i],x-29,y+19);	    
	    		jgExplore.paint();
	}	

}