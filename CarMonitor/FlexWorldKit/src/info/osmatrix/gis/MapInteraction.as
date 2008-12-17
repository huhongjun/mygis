/*
   MapInteraction
   运行时动态添加界面元件，时间控制，等等；
  
 */
 
package info.osmatrix.gis
{

	import flash.display.MovieClip;
	import flash.events.*;
	import flash.external.*;
	import flash.net.*;
	import flash.system.*;
	import flash.text.TextField;
	import flash.ui.*;
	
	class MapInteraction {
	    private var main:MapMain;
 	    private var conf:MapConfig;
/*	    private var img:worldkitImages;
	    private var rss:worldkitRSS; 
*/
		/* 动态管理的MovieClip */
		private var mcRoot:MovieClip;		// 顶层的mc,代表加载的fla文件生成的swf 
	    private var mcComponents:MovieClip;	//	FLA库中导出类
	    private var mcCrossHair:MovieClip;	// 十字光标
	    private var mcZoombox:MovieClip;	// 放大操作选中的矩形
	    private var mcGrabber:MovieClip;	// ？
	    public var  mcControlBar:MovieClip;	//	FLA库中导出类
	
	    private var zoompan:String; 		// 中间状态：漫游方向 "Up","In","Out","Down","Left","Right"
	    private var acceptInput:Boolean;	// 中间状态：
	    private var keylistener:Object;		//
	    private var timenavplay:Boolean;	// 中间状态：时间导航
	
	    private var centery:Number;		
	    private var centerx:Number;		
	    private var initeastx:Number;	//
	    private var initwestx:Number;
	    private var initnorthy:Number;
	    private var initsouthy:Number;
	    private var ratio:Number;
	    private var scale:Number;
	    private var cnorth:Number;
	    private var cwest:Number;
	    private var csouth:Number;
	    private var ceast:Number;
	    private var ctop:Number;
	    private var cbottom:Number;
	    private var cleft:Number;
	    private var cright:Number;
	    private var maxtime:Date;
	
	
	    static private var grabberdepth:Number = 20;
	    static private var zoomboxdepth:Number = 19;
	    static private var mouselayerdepth = 18;
	    static private var toolbardepth = 10000;
	    static private var timenavdepth = 10001;
	    static private var dialogdepth = 10003;
	    static private var crosshairdepth = 10004;
	
	    function MapInteraction(main:MapMain) {
	        this.main = main;
	
			mcRoot = this.main.parent;
	        mcComponents = MovieClip(mcRoot.getChildByName("components"));
	
	        zoompan = "";			//
	        acceptInput = false;	//huhj,原来是false
	    }

	    /*
	       MapConfig 调用，设置应用范围的参数, 在配置文件加载后执行
		*/
	    public function afterConf():void {
 	        //rss = main.getRSS(); 
	        conf = main.getConfig();
	        //img = main.getImages();
	
	        scale = conf.initialzoom;	// 显示放大比率
	
	        /* 获得初始经纬度中心点的xy坐标值，[x,y]数组格式 
	        	用来获得中心点的xy坐标
	        */
	        var xy:Array;
	        xy = geo2xy(conf.initiallat,conf.initiallong,true,true);
	
	        if (isNaN(conf.initiallat)) 
	        	{ centery = conf.h / 2; }
	        else 
	        	{ centery = xy[1]; }
	
	        if (isNaN(conf.initiallong)) 
	        	{ centerx = conf.w / 2; }
	        else 
	        	{ centerx = xy[0]; }
			
	        setCurrentBbox();//？
	
	        if (conf.maxzoom) {
	            xy = geo2xy(conf.north,conf.west+0.000001,true,true); //REVIST why add this small offset
	            initeastx = xy[0]; initsouthy = xy[1];
	
	            xy = geo2xy(conf.south,conf.east,true,true);
	            initwestx = xy[0]; initnorthy = xy[1];   
	        }
	
	        ratio = conf.w / conf.h;
	
	        if (conf.inputonly) {
	            acceptInput = true;
	        }
			
			//调用Flash API
			mcCrossHair = mcRoot.apiSetupCrossHair();
	        mcCrossHair.scaleX =  100 * 100 * 2/conf.w;
	        mcCrossHair.scaleY = 100 * 100 * 2/conf.w;
	        if (! conf.inputonly) {
	            mcCrossHair.alpha = 0;
	        } 
	
	    }
	
	    /**
	     *	添加交互元件与控制事件 
	     * 
	     */
	    public function SetupInput():void {
	
	        SetupToolbar(); 
	
	        if (conf.timenav != false) {
	            SetupTimenav();
	        }
			
			mcRoot.addEventListener(KeyboardEvent.KEY_DOWN, this.onKeyDown);
 			
			mcComponents.addEventListener(KeyboardEvent.KEY_DOWN, this.onKeyDown);
			mcComponents.addEventListener(KeyboardEvent.KEY_UP, this.onKeyUp);
			
			mcComponents.addEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown);
			mcComponents.addEventListener(MouseEvent.MOUSE_MOVE, this.onMouseMove);
			mcComponents.addEventListener(MouseEvent.MOUSE_UP, this.onMouseUp);
			mcComponents.addEventListener(MouseEvent.MOUSE_WHEEL, this.onMouseWheel);
			
	        //SetupJavascript();
	
	        Zoom();
	
			mcComponents.addEventListener(Event.ENTER_FRAME , this.onEnterFrame);
	    }

	    public function SetupToolbar():void {
	    	
			// 调用 Flas fla文档类的公共方法，动态添加地图控制面板到mcComponents
	        mcControlBar = mcRoot.apiSetupControlBar(); 
	        	    	
 	        //mcComponents.attachMovie("worldkitControlBar","toolbar", toolbardepth);
	        //mcComponents.toolbar.parent = this;
	
			// 点击了四个漫游图标之一
			// 鼠标按下：设定zoompan类型("Up","In","Out","Down","Left","Right")，如有zoombox，删之
			// 鼠标释放：zoompan="over"
			// 鼠标拽出：zoompan=""
			// 鼠标RollOver：zoompan="over"，alpha = 100
			// 鼠标RollOut：zoompan = "", alpha = conf.controlalpha
			// ReleaseOutside: zoompan = "", alpha = conf.controlalpha

 	        if (conf.toolbar == true) {
	            var b = new Array("Up","In","Out","Down","Left","Right");
	            for (var i=0; i<b.length; i++) {
	                mcControlBar[ b[i] ].addEventListener(MouseEvent.MOUSE_DOWN , 	this.handlePanMouseEvent);
	                mcControlBar[ b[i] ].addEventListener(MouseEvent.MOUSE_UP , 	this.handlePanMouseEvent);
	                mcControlBar[ b[i] ].addEventListener(MouseEvent.MOUSE_OUT , 	this.handlePanMouseEvent);
	                mcControlBar[ b[i] ].addEventListener(MouseEvent.ROLL_OVER , 	this.handlePanMouseEvent);
	                mcControlBar[ b[i] ].addEventListener(MouseEvent.ROLL_OUT , 	this.handlePanMouseEvent);
	                mcControlBar[ b[i] ].addEventListener(MouseEvent.MOUSE_DOWN , 	this.handlePanMouseEvent);
	                
	                mcControlBar[ b[i] ].alpha = conf.controlalpha;
	            }

	            mcControlBar["DragOff"].addEventListener(MouseEvent.MOUSE_DOWN , 	this.handlePanDragOn);
	            mcControlBar["PanOff"].addEventListener(MouseEvent.MOUSE_DOWN , 	this.handlePanDragOff);
	            if (conf.zoomselect) {
	                mcControlBar["PanOn"].visible = 0;
	            } else {
	                mcControlBar["DragOn"].visible = 0;
	                conf.grabber = true;
	            }
	        } else {
	            mcControlBar.visible = false;
	        } 
	    }
	    public function handlePanDragOn(event:MouseEvent):void{
            conf.zoomselect = true;
            conf.grabber = false;
            mcControlBar["PanOn"].visible = 0;
            mcControlBar["DragOn"].visible = 1;	    	
	    }
	    public function handlePanDragOff(event:MouseEvent):void{
            conf.zoomselect = false;
            conf.grabber = true;
            mcControlBar["PanOn"].visible = 1;
            mcControlBar["DragOn"].visible = 0;
	    }		
	    public function handlePanMouseEvent(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					zoompan = MovieClip(event.target).name; 
					if ( mcZoombox != null) {
						mcComponents.removeChild(mcZoombox);
						mcZoombox = null;
					}
					break;
				case MouseEvent.MOUSE_UP:
					zoompan = "Over";
					break;
				case MouseEvent.MOUSE_OUT:
					zoompan = ""; 
					MovieClip(event.target).alpha = conf.controlalpha;
					break;					
				case MouseEvent.ROLL_OVER:
					zoompan = "Over";
					MovieClip(event.target).alpha = 100;
					break;								
				case MouseEvent.ROLL_OUT:
					zoompan = ""; 
					MovieClip(event.target).alpha = conf.controlalpha;
					break;
				default:
					break;
			}
		}	
	    public function onKeyDown(event:KeyboardEvent):void {
			trace(event.type);
	        if (event.keyCode ==  Keyboard.UP) {
	            zoompan = "Up";
	        } else if (event.keyCode == Keyboard.DOWN) {
	            zoompan = "Down";
	        } else if (event.keyCode == Keyboard.LEFT) {
	            zoompan = "Left";
	        } else if (event.keyCode == Keyboard.RIGHT) {
	            zoompan = "Right";
	        } else if (String.fromCharCode(event.charCode) == "z") {
	            zoompan = "In";
	        } else if (String.fromCharCode(event.charCode) == "a") {
	            zoompan = "Out";
	        } else if (String.fromCharCode(event.charCode) == "v") {
	            LoadingDialog("MapKit ver. " + MapMain.version, true);
	        } else if (String.fromCharCode(event.charCode) == "p") {
	            timenavplay = true;
	        } else if (String.fromCharCode(event.charCode) == "s") {
	            timenavplay = false;
	        } else if (String.fromCharCode(event.charCode) == "r") {
	            timenavplay = false;
	            mcComponents.timenav.scrollbar.setScrollPosition(0);
	        }
	    }
	
	    public function onKeyUp(event:KeyboardEvent):void {
	        if (String.fromCharCode(event.charCode) == "i") {
	            if (conf.inputonly != true) { 
	                if (acceptInput == true) {
	                    acceptInput = false;
	                    //rss.inputToggle(acceptInput);
	                    Mouse.show();
	                    mcCrossHair.alpha = 0;
	                } else {
	                    acceptInput = true;
	                    //rss.inputToggle(acceptInput); 
	                    Mouse.hide();
	                    mcCrossHair.alpha = 100;
	                }
	            }
	        } else if (String.fromCharCode(event.charCode) == "v") {
	            LoadingDialog(null, true);
	            /*    } else if (String.fromCharCode(Key.getAscii()) == "p") {
	                  print();*/
		    }
		    if (zoompan != "" && conf.onzoompan) {
		        var args = "extent=" + cwest + "," + csouth + "," + ceast + "," + cnorth;
		        //getURL( conf.onzoompan + "(\"" + args + "\");" );
		        ExternalInterface.call( conf.onzoompan.substr(11), args);
		    }
		    zoompan = "";
	    }
	
	    public function onMouseDown(event:MouseEvent):void {
	        if (zoompan != "") { return; }
	
	        if (acceptInput == true) {
	
	            if (conf.inputonly != true) { 
	                acceptInput = false;
	                mcCrossHair.alpha = 0;
	                Mouse.show();
	            }
	            //rss.inputToggle(false);
	            annotate(event.stageX,event.stageY);
	
	        } else if (conf.zoomselect == true) {
				var mc1:MovieClip = new MovieClip();
				mc1.name = "zoombox";
		        mcZoombox = MovieClip(mcComponents.addChild(mc1));
	        	
	            //mcComponents.createEmptyMovieClip("zoombox",zoomboxdepth);
	            mcZoombox.origx = mcZoombox.mouseX;
	            mcZoombox.origy = mcZoombox.mouseY;
	
	        } else if (conf.grabber == true) {
				var mc2:MovieClip = new MovieClip();
				mc2.name = "grabber";
		        mcGrabber = MovieClip(mcComponents.addChild(mc2));
		        	
	            //mcComponents.createEmptyMovieClip("grabber",grabberdepth);
	            mcGrabber.origx = mcGrabber.mouseX;
	            mcGrabber.origy = mcGrabber.mouseY;
	            if (conf.w > conf.h) {
	                mcGrabber.origwidth = (conf.w/conf.h) * 100;
	                mcGrabber.origheight = 100;
	            } else {
	                mcGrabber.origwidth = 100;
	                mcGrabber.origheight = (conf.h/conf.w) * 100;
	            }
	
	        }
	    }
	
	    public function onMouseMove(event:MouseEvent):void {
	    	
	        mcCrossHair.x = event.localX;
	        mcCrossHair.y = event.localY;
	
			if (mcZoombox != null) {
	            mcZoombox.graphics.clear();
	            mcZoombox.graphics.lineStyle(0,0xff0000);
	            mcZoombox.graphics.moveTo( mcZoombox.origx, mcZoombox.origy);
	            mcZoombox.graphics.lineTo( mcZoombox.origx, mcZoombox.mouseY);
	            mcZoombox.graphics.lineTo( mcZoombox.mouseX, mcZoombox.mouseY);
	            mcZoombox.graphics.lineTo( mcZoombox.mouseX, mcZoombox.origy);
	            mcZoombox.graphics.lineTo( mcZoombox.origx, mcZoombox.origy);
	        } else if (mcGrabber != null) {
	            centerx -= (conf.w / scale ) *((mcGrabber.mouseX - mcGrabber.origx) / mcGrabber.origwidth);
	            centery -= (conf.h / scale ) *((mcGrabber.mouseY - mcGrabber.origy) / mcGrabber.origheight);
	            mcGrabber.origx = mcGrabber.mouseX;
	            mcGrabber.origy = mcGrabber.mouseY;
	            Pan();
	        }
	    }
	
	    public function onMouseUp(event:MouseEvent):void {
	        if (mcZoombox != null) {
	
	            var zoomboxw = conf.w;
	            var zoomboxh = conf.h;
	            var offsetx = 0;
	            var offsety = 0;
	            if (ratio > 1) {
	                zoomboxw = 100 * ratio; zoomboxh = 100;
	            } else {
	                zoomboxw = 100; zoomboxh = 100 / ratio;
	            }
	            offsetx = (zoomboxw - 100);
	            offsety = (zoomboxh - 100);
	
	            var zoomxscale = scale * ( zoomboxw / Math.abs(mcZoombox.origx - mcZoombox.mouseX));
	            var zoomyscale = scale * ( zoomboxh / Math.abs(mcZoombox.origy - mcZoombox.mouseY));
	
	            if (zoomxscale < scale * 10 || zoomyscale < scale * 10) {
	                var newscale = (zoomxscale < zoomyscale ? zoomxscale : zoomyscale);
	                if (newscale > conf.maxscale) { newscale = conf.maxscale; }
	
	                var zoomw = conf.w / scale;
	                var zoomh = conf.h / scale;
	                var newx = centerx - zoomw/2 + (mcZoombox.origx + mcZoombox.mouseX + offsetx) * zoomw / (2*zoomboxw);
	                var newy = centery - zoomh/2 + (mcZoombox.origy + mcZoombox.mouseY + offsety) * zoomh / (2*zoomboxh);
	
	                scale = newscale;
	                centerx = newx;
	                centery = newy;
	
	                zoompan = "Changed";
	            }
	            //var i = mcComponents.numChildren;
	            //var j = mcComponents.contains(mcZoombox);
	            mcComponents.removeChild(mcZoombox);
	            mcZoombox = null;
	
	        } else if (mcGrabber != null) {
	            mcComponents.removeChild(mcGrabber);
	            mcGrabber = null;
	            //mcGrabber.removeMovieClip();
	        }
	
	        if (conf.onzoompan) {
	            var args = "extent=" + cwest + "," + csouth + "," + ceast + "," + cnorth;
	            //getURL( conf.onzoompan + "(\"" + args + "\");" );
	            ExternalInterface.call( conf.onzoompan.substr(11), args);
	
	        }
	    }
	
	    public function onMouseWheel(delta:Number):void {
	        //  centery -= delta/(scale);
	        //  Pan();
	        if (delta > 0) { delta = 1; } else { delta = -1; }
	        scale = scale * (Math.pow(conf.zoomc, delta));
	        if (scale > conf.maxscale) {
	            scale = conf.maxscale;
	        } else if (scale < 1) {
	            scale = 1;
	        }
	        Zoom();
	    }
	
	    public function onEnterFrame(event:Event):void {
	        //if (zoompan != ""  && ! img.highLoad()) {
	        if (zoompan != "") {
	            switch(zoompan) {
	                case("Up"):     
	                    centery -= conf.h/(scale * conf.panc);
	                Pan();
	                break;
	
	                case("In"):
	                    if (scale < conf.maxscale) {
	                        scale = scale * conf.zoomc;
	                        if (scale > conf.maxscale) {
	                            scale = conf.maxscale;
	                        }
	                        Zoom();
	                    }
	                    break;
	
	                case("Out"):
	                    if (scale > 1) {
	                        scale = scale / conf.zoomc;
	                        if (scale < 1) { scale = 1; }
	                        Zoom();
	                    }
	                    break;
	
	                case("Left"):
	                    centerx -= conf.w/(scale * conf.panc);
	                    Pan();
	                    break;
	
	                case("Right"):
	                    centerx += conf.w/(scale * conf.panc);
	                    Pan();
	                    break;
	
	                case("Down"):
	                    centery += conf.h/(scale * conf.panc);
	                    Pan();
	                    break;
	
	                case("Changed"):
	                    Zoom();
	                    zoompan = "";
	                    if (conf.onzoompan) {
	                        var args = "extent=" + cwest + "," + csouth + "," + ceast + "," + cnorth;
	                        ExternalInterface.call( conf.onzoompan.substr(11), args);
	                        //getURL(conf.onzoompan + "(\"" + args + "\");" );
	                    }   
	                    break;
	
	                    default:    
	                }
	            }
	
	        if (timenavplay) {
	            var p = mcComponents.timenav.scrollbar.getScrollPosition() + 1;
	            if (p <= conf.timenavunit) {
	                mcComponents.timenav.scrollbar.setScrollPosition(p);
	            } else {
	                timenavplay = false;
	            }
	        }
	    }
	
	    /**
	     *	地图对中 
	     * 
	     */
	    public function Pan():void {
	
	        correctCenter();
	        setCurrentBbox();
	
	        //img.Pan();
	        //rss.Pan();
	        //worldkitGPX.Pan();
	
	        if (conf.locupdate) {
	            var geo = xy2geo(centerx, centery, conf.w, conf.h);
	            annotate(geo[0], geo[1]);
	        }
	    }
	
	    public function Zoom():void {
	        Pan();
	        //rss.Zoom();
	    }
	
	    public function zoomTo(lat:Number, lon:Number, scale:Number):void {
	        var xy = geo2xy(lat,lon,true,true);
	        centerx = xy[0];
	        centery = xy[1];
	        this.scale = scale;
	
	        Zoom();
	
	        if (conf.onzoompan) {
	            var args = "extent=" + cwest + "," + csouth + "," + ceast + "," + cnorth;
	            //getURL( conf.onzoompan + "(\"" + args + "\");" );
	            ExternalInterface.call( conf.onzoompan.substr(11), args);
	        }
	    }
	
	    public function correctCenter():void {
	        if (centerx < (conf.w / (2 * scale))) {
	            centerx = conf.w / (2 * scale);
	        } else if (centerx >  (conf.w - (conf.w / (2 * scale))) ) {
	            centerx = conf.w - (conf.w / (2 * scale));
	        }
	        if (centery < (conf.h / (2 * scale))) {
	            centery = conf.h / (2 * scale);
	        } else if (centery >  (conf.h - (conf.h / (2 * scale))) ) {
	            centery = conf.h - (conf.h / (2 * scale));
	        }
	    }
	
	    /**
	     * 单步跟踪 
	     * 
	     */
	    public function setCurrentBbox():void {
	        var geo = xy2geo(centerx - conf.w/(2*scale), centery - conf.h/(2*scale), conf.w, conf.h);
	        cnorth = geo[0]; cwest = geo[1];
	        geo = xy2geo(centerx + conf.w/(2*scale), centery + conf.h/(2*scale), conf.w, conf.h);
	        csouth = geo[0]; ceast = geo[1];
	
	        ctop = centery - (conf.h/(2 * scale));
	        cbottom = centery + (conf.h/(2 * scale));
	        cleft = centerx - (conf.w/(2 * scale));
	        cright = centerx + (conf.w/(2 * scale));
	    }
	
	    public function recordExtremes(lat:Number, lon:Number):void {
	        var xy = geo2xy(lat,lon,true,true);
	        var x = xy[0]; var y = xy[1];
	
	        if (x < initwestx) {
	            initwestx = x;
	        }
	        if (x > initeastx) {
	            initeastx = x;
	        }
	
	        if (y < initnorthy) {
	            initnorthy = y;
	        }
	        if (y > initsouthy) {
	            initsouthy = y;
	        }
	    }
	
	    public function doMaxZoom():void {
	        //conf.maxzoom = false; // only maxzoom once
	
	        var scalex,scaley;
	
	        centerx = (initwestx + initeastx) / 2;
	        centery = (initnorthy + initsouthy) / 2;
	
	        scalex = conf.w/(initeastx-initwestx);
	        scaley = conf.h/(initsouthy-initnorthy);
	
	        var s;
	        if ( scalex < scaley) { s = scalex; }
	        else { s = scaley; }
	        s = .8 * s;         
	        if (s < 1) { s = 1; }
	        else if (s > conf.maxscale) { s = conf.maxscale; }
	
	        scale = s;
	
	        Zoom();
	
	    }
	
	    public function cautiousProcessClick(url:String, window:String, jsargs:String):void {
	        if (zoompan == "" && mcZoombox == null) {
	            processClick(url,window,jsargs);
	        }
	    }
	    public function processClick(url:String, window:String, jsargs:String):void {
	        if (mcZoombox != null) {
	            mcComponents.removeChild(mcZoombox);
				mcZoombox = null;
	        }
	
	        if (window.indexOf("_javascript") == 0) {
	            if (conf.fscommand == true) {
	                var tmp = window.split(":");
	                //fscommand(tmp[1], jsargs);
	            } else {
	                //proxy.call( window.substr(12), jsargs);
	                //getURL( window.substr(1) + "(\"" + jsargs + "\");" );
	                ExternalInterface.call(window.substr(12), jsargs);
	            }
	        } else {
	        	
	            navigateToURL(new URLRequest(url),window);
	        }
	    }
	
	    /*
	       annotate x/y is with respect to Stage, so lat/lon is calculated differently REVISIT
	       调用外部url完成经纬度标记功能
	
	     */
	    public function annotate(x:Number,y:Number,args:String = null):void {
	        if (args == null) {
	            var w, h, xoffset=0, yoffset=0;
	            if (ratio > 1) {
	                w = 100 * ratio; h = 100;
	                xoffset = (w - h) / 2;
	            } else {
	                h = 100 / ratio; w = 100;
	                yoffset = (h - w) / 2;
	            }
	            var lon = ((x + xoffset)/w) * (ceast - cwest) + cwest;
	            var lat = cnorth - ((y + yoffset)/h) * (cnorth - csouth);
	
	            args = "lat=" + lat + "&long=" + lon + "&zoom=" + scale + "&extent=" + cwest + "," + csouth + "," + ceast + "," + cnorth;
	        }
	
	        if (conf.annotateurl.indexOf("javascript") == 0) {
	            if (conf.fscommand == true) {
	                var tmp = conf.annotateurl.split(":");
	                fscommand(tmp[1], args);
	            } else {
	                //proxy.call( conf.annotateurl.substr(11), args);
	                //getURL( conf.annotateurl + "(\"" + args + "\")" );
	                ExternalInterface.call( conf.annotateurl.substr(11), args);
	
	            }
	        } else {
	            //navigateToURL(new URLRequest(conf.annotateurl + args), conf.window["_default_"]);
	        }
	
	    }
	
	    public function SetupJavascript():void {
/* 	        mc.JComm = "";
	        mc.JSubComm = ""; 
	        mc.JLayComm = "";
	        mc.JLoadComm = "";
	        mc.JRSSComm = "";
	        mc.JZoomComm = "";
	        mc.JActComm = "";
	        mc.JItemActComm = "";
	        mc.JAnnoComm = "";
	        mc.JHackComm = "";
	        mc.JInputComm = "";
	        mc.JGetItemComm = "";
	        mc.JNavmodecomm = "";
	        mc.JGetExtentComm = "";
	        mc.JWMSComm = "";
	        mc.JStartDateComm="";
	        mc.JEndDateComm="";
	        mc.JHideTitleComm="";
	        mc.JBackTraceComm="";
	        mc.JShowBackTraceComm="";
	        mc.watch("JComm",MapInteraction.onJavascript,this);
	        mc.watch("JSubComm", MapInteraction.onJavascript,this);
	        mc.watch("JLayComm", MapInteraction.onJavascript,this);
	        mc.watch("JLoadComm", MapInteraction.onJavascript,this);
	        mc.watch("JRSSComm", MapInteraction.onJavascript,this);
	        mc.watch("JZoomComm", MapInteraction.onJavascript,this);
	        mc.watch("JActComm", MapInteraction.onJavascript,this);
	        mc.watch("JItemActComm", MapInteraction.onJavascript,this);
	        mc.watch("JAnnoComm", MapInteraction.onJavascript,this);
	        mc.watch("JHackComm", MapInteraction.onJavascript,this);
	        mc.watch("JInputComm", MapInteraction.onJavascript,this);
	        mc.watch("JGetItemComm", MapInteraction.onJavascript,this);
	        mc.watch("JNavmodeComm", MapInteraction.onJavascript,this);
	        mc.watch("JGetExtentComm", MapInteraction.onJavascript,this);
	        mc.watch("JWMSComm", MapInteraction.onJavascript,this);
	        mc.watch("JStartDateComm", MapInteraction.onJavascript,this);
	        mc.watch("JEndDateComm", MapInteraction.onJavascript,this);
	        mc.watch("JHideTitleComm", MapInteraction.onJavascript,this);
	        mc.watch("JBackTraceComm", MapInteraction.onJavascript,this);
	        mc.watch("JShowBackTraceComm", MapInteraction.onJavascript,this); */
	    }
	

	
	    public function SetupTimenav():void {
	        
	        this.main.parent.apiSetupNavBar();
	        //mc.createEmptyMovieClip("timenav",timenavdepth);
/* 	        mc.timenav.attachMovie("FScrollBarSymbol","scrollbar",1);
	        mc.timenav.scrollbar.setScrollProperties(1,0,conf.timenavunit);
	        mc.timenav.scrollbar.setSize(200);
	        mc.timenav.scrollbar.setHorizontal(true);
	        mc.timenav.scrollbar.setChangeHandler("TimenavChange",this);
	        mc.timenav.scrollbar.setEnabled(true);
	        mc.timenav.scrollbar.setScrollPosition(conf.timenavpos);
	
	        mc.timenav.createTextField("timetext",2,mc.timenav.scrollbar._width,0,100,15);
	        mc.timenav.timetext.html = true;
	        mc.timenav.timetext.backgroundColor = 0xffffff;
	        mc.timenav.timetext.border = true;
	        mc.timenav.timetext.background = true;
	        mc.timenav.timetext.borderColor = 0x000000;
	        //mc.timenav.timetext.htmlText = "<font face=\"Arial\" size=\"9\"><b>" + worldkitUtil.dateToString(maxtime) +  "</b></font>";
	        componentScaleAndPosition("timenav",100,0); */
	    }
	    public function TimenavChange(component) {
	        if (mcZoombox != null) { 
	        	mcComponents.removeChild(mcZoombox);
	        	mcZoombox = null;
	        }
	        maxtime = new Date(conf.startdate.valueOf() + (component.getScrollPosition()/conf.timenavunit) * (conf.enddate.valueOf() - conf.startdate.valueOf()));
	        //mcComponents.timenav.timetext.htmlText = "<font face=\"Arial\" size=\"9\"><b>" + worldkitUtil.dateToString(maxtime) + "</b></font>";
	        //rss.setVisible(true);
	        //img.Pan(); //ALPHA wms timenav
	    }
	
	    public function LoadingDialog(msg:String, force:Boolean, size:Number = 20) {
	        if (conf.showload == false && force != true) 
	        { 
	        	return; 
	        }
	        if (mcComponents.getChildByName("worldkitLoadingDialog") == null) {

				var loading:MovieClip = new MovieClip();
				loading.name = "worldkitLoadingDialog";
		        mcComponents.addChild(loading);	 
	        	
	        	var text:TextField = new TextField();
	        	text.x = 0;
	        	text.y = 0;
	        	text.width = 160;
	        	text.height = 30;
	        	text.backgroundColor = 0xffffff;
	        	text.border = true;
	        	text.borderColor= 0x000000;
	        	text.autoSize = "center";
	        	loading.addChild(text);
	        	
/* 	            loading.createTextField("text",1,0,0,160,30);
	            loading.text.html = true;
	            loading.text.backgroundColor = 0xffffff;
	            mcComponents.worldkitLoadingDialog.text.border = true;
	            mcComponents.worldkitLoadingDialog.text.background = true;
	            mcComponents.worldkitLoadingDialog.text.borderColor= 0x000000;
	            componentScaleAndPosition("worldkitLoadingDialog",100,-1);
	            mcComponents.worldkitLoadingDialog.text.autoSize = "center";*/
	        }
	        if (msg == null) {
	            mcComponents.getChildByName("worldkitLoadingDialog").visible = false;
	        } else {
	            var textsize:Number; 
	            if (isNaN(size)) { textsize = 20; } else { textsize = size; }
	            text.htmlText = "<font face=\"Arial\" size=\"" + textsize.toString() + "\"><b>" + msg + "</b></font>";
	            mcComponents.getChildByName("worldkitLoadingDialog").visible = true;
	        }
	    }
	
	    /**
	     *	坐标转经纬度 
	     * @param x
	     * @param y
	     * @param w
	     * @param h
	     * @return 
	     * 
	     */
	    public function xy2geo(x:Number,y:Number,w:Number,h:Number):Array {
	        var lat,lon;
	        if (conf.west >= conf.east) {
	            lon = (x / w) * (conf.east + 360 - conf.west) + conf.west;
	            if (lon > 180) {
	                lon = lon - 360;
	            }
	        } else {
	            lon = (x / w) * (conf.east - conf.west) + conf.west;
	        }
	        lat = conf.north - (y / h) * (conf.north - conf.south);
	        return [lat,lon];
	    }
	
	    public function geo2xy(lat:Number,lon:Number,point:Boolean,over:Boolean):Array {
	
	        var w = conf.w;
	        var h = conf.h;
	        var no,so,ea,we;
	        if (conf.accuplot != true || point == false) {
	            no = conf.north;
	            so = conf.south;
	            ea = conf.east;
	            we = conf.west;
	        } else {
	            var nw = xy2geo(centerx - (conf.w/(2 * scale)), centery - (conf.h/(2 * scale)), conf.w, conf.h);
	            var se = xy2geo(centerx + (conf.w/(2 * scale)), centery + (conf.h/(2 * scale)), conf.w, conf.h);
	            no = nw[0];
	            we = nw[1];
	            so = se[0];
	            ea = se[1];
	        }
	        var x,y;
	        if (conf.displaytype == "polar") { //fix for north pole as well!!!!
	            var r = ((lat -0 + 90)/(no + 90))* w/2;
	            var angle = (lon - 0 + 90) * Math.PI / 180;
	            x = (-1 * r * Math.cos(angle)) + w/2;
	            y = (-1 * r * Math.sin(angle)) + h/2;
	        } else if (conf.displaytype == "dymax") { //should add another namespace
	            x = lat;
	            y = lon;
	        } else if (conf.west >= conf.east) {
	            if (lon <= ea || over) {
	                x = ((lon - we + 360)/(ea + 360 - we)) * w;
	            } else {
	                x = ((lon - we)/(ea + 360 - we)) * w;
	            }
	            y = ((no - lat)/(no - so)) * h;
	        } else {
	            x = ((lon - we)/(ea - we)) * w;
	            y = ((no - lat)/(no - so)) * h;
	        }
	        if (conf.accuplot == true && point == true) {
	            if (conf.w > conf.h) {
	                x = (conf.w/conf.h) * 100 * x / conf.w - ((conf.w/conf.h) * 100 - 100)/2;
	                y = 100 * y / conf.h;
	            } else {
	                x = 100 * x / conf.w;
	                y = (conf.h/conf.w) * 100 * y / conf.h - ((conf.h/conf.w) * 100 - 100)/2;
	            }
	
	        }
	        return [x,y];
	    }
	
	    public function pointOnMap(lat:Number, lon:Number):Boolean {
	        if (conf.west >= conf.east) {
	            if (lon <= 180 && lon >= -180 && (lon >= conf.west || lon <= conf.east) && lat <= conf.north && lat >= conf.south) {
	                return true;
	            } else {
	                return false;
	            }
	        } else {
	            if (lon >= conf.west && lon <= conf.east && lat <= conf.north && lat >= conf.south) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }
	
	    /*
	       The black magic of worldKit. Fit images to a map with dynamically determing width/heigh
	     */
	    public function scaleAndPosition(parent:MovieClip, id:String, extent:String, tiled:Boolean):void { 
	
	        var w, h;
	        var wfactor, hfactor;
	
	        if (ratio > 1) {
	            w = 100 * ratio; h = 100;
	        } else {
	            h = 100 / ratio; w = 100;
	        }
	        wfactor = 100;
	        hfactor = 100;
	
	        var wanother = 1;
	        var hanother = 1;
	        var xanother = 0;
	        var yanother = 0;
	        var xy;
	
	        if (extent == '1') {
	            hanother = 180/(conf.north - conf.south);
	            wanother = 360/(conf.east - conf.west);
	
	            xy = geo2xy(90,-180,true,true);
	            xanother = xy[0] * w / conf.w;
	            yanother = xy[1] * h / conf.h;
	
	        } else if (extent != null) {
	            var no,so,ea,we;
	            var wsen = extent.split(",");
	            we = wsen[0]; so = wsen[1]; ea = wsen[2]; no = wsen[3];
	            hanother = (no - so)/(conf.north - conf.south);
	            wanother = (ea - we)/(conf.east - conf.west);
	
	            xy = geo2xy( no, we, true, true);
	            xanother = xy[0] * scale * w / conf.w;
	            yanother = xy[1] * scale * h / conf.h;
	
	        }
	
	        var clip;
	        if (id == null) {
	            clip = parent;
	        } else {
	            clip = parent[id];
	        }
	
	
	        var xscale = scale * 100 * ( w / clip.origwidth) * wanother;
	        var yscale = scale * 100 * ( h / clip.origheight) * hanother;
	
	        var xoffset = scale * ((conf.w / 2) - centerx) * (w / conf.w);
	        var yoffset = scale * ((conf.h / 2) - centery) * (h / conf.h);
	
	        var xp = - ((w - wfactor) / 2 + ((scale - 1) * w / 2)) + xoffset + xanother;
	        var yp = - ((h - hfactor) / 2 + ((scale - 1) * h / 2)) + yoffset + yanother;
	
	        if (tiled) {
	            var width = clip.actualwidth * xscale / 100;
	            var height = clip.actualheight * yscale / 100;  
	
	            var x2 = Math.floor(xp * 20) / 20;
	            var y2 = Math.floor(yp * 20) / 20;
	
	            width = width + (xp - x2);
	            height = height + (yp - y2);
	
	            width = Math.ceil(width * 20) / 20;
	            height = Math.ceil(height * 20) / 20;
	
	            if (clip.actualwidth < clip.origwidth) {
	                width = Math.ceil(width);
	            }
	            if (clip.actualheight < clip.origheight) {
	                height = Math.ceil(height);
	            }
	
	            clip._width = width;
	            clip._height = height;
	
	
	            clip._x = x2;
	            clip._y = y2;   
	        } else {
	            clip._xscale = xscale;
	            clip._yscale = yscale;
	            clip._x = xp;
	            clip._y = yp;
	        }
	
	    }
	}
}