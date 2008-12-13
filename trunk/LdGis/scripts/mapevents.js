// szy add 2008-2-10


var pointX = new Array();
var pointY = new Array();

var origin_point=new Array(2);	//鼠标起始点坐标；
var drawflag=true;					//画图开始标志;
var zoomScale=1;				//设置图片放大缩小的比例；
var mx0;
var my0;
var drawRect=false;

function document.oncontextmenu(){
//	drawflag = false;
	origin_point[0]=null;		//停止画折线、测距图
	event.returnValue=false;	//屏蔽鼠标右键
}

//此函数为框架start.hmtl页面调用,用于该表图片上的鼠标形状；
function setMapStyle_inner(oper){
	map_layer.setDraggable(false); 
	switch (oper){
		case 0:
			map_layer.div.style.cursor="default";
			break;
		case 1:
			map_layer.div.style.cursor="images/ZOOMIN.CUR";
			break;
		case 2:
			map_layer.div.style.cursor="images/ZOOMOUT.CUR";
			break;
		case 3:
			map_layer.setDraggable(true); 
			map_layer.div.style.cursor="move";
			break;
		case 4:
			map_layer.div.style.cursor="crosshair";
			break;
		case 5:
			map_layer.div.style.cursor="images/measure.cur";
			break;
		case 6:
			map_layer.div.style.cursor="images/maperr.cur";
			drawflag=true;			//菜单操作后重置画图标志；
			break;
		default:
			map_layer.div.style.cursor="default";
	}
}
	
function getCoords(evt) {
	var coords = new Array(6);
   	coords[0]=window.event.offsetX;
	coords[1]=window.event.offsetY;

	//get coordinates in relation to parent object
	coords[2]=window.event.x;
	coords[3]=window.event.y;

	// get coordinates in relation to page - note that
	// we respect scrolled pages.
	coords[4]=window.event.clientX + document.body.scrollLeft;
	coords[5]=window.event.clientY + document.body.scrollTop;
	setMapStyle_inner(window.parent.map_tool_op);
	//alert(coords);
	return coords;
}

//画多折线
function drawPolygon(start_point,end_point){
	 if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(2);
  	}
	jg.setColor("red");
  	jg.drawLine(start_point[0], start_point[1], end_point[0], end_point[1]);
 	jg.paint();
}

//测距   called by start.jsp
function measure(start_point,end_point){
	 if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(2);
  	}
  	var form = document.getElementById("zoomForm");
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;
  	
	jg.setColor("red");
  	jg.drawLine(start_point[0], start_point[1], end_point[0], end_point[1]);
  	var dx=Math.abs((end_point[0] - start_point[0])*scx).toFixed(0);
  	var dy=Math.abs((end_point[1] - start_point[1])*scy).toFixed(0);
  	var distanceTo = Math.sqrt( dx * dx + dy * dy).toFixed(0);
  	jg.drawString(distanceTo + " m",end_point[0], end_point[1]);
 	jg.paint();
}


function ClearArray(){
	for(var i=pointX.length-1;i>=0;i--){
		pointX.pop();
		pointY.pop();
	}
//	alert(pointX.length);
}
        
// window.parent.map_tool_op  0: select ; 1: 放大； 2：缩小； 3:移动； 4:画多折线；5:测距；6:画点
// called by start.jsp
function onClick(evt){
	var coords = getCoords(evt);
	/*if(jg == null){
	    jg =new jsGraphics(map_layer.div);
	    jg.setStroke(2);
  	}
  	jg.clear();
  	jg.drawString(isLoadingMap,100, 100);
 	jg.paint();*/
 	
	var x,y;
	var form = document.getElementById("zoomForm");
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;

    if (window.parent.map_tool_op==9){
	  FindCurrentDotByXY(coords[2],coords[3]);
	}
    x=coords[2]*scx -(-form.pictureTopX.value );
    y=form.pictureBottomY.value - coords[3]*scy  ;
    x=parseInt(coords[2],10);
	y=parseInt(coords[3],10);
	mx0 = coords[2];
	my0 = coords[3];
	
    /*parent.window.status = "x: " + x + " y: " + y+"  ( " + coords[2] + " , " + coords[3]+")";*/
	switch (window.parent.map_tool_op){
	case 0:
		break;
	case 1:
		zoomScale =  2;
		//drawRect=true;
		//doZoom("zoomForm",coords);
		break;
	case 2:
		zoomScale =  0.5;
	//	drawRect=true;
		//doZoom("zoomForm",coords);
		break;
	case 3:
		break;
	case 4:
		if (drawflag==true&&origin_point[0]==null){
			xpoints="";
			origin_point[0]=coords[0];
			origin_point[1]=coords[1];
			ClearArray();
			
		//	pointX.push(origin_point[0]);
		//	pointY.push(origin_point[1]);
		}
		if (origin_point[0]!=null){
			var endpoint=new Array(2);
			endpoint[0]=coords[0];
			endpoint[1]=coords[1];
			drawPolygon(origin_point,endpoint);
			pointX.push(endpoint[0]);
			pointY.push(endpoint[1]);
			//alert(pointX.length);
			origin_point=endpoint;
		}

		break;
	case 5:
		if (drawflag==true&&origin_point[0]==null){
			origin_point[0]=coords[2];
			origin_point[1]=coords[3];
		} 
		if (origin_point[0]!=null){
			var endpoint=new Array(2);
			endpoint[0]=coords[2];
			endpoint[1]=coords[3];
			measure(origin_point,endpoint);
			origin_point=endpoint;
		}
		break;
	case 6:
		origin_point[0]=coords[0];
		origin_point[1]=coords[1];
		cxDrawDot(coords[0],coords[1]);
		break;
	default:
		break;	
	}
    setMapStyle_inner(window.parent.map_tool_op);

}
// 注册鼠标事件

function map_hookUpEvents(){
	//map_layer.div.onclick=onClick;
	map_layer.div.onmousedown = onMouseDown;	
	map_layer.div.onmouseup = onMouseUp;			
	map_layer.div.onmousemove = onMouseMove;

}

function onMouseUp(evt){
	var coords = getCoords(evt);
	var form = document.getElementById("zoomForm");	
	if (drawRect){ 
		 drawRect=false;
		zoomScale =  0.5;
		
		var scl1 = form.pictureWidth.value/Math.abs(coords[2]-origin_point[0]);
		var scl2 = form.pictureHeight.value/Math.abs(coords[3]-origin_point[1]);
        zoomScale = Math.min(scl1,scl2);	

        if (Math.abs(coords[2]-origin_point[0])<2||Math.abs(coords[3]-origin_point[1])<2){
        	zoomScale = 2;
        }

        coords[0]=origin_point[0]+parseInt(Math.abs(coords[2]-origin_point[0])/2,10);
        coords[1]=origin_point[1]+parseInt(Math.abs(coords[3]-origin_point[1])/2,10);
        if ((coords[2] < origin_point[0])||(coords[3] < origin_point[1])){
            coords[0]=origin_point[0];
            coords[1]=origin_point[1];
        	zoomScale = 2;
        } 
		doZoom("zoomForm",coords);
		if (jgDrawRect!=null)
		 	jgDrawRect.clear();
	  return ;
	}
 	
	var x,y;
	var scx = (form.pictureBottomX.value - form.pictureTopX.value)/form.pictureWidth.value;
	var scy = (form.pictureBottomY.value - form.pictureTopY.value)/form.pictureHeight.value;

    if (window.parent.map_tool_op==9){
	  FindCurrentDotByXY(coords[2],coords[3]);
	}
    x=coords[2]*scx -(-form.pictureTopX.value );
    y=form.pictureBottomY.value - coords[3]*scy  ;
    //x=parseInt(coords[2],10);
//	y=parseInt(coords[3],10);
	mx0 = coords[2];
	my0 = coords[3];
	
    parent.window.status = "x: " + x + " y: " + y+"  ( " + coords[2] + " , " + coords[3]+")";
	switch (window.parent.map_tool_op){
	case 0:
		break;
	case 1:
		zoomScale =  2;
		break;
	case 2:
		zoomScale =  0.5;
	    doZoom("zoomForm",coords);
		break;
	case 3:
		break;
	case 4:
		if (drawflag==true&&origin_point[0]==null){
			xpoints="";
			origin_point[0]=coords[0];
			origin_point[1]=coords[1];
			ClearArray();
			
		}
		if (origin_point[0]!=null){
			var endpoint=new Array(2);
			endpoint[0]=coords[0];
			endpoint[1]=coords[1];
			drawPolygon(origin_point,endpoint);
			pointX.push(endpoint[0]);
			pointY.push(endpoint[1]);
			origin_point=endpoint;
		}

		break;
	case 5:
		if (drawflag==true&&origin_point[0]==null){
			origin_point[0]=coords[2];
			origin_point[1]=coords[3];
		} 
		if (origin_point[0]!=null){
			var endpoint=new Array(2);
			endpoint[0]=coords[2];
			endpoint[1]=coords[3];
			measure(origin_point,endpoint);
			origin_point=endpoint;
		}
		break;
	case 6:
		origin_point[0]=coords[0];
		origin_point[1]=coords[1];
		cxDrawDot(coords[0],coords[1]);
		break;
	default:
		break;	
	}
    setMapStyle_inner(window.parent.map_tool_op);	
}

function onMouseDown(evt){
	var coords = getCoords(evt);
	mx0 = coords[2];
	my0 = coords[3];
	switch (window.parent.map_tool_op){
	case 1:
		drawRect=true;
		origin_point[0]=coords[2];
		origin_point[1]=coords[3];
		break;
	case 2:
		//drawRect=true;
		origin_point[0]=coords[2];
		origin_point[1]=coords[3];
		break;
	}
}

var jgDrawRect;
function onMouseMove(evt){
	/*if(jgShow == null){
	    jgShow =new jsGraphics(map_layer.div);
	    jgShow.setStroke(1);
  	}	
	jgShow.setColor("red");
    jgShow.setFont("arial","15px",Font.ITALIC_BOLD); 
    jgShow.drawString(drawRect,100,60); 
    jgShow.paint();*/
    
	 
	var coords = getCoords(evt);
  	var dx=Math.abs(coords[2] - mx0);
  	var dy=Math.abs(coords[3] - my0);	
  	window.status ="  ( " + dx+ " , " + dy+")";
    if(jgShow == null){
	    jgShow =new jsGraphics(map_layer.div);
	    jgShow.setStroke(1);
  	}
  	if (dx > 5 || dy >5){
  		jgShow.clear();
  	}
  	

    if (!drawRect) return;
 	switch (window.parent.map_tool_op){
	case 1:
		  	if (dx > 2 || dy >2){

  	
	    if(jgDrawRect == null){
		    jgDrawRect =new jsGraphics(map_layer.div);
		    jgDrawRect.setStroke(1);
	  	}
        /*
		  	jgDrawRect.clear();
		  	jgDrawRect.drawRect(origin_point[0],origin_point[1],Math.abs(coords[2]-origin_point[0]),Math.abs(coords[3]-origin_point[1]));
		  	jgDrawRect.paint();
        */
		jgDrawRect.clear();
		if ((coords[2] > origin_point[0])&&(coords[3] > origin_point[1]))
		  	jgDrawRect.drawRect(origin_point[0],origin_point[1],Math.abs(coords[2]-origin_point[0]),Math.abs(coords[3]-origin_point[1]));
		/*
		if ((coords[2] > origin_point[0])&&(coords[3] < origin_point[1]))
		  	jgDrawRect.drawRect(origin_point[0],coords[3],Math.abs(coords[2]-origin_point[0]),Math.abs(coords[3]-origin_point[1]));
		if ((coords[2] < origin_point[0])&&(coords[3] < origin_point[1]))
		  	jgDrawRect.drawRect(coords[2],coords[3],Math.abs(coords[2]-origin_point[0]),Math.abs(coords[3]-origin_point[1]));
		if ((coords[2] < origin_point[0])&&(coords[3] > origin_point[1]))
		  	jgDrawRect.drawRect(coords[2],origin_point[1],Math.abs(coords[2]-origin_point[0]),Math.abs(coords[3]-origin_point[1]));
        */
		jgDrawRect.paint();        
	}
		break;
	case 2:
		//drawRect=true;
	
		break;
	}		
 	
}
	